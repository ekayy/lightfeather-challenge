import React, { useEffect } from 'react'

import ky from 'ky'

import './styles/tailwind.css'
import './styles/global.css'

import NotificationForm from './modules/NotificationForm'

async function getHealth() {
  const json = await ky.get('http://localhost:8888/api/health').json()

  console.log(json)
}

export default function App() {
  useEffect(() => {
    getHealth()
  })

  return <NotificationForm />
}
