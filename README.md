# UniHack NFT Workshop (Conflux Network)

## Overview

This project shows how to implement a simple NFT contract, including the backend serving the data, and the frontend that displays it. The code in this repository builds on the OpenZeppelin contract library and the [ObsidianLabs/conflux-frontend-react](https://github.com/ObsidianLabs/conflux-frontend-react) frontend template.

## Running the Example

0. Install [Conflux Portal](https://portal.confluxnetwork.org/) and [Conflux Studio](https://github.com/ObsidianLabs/ConfluxStudio/releases/).

1. Open `nft-contract` using Conflux Studio, compile and deploy setting `base` to `http://localhost/metadata/`.

2. Mint 4 tokens (with token IDs 1-4).

3. Run the backend:

```shell
> cd nft-backend
> npm install
> npm start
```

4. Verify that you can open `http://localhost/metadata/1` in your browser.

5. Run the frontend, substituting in the address of the contract you just deployed:

```shell
> cd nft-frontend
> npm install
> REACT_APP_WORKSHOP_NFT_ADDRESS='cfxtest:ace1y4tcnds2861d9ms0x7u6ey2by8fvput57hbmne' npm start
```

6. Open the frontend at `http://localhost:3000/`.