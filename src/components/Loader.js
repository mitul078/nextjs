import React from 'react'

const Loading = () => {
    return (
        <div className="w-full min-h-[20%] flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
    )
}

export default Loading
