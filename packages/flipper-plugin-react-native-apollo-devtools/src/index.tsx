import React, { useState } from "react";
import { PluginClient, usePlugin, createState, useValue } from "flipper-plugin";
import { Typography, message } from "antd";
import { BlockType, Data, Events } from './typings'
import { Details } from './Details'
import { List, TabsEnum } from './List'
import { createCacheBlock, createMutationBlocks, createQueryBlocks } from './utils'

const InitialData = {
  id: "x",
  lastUpdateAt: new Date(),
  queries: [],
  mutations: [],
  cache: [],
};

let scheduler: NodeJS.Timeout;

export function plugin(client: PluginClient<Events, {}>) {
  const data = createState<Data>(InitialData, { persist: "data" });
  const selectedItem = createState<BlockType>({});

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
  });

  client.addMenuEntry({
    label: "*️⃣ clear",
    handler: async () => {
      data.set(InitialData);
      clearSelectedItem()
    },
  });

  client.addMenuEntry({
    label: "🔄 refresh",
    handler: async () => {
      // @ts-expect-error string is not assignable to never
      client.send("GQL:request", {});
    },
  });

  client.onConnect(() => {
    scheduler = setInterval(() => {
      // @ts-expect-error string is not assignable to never
      client.send("GQL:request", {});
    }, 5000);
  });

  client.onDisconnect(() => {
    clearInterval(scheduler)
  });

  function onCopyText(text: string) {
    client.writeTextToClipboard(text);
    message.success("Copied successfully 🎉");
  }

  function handleSelectedItem(block: BlockType) {
    selectedItem.set(block)
  }

  function clearSelectedItem() {
    selectedItem.set({})
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
      <Typography.Title level={3}>
        ⚛️  React Native Apollo Devtool
      </Typography.Title>
      <List data={data} activeTab={activeTab} selectedItem={selectedItem} onItemSelect={instance.handleSelectedItem} onTabChange={handleTabChange} />
      <Details selectedItem={selectedItem} onCopy={instance.onCopyText} />
    </>
  );
}
