import React, { useState } from "react";
import { PluginClient, usePlugin, createState, useValue } from "flipper-plugin";
import { message } from "antd";
import { BlockType, Data, Events } from './typings'
import { Details } from './Details'
import { List, TabsEnum } from './List'
import { createCacheBlock, createMutationBlocks, createQueryBlocks } from './utils'
import { Header } from './Header';

const InitialData = {
  id: "x",
  lastUpdateAt: new Date(),
  queries: [],
  mutations: [],
  cache: [],
};

let timer: NodeJS.Timeout;

function debounce(func: (...args: any) => any, timeout = 7000): void {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // @ts-expect-error add typings for this
    func.apply(this);
  }, timeout);
}

export function plugin(client: PluginClient<Events, {}>) {
  const data = createState<Data>(InitialData, { persist: "data" });
  const selectedItem = createState<BlockType>({});

  const resyncData = () => {
    debounce(() => {
      // @ts-expect-error string is not assignable to never
      client.send("GQL:request", {});
    })
  }

  const resetSync = () => {
    clearTimeout(timer);
  }

  client.onMessage("GQL:response", (newData) => {
    const finalData = {
      ...newData,
      mutations: createMutationBlocks(newData?.mutations).reverse(),
      queries: createQueryBlocks(newData?.queries).reverse(),
      cache: createCacheBlock(newData?.cache),
    };

    data.set(finalData as Data);
    // @ts-expect-error
    client.send("GQL:ack", {});
    resyncData();
  });

  client.addMenuEntry({
    label: "*️⃣ clear",
    handler: async () => {
      data.set(InitialData);
      clearSelectedItem();
    },
  });

  client.addMenuEntry({
    label: "🔄 refresh",
    handler: async () => {
      // @ts-expect-error string is not assignable to never
      client.send("GQL:request", {});
    },
  });


  client.onDestroy(() => {
    resetSync();
  });

  client.onDisconnect(() => {
    resetSync();
  });

  function onCopyText(text: string) {
    client.writeTextToClipboard(text);
    message.success("Copied successfully 🎉");
  }

  function handleSelectedItem(block: BlockType) {
    selectedItem.set(block);
  }

  function clearSelectedItem() {
    selectedItem.set({});
  }

  return { data, onCopyText, selectedItem, handleSelectedItem, clearSelectedItem };
}


export function Component() {
  const instance = usePlugin(plugin);
  const data = useValue(instance.data);
  const selectedItem = useValue(instance.selectedItem);
  const [activeTab, setActiveTab] = useState(TabsEnum.cache.key);

  function handleTabChange(nextTab: string) {
    setActiveTab(nextTab);
    instance.clearSelectedItem()
  }

  return (
    <>
      <Header />
      <List data={data} activeTab={activeTab} selectedItem={selectedItem} onItemSelect={instance.handleSelectedItem} onTabChange={handleTabChange} />
      <Details selectedItem={selectedItem} onCopy={instance.onCopyText} />
    </>
  );
}
