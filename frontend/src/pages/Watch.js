import React from 'react'
// import queryString from 'query-string'
import { PageTemplate, BasicTemplate } from 'templates'
import { HeaderContainer, WatchContainer } from "containers"

const About = ({location, match}) => {
    return (
        <div>
        <HeaderContainer showMenuBg={false} bgColorTransParent={false} isAlwaysShowing={false}/>
            <PageTemplate pageRenderingAni = {true}>
                <BasicTemplate>
                    <WatchContainer>

                    </WatchContainer>
                </BasicTemplate>
            </PageTemplate> 
        </div>
    )
}

export default About