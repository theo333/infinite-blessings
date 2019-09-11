import React, { Component } from 'react';
import axios from 'axios';

export default class BlessingsNum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestBlessing: {},
    };
  }

  componentDidMount() {
    this.getLatestBlessing();
  }

  getLatestBlessing() {
    axios
      .get('/api/blessings/latest')
      .then(resp => resp.data)
      .then(latestBlessing => {
        this.setState(
          { latestBlessing },
          // () => console.log('blessingNum updated to: ', this.state.latestBlessing),
        );
      })
      .then(() => {
        setTimeout(() => {
          this.props.history.push('/stats');
        }, 20000);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { name, blessingNum } = this.state.latestBlessing;
    return (
      <div id="blessing-page" className="container h-100">
        <div className="row align-items-center h-100">
          <div className="mx-auto text-center">
            <p className="bless-congrats">
              CONGRATULATIONS!
              <br />
              {/* {name}<br /> */}
              YOU RECEIVED
            </p>
            <p className="bless-num">{blessingNum ? blessingNum.toLocaleString() : ''}</p>
            <p className="bless-blessings">BLESSINGS</p>
            <button type="button" className="btn" onClick={() => this.props.history.push('/stats')}>
              THANK YOU! =&gt;
            </button>
          </div>
        </div>
      </div>
    );
  }
}
