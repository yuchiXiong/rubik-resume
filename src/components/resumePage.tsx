import { A4_HEIGHT, A4_WIDTH } from "@/utils/page";
import classNames from "classnames";
import { TSchema } from "@/constants/defaultSchema";
import { useSelector } from "@/hooks/useResumeStyle";
import { lazy, ReactElement } from "react";
import { IBasicInfoProps } from "@/components/blocks/BasicInfo/BasicInfo";
import { IProfessionalSkillProps } from "@/components/blocks/ProfessionalSkill/ProfessionalSkill";
import { IProjectExperienceProps } from "@/components/blocks/ProjectExperience/ProjectExperience";


// 展示组件
const BasicInfo = lazy(() => import('@/components/blocks/BasicInfo/BasicInfo'))
const ProfessionalSkill = lazy(() => import('@/components/blocks/ProfessionalSkill/ProfessionalSkill'))
const ProjectExperience = lazy(() => import('@/components/blocks/ProjectExperience/ProjectExperience'))

export interface IResumePageProps {
  blockList: TSchema[]
  handleOpenSettingDrawer: (blockId: string, subBlockId?: string) => void
}

const ResumePage = ({
  blockList,
  handleOpenSettingDrawer,
}: IResumePageProps) => {

  /** 板块间的间距 */
  const blockGap = useSelector(store => store.blockGap)

  const getPreviewComponent = (schema: TSchema | null): ReactElement | null => {
    if (!schema) return null;

    const { componentKey, props, blockName } = schema;
    switch (componentKey) {
      case "BasicInfo":
        return (
          <BasicInfo
            {...props as IBasicInfoProps}
            handleBlockClick={() => handleOpenSettingDrawer(schema.id)}
          />
        )
      case "ProfessionalSkill":
        return (
          <ProfessionalSkill
            {...props as IProfessionalSkillProps}
            blockName={blockName}
            handleBlockClick={() => handleOpenSettingDrawer(schema.id)}
          />
        )
      case "ProjectExperience":
        return (
          <ProjectExperience
            {...props as IProjectExperienceProps}
            blockName={blockName}
            handleBlockClick={(subBlockId: string) => handleOpenSettingDrawer(schema.id, subBlockId)}
          />
        )
      default:
        return null;
    }
  }

  return (
    <section
      style={{
        gap: blockGap,
        width: A4_WIDTH,
        height: A4_HEIGHT
      }}
      className={
        classNames(
          // 'w-8/12 h-max',
          'flex flex-col overflow-hidden',
          'px-12 py-8 mb-4',
          'bg-white',
          "rounded",
        )
      }
    >
      {blockList.map((item) => (
        <div
          id={`block-${item.id}`}
          key={item.id}
        >
          {getPreviewComponent(item)}
        </div>
      ))}
    </section>
  )
}

export default ResumePage;