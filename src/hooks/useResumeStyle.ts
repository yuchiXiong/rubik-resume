import {createContext, useContext, useReducer} from "react";

const DEFAULT_FONT_SIZE = 13;

/** 同一个类型的板块间的上下间距 */
const BLOCK_ITEM_GAP = 10;
/** 不同类型板块间的上下间距 */
const BLOCK_GAP = BLOCK_ITEM_GAP * 1.5;


export interface IResumeStyle {
    fontSize: number;
    blockGap: number;
    blockItemGap: number;
}

export enum IResumeStyleReducerActionTypes {
    UPDATE_FONT_SIZE = 0,
    UPDATE_BLOCK_GAP = 1,
    UPDATE_BLOCK_ITEM_GAP = 2,
}

export interface IResumeStyleReducerAction {
    type: IResumeStyleReducerActionTypes,
    data: IResumeStyle
}

const initStyle = {
    fontSize: DEFAULT_FONT_SIZE,
    blockGap: BLOCK_GAP,
    blockItemGap: BLOCK_ITEM_GAP
}

export const context = createContext({
    state: initStyle,
    dispatch: {
        updateFontSize: (fontSize: number) => {
            console.log(`Not implement! fontSize=${fontSize}`)
        },
        updateBlockGap: (blockGap: number) => {
            console.log(`Not implement! blockGap=${blockGap}`)
        },
        updateBlockItemGap: (blockItemGap: number) => {
            console.log(`Not implement! blockItemGap=${blockItemGap}`)
        },
    }
})

const useResumeStyle = () => {

    const [resumeStyle, dispatch] = useReducer((state: IResumeStyle, action: IResumeStyleReducerAction) => {
        switch (action.type) {
            case IResumeStyleReducerActionTypes.UPDATE_FONT_SIZE:
                return {
                    ...state,
                    fontSize: action.data.fontSize,
                };
            case IResumeStyleReducerActionTypes.UPDATE_BLOCK_GAP:
                return {
                    ...state,
                    blockGap: action.data.blockGap,
                }
            case IResumeStyleReducerActionTypes.UPDATE_BLOCK_ITEM_GAP:
                return {
                    ...state,
                    blockItemGap: action.data.blockItemGap,
                }
            default:
                return state;
        }
    }, initStyle)

    return {
        state: resumeStyle,
        dispatch: {
            updateFontSize: (fontSize: number) => dispatch({
                type: IResumeStyleReducerActionTypes.UPDATE_FONT_SIZE,
                data: {...resumeStyle, fontSize}
            }),
            updateBlockGap: (blockGap: number) => {
                dispatch({
                    type: IResumeStyleReducerActionTypes.UPDATE_BLOCK_GAP,
                    data: {...resumeStyle, blockGap: blockGap === 0 ? BLOCK_GAP : blockGap}
                })
            },
            updateBlockItemGap: (blockItemGap: number) => dispatch({
                type: IResumeStyleReducerActionTypes.UPDATE_BLOCK_ITEM_GAP,
                data: {...resumeStyle, blockItemGap}
            }),
        }
    }
}

export const useSelector = <T>(callback: (store: IResumeStyle) => T) => {
    const _context = useContext(context)

    return callback(_context.state);
}

export const useDispatch = () => {
    const _context = useContext(context)

    return _context.dispatch
}


export default useResumeStyle;