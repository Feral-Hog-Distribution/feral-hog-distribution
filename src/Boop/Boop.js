import React from 'react'
var timer = null;

export default class Boop extends React.Component {
  render() {
    return (
      <form id="module_boop" className="module" action="#booped">
        <button onClick={() => this.boopIt()} type="button" className="text" name="input">Snoot</button>
        <div id="chonk">Chonk</div>
      </form>
    )
  }

  boopIt = () => {
    this.props.onBoop(1);
    console.log("its a boopy doop");
    var element = document.getElementById("chonk");
    if(element){
      element.classList.add("booped");
      timer = setTimeout(this.chonkSad, 700);
    }
  }

  chonkSad = () => {
    var element = document.getElementById("chonk");
    if(element){
      element.classList.remove("booped");
    }
  }
}