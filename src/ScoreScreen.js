import React from 'react'

export default function ScoreScreen({ boosterScore, habitatorScore, navigatorScore, wranglerScore, secondsForRound, onNextRoundClick, cash }) {
  const minutes = (secondsForRound / 60).toFixed(0)
  let seconds = (secondsForRound % 60).toFixed(0)
  if (seconds.length === 1) seconds = "0" + seconds

  return (
    <main id="screen_score">
      <dl className="list_score">
        <dt>Time</dt>
        <dd>{minutes}:{seconds}</dd>
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
      <p>${cash}</p>
      <p><button onClick={onNextRoundClick} type="button" className="text" name="input">Next round</button></p>
    </main>
  )
}
