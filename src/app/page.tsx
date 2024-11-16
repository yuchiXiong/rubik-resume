'use client'
import {useState} from "react";
import classNames from "classnames";
import {BLOCK_GAP} from "@/constants/defaultStyles";
import {SCHEME_MOCK, TScheme} from '@/constants/mockSchema'
import 'react-modern-drawer/dist/index.css'
import SettingDrawer from "@/components/SettingDrawer";
import {getPreviewComponent} from "@/utils/blocks";


export default function Home() {

    const blockGap = BLOCK_GAP;

    const [currentEditBlock, setCurrentEditBlock] = useState<TScheme | null>(null)
    const [schemeList, setSchemeList] = useState<TScheme[]>(JSON.parse(JSON.stringify(SCHEME_MOCK)))

    const handleOpenSettingDrawer = (scheme: TScheme): void => {
        setCurrentEditBlock(scheme)
    }

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
        <div className={
            classNames(
                "flex justify-center",
                "w-screen h-screen overflow-y-scroll py-4",
                "font-[family-name:var(--font-geist-sans)]",
                "bg-gray-200"
            )
        }>
            <SettingDrawer
                visible={currentEditBlock !== null}
                handleClose={() => setCurrentEditBlock(null)}
                handleSubmit={handleDrawerSubmit}
                scheme={currentEditBlock}
            />

            <section
                style={{
                    gap: blockGap,
                }}
                className={
                    classNames(
                        'w-8/12 h-max',
                        'flex flex-col',
                        'px-12 py-8',
                        'bg-white',
                        "rounded"
                    )
                }
            >
                {
                    schemeList.map((item) => (
                        <div key={item.id} onClick={() => handleOpenSettingDrawer(item)}>
                            {getPreviewComponent(item)}
                        </div>
                    ))
                }
            </section>
        </div>

    );
}
