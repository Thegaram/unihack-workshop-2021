import React, { PureComponent } from 'react'

import { WorkshopNFT } from '../lib/conflux'
import ConfluxContract from './ConfluxContract'
import ConfluxPortal from './ConfluxPortal'
import NFTDisplay from './NFTDisplay'

class Toplevel extends PureComponent {
  state = {
    conflux: null,
  }

  onConnected = async (conflux) => {
    this.setState({ conflux })
  }

  render () {
    return (
      <div className="d-flex flex-column justify-content-center ">
        <div className="row d-flex justify-content-center p-2">
          <div className="col-md-5 mb-3">
            <div className="container-fluid mb-3">
              <ConfluxPortal
                onConnected={this.onConnected}
                conflux={this.state.conflux}
              />
            </div>
            <div className="container-fluid mb-3">
              {this.state.conflux &&
                <ConfluxContract
                  {...WorkshopNFT(this.state.conflux)}
                />
              }
            </div>
          </div>
          <div className="col-md-5 mb-3">
            {this.state.conflux &&
              <NFTDisplay
                {...WorkshopNFT(this.state.conflux)}
              />
            }
          </div>
        </div>
      </div>
    )
  }
}

export default function App () {
  return <Toplevel />;
}
