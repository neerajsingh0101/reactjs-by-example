import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SocialTracker from '../components/SocialTracker'
import * as SocialActions from '../actions/social'

function mapStateToProps(state) {
  return {
    social: state.social
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SocialActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialTracker)
