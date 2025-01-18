import { ERulesItemHtmlType, IBlockSettingRules, ISchema, TSchema } from "@/constants/defaultSchema";
import { IBasicInfoProps } from "@/components/blocks/BasicInfo/BasicInfo";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
// import getSettingFormItemComponent from "@/utils/setting-form-item";
import classNames from "classnames";
import Button from "@/components/primitive/button";

export interface IBasicInfoSettingProps {
  schema: ISchema<IBasicInfoProps>,
  handleClose: () => void;
  handleSubmit: (schema: TSchema) => void;
}

const BASIC_INFO_SETTING_FORM_SCHEMA: IBlockSettingRules<IBasicInfoProps>[] = [
  {
    key: "name",
    label: "姓名",
    required: true,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "phone",
    label: "电话",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "email",
    label: "邮箱",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "city",
    label: "现居城市",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "weChatId",
    label: "微信",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "domain",
    label: "个人网站",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "jobTitle",
    label: "期望职位",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
  {
    key: "experience",
    label: "当前状态",
    required: false,
    htmlType: ERulesItemHtmlType.Input,
    options: [],
  },
];

const BasicInfoSetting: React.FC<IBasicInfoSettingProps> = ({
  schema,
  handleClose,
  handleSubmit,
}) => {

  const {
    control,
    handleSubmit: handleReactFormSubmit,
    formState: { errors }
  } = useForm<IBasicInfoProps>({
    defaultValues: schema.props
  })
  const onSubmit: SubmitHandler<IBasicInfoProps> = (data) => {
    handleSubmit({
      ...schema,
      props: data
    });
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
                  {rule.htmlType === ERulesItemHtmlType.Input && (
                    <input
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
                    />
                  )}
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

export default BasicInfoSetting;