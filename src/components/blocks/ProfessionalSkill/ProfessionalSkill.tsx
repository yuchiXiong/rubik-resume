import classNames from "classnames";

export interface IProfessionalSkillProps {
    list: string[]
}

const ProfessionalSkill: React.FC<IProfessionalSkillProps> = ({
                                                                  list,
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
            <ul className={
                classNames(
                    'list-disc',
                    'pl-4'
                )
            }>
                {list.map((item, index) => (
                    <li key={index} className={classNames(
                        'text-xs text-gray-800'
                    )}>{item}</li>
                ))}
            </ul>
        </section>
    )
}

export default ProfessionalSkill