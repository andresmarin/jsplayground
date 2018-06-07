import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {

  state = {
    intro: null
  }

  changeIntro = ()=>{
    this.setState({ intro: "Good! You preseed the silly button." })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.props.msg}</h1>
        </header>
        <p className="App-intro">
          {this.state.intro !== null ? this.state.intro : "This is just a silly test."}
  </p>
        <button type="button" onClick={this.changeIntro}>
          A silly Button
    </button>
      </div>
    )
  }

}


