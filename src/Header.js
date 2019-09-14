import React from 'react'

import LogoSvg from './Assets/logo.svg'

export default function Header() {
  return (
    <header>
      <img src={LogoSvg} alt="Game logo" />
    </header>
  )
}