import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Home, About, Register, NewStory } from 'pages'


class App extends Component {
  render() {
    return (
      <div id="main">
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/register" component={Register}/>
        <Route path="/newStory" component={NewStory}/>
      </div>
    )
  }
}

export default App;

