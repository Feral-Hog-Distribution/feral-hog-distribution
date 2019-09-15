import * as Colyseus from "colyseus.js";

import React from 'react'

import { LocalServer, ProductionServer, lifeSupport, navigator, wrangler, booster } from "../Constants"

import Boop from '../Boop/Boop'
import Target from '../Target/Target'
import RoleDescription from "../RoleDescription";
import ScoreScreen from "../ScoreScreen";
import Header from "../Header";
import ProcessScreen from "../ProgressScreen";

export default class Game extends React.Component {
  defaultRoleShape = () => {
    return {
      id: null,
      name: null,
      boops: 0,
    }
  }

  defaultState = () => {
    return {
      room: null,
      [booster]: this.defaultRoleShape(),
      [navigator]: this.defaultRoleShape(),
      [wrangler]:  this.defaultRoleShape(),
      [lifeSupport]: this.defaultRoleShape(),
      stage: null,
      roleId: null,
      roleName: null,
      betweenRounds: null,
      totalBoopsRequired: null,
      secondsForLastRound: null,
      multiplier: 100,
      cashFromRound: 0,
      totalCash: 0,
      viewer: true,
      currentBoopsThisRound: 0,
    }
  }

  state = this.defaultState()

  updateBoops(value = 1) {
    this.state.room.send({ command: this.state.roleId, value: value });
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

    const client = new Colyseus.Client(process.env.NODE_ENV === "production" ? ProductionServer : LocalServer);
    client.joinOrCreate("feral-hog-distribution", { joinAsViewer }).then(room => {
      setState({ room })

      // set player role and name
      room.state.zones.onChange = function(update, sessionId) {
        if (update.clientId === sessionId)
          setState({ roleId: update.id, roleName: update.name })
      }

      room.state.onChange = (changes) => {
        const stateChanges = {}
        changes.forEach(change => {
          stateChanges[change.field] = change.value
        });
        setState(stateChanges)
      }
    })
  }

  yourBoops() {
    const yourRole = this.state[this.state.roleId]
    if (!yourRole) return null

    return yourRole.boops
  }

  totalBoops() {
    const { booster, navigator, wrangler, lifeSupport } = this.state
    return booster.boops + navigator.boops + wrangler.boops + lifeSupport.boops
  }

  getRole(roleId) {
    return this.state[roleId]
  }

  yourScore(roleId) {
    if (this.totalBoops() === 0) return "0"

    return (this.getRole(roleId).boops/this.totalBoops()*100).toFixed(0)
  }

  renderScreen() {
    const { roleId, stage, betweenRounds, totalBoopsRequired, secondsForLastRound, totalCash, cashFromRound, viewer, currentBoopsThisRound } = this.state
    if (viewer) {
      return (
        <ProcessScreen currentStage={stage-1}>
          <p>Your team has performed {currentBoopsThisRound} boops</p>
          <p>You want to reach {totalBoopsRequired} boops</p>
        </ProcessScreen>
      )
    } else if (betweenRounds) {
      return (
        <ScoreScreen
          secondsForRound={secondsForLastRound}
          habitatorScore={this.yourScore(lifeSupport)}
          boosterScore={this.yourScore(booster)}
          wranglerScore={this.yourScore(wrangler)}
          navigatorScore={this.yourScore(navigator)}
          cashFromRound={cashFromRound}
          totalCash={totalCash}
          currentStage={stage-1}
          onNextRoundClick={this.nextRound}
        />
      )
    } else {
      return (
        <Target onTargetSuccess={(value) => this.updateBoops(value)} />
        // <RoleDescription roleId={roleId} >
        //   <p>Your team has performed {currentBoopsThisRound} boops</p>
        //   <p>You want to reach {totalBoopsRequired} boops</p>
        //   {/* <p>You have {this.yourBoops()} boops</p> */}
        //   {/* <Boop onBoop={(value) => this.updateBoops(value)} /> */}
          
        // </RoleDescription>
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
