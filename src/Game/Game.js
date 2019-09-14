import * as Colyseus from "colyseus.js";

import React from 'react'
import './Game.scss'

import { LocalServer, ProductionServer } from "../Constants"
import { findValue, findHealthForRole } from '../Helpers'

import Boop from '../Boop/Boop'

const booster = "booster"
const navigator = "navigator"
const wrangler = "wrangler"
const lifeSupport = "lifeSupport"


export default class Game extends React.Component {
  defaultState = () => {
    return {
      room: null,
      [booster]: null,
      [navigator]: null,
      [wrangler]: null,
      [lifeSupport]: null,
      stage: null,
      role: null,
      roleName: null,
    }
  }

  state = this.defaultState()

  setHealthOf(role, value) {
    this.setState({ [role]: value })
  }

  updateHealthOf(roleId, value) {
    this.state.room.send({ command: roleId, value: value });
  }

  resetGame = () => {
    this.state.room.send({ command: "resetGame" })
  }

  componentDidMount() {
    const setState = (...state) => this.setState(...state)

    const client = new Colyseus.Client(process.env.NODE_ENV === "production" ? ProductionServer : LocalServer); 
    client.joinOrCreate("feral-hog-distribution").then(room => {
      setState({ room })

      // set player role and name
      room.state.zones.onChange = function(update, sessionId) {
        if (update.clientId === sessionId) setState({ role: update.id, roleName: update.name })
      }

      room.state.onChange = (updates) => {
        if (findValue(updates, "stage") != null) setState({ stage: findValue(updates, "stage") })
        if (findValue(updates, booster) != null) setState({ [booster]: findHealthForRole(updates, booster) })
        if (findValue(updates, navigator) != null) setState({ [navigator]: findHealthForRole(updates, navigator) })
        if (findValue(updates, wrangler) != null) setState({ [wrangler]: findHealthForRole(updates, wrangler) })
        if (findValue(updates, lifeSupport) != null) setState({ [lifeSupport]: findHealthForRole(updates, lifeSupport) })
      }
    })
  }

  yourHealth() {
    return this.state[this.state.role]
  }

  totalHealth() {
    const { booster, navigator, wrangler, lifeSupport } = this.state
    return booster + navigator + wrangler + lifeSupport
  }

  // Role select?
  render() {
    const { role, roleName, stage } = this.state
    const won = stage > 0
    return (
      <div id="game">
        { 
          !won && <>
            <p>You are on stage: {stage}</p>
            <p>Your team has performed {this.totalHealth()} boops</p>
            <p>You are: {roleName}</p>
            <p>Your have {this.yourHealth()} boops</p>
            <Boop onBoop={(value) => this.updateHealthOf(role, value)} />
          </>
        }
        {
          won && <>
          <h1>YOU WIN!</h1>
          <button onClick={this.resetGame}>Reset</button>
          </>
        }
      </div>
    )
  }
}