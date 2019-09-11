/* eslint-disable indent */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
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
    this.getBlessings();
  }

  // TODO refactor - change to async
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

        const blessingsTotal = blessings.reduce((total, current) => {
          return total + current.blessingNum;
        }, 0);

        const blessingsQty = blessings.length;

        const blessingsLatest = num => {
          return blessings.slice(-num).reverse();
        };
        this.setState({
          blessingHighest: blessingHighest(),
          blessingsTotal,
          blessingsQty,
          blessingsLatest: blessingsLatest(10),
        });
      })
      .then(() => {
        // go to home page after 60 seconds
        setTimeout(() => {
          this.props.history.push('/');
        }, 60000);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { blessingHighest, blessingsTotal, blessingsQty, blessingsLatest } = this.state;
    const { name, blessingNum } = blessingHighest;
    return (
      <div id="stats-page">
        <div className="container">
          <div className="row align-items-center h-100">
            <div className="col-md-6 mx-auto text-center">
              <button className="btn" type="button" onClick={() => this.props.history.push('/')}>
                BEGIN
              </button>
              <div>
                <h2>HIGHEST BLESSINGS</h2>
                <p>
                  {name} <span>{blessingNum ? blessingNum.toLocaleString() : ''}</span>
                </p>
              </div>
              <div>
                <h2>TOTAL BLESSINGS GIVEN</h2>
                <p>{blessingsTotal ? blessingsTotal.toLocaleString() : ''}</p>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <div>
                <h2>LATEST BLESSINGS</h2>
                <table className="table col-sm-9 offset-sm-2">
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
          </div>
        </div>
      </div>
    );
  }
}
