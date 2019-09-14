import React from 'react'

export default function ScoreScreen({ boosterScore, habitatorScore, navigatorScore, wranglerScore, onNextRoundClick }) {
  return (
    <main id="screen_score">
      <dl class="list_score">
        <dt>Time</dt>
        <dd>1:33</dd>
      </dl>
      <dl class="list_score">
        <dt>Navigator</dt>
        <dd class="percent">{navigatorScore}</dd>
        <dt>Wrangler</dt>
        <dd class="percent">{wranglerScore}</dd>
        <dt>Booster</dt>
        <dd class="percent">{boosterScore}</dd>
        <dt>Habitator</dt>
        <dd class="percent">{habitatorScore}</dd>
      </dl>
      <h2>CASH</h2>
      <p>$165,987,000</p>
      <button onClick={onNextRoundClick}>Next round!!!!</button>
    </main>
  )
}