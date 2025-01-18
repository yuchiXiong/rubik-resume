import classNames from "classnames";

export interface IProfessionalSkillProps {
    content: string
}

const ProfessionalSkill: React.FC<IProfessionalSkillProps> = ({
    content,
}) => {


    return (
        <section
            className={
                classNames(
                    'flex flex-col ',
                    'px-2',
                    'rounded',
                    'hover:bg-gray-50 hover:cursor-pointer',
                    'border border-dashed border-transparent hover:border-blue-500',
                )
            }
        >
            <p className={
                classNames(
                    'border-b border-solid border-gray-500',
                    'font-semibold',
                    'mb-1'
                )
            }>专业技能</p>
            <div>
                <div className={
                    classNames(
                        'ql-container ql-snow ql-editor',
                        '!border-none !p-0'
                    )
                } dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </section>
    )
}

export default ProfessionalSkill