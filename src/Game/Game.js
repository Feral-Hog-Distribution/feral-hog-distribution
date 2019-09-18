import * as Colyseus from "colyseus.js";

import React from 'react'

import { Server } from "../Constants"

import Boop from '../Boop/Boop'
// import Target from '../Target'
import RoleDescription from "../RoleDescription";
import ScoreScreen from "../ScoreScreen";
import Header from "../Header";
import ProcessScreen from "../ProgressScreen";

export default class Game extends React.Component {
  defaultState = () => {
    return {
      sessionId: null,
      room: null,
      roles: {},
      playerIds: [],
      stage: 0,
      betweenRounds: false,
      boopsRequireCurrentRound: 0,
      secondsFormLastRound: null,
      boopsToGo: null,
      roundBoops: null,
      totalBoops: null,
      cashFromRound: 0,
      totalCash: 0,
      viewer: true,
    }
  }

  state = this.defaultState()

  updateBoops(value = 1) {
    this.state.room.send({ command: "updateBoops", value: value });
  }

  resetGame = () => {
    this.state.room.send({ command: "resetGame" })
  }

  nextRound = () => {
    this.state.room.send({ command: "nextRound" })
  }

  componentDidMount() {
    const setState = (...state) => this.setState(...state)

    let params = (new URL(document.location)).searchParams;
    const joinAsViewer = params.has("viewer");
    this.setState({ viewer: joinAsViewer })

    const client = new Colyseus.Client(Server);
    client.joinOrCreate("feral-hog-distribution", { joinAsViewer }).then(room => {
      setState({ room, sessionId: room.sessionId })

      room.state.roles.onChange = function(update, sessionId) {
        if (update.clientId === sessionId) {
          setState({ roleId: update.id, roleName: update.name })
        }
      }

      room.state.onChange = (changes) => {
        const stateChanges = {}
        changes.forEach(change => {
          stateChanges[change.field] = change.value
        });
        setState(stateChanges)
        console.log(stateChanges)
      }
    })
  }

  getRole(sessionId = this.state.sessionId) {
    return this.state.roles[sessionId]
  }

  getBoops(sessionId = this.state.sessionId) {
    const role = this.getRole(sessionId)
    if (!role) return null

    return role.roundBoops
  }

  getScore(sessionId) {
    if (this.state.roundBoops === 0) return "0"

    return (this.getRole(sessionId).roundBoops/this.state.boopsRequiredCurrentRound*100).toFixed(0)
  }

  scoresArray() {
    return this.state.playerIds.map(playerId => {
      return {
        name: this.getRole(playerId).name,
        score: this.getScore(playerId)
      }
    })
  }

  renderScreen() {
    const { room, stage, betweenRounds, secondsForLastRound, totalCash, cashFromRound, viewer, boopsToGo, sessionId } = this.state
    const role = this.getRole(sessionId)
    const readyForNextRound = role ? role.readyToPlay : false
    if (!room) {
      return <p>Loading...</p>
    } else if (viewer) {
      return (
        <ProcessScreen currentStage={stage-1}>
          <span className="display_number">{boopsToGo}</span>
        </ProcessScreen>
      )
    } else if (betweenRounds) {
      return (
        <ScoreScreen
          secondsForRound={secondsForLastRound}
          scores={this.scoresArray()}
          cashFromRound={cashFromRound}
          totalCash={totalCash}
          currentStage={stage-1}
          onNextRoundClick={this.nextRound}
          ready={readyForNextRound}
        />
      )
    } else {
      return (
        <RoleDescription role={role} >
          <span className="display_number">{boopsToGo}</span>
          {/* <p>You have {this.yourBoops()} boops</p> */}
          <Boop onBoop={(value) => this.updateBoops(value)} />
          {/* <Target onTargetSuccess={(value) => this.updateBoops(value)} /> */}
        </RoleDescription>
      )
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderScreen()}
      </>
    )
  }
}
