'use client'

import { useRef, useState } from "react";
import classNames from "classnames";
import { TSchema } from '@/constants/defaultSchema'
import 'react-modern-drawer/dist/index.css'
import SettingDrawer from "@/components/SettingDrawer";
import BlockControlDrawer from "@/components/BlockControlDrawer";
import useSplitPageBySchema from "@/hooks/useSplitPageBySchema";
import ResumePage from "@/components/resumePage";
import Header from "@/components/header";
import ResumeStyleContext from "@/components/ResumeStyleContext";
import Footer from "@/components/Footer";
import { ScrollArea } from "@radix-ui/themes";

export interface IHomeAppProps {
  schemaList: TSchema[];
  pageStatus: string
}

const HomeApp: React.FC<IHomeAppProps> = (props) => {
  /** 当前正在编辑的板块信息 */
  const [currentEditBlockInfo, setCurrentEditBlockInfo] = useState<{
    blockId: string;
    subBlockId?: string;
  }>({
    blockId: "",
    subBlockId: "",
  })
  /** 简历数据 Schema */
  const [schemaList, setSchemaList] = useState<TSchema[]>(props.schemaList)
  const containerRef = useRef<HTMLDivElement | null>(null);

  const splitPageInfo = useSplitPageBySchema({
    schemaList,
    containerRef,
  });

  /** 打开对应板块的设置抽屉 */
  const handleOpenSettingDrawer = (blockId: string, subBlockId?: string): void => {
    setCurrentEditBlockInfo({
      blockId,
      subBlockId,
    })
  }

  /** 提交数据变更，合并至页面 */
  const handleDrawerSubmit = (schema: TSchema) => {

    const _schemaList: TSchema[] = schemaList.map(i => {
      if (i.id === schema.id) {
        return {
          ...i,
          props: {
            ...schema.props
          }
        } as TSchema
      } else {
        return i;
      }
    })
    setSchemaList(_schemaList)
    setCurrentEditBlockInfo({
      blockId: "",
      subBlockId: "",
    })
  }

  return (
    <ResumeStyleContext>
      <ScrollArea type="always" scrollbars="vertical" style={{ height: '100vh' }}>
        <div
          ref={containerRef}
          className={classNames(
            "flex flex-col items-center",
            "w-full min-h-screen pb-20 pt-24",
            "font-[family-name:var(--font-geist-sans)]",
            "bg-gray-200"
          )}
        >
          {/* 板块设置的抽屉 */}
          <SettingDrawer
            visible={currentEditBlockInfo.blockId !== ''}
            handleClose={() => setCurrentEditBlockInfo({ blockId: '', subBlockId: '' })}
            handleSubmit={handleDrawerSubmit}
            schema={schemaList}
            schemaInfo={currentEditBlockInfo}
          />

          {/* 板块控制抽屉 */}
          {/* <BlockControlDrawer
            handleClose={() => setCurrentEditBlockInfo({ blockId: '', subBlockId: '' })}
            handleSubmit={handleDrawerSubmit}
            schema={schemaList}
            schemaInfo={currentEditBlockInfo}
          /> */}

          <Header
            schemaList={schemaList}
            containerRef={containerRef}
          />


          {splitPageInfo.map((i, index) => (
            <ResumePage
              key={index}
              blockList={schemaList.filter(item => i.includes(`#block-${item.id}`))}
              handleOpenSettingDrawer={handleOpenSettingDrawer}
            />
          ))}

          <Footer handleCancel={() => { }} handleSubmit={() => { }} />
        </div>
      </ScrollArea>

    </ResumeStyleContext>
  );
}


export default HomeApp;