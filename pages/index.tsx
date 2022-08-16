import { Switch } from '@mui/material'
import { useContext, useState } from 'react'
import RPCHead from '../components/RPCHead'
import { ColorModeContext } from '../lib/theme'
import Image from 'next/image'
import FrontChurchPicture from '../public/church-outside.jpg'


export default function Home() {

  return (
    <div>
      <RPCHead title="RPC of Atlanta" />
      <main>
        <Image
          src={FrontChurchPicture}
          alt="Church Photo"
          // width={500}
          // height={500}
        />
      </main>
    </div>
  )
}