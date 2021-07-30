import React, { PureComponent } from 'react'
import confluxPortal from '../lib/conflux-portal'

export default class NFTDisplay extends PureComponent {
  state = {
    loading: false,
    result: '',
    error: '',
    owner: '',
    meta: null,
    contentUri: '',
  }

  onSubmit = async event => {
    event.preventDefault()

    const form = document.querySelector(`#token-id-form`)
    const tokenId = form.value

    this.setState({ loading: true })

    try {
      const owner = await this.props.contract.ownerOf(tokenId);
      this.setState({ owner, error: '' });
    } catch(err) {
      this.setState({ loading: false, error: err.message, owner: '', meta: null, contentUri: '' });
      return;
    }

    let contentUri;

    try {
      contentUri = await this.props.contract.tokenURI(tokenId);
      this.setState({ contentUri, error: '' });
    } catch(err) {
      this.setState({ loading: false, error: err.message, meta: null, contentUri: '' });
      return;
    }

    try {
      const metaResp = await fetch(contentUri, { mode: 'cors' });
      const meta = await metaResp.json();
      this.setState({ loading: false, meta, error: '' });
    } catch(err) {
      this.setState({ loading: false, error: err.message, meta: null });
      return;
    }
  }

  renderResult = () => {
    if (this.state.loading) {
      return (
        <div className="card-footer">
          Loading...
        </div>
      ) 
    } if (this.state.result) {
      return (
        <div className="card-footer">
          <pre className="overflow-hidden mb-0" style={{
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap',
          }}>{this.state.result}</pre>
        </div>
      )
    } else if (this.state.error) {
      return (
        <div className="card-footer text-danger">
          {this.state.error}
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    const { name, contract } = this.props

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Contract <code>{name}</code></h5>
          <p className="card-text">Address: <code>{contract.address}</code></p>
          <form className="mt-3" onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                id={'token-id-form'}
                className="form-control"
                placeholder={`token ID`}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Query
            </button>
          </form>

          {this.state.owner &&
            <React.Fragment>
              <hr />
              <p className="card-text">
                Owner: <code>{this.state.owner}</code>
              </p>
            </React.Fragment>
          }

          {this.state.contentUri &&
            <p className="card-text">
              contentUri: <code>{this.state.contentUri}</code>
            </p>
          }

          {this.state.meta && this.state.meta.image &&
            <div className="text-center">
            <img src={this.state.meta.image} className="img-fluid w-50 m-auto" alt="" />
            </div>
          }

          {this.state.meta && this.state.meta.description &&
            <p className="card-text">
              Description: <code>{this.state.meta.description}</code>
            </p>
          }
        </div>
        {this.renderResult()}
      </div>
    )
  }
}
