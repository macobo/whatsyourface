import React, { PureComponent } from 'react'

export default class UserImage extends PureComponent {
  render = () => (
    <img
      src={this.props.user.image || 'https://via.placeholder.com/320x240'}
      alt={this.props.user.id}
    />
  )
}
