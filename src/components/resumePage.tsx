import {A4_HEIGHT, A4_WIDTH} from "@/utils/page";
import classNames from "classnames";
import {getPreviewComponent} from "@/utils/blocks";
import {TScheme} from "@/constants/mockSchema";
import {useSelector} from "@/hooks/useResumeStyle";

export interface IResumePageProps {
    blockList: TScheme[]
    handleOpenSettingDrawer: (scheme: TScheme) => void
}

const ResumePage = ({
                        blockList,
                        handleOpenSettingDrawer,
                    }: IResumePageProps) => {

    /** 板块间的间距 */
    const blockGap = useSelector(store => store.blockGap)

    return (
        <section
            style={{
                gap: blockGap,
                width: A4_WIDTH,
                height: A4_HEIGHT
            }}
            className={
                classNames(
                    // 'w-8/12 h-max',
                    'flex flex-col overflow-hidden',
                    'px-12 py-8 mb-4',
                    'bg-white',
                    "rounded",
                )
            }
        >
            {blockList.map((item) => (
                <div
                    id={`block-${item.id}`}
                    key={item.id}
                    onClick={() => handleOpenSettingDrawer(item)}
                >
                    {getPreviewComponent(item)}
                </div>
            ))}
        </section>
    )
}

export default ResumePage;