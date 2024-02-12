'use client'

import Loader from '@/components/ui/loader'
import React from 'react'

const Loading = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <Loader />
        </div>
    )
}

export default Loading