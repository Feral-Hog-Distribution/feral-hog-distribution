import React from 'react'

export default class Boop extends React.Component {
  render() {
    return (
      <p><button onClick={() => this.props.onBoop(1)} type="button" className="text" name="input">Snoot</button></p>
    )
  }
}