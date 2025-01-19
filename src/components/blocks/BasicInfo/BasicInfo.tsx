import React from "react";
import classNames from "classnames";

export interface IBasicInfoProps {
    name: string,
    phone?: string,
    email?: string,
    city?: string,
    weChatId?: string,
    domain?: string,
    jobTitle?: string,
    experience?: string,

    handleBlockClick: () => void,
}

const BasicInfo: React.FC<IBasicInfoProps> = ({
    name,
    phone,
    email,
    city,
    weChatId,
    domain,
    jobTitle,
    experience,

    handleBlockClick,
}) => {

    const shouldShowFirstSubTitle = phone || email || city;
    const shouldShowSecondSubTitle = weChatId || domain;
    const shouldShowThirdSubTitle = experience || jobTitle;

    const firstContent = [phone, email, weChatId].join(' | ')
    const secondContent = [weChatId, domain].join(' | ')
    const thirdContent = [experience, jobTitle].join(' | ')


    return (
        <section
            className={
                classNames(
                    'flex flex-col items-center ',
                    'rounded',
                    'hover:bg-gray-50 hover:cursor-pointer',
                    'border border-dashed border-transparent hover:border-blue-500',
                )
            }
            onClick={handleBlockClick}
        >
            <p className={'font-sans text-base font-semibold'}>{name}</p>

            {shouldShowFirstSubTitle && <p className={'text-xs'}>{firstContent}</p>}
            {shouldShowSecondSubTitle && <p className={'text-xs'}>{secondContent}</p>}
            {shouldShowThirdSubTitle && <p className={'text-xs'}>{thirdContent}</p>}
        </section>
    )
}

export default BasicInfo