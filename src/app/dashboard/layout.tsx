import React, { Children } from 'react'
import Sidebar from '@/components/layout/Sidebar'
const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed h-full">
        <Sidebar></Sidebar>
      </div >
      <div className="flex-1 ml-64 p-6">
        {children}
      </div>
    </div>
  )
}

export default layout