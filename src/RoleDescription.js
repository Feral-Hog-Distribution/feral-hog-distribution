import React from 'react'

import { booster, wrangler, navigator, lifeSupport } from './Constants'

export default function RoleDescription({ roleId, children }) {

  function content() {
    switch (roleId) {
      case booster:
        return (
          <>
            <h2>You are the <strong>Booster</strong></h2>
          </>
        )
      case wrangler:
        return (
          <>
            <h2>You are the <strong>Wrangler</strong></h2>

          </>
        )
      case navigator:
        return (
          <>
            <h2>You are the <strong>Navigator</strong></h2>

          </>
        )
      case lifeSupport:
        return (
          <>
            <h2>You are the <strong>Habitator</strong></h2>

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
