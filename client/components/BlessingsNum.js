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
        }, 6000);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { name, blessingNum } = this.state.latestBlessing;
    return (
      <p>
        CONGRATULATIONS {name}!!!
        <br />
        YOU RECEIVED <br />
        {blessingNum ? blessingNum.toLocaleString() : ''} <br />
        BLESSINGS
      </p>
    );
  }
}
