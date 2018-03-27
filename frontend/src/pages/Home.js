import React from 'react'
import { PageTemplate, IntroTemplate } from 'templates'
import { HeaderContainer, IntroContainer } from "containers"

const Home = () => {
    return (
      <div>
        <HeaderContainer showMenuBg={false} bgColorTransParent={false}/>
        <PageTemplate
          pageRenderingAni = {true}
          >
          <IntroTemplate>
            <IntroContainer />
          </IntroTemplate>
        </PageTemplate>
      </div>
    )
}

export default Home