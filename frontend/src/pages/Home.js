import React from 'react'
import { PageTemplate, IntroTemplate } from 'templates'
import { HeaderContainer, IntroContainer } from "containers"

const Home = () => {
  console.log('/')
    return (
      <PageTemplate
         header={<HeaderContainer/>}
         pageRenderingAni = {false}
         >
        <IntroTemplate>
          <IntroContainer />
        </IntroTemplate>
      </PageTemplate>
    )
}

export default Home