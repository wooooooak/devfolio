import React from 'react'
// import queryString from 'query-string'
import { PageTemplate } from 'templates'
import { HeaderContainer } from "containers"
import IntroTwo from "components/IntroPage/IntroTwo"

const PersonalData = ({location, match}) => {
    // const query = queryString.parse(location.search)
    return (
        <div>
        <HeaderContainer showMenuBg={false} bgColorTransParent={false} isAlwaysShowing={false}/>
            <PageTemplate
                    pageRenderingAni = {true}
                    >
                sd
            </PageTemplate> 
        </div>
    )
}

export default PersonalData