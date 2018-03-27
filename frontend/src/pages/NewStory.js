import React from 'react'
import { PageTemplate, NewStoryTemplate } from 'templates'
import { HeaderContainer, NewStoryContainer } from "containers"

const NewStory = () => {
  return (
    <div>
      <HeaderContainer showMenuBg={true} bgColorTransParent={false} isAlwaysShowing/>
      <PageTemplate
            // header = {<HeaderContainer showMenuBg={true}/>}
            pageRenderingAni = {true}
            >
            <NewStoryTemplate>
              <NewStoryContainer />
            </NewStoryTemplate>
      </PageTemplate>
    </div>
  )
}

export default NewStory