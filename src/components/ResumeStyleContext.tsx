import useResumeStyle, {context as _ResumeStyleContext} from '@/hooks/useResumeStyle'
import React from "react";


const ResumeStyleContext: React.FC<{
    children: React.ReactElement
}> = ({
          children
      }) => {

    const {
        state,
        dispatch
    } = useResumeStyle();

    return (
        <_ResumeStyleContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </_ResumeStyleContext.Provider>
    )
}

export default ResumeStyleContext