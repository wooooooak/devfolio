import React from 'react'
import { PageTemplate, NewStoryTemplate } from 'templates'
import { HeaderContainer, NewStoryContainer } from "containers"

const NewStory = () => {
  return (
    <PageTemplate
          header = {<HeaderContainer showMenuBg={true}/>}
          pageRenderingAni = {true}
          >
          <NewStoryTemplate>
            <NewStoryContainer />
          </NewStoryTemplate>
    </PageTemplate>
  )
}

export default NewStory