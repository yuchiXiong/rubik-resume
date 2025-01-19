import { ISchema, TSchema } from "@/constants/defaultSchema";
import { lazy, ReactElement } from "react";
import { IBasicInfoProps } from "@/components/blocks/BasicInfo/BasicInfo";
import { IProfessionalSkillProps } from "@/components/blocks/ProfessionalSkill/ProfessionalSkill";
import { IProjectExperienceProps } from "@/components/blocks/ProjectExperience/ProjectExperience";

// 展示组件对应的设置组件
const BasicInfoSetting = lazy(() => import('@/components/blocks/BasicInfo/BasicInfoSetting'))
const ProfessionalSkillSetting = lazy(() => import('@/components/blocks/ProfessionalSkill/ProfessionalSkillSetting'))
const ProjectExperienceSetting = lazy(() => import('@/components/blocks/ProjectExperience/ProjectExperienceSetting'))

export const getSettingComponent = (
  schemaList: TSchema[],
  schemaInfo: {
    blockId: string;
    subBlockId?: string;
  },
  handleClose: () => void,
  handleSubmit: (schema: TSchema) => void
): ReactElement | null => {
  const schema = schemaList.find((item) => item.id === schemaInfo.blockId);

  console.log('schema', schema);

  if (!schema) return null;

  const { componentKey } = schema;
  switch (componentKey) {
    case 'BasicInfo':
      return (
        <BasicInfoSetting
          schema={schema as ISchema<IBasicInfoProps>}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )
    case 'ProfessionalSkill':
      return (
        <ProfessionalSkillSetting
          schema={schema as ISchema<IProfessionalSkillProps>}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )
    case 'ProjectExperience':
      return (
        <ProjectExperienceSetting
          schema={schema as ISchema<IProjectExperienceProps>}
          schemaInfo={schemaInfo}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )
    default:
      return null;
  }
}