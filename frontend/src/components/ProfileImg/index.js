import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import action from "action"
import ProfileImg from "./ProfileImg"


const mapStateToProps = (state) => {
    const { user }  = state
    return {
        user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFollower : bindActionCreators(action.user.add_follower, dispatch),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileImg)

