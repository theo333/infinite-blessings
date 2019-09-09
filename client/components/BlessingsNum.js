import React, { Component } from 'react';
import axios from 'axios';

export default class BlessingsNum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blessingNum: '',
    };
    this.getLatestBlessingNum = this.getLatestBlessingNum.bind(this);
  }

  componentDidMount() {
    this.getLatestBlessingNum();
  }

  getLatestBlessingNum = () => {
    axios
      .get('/api/blessings/latest')
      .then(resp => resp.data)
      .then(blessing => {
        console.log('received blessingNum: ', blessing.blessingNum);

        this.setState({ blessingNum: blessing.blessingNum }, () =>
          console.log('blessingNum updated to: ', this.state.blessingNum),
        );
      })
      .then(() => {
        setTimeout(() => {
          this.props.history.push('/');
        }, 2000);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <p>
        CONGRATULATIONS! <br />
        YOU RECEIVED <br />
        {this.state.blessingNum} <br />
        BLESSINGS
      </p>
    );
  }
}
