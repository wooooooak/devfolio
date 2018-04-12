import React, {Component} from 'react'
import { PageTemplate, NewStoryTemplate } from 'templates'
import { HeaderContainer, NewStoryContainer } from "containers"

class NewStory extends Component {
  render() {
    console.log(this.props.match.params.id)
    console.log('newStory 실행')
    return (
      <div>
        {/* <div>afaefsdfasefsdafaewfasf</div> */}
        <HeaderContainer showMenuBg={true} bgColorTransParent={false} isAlwaysShowing/>
        <PageTemplate
              pageRenderingAni = {true}
              >
              <NewStoryTemplate>
                <NewStoryContainer 
                    storyId = {this.props.match.params.id ? this.props.match.params.id : null}
                />
              </NewStoryTemplate>
        </PageTemplate>
      </div>
    )
  }
}

export default NewStory