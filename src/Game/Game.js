import * as Colyseus from "colyseus.js";

import React from 'react'
import './Game.scss'

import { LocalServer, ProductionServer } from "../Constants"
import { updateHealthWithValue } from '../Helpers'

import Boop from '../Boop/Boop'

const boosterId = "booster"
const navigatorId = "navigator"
const wranglerId = "wrangler"
const lifeSupportId = "lifeSupport"

export default class Game extends React.Component {
  defaultState = () => {
    return {
      room: null,
      [boosterId]: null,
      [navigatorId]: null,
      [wranglerId]: null,
      [lifeSupportId]: null,
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

  componentDidMount() {
    const setState = (...state) => this.setState(...state)
    const setHealthOf = (role, value) => this.setHealthOf(role, value)

    const client = new Colyseus.Client(process.env.NODE_ENV === "production" ? ProductionServer : LocalServer); 
    client.joinOrCreate("feral-hog-distribution").then(room => {
      setState({ room })

      // set player role and name
      room.state.zones.onChange = function(zone, sessionId) {
        if (zone.clientId === sessionId)
          setState({ role: zone.id, roleName: zone.name })
      }

      room.state.booster.onChange = (updates) => {
        updateHealthWithValue(updates, (value) => setHealthOf(boosterId, value))
      }

      room.state.navigator.onChange = function (updates) {
        updateHealthWithValue(updates, (value) => setHealthOf(navigatorId, value))
      }

      room.state.wrangler.onChange = function (updates) {
        updateHealthWithValue(updates, (value) => setHealthOf(wranglerId, value))
      }

      room.state.lifeSupport.onChange = function (updates) {
        updateHealthWithValue(updates, (value) => setHealthOf(lifeSupportId, value))
      }
    })
  }

  yourHealth() {
    return this.state[this.state.role]
  }

  // Role select?
  render() {
    const { role, roleName } = this.state
    return (
      <div id="game">
        <p>You are: {roleName}</p>
        <p>Your health: {this.yourHealth()}</p>
        <Boop onBoop={(value) => this.updateHealthOf(role, value)} />
      </div>
    )
  }
}