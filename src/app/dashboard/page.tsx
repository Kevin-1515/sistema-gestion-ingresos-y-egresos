import React from 'react'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div className='flex justify-between items-center h-screen '>
        <Button className='w-100 py-26 text-lg'>Sistema de gestion deingresos y egresos</Button>
        <Button className='w-100 py-26 text-lg'>Gestion de usuarios</Button>
        <Button className='w-100 py-26 text-lg'>Reportes</Button>
    </div>
  )
}

export default page