// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;


/**
 * @notice Learning Module Contract
 * @dev Tracks course enrollments and completions
 */
contract LearningModule {
    
    struct Course {
        string title;
        string uri;
    }

    mapping(uint256 => Course) public courses;
    mapping(address => mapping(uint256 => bool)) public completed;
    uint256 public courseCounter;

    event CourseCreated(uint256 indexed id, string title, string uri);
    event CourseCompleted(address indexed user, uint256 indexed id);

    function createCourse(string memory _title, string memory _uri) external {
        courseCounter++;
        courses[courseCounter] = Course(_title, _uri);
        emit CourseCreated(courseCounter, _title, _uri);
    }

    function completeCourse(uint256 _id) external {
        require(!completed[msg.sender][_id], "Already completed");
        completed[msg.sender][_id] = true;
        emit CourseCompleted(msg.sender, _id);
    }

    function hasCompleted(address _user, uint256 _id) external view returns (bool) {
        return completed[_user][_id];
    }
}
