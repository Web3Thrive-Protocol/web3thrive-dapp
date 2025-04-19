// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;


/**
 * @notice Escrow Contract
 * @dev Manages job funds held during project execution
 */

contract Escrow{

    address public owner;

    constructor(){
        owner = msg.sender;
    }

    enum Status { Pending, Completed, Disputed, Released }

    struct Job {
        address client;
        address freelancer;
        uint256 amount;
        uint256 deadline;
        Status status;
    }

    uint256 public jobCounter;
    mapping(uint256 => Job) public jobs;

    // events
    event JobCreated(uint256 indexed jobId, address client, address freelancer, uint256 amount);
    event JobCompleted(uint256 indexed jobId);
    event JobDisputed(uint256 indexed jobId);
    event FundsReleased(uint256 indexed jobId);


    // functions
    function createJob(address _freelancer, uint256 _deadline) external payable{
        require(msg.value > 0, "Must fund escrow");

        jobCounter += 1;
        jobs[jobCounter] = Job({
            client: msg.sender,
            freelancer: _freelancer,
            amount: msg.value,
            deadline: block.timestamp + _deadline,
            status: Status.Pending
        });

        emit JobCreated(jobCounter, msg.sender, _freelancer, msg.value);
    }

    function completeJob(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.client, "Only client can confirm completion");
        require(job.status == Status.Pending , "Job not in pending state");

        job.status = Status.Completed;
        emit JobCompleted(_jobId);
    }

    function disputeJob(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(msg.sender == job.freelancer, "Only freelancer can dispute");
        require(job.status == Status.Pending, "Job not disputable");

        job.status = Status.Disputed;
        emit JobDisputed(_jobId);
    }

    function releaseFunds(uint256 _jobId) external {
        Job storage job = jobs[_jobId];
        require(job.status == Status.Completed || block.timestamp > job.deadline, "Cannot release funds yet");

        job.status = Status.Released;
        payable(job.freelancer).transfer(job.amount);

        emit FundsReleased(_jobId);
    }

}