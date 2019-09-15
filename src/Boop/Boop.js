import React from 'react'

const audio = new Audio('./hog11.mp3')
export default class Boop extends React.Component {
  render() {
    return (
      <p><button onClick={() => {this.props.onBoop(1); audio.play()}} type="button" className="text" name="input">Snoot</button></p>
    )
  }
}