import React, { useState } from 'react'
import ProcessScreen from './ProgressScreen'

export default function ScoreScreen({ boosterScore, habitatorScore, navigatorScore, wranglerScore, secondsForRound, onNextRoundClick, currentStage, totalCash, cashFromRound, ready }) {
  const [showProgress, setShowProgress] = useState(false)
  const minutes = (secondsForRound / 60).toFixed(0)
  let seconds = (secondsForRound % 60).toFixed(0)
  if (seconds.length === 1) seconds = "0" + seconds

  if (showProgress) {
    return (
      <ProcessScreen currentStage={currentStage}>
        <p><button onClick={() => setShowProgress(false)} type="button" className="text" name="input">Show Scores</button></p>
      </ProcessScreen>
    )
  }

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
      <dl className="list_score">
        <dt>Cash Earned</dt>
        <dd>+${cashFromRound}</dd>
        <dt>Total Cash</dt>
        <dd>${totalCash}</dd>
      </dl>
      <p>
        { 
          ready &&
          <button onClick={() => {}} type="button" className="text" name="input">Waiting on other players</button>
        }
        {
          !ready &&
          <button onClick={onNextRoundClick} type="button" className="text" name="input">Next round</button>
        }
      </p>
    </main>
  )
}
