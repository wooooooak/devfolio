import React from 'react'
import { PageTemplate, NewStoryTemplate } from 'templates'
import { HeaderContainer, NewStoryContainer } from "containers"

const NewStory = ({match}) => {
  console.log(match.url)
  return (
    <div>
      <HeaderContainer showMenuBg={true} bgColorTransParent={false} isAlwaysShowing/>
      <PageTemplate
            pageRenderingAni = {true}
            >
            <NewStoryTemplate>
              <NewStoryContainer 
                  storyId = {match.params.id ? match.params.id : null}
              />
            </NewStoryTemplate>
      </PageTemplate>
    </div>
  )
}

export default NewStory