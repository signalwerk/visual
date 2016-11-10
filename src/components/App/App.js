import React, {Component} from 'react';
require('./App.scss');
import CellAutomata from '../CellAutomata/CellAutomata';
import Textlayer from '../Textlayer/Textlayer';
import Text from '../Text/Text';
import Space from '../Space/Space';
import AutomataLib from '../../helper/CellAutomata';
import Ui from '../Ui/Ui';

class App extends Component {

  constructor() {
    super();
    this.automata = new AutomataLib();

    var body = document.getElementsByTagName('body')[0];
    // window.innerWidth;
    var remSize = parseFloat(
      window.getComputedStyle(body, null)
      .getPropertyValue('font-size')
    );

    this.state = {
      rule: 110,
      seed: 51,
      columns: 45,
      rows: 27,
      fill: '/',
      empty: '​‌\\',
    };
  }

  changeRule = (rule) => this.setState({ rule });
  changeSeed = (seed) => this.setState({ seed });
  changeFill = (fill) => this.setState({ fill });
  changeEmpty = (empty) => this.setState({ empty });
  changeColumns = (columns) => this.setState({ columns });
  changeRows = (rows) => this.setState({rows});

  render() {

    var data = this.automata.generate({
      columns: this.state.columns,
      rows: this.state.rows,
      rule: this.state.rule,
      seed: this.state.seed,
    });

    return (
      <div className="App">
        <div className="visual">
          <Textlayer
            width={this.state.columns}
            height={this.state.rows}
            phrases={'ZE|TE|CO|BAR'}
            />
          <CellAutomata
            data={data}
            fill={this.state.fill}
            empty={this.state.empty}
          />

          <Ui
            columns={this.state.columns}
            rows={this.state.rows}
            rule={this.state.rule}
            seed={this.state.seed}
            fill={this.state.fill}
            empty={this.state.empty}

            changeRule={this.changeRule}
            changeSeed={this.changeSeed}
            changeFill={this.changeFill}
            changeEmpty={this.changeEmpty}
            changeColumns={this.changeColumns}
            changeRows={this.changeRows}
          />
        </div>
      </div>
    );
  }
}

export default App;
