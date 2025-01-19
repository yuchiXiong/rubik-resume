import { ERulesItemHtmlType, IBlockSettingRules, ISchema, TSchema } from "@/constants/defaultSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import classNames from "classnames";
import Button from "@/components/primitive/button";
import { IProfessionalSkillProps } from "./ProfessionalSkill";
import { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";


export interface IProfessionalSkillSettingProps {
  schema: ISchema<IProfessionalSkillProps>,
  handleClose: () => void;
  handleSubmit: (schema: TSchema) => void;
}

const PROFESSIONAL_SKILL_SETTING_FORM_SCHEMA: IBlockSettingRules<IProfessionalSkillProps>[] = [
  {
    key: "content",
    label: "姓名",
    required: true,
    htmlType: ERulesItemHtmlType.RichText,
    options: [],
  }
];

const ProfessionalSkillSetting: React.FC<IProfessionalSkillSettingProps> = ({
  schema,
  handleClose,
  handleSubmit,
}) => {

  const {
    handleSubmit: handleReactFormSubmit,
  } = useForm<IProfessionalSkillProps>({
    defaultValues: schema.props
  })
  const onSubmit: SubmitHandler<IProfessionalSkillProps> = (data) => {
    console.log(data, schema, value);
    handleSubmit({
      ...schema,
      props: {
        ...schema.props,
        content: value,
      }
    });
  }

  const [value, setValue] = useState(schema.props.content);

  return (
    <section className='flex flex-1 relative'>
      <Form.Root
        className="flex flex-col flex-1 px-6 py-4"
        onSubmit={handleReactFormSubmit(onSubmit)}
      >
        {PROFESSIONAL_SKILL_SETTING_FORM_SCHEMA.map(rule => (
          <RichTextEditor key={rule.key} value={value} setValue={setValue} />
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

export default ProfessionalSkillSetting;