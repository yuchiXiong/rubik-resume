import { ERulesItemHtmlType, IBlockSettingRules, ISchema, TSchema } from "@/constants/defaultSchema";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
// import getSettingFormItemComponent from "@/utils/setting-form-item";
import classNames from "classnames";
import Button from "@/components/primitive/button";
import { IProjectExperienceProps } from "./ProjectExperience";
import RichTextEditor from "@/components/RichTextEditor";
import { ReactElement, useState } from "react";

export interface IProjectExperienceSettingProps {
  schema: ISchema<IProjectExperienceProps>,
  schemaInfo: {
    blockId: string;
    subBlockId?: string;
  };
  handleClose: () => void;
  handleSubmit: (schema: TSchema) => void;
}


const BASIC_INFO_SETTING_FORM_SCHEMA: IBlockSettingRules<IProjectExperienceProps['experiences'][number]>[] = [
  {
    key: "projectName",
    label: "项目名称",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "belongsCompany",
    label: "公司",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "startDate",
    label: "开始时间",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "endDate",
    label: "截止时间",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "city",
    label: "所在城市",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "description",
    label: "详情",
    required: false,
    htmlType: ERulesItemHtmlType.RichText,
    options: [],
  },
];

const ProjectExperienceSetting: React.FC<IProjectExperienceSettingProps> = ({
  schema,
  schemaInfo,
  handleClose,
  handleSubmit,
}) => {

  if (!schemaInfo.subBlockId) return null;

  const currentSubBlock = schema.props.experiences[Number(schemaInfo.subBlockId)];

  const {
    control,
    handleSubmit: handleReactFormSubmit,
    formState: { errors }
  } = useForm<IProjectExperienceProps['experiences'][number]>({
    defaultValues: currentSubBlock
  })
  const onSubmit: SubmitHandler<IProjectExperienceProps['experiences'][number]> = (data) => {
    console.log(data)
    handleSubmit({
      ...schema,
      props: {
        ...schema.props,
        experiences: schema.props.experiences.map((item, index) => {
          if (index === Number(schemaInfo.subBlockId)) {
            return {
              ...data,
              description: value,
            };
          }
          return item;
        })
      }
    });
  }

  const [value, setValue] = useState<string>(currentSubBlock.description || '');

  const getFormItem = (field: any, rule: IBlockSettingRules<IProjectExperienceProps['experiences'][number]>): ReactElement | null => {
    return {
      [ERulesItemHtmlType.Input]: <input
        {...field}
        className={
          classNames(
            'border border-solid border-gary-400 focus-visible:outline-0 w-full',
            'rounded',
            'p-2',
            errors[rule.key]?.message && 'border-red-500',
          )
        }
        type="text"
        autoComplete='off'
      />,
      [ERulesItemHtmlType.RichText]: <RichTextEditor key={rule.key} value={value} setValue={setValue} />,
      [ERulesItemHtmlType.Select]: null,
      [ERulesItemHtmlType.Textarea]: null,
    }[rule.htmlType]
  }

  return (
    <section className='flex flex-1 relative'>
      <Form.Root
        className="flex flex-col flex-1 px-6 py-4"
        onSubmit={handleReactFormSubmit(onSubmit)}
      >
        {BASIC_INFO_SETTING_FORM_SCHEMA.map(rule => (
          <Controller
            key={rule.key}
            name={rule.key}
            control={control}
            rules={{
              required: rule.required ? `「${rule.label}」 是必填项` : false
            }}
            render={({ field }) => (
              <Form.Field className="mb-4" name={rule.key}>
                <div
                  className='flex items-center'
                >
                  <Form.Label className="text-base relative">
                    {rule.required &&
                      <span
                        className={rule.required && 'text-red-400 absolute -left-1.5'}
                      >*</span>}
                    <span className='pl-1'>{rule.label}</span>
                  </Form.Label>
                  <Form.Message
                    className={classNames(
                      "ml-auto text-red-500 text-xs",
                      'origin-bottom transition-all',
                      errors[rule.key]?.message ? 'scale-y-1' : 'scale-y-0'
                    )}
                  >
                    {errors[rule.key]?.message}
                  </Form.Message>
                </div>
                <Form.Control asChild>
                  {getFormItem(field, rule)}
                  {/*{getSettingFormItemComponent(rule.htmlType, rule.required, rule.options, field)}*/}
                </Form.Control>
              </Form.Field>
            )}
          />
        ))}
        <div
          className={classNames(
            'w-full p-4',
            'flex items-center border-t border-gray-100 border-solid',
            'absolute left-0 bottom-0'
          )}
        >
          <Button className="ml-auto" type='secondary' onClick={handleClose}>取消</Button>
          <Button className="ml-4" type='primary' htmlType="submit">提交</Button>
        </div>
      </Form.Root>
    </section>
  )
}

export default ProjectExperienceSetting;