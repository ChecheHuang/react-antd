import React from 'react'
import Form from './components/Form'
import { cn } from '@/lib/utils'
import { Image } from 'antd'

const Login: React.FC = () => {
  return (
    <div
      className={cn(
        'flex h-screen w-screen items-center justify-center bg-cover bg-no-repeat',
        'bg-[url("https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")]'
      )}
    >
      <div className=" flex h-2/3 w-1/2 items-center justify-center bg-black  bg-opacity-50 shadow-md">
        <div className="text-center">
          <Image
            width="100px"
            preview={false}
            src="https://www.brandinlabs.com/wp-content/uploads/2014/11/Pizza_Hut_logo.svg_.png"
            alt=""
          />
          <h1 className="py-1 pb-2 text-3xl text-white">React+Antd</h1>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default Login
