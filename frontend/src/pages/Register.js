import React from 'react'
import { PageTemplate, RegisterTemplate } from 'templates'
import { HeaderContainer, RegisterContainer }  from "containers"

const Register = () => {
  return (
    <PageTemplate
          header = {<HeaderContainer />}
          pageRenderingAni = {false}
          >
          <RegisterTemplate>
            <RegisterContainer />
          </RegisterTemplate>
    </PageTemplate>
  )
}

export default Register