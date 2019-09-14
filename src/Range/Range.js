import React from 'react'

export default function Range({ onValueChange }) {
  return (
    <form id="module_range" className="module" action="#ranged">
      <div className="row">
        <div className="column">
          <button type="button" name="input" value="-1">UP</button>
          <div className="range_container">
            <input className="field_range" type="range" min="0" max="100" />
          </div>
          <button type="button" name="input" value="1">DOWN</button>
        </div>
      </div>
    </form>
  )
}