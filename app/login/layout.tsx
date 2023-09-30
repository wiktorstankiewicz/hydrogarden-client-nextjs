"use client"
import React from 'react'

type Props = {}

function Layout({children}: {children: React.ReactNode}) {
  return (
    <div>
        {children}
    </div>
  )
}

export default Layout