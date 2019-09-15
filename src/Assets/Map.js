import React from 'react'

export default function Map({ currentStage }) {
  return (
    <svg data-current-stage={currentStage} viewBox="-20 -20 807 300" xmlns="http://www.w3.org/2000/svg">
      <path d="M5,224.5 L122,78 L301.5,127 L262.5,203.5 L449.5,127 L301.5,47.5 L347,4 L427,78 L529.5,16.5 L598,179 L783,152" stroke="#24B3E6" strokeWidth="2" strokeDasharray="8" fill="none"></path>
      <circle data-stage="0" cx="4" cy="225" r="4"></circle>
      <circle data-stage="1" cx="122" cy="78" r="4"></circle>
      <circle data-stage="2" cx="300" cy="127" r="4"></circle>
      <circle data-stage="3" cx="262" cy="206" r="4"></circle>
      <circle data-stage="4" cx="451" cy="127" r="4"></circle>
      <circle data-stage="5" cx="300" cy="47" r="4"></circle>
      <circle data-stage="6" cx="347" cy="4" r="4"></circle>
      <circle data-stage="7" cx="427" cy="78" r="4"></circle>
      <circle data-stage="8" cx="530" cy="16" r="4"></circle>
      <circle data-stage="9" cx="598" cy="179" r="4"></circle>
      <circle data-stage="10" cx="783" cy="151" r="4"></circle>
    </svg>
  )
}