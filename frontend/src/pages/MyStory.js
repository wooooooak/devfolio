import React from 'react'
import { PageTemplate, BasicTemplate } from 'templates'
import { HeaderContainer, MyStoryContainer } from "containers"

const MyStory = () => {
  return (
    <div>
      <HeaderContainer showMenuBg={false} bgColorTransParent={true} isAlwaysShowing={true}/>
      <PageTemplate
            pageRenderingAni = {true}
            >
            <BasicTemplate>
              <MyStoryContainer />
            </BasicTemplate>
      </PageTemplate>
    </div>
  )
}

export default MyStory