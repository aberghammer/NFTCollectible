pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollectible is Ownable, ERC721{

    uint256 public totalSupply=0;
    uint256 constant public MAX_AMOUNT = 10000;
    uint256 constant public MAX_TOKENS_PER_ACCOUNT = 3;
    uint256 constant public LISTING_PRICE = 0.05 ether;
    string private _nftBaseURI = "https://dummyURI/";



    constructor() ERC721("DYING WORLDS", "DW"){
        for(uint i=0; i<50; i++)
        {
            _safeMint(msg.sender, ++totalSupply);
        }
    }


    function mintTokenFromWeb(uint256 tokenQuantity) external payable{
        require(totalSupply + tokenQuantity <= MAX_AMOUNT, "project is sold out!");
        require(LISTING_PRICE * tokenQuantity <= msg.value, "not enough ether was sent!");
        require(balanceOf(msg.sender) + tokenQuantity <= MAX_TOKENS_PER_ACCOUNT, "you can only mint three tokens per account!");

        for(uint256 i = 0; i<tokenQuantity; i++){
            _safeMint(msg.sender, ++totalSupply);
        }

    }

    function withdraw(address treasury) external payable onlyOwner{
        require(payable(treasury).send(address(this).balance));
    }

    function _baseURI() internal view override returns (string memory){
        return _nftBaseURI;
    }

}
