import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, About, Register, NewStory, MyStory, Story } from 'pages'


class App extends Component {
  render() {
    console.log('app rendering')
    return (
      <div id="main">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/register" component={Register}/>
          <Route exact path="/Story/:id" component={Story}/>
          <Route path="/newStory" component={NewStory}/>
          <Route exact path="/myStories/:displayName" component={MyStory}/>
        </Switch>
      </div>
    )
  }
}


export default App

