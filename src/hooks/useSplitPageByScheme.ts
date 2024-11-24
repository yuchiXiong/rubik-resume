import {TScheme} from '@/constants/mockSchema'
import {MutableRefObject, useEffect, useState} from "react";
import {getPageHeightByA4} from "@/utils/page";
import {sleep} from "@/utils/sleep";

export interface IUseSplitPageBySchemeParams {
    schemeList: TScheme[],
    containerRef: MutableRefObject<HTMLDivElement | null>
}

const useSplitPageByScheme = (
    params: IUseSplitPageBySchemeParams
) => {
    const A4_HEIGHT = getPageHeightByA4();

    const {schemeList, containerRef} = params;

    const [splitInfo, setSplitInfo] = useState<string[][]>([
        schemeList.map(i => `#block-${i.id}`)
    ])

    useEffect(() => {
        if (!containerRef.current) return;

        sleep(0).then(() => {
            const _splitInfo: string[][] = [
                [],
            ];
            const container = containerRef.current as HTMLDivElement;

            let restHeight = A4_HEIGHT;
            let currentPage = 0;

            schemeList.forEach((scheme) => {
                const id = `#block-${scheme.id}`;
                const currentDom = container.querySelector(id);
                const currentDomHeight = currentDom?.clientHeight || 0;

                if (currentDomHeight > restHeight) {
                    restHeight = A4_HEIGHT;
                    currentPage += 1;
                    _splitInfo[currentPage] = [id];
                } else {
                    restHeight = restHeight - currentDomHeight;
                    _splitInfo[currentPage].push(id);
                }
            })

            setSplitInfo(_splitInfo);
        })


    }, [schemeList])

    return splitInfo;
}

export default useSplitPageByScheme