import React from 'react'

export default class Range extends React.Component {
  defaultState = () => {
    return {
      greenZone: 50,
      currentValue: 50,
      gameLoop: null,
    }
  }

  state = this.defaultState()

  tweakGreenZone() {
    let sign = Math.random() > 0.5 ? 1 : -1
    let updatedGreenZone = this.state.greenZone + (Math.random() * 10 * sign)
    updatedGreenZone = Math.min(100, updatedGreenZone)
    updatedGreenZone = Math.max(0, updatedGreenZone)
    this.setState({ greenZone: updatedGreenZone })
  }

  componentDidMount() {
    const gameLoop = window.setInterval(() => this.tweakGreenZone(), 1000)
    this.setState({ gameLoop })
  }

  componentWillUnmount() {
    window.clearInterval(this.state.gameLoop)
  }

  setCurrentValue(currentValue) {
    this.setState({currentValue})
  }

  render() {
    const { greenZone, currentValue } = this.state
    return (
      <form id="module_range" className="module" action="#ranged">
        <div className="row">
          <div className="column">
            <button type="button" onClick={() => this.setCurrentValue(currentValue-1)}>UP</button>
            <div className="range_container">
              <div className="green_zone" style={ { top: `${greenZone}%` } } />
              <input className="field_range" type="range" min="0" max="100" value={currentValue} />
            </div>
            <button type="button" onClick={() => this.setCurrentValue(currentValue+1)}>DOWN</button>
          </div>
        </div>
      </form>
    )
  }
}