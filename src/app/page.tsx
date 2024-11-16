'use client'
import {lazy, useState} from "react";
import classNames from "classnames";
import {BLOCK_GAP} from "@/constants/defaultStyles";
import {IScheme, SCHEME_MOCK} from '@/constants/mockSchema'
import {IProfessionalSkillProps} from "@/components/ProfessionalSkill";
import {IProjectExperienceProps} from "@/components/ProjectExperience";
import {IBasicInfoProps} from "@/components/BasicInfo";
import ReactModernDrawer from 'react-modern-drawer'
import {CloseSmall} from '@icon-park/react'

const BasicInfo = lazy(() => import('@/components/BasicInfo'))
const ProfessionalSkill = lazy(() => import('@/components/ProfessionalSkill'))
const ProjectExperience = lazy(() => import('@/components/ProjectExperience'))
import 'react-modern-drawer/dist/index.css'

export default function Home() {

    const blockGap = BLOCK_GAP;

    const [currentEditBlock, setCurrentEditBlock] = useState<IScheme | null>(null)

    const handleOpenSettingDrawer = (scheme: IScheme): void => {
        setCurrentEditBlock(scheme)
    }

    const getComponent = (scheme: IScheme) => {
        const {componentKey, props} = scheme;
        switch (componentKey) {
            case "BasicInfo":
                return (
                    <BasicInfo
                        {...props as IBasicInfoProps}
                        onClick={() => handleOpenSettingDrawer(scheme)}
                        key={scheme.id}
                    />
                )
            case "ProfessionalSkill":
                return (
                    <ProfessionalSkill
                        {...props as IProfessionalSkillProps}
                        onClick={() => handleOpenSettingDrawer(scheme)}
                        key={scheme.id}
                    />
                )
            case "ProjectExperience":
                return (
                    <ProjectExperience
                        {...props as IProjectExperienceProps}
                        onClick={() => handleOpenSettingDrawer(scheme)}
                        key={scheme.id}
                    />
                )
            default:
                return null;
        }
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
            <ReactModernDrawer
                open={currentEditBlock !== null}
                onClose={() => setCurrentEditBlock(null)}
                direction='right'
                style={{
                    width: '30%'
                }}
            >
                <div
                    className={classNames(
                        'relative'
                    )}
                >
                    <div
                        style={{
                            backgroundImage: "url('https://www.tailwindcss.cn/_next/static/media/docs@30.8b9a76a2.avif')",
                            backgroundSize: 'cover',
                        }}
                        className='w-full h-28 absolute pointer-events-none'
                    >
                    </div>
                    <nav className='p-2 flex items-center border-b border-gray-100 border-solid'>
                        <span className='text-base'>{currentEditBlock?.blockName}</span>
                        <span
                            className='ml-auto cursor-pointer'
                            onClick={() => setCurrentEditBlock(null)}
                        >
                            <CloseSmall theme="outline" size="24" fill="#333"/>
                        </span>
                    </nav>
                </div>
            </ReactModernDrawer>

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
                    SCHEME_MOCK.map((item) => getComponent(item))
                }
            </section>
        </div>

    );
}
