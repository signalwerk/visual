import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Ui.scss';

class Ui extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    columns: PropTypes.number.isRequired,
    autosize: PropTypes.bool.isRequired,
    autorule: PropTypes.bool.isRequired,
    rows: PropTypes.number.isRequired,
    rule: PropTypes.number.isRequired,
    words: PropTypes.string.isRequired,
    seed: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    empty: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,

    changeRule: PropTypes.func.isRequired,
    changeSeed: PropTypes.func.isRequired,
    changeWords: PropTypes.func.isRequired,
    changeStyle: PropTypes.func.isRequired,
    changeFill: PropTypes.func.isRequired,
    changeEmpty: PropTypes.func.isRequired,
    changeColumns: PropTypes.func.isRequired,
    changeRows: PropTypes.func.isRequired,
    changeAutosize: PropTypes.func.isRequired,
    changeAutorule: PropTypes.func.isRequired,
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
  }
  range8Bit(value) {
    let newVal = parseInt(value, 10) || 0;
    newVal = Math.max(0, newVal);
    newVal = Math.min(255, newVal);
    return newVal;
  }
  changeRule = (event) => {
    this.props.changeRule(
      this.range8Bit(event.target.value),
    );
  }
  changeSeed = (event) => {
    this.props.changeSeed(
      event.target.value,
    );
  }
  changeWords = (event) => {
    this.props.changeWords(
      event.target.value || ' ',
    );
  }
  changeFill = (event) => {
    this.props.changeFill(
      event.target.value || '',
    );
  }
  changeEmpty = (event) => {
    this.props.changeEmpty(
      event.target.value || '',
    );
  }
  changeColumns = (event) => {
    this.props.changeColumns(
      parseInt(event.target.value, 10),
    );
  }
  changeRows = (event) => {
    this.props.changeRows(
      parseInt(event.target.value, 10),
    );
  }
  changeAutosize = (event) => {
    this.props.changeAutosize(
      event.target.checked,
    );
  }
  changeStyle = (event) => {
    this.props.changeStyle(
      event.target.value || 'normal',
      event.target.name,
    );
  }
  changeAutorule = (event) => {
    this.props.changeAutorule(
      event.target.checked,
    );
  }

  rndSeed = () => {
    this.props.changeSeed(
      Math.random().toString(36).substr(2, 6),
    );
  }


  rndRule = () => {
    this.props.changeRule(
      this.getRandomInt(0, 255),
    );
  }

  render() {
    let isVisible = '';
    if (!this.props.visible) isVisible = styles.hidden;

    return (
      <div className={`${styles.ui} ${isVisible}`}>
        <div className={styles.inner}>
          <div className={styles.value}>
            <div className={styles.value__caption}>Random Seeds </div>
            <span className={styles.value__button} onClick={this.rndSeed}>generate</span>
          </div>
          <div className={styles.value}>
            <div className={styles.value__caption}>Random Rules </div>
            <span className={styles.value__button} onClick={this.rndRule}>generate</span>
          </div>
          <br />
          <div className={styles.value}>
            <div className={styles.value__caption}>
              Words <span className={styles.value__valuerange}>separated by line</span>
            </div>
            <textarea
              name="word"
              cols="40"
              rows="5"
              className={styles.value__input}
              value={this.props.words}
              onChange={this.changeWords}
            />
          </div>

          <div className={styles.value}>
            <div className={styles.value__caption}>Style</div>
            <select value={this.props.style} onChange={this.changeStyle}>
              <option value="normal">Normal</option>
              <option value="print">Printer friendly (A4 → cols: 46, rows: 54)</option>
              <option value="print-bw">black&amp;white</option>
              <option value="msg-classic">msg-classic</option>
              <option value="msg-cyber">msg-cyber</option>
              <option value="msg-internet">msg-datenautobahn</option>
              <option value="erich-protectionist">erich-protectionist</option>
            </select>
          </div>

          <div className={styles.value}>
            <div className={styles.value__caption}>
              Update Rules all 3 sec. <span className={styles.value__valuerange}>true/false</span>
            </div>
            <input
              className={styles.value__input}
              type="checkbox"
              checked={this.props.autorule}
              onChange={this.changeAutorule}
            />
          </div>
          <div className={styles.value}>
            <div className={styles.value__caption}>
              Autosize <span className={styles.value__valuerange}>true/false</span>
            </div>
            <input
              className={styles.value__input}
              type="checkbox"
              checked={this.props.autosize}
              onChange={this.changeAutosize}
            />
          </div>
          <div className={styles.value}>
            <div className={styles.value__caption}>
              Columns <span className={styles.value__valuerange}>0–~</span>
            </div>
            <input
              className={styles.value__input}
              type="number"
              value={this.props.columns}
              onChange={this.changeColumns}
            />
          </div>
          <div className={styles.value}>
            <div className={styles.value__caption}>
              Rows <span className={styles.value__valuerange}>0–~</span>
            </div>
            <input
              className={styles.value__input}
              type="number"
              value={this.props.rows}
              onChange={this.changeRows}
            />
          </div>

          <div className={styles.value}>
            <div className={styles.value__caption}>
              Rule <span className={styles.value__valuerange}>0–255</span>
            </div>
            <input
              className={styles.value__input}
              type="number"
              value={this.props.rule}
              onChange={this.changeRule}
            />
          </div>

          <div className={styles.value}>
            <div className={styles.value__caption}>
              Seed <span className={styles.value__valuerange}>any</span>
            </div>
            <input
              className={styles.value__input}
              type="text"
              value={this.props.seed}
              onChange={this.changeSeed}
            />
          </div>

          <div className={styles.value}>
            <div className={styles.value__caption}>
              Fill <span className={styles.value__valuerange}>one char</span>
            </div>
            <input
              className={styles.value__input}
              type="text"
              value={this.props.fill}
              onChange={this.changeFill}
            />
          </div>
          <div className={styles.value}>
            <div className={styles.value__caption}>
              Empty <span className={styles.value__valuerange}>one char</span>
            </div>
            <input
              className={styles.value__input}
              type="text"
              value={this.props.empty}
              onChange={this.changeEmpty}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Ui;
