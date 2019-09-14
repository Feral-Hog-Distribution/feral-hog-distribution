import * as Colyseus from "colyseus.js";

import React, { useState, useEffect } from 'react'
import './Game.scss'

import { LocalServer, ProductionServer } from "../Constants"
import { updateHealthWithValue } from '../Helpers'

import Range from '../Range/Range'

const boosterId = "booster"
const navigatorId = "navigator"
const wranglerId = "wrangler"
const lifeSupportId = "lifeSupport"

export default function Game() {
  const [room, setRoom] = useState(null)
  const [boosterHealth, setBoosterHealth] = useState(null)
  const [roleId, setRoleId] = useState(null)
  const [playersRole, setPlayerRole] = useState(null)

  useEffect(() => {
    const client = new Colyseus.Client(process.env.NODE_ENV === "production" ? ProductionServer : LocalServer); 
    client.joinOrCreate("feral-hog-distribution").then(room => {
      setRoom(room)

      // set player role and name
      room.state.zones.onChange = function(zones, sessionId) {
        if (zones.clientId === sessionId) {
          setRoleId(zones.id)
          setPlayerRole(zones.name)
        }
      }

      // Updating the states of each station
      room.state.booster.onChange = function (updates) {
        updateHealthWithValue(updates, (value) => setBoosterHealth(value))
      }

      room.state.navigator.onChange = function (updates) {
        updateHealthWithValue(updates, (value) => up(value))
      }
      room.state.wrangler.onChange = function (updates) {
        updateHealthWithValue(updates, (value) => setBoosterHealth(value))
      }
      room.state.lifeSupport.onChange = function (updates) {
        updateHealthWithValue(updates, (value) => setBoosterHealth(value))
      }
    });
  }, [])

  function updateBoosterHealth(value = 2) {
    room.send({ command: boosterId, value: value });
  }

  function updateNavigatorHealth(value = 2) {
    room.send({ command: navigatorId, value: value });
  }

  function updateWranglerHealth(value = 2) {
    room.send({ command: wranglerId, value: value });
  }

  function updateLifeSupportHealth(value = 2) {
    room.send({ command: lifeSupportId, value: value });
  }
  // function helpNavigator() {
  //   room.send({ command: 'navigator', value: 2 });
  // }

  // function helpWrangler() {
  //   room.send({ command: 'wrangler', value: 2 });
  // }

  // function helpLifeSupport() {
  //   room.send({ command: 'lifeSupport', value: 2 });
  // }

  // Role select?
  return (
    <div id="game">
      <p>You are: {playersRole}</p>
      <p>Booster: {boosterHealth}</p>
      <button onClick={() => updateBoosterHealth()}>Boost</button>
      <div>
        <Range onValueChange={updateBoosterHealth} />
      </div>
    </div>
  )
}