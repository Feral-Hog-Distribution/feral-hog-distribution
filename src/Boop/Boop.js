import React from 'react'

export default class Boop extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.onBoop(1)}>Snoot</button>
    )
  }
}