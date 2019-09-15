import React from 'react'

const xAxis = "xAxis"
const yAxis = "yAxis"

const increase = 1
const decrease = -1

export default class Target extends React.Component {
  state = {
    targetX: null,
    targetY: null,
    playerX: 50,
    playerY: 50,
    distanceModifier: 5,
    successValue: 5,
  }

  componentDidMount() {
    this.setNewTargetPosition()
  }

  setNewTargetPosition() {
    const getIntervalFromRandom = () => {
      const { distanceModifier } = this.state
      let randomPercent = Math.ceil(Math.random(0,100) * 100);
      return randomPercent - (randomPercent % distanceModifier) + (randomPercent % distanceModifier > 0 && distanceModifier);
    }

    this.setState({
      targetX: getIntervalFromRandom(),
      targetY: getIntervalFromRandom()
    })
  }

  playerStyles() {
    const { playerX, playerY } = this.state
    return {
      top: `${playerY}%`,
      left: `${playerX}%`,
    }
  }

  targetStyles() {
    const { targetX, targetY } = this.state
    return {
      top: `${targetY}%`,
      left: `${targetX}%`,
    }
  }

  success() {
    const { onTargetSuccess } = this.props
    const { successValue } = this.state

    console.log(successValue)
    onTargetSuccess(successValue)
    this.setNewTargetPosition()
  }

  movePlayer(direction, sign) {
    let { playerX, playerY, targetX, targetY } = this.state

    const distance = this.state.distanceModifier * sign

    if (direction === xAxis) {
      playerX = parseInt(this.state.playerX + distance)
    } else {
      playerY = parseInt(this.state.playerY + distance)
    }

    this.setState({ playerX, playerY })

    if (playerX === targetX && playerY === targetY) {
      this.success();
    }
  }

  render() {
    return (
      <main id="module_target" className="module">
        <form action="#target">
          <div className="target_container">
            <button onClick={() => this.movePlayer(yAxis, decrease)} type="button" className="arrow" data-direction="n" name="y" value="-1"><span>Up</span></button>
            <button onClick={() => this.movePlayer(yAxis, increase)} type="button" className="arrow" data-direction="s" name="y" value="1"><span>Down</span></button>
            <button onClick={() => this.movePlayer(xAxis, decrease)} type="button" className="arrow" data-direction="w" name="x" value="-1"><span>Left</span></button>
            <button onClick={() => this.movePlayer(xAxis, increase)} type="button" className="arrow" data-direction="e" name="x" value="1"><span>Right</span></button>
            <div className="target_screen">
              <div className="target" style={this.targetStyles()}></div>
              <div className="target_reticle" style={this.playerStyles()}></div>
            </div>
          </div>
        </form>
      </main>
    )
  }
}
