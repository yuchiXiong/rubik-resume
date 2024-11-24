'use client'
import {useRef, useState} from "react";
import classNames from "classnames";
import {SCHEME_MOCK, TScheme} from '@/constants/mockSchema'
import 'react-modern-drawer/dist/index.css'
import SettingDrawer from "@/components/SettingDrawer";
import useSplitPageByScheme from "@/composes/useSplitPageByScheme";
import ResumePage from "@/components/resumePage";

export default function Home() {


    /** 当前正在编辑的板块 */
    const [currentEditBlock, setCurrentEditBlock] = useState<TScheme | null>(null)
    /** 简历数据 Scheme */
    const [schemeList, setSchemeList] = useState<TScheme[]>(JSON.parse(JSON.stringify(SCHEME_MOCK)))
    const containerRef = useRef<HTMLDivElement | null>(null);

    const splitPageInfo = useSplitPageByScheme({
        schemeList,
        containerRef,
    });

    /** 打开对应板块的设置抽屉 */
    const handleOpenSettingDrawer = (scheme: TScheme): void => {
        setCurrentEditBlock(scheme)
    }

    /** 提交数据变更，合并至页面 */
    const handleDrawerSubmit = (scheme: TScheme) => {

        const _schemeList: TScheme[] = schemeList.map(i => {
            if (i.id === scheme.id) {
                return {
                    ...i,
                    props: {
                        ...scheme.props
                    }
                } as TScheme
            } else {
                return i;
            }
        })
        setSchemeList(_schemeList)
        setCurrentEditBlock(null)
    }

    return (
        <div
            ref={containerRef}
            className={classNames(
                "flex flex-col items-center",
                "w-screen min-h-screen overflow-y-scroll py-4",
                "font-[family-name:var(--font-geist-sans)]",
                "bg-gray-200"
            )}
        >
            {/* 板块设置的抽屉 */}
            <SettingDrawer
                visible={currentEditBlock !== null}
                handleClose={() => setCurrentEditBlock(null)}
                handleSubmit={handleDrawerSubmit}
                scheme={currentEditBlock}
            />

            {splitPageInfo.map((i, index) => (
                <ResumePage
                    key={index}
                    blockList={schemeList.filter(item => i.includes(`#block-${item.id}`))}
                    handleOpenSettingDrawer={handleOpenSettingDrawer}
                />
            ))}
        </div>

    );
}
