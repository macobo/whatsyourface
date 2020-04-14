import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Select from 'react-select'
import { createStructuredSelector } from 'reselect'
import {
  getFilterOptions,
  getPictureFilter,
  getPictureFilterWeight,
} from './selectors'
import {
  captureUserPicture,
  setPictureFilter,
  setPictureFilterWeight,
  uploadPictureFilter,
} from './actions'
import EmojiButton from './EmojiButton'

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
          <div className="control-panel__filter-select">
            <Select
              className="react-select"
              options={this.props.options}
              value={this.props.pictureFilter}
              menuPlacement="top"
              onChange={this.setPictureFilter}
            />
            <input
              type="file"
              id="new-filter-fileinput"
              onChange={this.handleNewFilterImage}
              style={{display:'none'}}
              accept=".png,.jpg,.jpeg"
            />
            <label htmlFor="new-filter-fileinput" className="button tertiary">+</label>
          </div>
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

  setPictureFilter = (value) => {
    this.props.setPictureFilter(value)
    this.props.captureUserPicture()
  }

  setPictureFilterWeight = (event) => {
    this.props.setPictureFilterWeight(event.target.value)
    this.props.captureUserPicture()
  }

  handleNewFilterImage = (event) => {
    this.props.uploadPictureFilter(event.target.files[0])
  }
}

export default connect(
  createStructuredSelector({
    pictureFilter: getPictureFilter,
    pictureFilterWeight: getPictureFilterWeight,
    options: getFilterOptions,
  }),
  { captureUserPicture, setPictureFilter, setPictureFilterWeight, uploadPictureFilter }
)(ControlPanel)
