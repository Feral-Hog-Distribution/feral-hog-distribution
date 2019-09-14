import * as Colyseus from "colyseus.js";

import React, { useState, useEffect } from 'react'
import './Game.scss'

import { LocalServer, ProductionServer } from "../Constants"
import { updateHealthWithValue } from '../Helpers'

export default function Game() {
  const [room, setRoom] = useState(null)
  const [booster, setBoosterHealth] = useState(null)

  useEffect(() => {
    const client = new Colyseus.Client(process.env.NODE_ENV === "production" ? ProductionServer : LocalServer); 
    client.joinOrCreate("feral-hog-distribution").then(room => {
      setRoom(room)

      // Updating the states of each station
      room.state.booster.onChange = function (updates) {
        updateHealthWithValue(updates, setBoosterHealth)
      }
      // room.state.navigator.onChange = function (updates) {
      //   updateElementWithValue(updates, "navigator", "health")
      // }
      // room.state.wrangler.onChange = function (updates) {
      //   updateElementWithValue(updates, "wrangler", "health")
      // }
      // room.state.lifeSupport.onChange = function (updates) {
      //   updateElementWithValue(updates, "life-support", "health")
      // }
    });
  }, [])

  function helpBooster(value = 2) {
    room.send({ command: 'booster', value });
  }

  function helpNavigator() {
    room.send({ command: 'navigator', value: 2 });
  }

  function helpWrangler() {
    room.send({ command: 'wrangler', value: 2 });
  }

  // function helpLifeSupport() {
  //   room.send({ command: 'lifeSupport', value: 2 });
  // }

  // Role select?
  return (
    <div id="game">
      <p>Booster: {booster}</p>
      <button onClick={helpBooster}>Boost</button>
    </div>
  )
}