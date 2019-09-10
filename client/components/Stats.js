/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import Link from 'react-router-dom';
import axios from 'axios';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blessingHighest: '',
      blessingsTotal: 0,
      blessingsQty: 0,
      blessingsLatest: [],
    };
  }

  componentDidMount() {
    this.getStats();
    this.getBlessings();
  }

  getStats = () => {
    return axios
      .get('/api/stats')
      .then(resp => resp.data)
      .then(stats => {
        // console.log('stats: ', stats);
        const { blessingsTotal, blessingsQty } = stats[stats.length - 1];
        this.setState({
          blessingsTotal,
          blessingsQty,
        });
      })
      .catch(err => console.log(err));
  };

  getBlessings() {
    return axios
      .get('/api/blessings')
      .then(resp => resp.data)
      .then(blessings => {
        const blessingHighest = () => {
          const highest = { name: 0, blessingNum: 0 };
          blessings.forEach(current => {
            if (current.blessingNum > highest.blessingNum) {
              highest.blessingNum = current.blessingNum;
              highest.name = current.name;
            }
          });

          return highest;
        };

        const blessingsLatest = num => {
          return blessings.slice(-num).reverse();
        };
        this.setState({
          blessingHighest: blessingHighest(),
          blessingsLatest: blessingsLatest(10),
        });
      });
  }

  render() {
    const { blessingHighest, blessingsTotal, blessingsQty, blessingsLatest } = this.state;
    const { name, blessingNum } = blessingHighest;
    return (
      <div className="">
        <button type="button" onClick={() => this.props.history.push('/')}>
          Begin
        </button>
        <div>
          <h2>Highest Blessings</h2>
          <p>
            {name} {blessingNum ? blessingNum.toLocaleString() : ''}
          </p>
          <p>Total Given {blessingsTotal ? blessingsTotal.toLocaleString() : ''}</p>
          <p></p>
        </div>
        <div>
          <h2>Latest Blessings</h2>
          <table className="table table-striped">
            <tbody>
              {blessingsLatest
                ? blessingsLatest.map((blessing, index) => {
                    const { name, blessingNum } = blessing;
                    return (
                      <tr key={index}>
                        <td>{name}</td>
                        <td>{blessingNum ? blessingNum.toLocaleString() : ''}</td>
                      </tr>
                    );
                  })
                : ''}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}