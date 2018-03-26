import React from 'react'
// import queryString from 'query-string'
import { PageTemplate } from 'templates'
import { HeaderContainer } from "containers"
import IntroTwo from "components/IntroPage/IntroTwo"

const About = ({location, match}) => {
    // const query = queryString.parse(location.search)
    return (
        <PageTemplate
                header={<HeaderContainer/>}
                pageRenderingAni = {true}
                >
                <IntroTwo />
        </PageTemplate> 
    )
}

export default About