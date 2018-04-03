import React from 'react'
// import queryString from 'query-string'
import { PageTemplate, BasicTemplate } from 'templates'
import { HeaderContainer, EditPageContainer } from "containers"

const EditProfile = ()=> {
  return(
    <div>
      <HeaderContainer showMenuBg={true} bgColorTransParent={true}/>
      <PageTemplate pageRenderingAni = {true} >
          <BasicTemplate>
            <EditPageContainer />
          </BasicTemplate>
      </PageTemplate>
    </div>
  )
}

export default EditProfile