pragma solidity ^0.4.15;

contract P2Gether {

    /* Standard state variables */
    address public owner;

    struct Plan {
        address hostAddress;
        address[] joinList;
        address[] confirmList;
        uint256 value;
        uint256 total;
        uint endTime;
        uint status;
    }

    mapping (bytes => Plan) plans;

    uint constant PLAN_STAUS_WAITING = 0;
    uint constant PLAN_STAUS_CANCELLED = 1;
    uint constant PLAN_STAUS_STARTED = 2;

    /* Event */
    event PlanCreated();
    event PlanJoined();
    event PlanCancelled();
    event PlanStarted();

    /* Modifier */
    modifier ownerOnly() {
		require(msg.sender == owner);
		_;
	}

    /* Constructor function, where owner set */
    function P2Gether() public {
        owner = msg.sender;
    }

    function createPlan(bytes planId) payable public returns (bool) {

        require(msg.value > 0);
        require(plans[planId].total == 0);

        address[] memory joinList = new address[](0);
        address[] memory confirmList = new address[](0);

        plans[planId] = Plan({
            hostAddress : msg.sender,
            joinList : joinList,
            confirmList : confirmList,
            value: msg.value,
            endTime: now + 1 weeks,
            total : msg.value,
            status : PLAN_STAUS_WAITING
        });

        plans[planId].joinList.push(msg.sender);

        PlanCreated();

        return true;
    }

    function joinPlan(bytes planId) payable public returns (bool) {

        require(plans[planId].total != 0);
        require(msg.value == plans[planId].value);
        require(now <= plans[planId].endTime);
        require(plans[planId].status == PLAN_STAUS_WAITING);

        plans[planId].joinList.push(msg.sender);
        plans[planId].total += msg.value;

        PlanJoined();

        return true;
    }

    // cancel plan
    function cancelPlan(bytes planId) payable public returns (bool) {

        require(plans[planId].status == PLAN_STAUS_WAITING);

        bool check = false;
        uint index = 0;

        for (uint i = 0; i < plans[planId].joinList.length; i++) {
            if (msg.sender == plans[planId].joinList[i]) {
                check = true;
                index = i;
                break;
            }
        }
        require (check == true);

        if (msg.sender == plans[planId].hostAddress) {
            if (plans[planId].joinList.length == 1) {
                plans[planId].hostAddress.transfer(plans[planId].total);
            } else {
                
                uint surplus = plans[planId].total % (plans[planId].joinList.length - 1);
                uint total = plans[planId].total - surplus;
                uint perShare = total / (plans[planId].joinList.length - 1);
                
                for (i = 1; i < plans[planId].joinList.length; i++) {
                    plans[planId].joinList[i].transfer(perShare);
                }
                
                if (surplus > 0) {
                    owner.transfer(surplus);
                }
            }
        }

        address[] memory joinList = plans[planId].joinList;
        plans[planId].joinList = new address[](0);

        for (i = 0; i < joinList.length; i++) {
            if (joinList[index] != msg.sender) {
                plans[planId].joinList.push(joinList[index]);
            }
        }

        plans[planId].status = PLAN_STAUS_CANCELLED;

        return true;
    }

    function startPlan(bytes planId) payable public returns (bool) {
        require(plans[planId].hostAddress == msg.sender);
        require(plans[planId].status == PLAN_STAUS_WAITING);
        require(now > plans[planId].endTime);

        plans[planId].hostAddress.transfer(plans[planId].total);  
        plans[planId].status = PLAN_STAUS_STARTED;

        PlanStarted();

        return true;
    }
}
