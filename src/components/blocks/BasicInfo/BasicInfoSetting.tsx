import {ERulesItemHtmlType, IScheme, TScheme} from "@/constants/mockSchema";
import {IBasicInfoProps} from "@/components/blocks/BasicInfo/BasicInfo";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import * as Form from "@radix-ui/react-form";
// import getSettingFormItemComponent from "@/utils/setting-form-item";
import classNames from "classnames";

export interface IBasicInfoSettingProps {
    scheme: IScheme<IBasicInfoProps>,
    handleClose: () => void;
    handleSubmit: (scheme: TScheme) => void;
}

const BasicInfoSetting: React.FC<IBasicInfoSettingProps> = ({
                                                                scheme,
                                                                handleClose,
                                                                handleSubmit,
                                                            }) => {

    const {
        control,
        handleSubmit: handleReactFormSubmit,
        formState: {errors}
    } = useForm<IBasicInfoProps>({
        defaultValues: scheme.props
    })
    const onSubmit: SubmitHandler<IBasicInfoProps> = (data) => {
        console.log(data)
        handleSubmit({
            ...scheme,
            props: data
        });
    }


    return (
        <section className='flex flex-1 relative'>
            <Form.Root
                className="flex flex-col flex-1 px-6 py-4"
                onSubmit={handleReactFormSubmit(onSubmit)}
            >
                {(scheme.rules || []).map(rule => (
                    <Controller
                        key={rule.key}
                        name={rule.key}
                        control={control}
                        rules={{
                            required: rule.required ? `「${rule.label}」 是必填项` : false
                        }}
                        render={({field}) => (
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
                    <button
                        className='w-max bg-gray-300 text-white rounded px-4 py-1 cursor-pointer ml-auto mr-4'
                        type="submit"
                        onClick={handleClose}
                    >取消
                    </button>
                    <input
                        className='w-max bg-green-600 text-white rounded px-4 py-1 cursor-pointer'
                        type='submit'
                    />
                </div>
            </Form.Root>
        </section>
    )
}

export default BasicInfoSetting;