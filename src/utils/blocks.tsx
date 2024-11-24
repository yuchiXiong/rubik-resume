import {IScheme, TScheme} from "@/constants/mockSchema";
import {lazy, ReactElement} from "react";
import {IBasicInfoProps} from "@/components/blocks/BasicInfo/BasicInfo";
import {IProfessionalSkillProps} from "@/components/blocks/ProfessionalSkill/ProfessionalSkill";
import {IProjectExperienceProps} from "@/components/blocks/ProjectExperience/ProjectExperience";

// 展示组件
const BasicInfo = lazy(() => import('@/components/blocks/BasicInfo/BasicInfo'))
const ProfessionalSkill = lazy(() => import('@/components/blocks/ProfessionalSkill/ProfessionalSkill'))
const ProjectExperience = lazy(() => import('@/components/blocks/ProjectExperience/ProjectExperience'))

// 展示组件对应的设置组件
const BasicInfoSetting = lazy(() => import('@/components/blocks/BasicInfo/BasicInfoSetting'))
// const ProfessionalSkill = lazy(() => import('@/components/blocks/ProfessionalSkill/ProfessionalSkill'))
// const ProjectExperience = lazy(() => import('@/components/blocks/ProjectExperience/ProjectExperience'))


export const getPreviewComponent = (scheme: TScheme | null): ReactElement | null => {
    if (!scheme) return null;

    const {componentKey, props} = scheme;
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
                    blockName={scheme.blockName}
                />
            )
        default:
            return null;
    }
}

export const getSettingComponent = (
    scheme: TScheme | null,
    handleClose: () => void,
    handleSubmit: (scheme: TScheme) => void
): ReactElement | null => {
    if (!scheme) return null;

    const {componentKey} = scheme;
    switch (componentKey) {
        case 'BasicInfo':
            return (
                <BasicInfoSetting
                    scheme={scheme as IScheme<IBasicInfoProps>}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                />
            )
        default:
            return null;
    }
}