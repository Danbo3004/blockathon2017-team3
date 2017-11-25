pragma solidity ^0.4.15;

contract Deal {

    /* Standard state variables */
    address public owner;

    struct DealContract {
		address userAddress;
        address hostAddress;
        uint256 depositePrice;
        uint256 payLaterPrice;
		uint256 price;
        uint status;
	}

    uint constant DEAL_STATUS_PENDING = 0;
    uint constant DEAL_STATUS_USER_CANCELLED = 10;
    uint constant DEAL_STATUS_HOST_CANCELLED = 11;
    uint constant DEAL_STATUS_HOST_ACCEPTED = 20;
    uint constant DEAL_STATUS_USER_VIOLATED = 30;
    uint constant DEAL_STATUS_HOST_VIOLATED = 31;
    uint constant DEAL_STATUS_FINISHED = 40;

    uint constant DEAL_CANCELLED_BY_USER = 1;
    uint constant DEAL_CANCELLED_BY_HOST = 2;

    /* Keep track balances of every user */
    mapping (address => uint256) userBalances;
    mapping (address => uint256) userFreezeBalances;

    /* Keep track balances of every host */
    mapping (address => uint256) hostBalances;
    mapping (address => uint256) hostFreezeBalances;

    /* Keep track of every deal */
    mapping (uint => DealContract) deals;

    mapping (address => uint[]) userDealIndex;

    mapping (address => uint[]) hostDealIndex; 

    uint dealIndex = 0;

    /* End Standard state variables */

    /* Event */
    event DealMade();
    event DealCancelled();
    event DealAccepted();
    event DealViolated();
    event DealFinished();

    /* End Event */

    /* Modifier */
    modifier ownerOnly() {
		require(msg.sender == owner);
		_;
	}
    /* End Modifier */

    /* Constructor function, where owner set */
    function Deal() public {
        owner = msg.sender;
    }

    function userDeposit () payable public returns (uint256) {
        userBalances[msg.sender] += msg.value;

        return userBalances[msg.sender];
    }

    function hostDeposit () payable public returns (uint256) {
        hostBalances[msg.sender] += msg.value;

        return hostBalances[msg.sender];
    }

    // Make deal from users
    function makeDeal (address _hostAddress, uint256 _price) public {        

        require(userBalances[msg.sender] >= _price);

        userBalances[msg.sender] -= _price;
        userFreezeBalances[msg.sender] += _price;

        uint256 depositPrice = _price / 100 * 20;
        uint256 payLaterPrice = _price - depositPrice;

        deals[dealIndex] = DealContract({
            userAddress : msg.sender,
            hostAddress : _hostAddress,
            depositePrice : depositPrice,
            payLaterPrice : payLaterPrice,
            price : _price,
            status : DEAL_STATUS_PENDING
        });
        userDealIndex[msg.sender].push(dealIndex);
        hostDealIndex[_hostAddress].push(dealIndex);

        dealIndex = dealIndex + 1;
    }

    function getDeal (uint _dealIndex) public returns (address, address, uint) {
        return (deals[_dealIndex].userAddress, deals[_dealIndex].hostAddress, deals[_dealIndex].price);
    }

    function hostAccepted (uint _dealIndex) public {
        require(deals[_dealIndex].hostAddress == msg.sender);
        require(deals[_dealIndex].status == DEAL_STATUS_PENDING);
        require(hostBalances[msg.sender] >= deals[_dealIndex].depositePrice);

        hostBalances[msg.sender] -= deals[_dealIndex].price;
        hostFreezeBalances[msg.sender] += deals[_dealIndex].price;
        
        deals[_dealIndex].status = DEAL_STATUS_HOST_ACCEPTED;
    }

    function userCancelled (uint _dealIndex) public {
        require(deals[_dealIndex].userAddress == msg.sender);
        require(deals[_dealIndex].status == DEAL_STATUS_PENDING);

        userFreezeBalances[msg.sender] -= deals[_dealIndex].price;
        userBalances[msg.sender] += deals[_dealIndex].price;

        deals[_dealIndex].status = DEAL_STATUS_USER_CANCELLED;
        DealCancelled();
    }

    function hostCancelled (uint _dealIndex) public {
        require(deals[_dealIndex].hostAddress == msg.sender);
        require(deals[_dealIndex].status == DEAL_STATUS_PENDING);

        userFreezeBalances[msg.sender] -= deals[_dealIndex].price;
        userBalances[msg.sender] += deals[_dealIndex].price;

        hostFreezeBalances[msg.sender] -= deals[_dealIndex].depositePrice;
        hostBalances[msg.sender] += deals[_dealIndex].depositePrice;

        deals[_dealIndex].status = DEAL_STATUS_HOST_CANCELLED;
        DealCancelled();
    }

    // user violated transfer money for host
    function userViolated (uint _dealIndex) ownerOnly public {
        require(deals[_dealIndex].status == DEAL_STATUS_HOST_ACCEPTED);

        hostFreezeBalances[deals[_dealIndex].hostAddress] -= deals[_dealIndex].depositePrice;
        hostBalances[deals[_dealIndex].hostAddress] += deals[_dealIndex].depositePrice;

        userFreezeBalances[deals[_dealIndex].userAddress] -= deals[_dealIndex].depositePrice;
        hostBalances[deals[_dealIndex].hostAddress] += deals[_dealIndex].depositePrice;

        userFreezeBalances[deals[_dealIndex].userAddress] -= deals[_dealIndex].payLaterPrice;
        userBalances[deals[_dealIndex].userAddress] += deals[_dealIndex].payLaterPrice;

        deals[_dealIndex].status = DEAL_STATUS_USER_VIOLATED;
        DealViolated();
    }

    function hostViolated (uint _dealIndex) ownerOnly public {
        require(deals[_dealIndex].status == DEAL_STATUS_HOST_ACCEPTED);

        hostFreezeBalances[deals[_dealIndex].hostAddress] -= deals[_dealIndex].depositePrice;
        userBalances[deals[_dealIndex].userAddress] += deals[_dealIndex].depositePrice;

        userFreezeBalances[deals[_dealIndex].userAddress] -= deals[_dealIndex].depositePrice;
        userBalances[deals[_dealIndex].userAddress] += deals[_dealIndex].depositePrice;

        userFreezeBalances[deals[_dealIndex].userAddress] -= deals[_dealIndex].payLaterPrice;
        userBalances[deals[_dealIndex].userAddress] += deals[_dealIndex].payLaterPrice;

        deals[_dealIndex].status = DEAL_STATUS_HOST_VIOLATED;
        DealViolated();
    }

    function getUserBalance(address _userAddress) constant public returns (uint) {
        return userBalances[_userAddress];
    }

    function getHostBalance(address _hostAddress) constant public returns (uint) {
        return userBalances[_hostAddress];
    }    
}
