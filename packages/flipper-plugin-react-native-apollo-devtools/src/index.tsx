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
      selectedItem.set({})
    },
  });

  client.addMenuEntry({
    label: "🔄 refresh",
    handler: async () => {
      // @ts-expect-error string is not assignable to never
      client.send("GQL:request", {});
    },
  });

  function onCopyText(text: string) {
    client.writeTextToClipboard(text);
    message.success("Copied successfully 🎉");
  }

  function handleSelectedItem(block: BlockType) {
    selectedItem.set(block)
  }

  return { data, onCopyText, selectedItem, handleSelectedItem };
}


export function Component() {
  const instance = usePlugin(plugin);
  const data = useValue(instance.data);
  const selectedItem = useValue(instance.selectedItem);
  const [activeTab, setActiveTab] = useState(TabsEnum.cache.key);

  return (
    <>
      <Typography.Title level={3}>
        ⚛️  React Native Apollo Devtool
      </Typography.Title>
      <List data={data} activeTab={activeTab} selectedItem={selectedItem} onItemSelect={instance.handleSelectedItem} onTabChange={setActiveTab} />
      <Details selectedItem={selectedItem} onCopy={instance.onCopyText} />
    </>
  );
}
