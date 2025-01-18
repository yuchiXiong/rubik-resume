import {TSchema} from '@/constants/defaultSchema'
import {MutableRefObject, useEffect, useState} from "react";
import {getPageHeightByA4} from "@/utils/page";
import {sleep} from "@/utils/sleep";

export interface IUseSplitPageBySchemaParams {
    schemaList: TSchema[],
    containerRef: MutableRefObject<HTMLDivElement | null>
}

const useSplitPageBySchema = (
    params: IUseSplitPageBySchemaParams
) => {
    const A4_HEIGHT = getPageHeightByA4();

    const {schemaList, containerRef} = params;

    const [splitInfo, setSplitInfo] = useState<string[][]>([
        schemaList.map(i => `#block-${i.id}`)
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

            schemaList.forEach((schema) => {
                const id = `#block-${schema.id}`;
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


    }, [schemaList])

    return splitInfo;
}

export default useSplitPageBySchema