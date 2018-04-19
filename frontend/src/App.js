import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home, Register, NewStory, MyStory, Story, EditProfile, Watch, PersonalData } from 'pages'


class App extends Component {
  render() {
    return (
      <div id="main">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/watch" component={Watch}/>
          <Route path="/register" component={Register}/>
          <Route path="/personalData" component={PersonalData}/>
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

