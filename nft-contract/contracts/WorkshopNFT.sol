pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract WorkshopNFT is ERC721 {

    address private _owner;
    string private _base;

    constructor(string memory name, string memory symbol, string memory base) ERC721(name, symbol) {
        _base = base;
        _owner = msg.sender;
    }

    function mint(address to, uint256 tokenId) public {
        require(msg.sender == _owner, "Unauthorized");
        _mint(to, tokenId);
    }

    // abc.com/
    // abc.com/1
    function _baseURI() internal view override returns (string memory) {
        return _base;
    }

}