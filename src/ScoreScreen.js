import React from 'react'

export default function ScoreScreen({ boosterScore, habitatorScore, navigatorScore, wranglerScore, onNextRoundClick }) {
  return (
    <main id="screen_score">
      <dl className="list_score">
        <dt>Time</dt>
        <dd>1:33</dd>
      </dl>
      <dl className="list_score">
        <dt>Navigator</dt>
        <dd className="percent">{navigatorScore}</dd>
        <dt>Wrangler</dt>
        <dd className="percent">{wranglerScore}</dd>
        <dt>Booster</dt>
        <dd className="percent">{boosterScore}</dd>
        <dt>Habitator</dt>
        <dd className="percent">{habitatorScore}</dd>
      </dl>
      <h2>CASH</h2>
      <p>$165,987,000</p>
      <button onClick={onNextRoundClick}>Next round!!!!</button>
    </main>
  )
}