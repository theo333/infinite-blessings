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
        // setTimeout(() => {
        //   this.props.history.push('/');
        // }, 60000);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { blessingHighest, blessingsTotal, blessingsQty, blessingsLatest } = this.state;
    const { name, blessingNum } = blessingHighest;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <button type="button" onClick={() => this.props.history.push('/')}>
              BEGIN
            </button>
            <div>
              <h2>Highest Blessings</h2>
              <p className="h4">
                {name} {blessingNum ? blessingNum.toLocaleString() : ''}
              </p>
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
            <div>
              <h2>Total Given</h2>
              <p className="h4">{blessingsTotal ? blessingsTotal.toLocaleString() : ''}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
