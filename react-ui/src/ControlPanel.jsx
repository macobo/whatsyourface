import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

export class ControlPanel extends PureComponent {
  state = { open: false }

  render = () => (
    <div className="control-panel">
      <button className={this.toggleClassNames()} onClick={this.toggleOpen}>
        {this.state.open ? '⬇' : '⬆'}
      </button>
      {this.state.open ? this.renderPanel() : null}
    </div>
  )

  renderPanel = () => (
    <div className="control-panel__panel">
      Content

      <div className="control-panel__credits">
        Made with &hearts; by Karl
      </div>
    </div>
  )

  toggleClassNames = () => classNames({
    'control-panel__toggle': true,
    'control-panel__toggle--active': this.state.open,
  })

  toggleOpen = () => {
    this.setState({ open: !this.state.open })
  }
}

export default connect(
  (state) => ({}),
)(ControlPanel)
