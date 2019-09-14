import React from 'react'

import MagSvg from './Assets/map.svg'

export default function ProcessScreen({ currentStage }) {
  return (
    <main id="screen_progress" data-current-stage={currentStage}>
      <img src={MagSvg} alt={"You are on stage " + currentStage} />
    </main>
  )

}