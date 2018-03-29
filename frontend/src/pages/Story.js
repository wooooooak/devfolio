import React from 'react'
import { PageTemplate, NewStoryTemplate } from 'templates'
import { HeaderContainer, StoryContainer } from "containers"

const Story = ({match}) => {
  return (
    <div>
      <HeaderContainer showMenuBg={true} bgColorTransParent={false} isAlwaysShowing/>
      <PageTemplate
            pageRenderingAni = {true}
            >
            <NewStoryTemplate>
              <StoryContainer storyId = {match.params.id}/>
            </NewStoryTemplate>
      </PageTemplate>
    </div>
  )
}

export default Story