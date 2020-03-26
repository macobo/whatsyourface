import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { captureUserPicture } from './actions'

export class UserImage extends PureComponent {
  render = () => (
    <div class="user-image">
      <img
        className="user-image__image"
        src={this.props.user.image || 'https://via.placeholder.com/320x240'}
        alt={this.props.user.id}
      />
      <div className="user-image__overlay">
        <button onClick={this.props.captureUserPicture}>Take photo</button>
      </div>
    </div>
  )
}

export default connect(undefined, { captureUserPicture })(UserImage)
