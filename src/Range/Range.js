import React, { useState, useEffect } from 'react'

export default function Range({ onValueChange }) {
  const [value, setValue] = useState(50)
  const [greenZone, setGreenZone] = useState(50)
  const [gameLoop, setGameLoop] = useState(null)

  function getGreenZone() { return greenZone }

  useEffect(() => {
    if (gameLoop) {
      window.clearInterval(gameLoop)
      setGameLoop(null)
    } else {
      setGameLoop(window.setInterval(function () {
        let updatedGreenZone = getGreenZone() + Math.random() * 10
        setGreenZone(updatedGreenZone)
      }, 1000))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form id="module_range" className="module" action="#ranged">
      <div className="row">
        <div className="column">
          <button type="button" onClick={() => setValue(value-1)}>UP</button>
          <div className="range_container">
            <div className="green_zone" style={ { top: `${greenZone}%` } } />
            <input className="field_range" type="range" min="0" max="100" value={value} />
          </div>
          <button type="button" onClick={() => setValue(value+1)}>DOWN</button>
        </div>
      </div>
    </form>
  )
}