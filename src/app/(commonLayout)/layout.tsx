import React from 'react'
import { Navbar1 } from '@/components/layout/navbar1'
import { Footer2 } from '@/components/layout/footer2'

export default function CommonLayout(
    { children }: {
        children: React.ReactNode
    }) {
    return (
        <div>
            <Navbar1></Navbar1>
            {children}
            <Footer2></Footer2>
        </div>
    )
}
