import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, About, Register, NewStory, MyStory, Story, EditProfile } from 'pages'


class App extends Component {
  render() {
    return (
      <div id="main">
        <Switch>
          <Route exact path="/" component={Home}/>
          {/* <Route path="/about" component={About}/> */}
          <Route path="/register" component={Register}/>
          <Route exact path="/Story/:id" component={Story}/>
          <Route exact path="/addStory" component={NewStory}/>
          <Route exact path="/newStory/:id" component={NewStory}/>
          <Route exact path="/myStories/:displayName" component={MyStory}/>
          <Route exact path="/editProfile" component={EditProfile}/>
        </Switch>
      </div>
    )
  }
}


export default App

