import classNames from "classnames";
import { useSelector } from "@/hooks/useResumeStyle";

export interface IProjectExperience {
    projectName: string;
    belongsCompany?: string;
    startDate?: string;
    endDate?: string;
    city?: string;
    description?: string;
    content?: string[];
}

export interface IProjectExperienceProps {
    blockName: string;
    experiences: IProjectExperience[]
}

const ProjectExperience: React.FC<IProjectExperienceProps> = ({
    blockName,
    experiences,
}) => {

    const {
        fontSize,
        blockItemGap
    } = useSelector(store => ({
        fontSize: store.fontSize,
        blockItemGap: store.blockItemGap
    }))

    return (
        <section
            className={
                classNames(
                    'flex flex-col ',
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
                    'px-2 mb-1'
                )
            }>{blockName}</p>
            <div
                className="flex flex-col"
                style={{
                    gap: blockItemGap
                }}
            >
                {experiences.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            fontSize,
                        }}
                        className={classNames(
                            'text-sm text-gray-800',
                            'px-2',
                            'border border-dashed border-transparent hover:border-red-800',
                        )}
                    >
                        {/* 项目名 - 时间 */}
                        <p className='flex items-center'>
                            <span style={{ fontSize: fontSize + 2 }} className='font-semibold'>{item.projectName}</span>
                            <span className={'ml-auto'}>{item.startDate} - {item.endDate}</span>
                        </p>
                        {/* 公司 - 地址   */}
                        <p className='flex items-center'>
                            <span>{item.belongsCompany}</span>
                            <span className={'ml-auto'}>{item.city}</span>
                        </p>
                        <p>{item.description}</p>
                        <ul className='pl-4'>
                            {item.content?.map((item, index) => (
                                <li className='list-disc' key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProjectExperience