import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Home, About, Register, NewStory, MyStory } from 'pages'


class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log('app rendering')
    return (
      <div id="main">
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/register" component={Register}/>
        <Route path="/newStory" component={NewStory}/>
        <Route path="/myStories" component={MyStory}/>
      </div>
    )
  }
}

export default App;

