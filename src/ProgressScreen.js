import React from 'react'

import Map from './Assets/Map'

export default function ProcessScreen({ currentStage, children }) {
  return (
    <main id="screen_progress" >
      <Map currentStage={currentStage} />
      {children}
    </main>
  )

}