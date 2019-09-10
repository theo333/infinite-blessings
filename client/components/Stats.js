/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Stats extends Component {
  constructor() {
    super();
    this.state = {
      blessingHighest: '',
      blessingsTotal: 0,
      blessingsQty: 0,
      blessingsLatest: [],
    };
    this.getBlessings = this.getBlessings.bind(this);
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
        console.log('stats: ', stats);
        const { blessingsTotal, blessingsQty } = stats[stats.length - 1];
        this.setState(
          {
            // blessingHighest,
            blessingsTotal,
            blessingsQty,
            // blessingsLatest,
          },
          () => console.log(this.state),
        );
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
        this.setState(
          {
            blessingHighest: blessingHighest(),
            blessingsLatest: blessingsLatest(5),
          },
          () => console.log('state2: ', this.state),
        );
      });
  }

  render() {
    const { blessingHighest, blessingsTotal, blessingsQty, blessingsLatest } = this.state;
    const { name, blessingNum } = blessingHighest;
    return (
      <div>
        <div>
          <h2>Highest Blessings</h2>
          <p>
            {name} {blessingNum}
          </p>
          <p>Total Given {blessingsTotal}</p>
          <p></p>
        </div>
        <div>
          <h2>Latest Blessings</h2>
          <table>
            <tbody>
              {blessingsLatest
                ? blessingsLatest.map((blessing, index) => {
                    return (
                      <tr key={index}>
                        <td>{blessing.name}</td>
                        <td>{blessing.blessingNum}</td>
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
