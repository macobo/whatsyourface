import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Select from 'react-select'
import { captureUserPicture, setPictureFilter } from './actions'
import EmojiButton from './EmojiButton'

const makeOption = (value) => ({ label: value || 'none', value })

const options = [null].concat(window.pixelsJS.getFilterList()).map(makeOption)
const emoji = ['🌽', '🍇', '🍌', '🍒', '🍕', '🍷', '🍭', '💖', '💩', '🐷', '🐸', '🐳', '🎃', '🎾', '🌈', '🍦', '💁', '🔥', '😁', '😱', '🌴', '👏', '💃']

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
      <div className="row">
        <div className="col-sm-9">
          <div>Spread some love</div>
          {emoji.map((e) => <EmojiButton key={e} emoji={e} />)}
        </div>
        <div className="col-sm-3">
          Image filter:
          <Select
            options={options}
            value={makeOption(this.props.pictureFilter)}
            menuPlacement="top"
            onChange={this.setPictureFilter}
          />
        </div>
      </div>

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

  setPictureFilter = ({ value }) => {
    this.props.setPictureFilter(value)
    this.props.captureUserPicture()
  }
}

export default connect(
  ({ pictureFilter }) => ({ pictureFilter }),
  { captureUserPicture, setPictureFilter }
)(ControlPanel)
