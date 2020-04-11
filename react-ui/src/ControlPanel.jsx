import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import Select from 'react-select'
import { captureUserPicture, setPictureFilter, setPictureFilterWeight } from './actions'
import { imageDataFromFile, getImageStyle } from './styleTransfer'
import EmojiButton from './EmojiButton'

const emoji = ['🌽', '🍇', '🍌', '🍒', '🍕', '🍷', '🍭', '💖', '💩', '🐷', '🐸', '🐳', '🎃', '🎾', '🌈', '🍦', '💁', '🔥', '😁', '😱', '🌴', '👏', '💃']

export class ControlPanel extends PureComponent {
  state = { open: true }

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
            options={this.props.pictureFilterList}
            value={this.props.pictureFilter}
            menuPlacement="top"
            onChange={this.setPictureFilter}
          />
          <input type="range"
            min="0" max="1" step="0.01"
            value={this.props.pictureFilterWeight}
            onChange={this.setPictureFilterWeight}
          />
          <input type="file" id="new-filter-fileinput" onChange={this.newPictureFilterFromImage} style={{display:'none'}} accept=".png,.jpg,.jpeg"/>
          <label htmlFor="new-filter-fileinput" className="button tertiary">+</label>
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

  setPictureFilterWeight = ({ target }) => {
    this.props.setPictureFilterWeight(target.value)
    this.props.captureUserPicture()
  }

  newPictureFilterFromImage = ({ target }) => {
    const file = target.files[0]
    imageDataFromFile(file,512)
      .then(getImageStyle)
      .then((value) => ({'label':file.name, value}))
      .then(this.setPictureFilter)
    target.value = '';
  }

}

export default connect(
  ({ pictureFilter, pictureFilterWeight, pictureFilterList }) => ({ pictureFilter, pictureFilterWeight, pictureFilterList }),
  { captureUserPicture, setPictureFilter, setPictureFilterWeight }
)(ControlPanel)
