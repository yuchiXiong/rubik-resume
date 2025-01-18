import { ISchema, TSchema } from "@/constants/defaultSchema";
import { lazy, ReactElement } from "react";
import { IBasicInfoProps } from "@/components/blocks/BasicInfo/BasicInfo";
import { IProfessionalSkillProps } from "@/components/blocks/ProfessionalSkill/ProfessionalSkill";
import { IProjectExperienceProps } from "@/components/blocks/ProjectExperience/ProjectExperience";

// 展示组件
const BasicInfo = lazy(() => import('@/components/blocks/BasicInfo/BasicInfo'))
const ProfessionalSkill = lazy(() => import('@/components/blocks/ProfessionalSkill/ProfessionalSkill'))
const ProjectExperience = lazy(() => import('@/components/blocks/ProjectExperience/ProjectExperience'))

// 展示组件对应的设置组件
const BasicInfoSetting = lazy(() => import('@/components/blocks/BasicInfo/BasicInfoSetting'))
// const ProfessionalSkill = lazy(() => import('@/components/blocks/ProfessionalSkill/ProfessionalSkill'))
// const ProjectExperience = lazy(() => import('@/components/blocks/ProjectExperience/ProjectExperience'))


export const getPreviewComponent = (schema: TSchema | null): ReactElement | null => {
  if (!schema) return null;

  const { componentKey, props } = schema;
  switch (componentKey) {
    case "BasicInfo":
      return (
        <BasicInfo
          {...props as IBasicInfoProps}
        />
      )
    case "ProfessionalSkill":
      return (
        <ProfessionalSkill
          {...props as IProfessionalSkillProps}
        />
      )
    case "ProjectExperience":
      return (
        <ProjectExperience
          {...props as IProjectExperienceProps}
          blockName={schema.blockName}
        />
      )
    default:
      return null;
  }
}

export const getSettingComponent = (
  schema: TSchema | null,
  handleClose: () => void,
  handleSubmit: (schema: TSchema) => void
): ReactElement | null => {
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
    default:
      return null;
  }
}