pragma solidity ^0.4.15;

contract P2Gether {

    /* Standard state variables */
    address public owner;

    struct Plan {
        address hostAddress;
        address[] joinList;
        uint256 value;
        uint256 total;
        uint endTime;
    }

    Plan[] plans;

    uint constant PLAN_STAUS_WAITING = 0;
    uint constant PLAN_STAUS_CANCELLED = 1;
    uint constant PLAN_STAUS_FINISHED = 2;

    /* Event */
    event PlanCreated();
    event PlanJoined();
    event PlanCancelled();

    /* Modifier */
    modifier ownerOnly() {
		require(msg.sender == owner);
		_;
	}

    /* Constructor function, where owner set */
    function P2Gether() public {
        owner = msg.sender;
    }

    function createPlan() payable public returns (address, address[], uint256) {

        require(msg.value > 0);

        address[] memory joinList = new address[](0);

        plans.push(Plan({
            hostAddress : msg.sender,
            joinList : joinList,
            value: msg.value,
            endTime: now + 1 weeks,
            total : msg.value
        }));

        plans[plans.length-1].joinList.push(msg.sender);

        PlanCreated();

        return (
            plans[plans.length-1].hostAddress, 
            plans[plans.length-1].joinList,
            plans[plans.length-1].value
        );

    }

    function joinPlan(uint _planIndex) payable public returns (address, address[], uint256) {
        require(msg.value == plans[_planIndex].value);
        require(now <= plans[_planIndex].endTime);
        plans[_planIndex].joinList.push(msg.sender);
        plans[_planIndex].total += msg.value;

        PlanJoined();

        return (
            plans[_planIndex].hostAddress, 
            plans[_planIndex].joinList,
            plans[_planIndex].value
        );
    }

    // cancel plan
    function cancelPlan(uint _planIndex) public {

        bool check = false;
        uint index = 0;

        for (uint i = 0; i < plans[_planIndex].joinList.length; i++) {
            if (msg.sender == plans[_planIndex].joinList[i]) {
                check = true;
                index = i;
                break;
            }
        }
        require (check == true);

        if (msg.sender == plans[_planIndex].hostAddress) {
            if (plans[_planIndex].joinList.length == 1) {
                plans[_planIndex].hostAddress.transfer(plans[_planIndex].total);
            } else {
                
                uint surplus = plans[_planIndex].total % (plans[_planIndex].joinList.length - 1);
                uint total = plans[_planIndex].total - surplus;
                uint perShare = total / (plans[_planIndex].joinList.length - 1);
                
                for (i = 1; i < plans[_planIndex].joinList.length; i++) {
                    plans[_planIndex].joinList[i].transfer(perShare);
                }
                
                owner.transfer(surplus);
            }
        }

        address[] memory joinList = plans[_planIndex].joinList;
        plans[_planIndex].joinList = new address[](0);

        for (i = 0; i < joinList.length; i++) {
            if (joinList[index] != msg.sender) {
                plans[_planIndex].joinList.push(joinList[index]);
            }
        }

    }

    function finishPlan(uint _planIndex) public ownerOnly {
        require(now > plans[_planIndex].endTime);

        plans[_planIndex].hostAddress.transfer(plans[_planIndex].total);  
    }

}
