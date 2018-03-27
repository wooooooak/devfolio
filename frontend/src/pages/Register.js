import React from 'react'
import { PageTemplate, RegisterTemplate } from 'templates'
import { HeaderContainer, RegisterContainer }  from "containers"

const Register = () => {
  return (
    <div>
      <HeaderContainer showMenuBg={false} bgColorTransParent={false}/>
    <PageTemplate
          // header = {<HeaderContainer />}
          pageRenderingAni = {false}
          >
          <RegisterTemplate>
            <RegisterContainer />
          </RegisterTemplate>
    </PageTemplate>
    </div>
  )
}

export default Register