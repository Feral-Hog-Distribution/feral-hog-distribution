import * as Colyseus from "colyseus.js";

import React from 'react'
import './Game.scss'

import { LocalServer, ProductionServer, lifeSupport, navigator, wrangler, booster } from "../Constants"

import Boop from '../Boop/Boop'
import RoleDescription from "../RoleDescription";
import ScoreScreen from "../ScoreScreen";
import Header from "../Header";

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
      additionalCash: 0,
      cash: 0
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

    const client = new Colyseus.Client(process.env.NODE_ENV === "production" ? ProductionServer : LocalServer);
    client.joinOrCreate("feral-hog-distribution").then(room => {
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
    const { roleId, stage, betweenRounds, totalBoopsRequired, secondsForLastRound, cash, additionalCash } = this.state
    if (betweenRounds) {
      return (
        <ScoreScreen
          secondsForRound={secondsForLastRound}
          habitatorScore={this.yourScore(lifeSupport)}
          boosterScore={this.yourScore(booster)}
          wranglerScore={this.yourScore(wrangler)}
          navigatorScore={this.yourScore(navigator)}
          additionalCash={additionalCash}
          cash={cash}
          currentStage={stage}
          onNextRoundClick={this.nextRound}
        />
      )
    } else {
      return (
        <RoleDescription roleId={roleId} >
          <p>You are on stage: {stage}</p>
          <p>Your team has performed {this.totalBoops()} boops</p>
          <p>You want to reach {totalBoopsRequired} boops</p>
          {/* <p>You have {this.yourBoops()} boops</p> */}
          <Boop onBoop={(value) => this.updateBoops(value)} />
        </RoleDescription>
      )
    }
  }

  // Role select?
  render() {
    return (
      <>
        <Header />
        {this.renderScreen()}
      </>
    )
  }
}
