import abiWorkshopNFT from './abi/WorkshopNFT.json'

export const WorkshopNFT = (conflux) => ({
  name: 'WorkshopNFT',
  abi: abiWorkshopNFT,
  contract: conflux.Contract({
    abi: abiWorkshopNFT,
    address: process.env.REACT_APP_WORKSHOP_NFT_ADDRESS,
  }),
});