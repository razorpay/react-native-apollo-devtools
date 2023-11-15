import { Button, Tabs } from "antd";
import { Layout } from "flipper-plugin";
import React, { Dispatch, SetStateAction, memo } from "react";
import { BlockType, Data } from "./typings";

export const TabsEnum = {
  query: { key: "query", value: "Query", plural: "Queries" },
  mutation: { key: "mutation", value: "Mutation", plural: "Mutations" },
  cache: { key: "cache", value: "Cache", plural: "Caches" },
};

const TabItem = memo(
  ({
    active,
    onPress,
    data,
  }: {
    active: boolean;
    onPress: Dispatch<SetStateAction<any>>;
    data: any;
  }) => {
    return (
      <Button
        onClick={() => onPress(data)}
        type={active ? "primary" : "text"}
        block
        style={{ textAlign: "left", margin: 0 }}
      >
        {data?.name || "-"}
      </Button>
    );
  }
);

const { TabPane } = Tabs;

const sortData = (a: BlockType, b: BlockType) =>
  a.name && b.name && a.name < b.name ? -1 : 1;

export function List({
  data,
  activeTab,
  selectedItem,
  filter,
  onItemSelect,
  onTabChange,
}: {
  data: Data;
  activeTab: string;
  selectedItem: BlockType;
  filter: string;
  onItemSelect: (block: BlockType) => void;
  onTabChange: (nextTab: string) => void;
}) {
  const filterData = (d: BlockType) =>
    filter === "" ||
    d.id?.includes(filter) ||
    d.name?.toLocaleLowerCase()?.includes(filter);

  return (
    <Layout.ScrollContainer>
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        {/* CACHE */}
        <TabPane tab={TabsEnum.cache.value} key={TabsEnum.cache.key}>
          {data?.cache
            ?.filter(filterData)
            .sort(sortData)
            .map((d, i) => {
              const active =
                activeTab === TabsEnum.cache.key &&
                selectedItem?.name === d?.name;

              return (
                <TabItem
                  key={`cache${d?.id}${i}`}
                  active={active}
                  onPress={onItemSelect}
                  data={d}
                />
              );
            })}
        </TabPane>
        {/* QUERY */}
        <TabPane tab={TabsEnum.query.value} key={TabsEnum.query.key}>
          {data?.queries
            ?.filter(filterData)
            .sort(sortData)
            .map((d) => {
              const active =
                activeTab === TabsEnum.query.key && selectedItem?.id === d?.id;

              return (
                <TabItem
                  key={`query${d?.id}`}
                  active={active}
                  onPress={onItemSelect}
                  data={d}
                />
              );
            })}
        </TabPane>
        {/* MUTATION */}
        <TabPane tab={TabsEnum.mutation.value} key={TabsEnum.mutation.key}>
          {data?.mutations
            ?.filter(filterData)
            .sort(sortData)
            .map((d) => {
              const active =
                activeTab === TabsEnum.mutation.key &&
                selectedItem?.id === d?.id;

              return (
                <TabItem
                  key={`mutation${d?.id}`}
                  active={active}
                  onPress={onItemSelect}
                  data={d}
                />
              );
            })}
        </TabPane>
      </Tabs>
    </Layout.ScrollContainer>
  );
}
