import React, { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import {
  PluginClient,
  usePlugin,
  createState,
  useValue,
  Layout,
  DataInspector,
  DetailSidebar,
} from "flipper-plugin";
import { Button, Tabs, Typography, Tooltip, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import {
  ArrayOfMutations,
  ArrayOfQuery,
} from "react-native-apollo-devtools-client/src/typings";
import { BlockType } from "./typings";

export function Details({selectedItem,onCopy}:{selectedItem:BlockType,onCopy:(...args:any)=>void}){
    return (
        <DetailSidebar width={350}>
        <Layout.Container gap pad>
          <Typography.Title level={4} type="secondary">
            {selectedItem?.operationType}
          </Typography.Title>
          <Typography.Title level={4}>{selectedItem?.name}</Typography.Title>
          <br />

          {selectedItem?.blocks?.map((block, index) => {            
            const key = `block${index}`;
            if (block.blockType === "GQLString") {
                console.log("query: ", block?.blockLabel)
              return (
                <>
                  <Typography.Title key={key} level={4} type="secondary">
                    {block?.blockLabel}
                  </Typography.Title>
                  <Typography.Text style={{ fontSize: 12 }}>
                    <pre>{block?.blockValue?.trim()}</pre>
                  </Typography.Text>
                  <br />
                </>
              );
            } else if (block.blockType === "Object") {
                console.log(block?.blockLabel, block?.blockValue)
              return (
                <>
                  <Typography.Title key={key} level={4} type="secondary">
                    {block?.blockLabel}
                    <Tooltip title="copy">
                      <Button
                        onClick={() =>
                            onCopy(
                            `${JSON.stringify(block?.blockValue)}`,
                          )
                        }
                        style={{ marginLeft: 10 }}
                        size="small"
                        type="default"
                        shape="default"
                        icon={<CopyOutlined />}
                      />
                    </Tooltip>
                  </Typography.Title>
                  <DataInspector data={block?.blockValue} expandRoot={true} />
                  <br />
                </>
              );
            } else {
              return null;
            }
          })}
        </Layout.Container>
      </DetailSidebar>
    )
}