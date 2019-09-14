import React from 'react'

import { booster, wrangler, navigator, lifeSupport } from './Constants'

export default function RoleDescription({ roleId, children }) {

  function content() {
    switch (roleId) {
      case booster:
        return (
          <>
            <h2>You are the <strong>Booster</strong></h2>
            <p>You crank the engine and keep the ship going at the correct speed.</p>
            <p>Listen to the <strong>Navigator</strong> and keep the ship going at the correct speed.</p>
            <p>Monitor the <strong>Boom-O-Meter</strong> and tell the <strong>Wrangler</strong> their target.</p>
          </>
        )
      case wrangler:
        return (
          <>
            <h2>You are the <strong>Wrangler</strong></h2>
            <p>You boop the hogs and make sure the engines have enough fuel.</p>
            <p>Listen to the <strong>Booster</strong> and keep milk at the forrect flow rate.</p>
            <p>Monitor the <strong>Therm-O-Meter</strong> and tell the <strong>Habitator</strong> their target.</p>
          </>
        )
      case navigator:
        return (
          <>
            <h2>You are the <strong>Navigator</strong></h2>
            <p>You drive the ship and keep it sailing in the right direction.</p>
            <p>Listen to the <strong>Habitator</strong> and keep the ship on target.</p>
            <p>Monitor the <strong>Warp-O-Meter</strong> and tell the <strong>Booster</strong> their target.</p>
          </>
        )
      case lifeSupport:
        return (
          <>
            <h2>You are the <strong>Habitator</strong></h2>
            <p>You maintain the life support systems and keep the hogs at a healthy temperature</p>
            <p>Listen to the <strong>Wrangler</strong> and keep the hogs at the correct temperature.</p>
            <p>Monitor the <strong>Ray-O-Meter</strong> and tell the <strong>Navigator</strong> their energy production target.</p>
          </>
        )
      default:
        return null
    }
  }

  return (
    <main id="role_allocation">
      {content()}
      {children}
    </main>
  )
}