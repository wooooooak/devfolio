import React, {Component} from 'react'
import { connect } from 'react-redux'
import { PageTemplate, BasicTemplate } from 'templates'
import { HeaderContainer, MyStoryContainer } from "containers"

class MyStory extends Component {
  render(){
    const displayName = this.props.match.params.displayName
    return (
      <div>
      <HeaderContainer showMenuBg={false} bgColorTransParent={true} isAlwaysShowing={true}/>
      <PageTemplate
            pageRenderingAni = {true}
            >
            <BasicTemplate>
            <MyStoryContainer displayName = {displayName}/>
            </BasicTemplate>
      </PageTemplate>
    </div>
  )
}
}


const mapStateToProps = (state) => {
  const { user } = state
  return {
    user
  }
}

export default connect(mapStateToProps,null)(MyStory)


// export default MyStory