import { InfoBlock } from '@/shared/components/shared/molecules/InfoBlock'
import React from 'react'

const UnauthorizedPage = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <InfoBlock
        title='Access is forbidden'
        text='This page is only allowed for authorized users'
        imageUrl='lock.png'
      />
    </div>
  )
}

export default UnauthorizedPage
