'use client'

import { useRef, useState } from "react";
import classNames from "classnames";
import { TSchema } from '@/constants/defaultSchema'
import 'react-modern-drawer/dist/index.css'
import SettingDrawer from "@/components/SettingDrawer";
import useSplitPageBySchema from "@/hooks/useSplitPageBySchema";
import ResumePage from "@/components/resumePage";
import Header from "@/components/header";
import ResumeStyleContext from "@/components/ResumeStyleContext";
import Footer from "@/components/Footer";

export interface IHomeAppProps {
  schemaList: TSchema[];
  pageStatus: string
}

const HomeApp: React.FC<IHomeAppProps> = (props) => {
  /** 当前正在编辑的板块 */
  const [currentEditBlock, setCurrentEditBlock] = useState<TSchema | null>(null)
  /** 简历数据 Schema */
  const [schemaList, setSchemaList] = useState<TSchema[]>(props.schemaList)
  const containerRef = useRef<HTMLDivElement | null>(null);

  const splitPageInfo = useSplitPageBySchema({
    schemaList,
    containerRef,
  });

  /** 打开对应板块的设置抽屉 */
  const handleOpenSettingDrawer = (schema: TSchema): void => {
    setCurrentEditBlock(schema)
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
    setCurrentEditBlock(null)
  }

  return (
    <ResumeStyleContext>
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
          visible={currentEditBlock !== null}
          handleClose={() => setCurrentEditBlock(null)}
          handleSubmit={handleDrawerSubmit}
          schema={currentEditBlock}
        />

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

        <Footer handleCancel={() => {}} handleSubmit={() => {}} />
      </div>
    </ResumeStyleContext>
  );
}


export default HomeApp;