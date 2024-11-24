const mm2Px = 3.7795275591;

export const A4_HEIGHT = '297mm';
export const A4_WIDTH = '210mm';

const getPageHeightByA4 = (): number => {
    return Number(A4_HEIGHT.split('mm')[0]) * mm2Px;
}

export {
    getPageHeightByA4
}