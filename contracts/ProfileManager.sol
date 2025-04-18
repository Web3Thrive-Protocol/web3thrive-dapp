// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProfileManager {
    // Enum for user roles
    enum RoleType { Freelancer, Recruiter }

    // Struct to store minimal user profile data
    struct Profile {
        string name;          // User's name
        RoleType roleType;   // Freelancer or Recruiter
        uint hourlyRate;     // Optional: Hourly rate for freelancers
        bool exists;         // Flag to check if the profile exists
    }

    // Mapping to store profiles
    mapping(address => Profile) public profiles;

    // Events for tracking actions
    event ProfileCreated(address indexed user);
    event ProfileUpdated(address indexed user);
    event ProfileDeleted(address indexed user);

    // Custom error for unregistered users
    error NotRegistered();

    // Modifier to ensure only registered users can call certain functions
    modifier onlyRegistered() {
        if (!profiles[msg.sender].exists) revert NotRegistered();
        _;
    }

    /**
     * @notice Creates a new user profile with minimal data
     */
    function createProfile(
        string calldata _name,
        RoleType _roleType,
        uint _hourlyRate // Optional: Set to 0 if not applicable
    ) external {
        require(!profiles[msg.sender].exists, "Profile already exists");

        profiles[msg.sender] = Profile({
            name: _name,
            roleType: _roleType,
            hourlyRate: _hourlyRate,
            exists: true
        });

        emit ProfileCreated(msg.sender);
    }

    /**
     * @notice Updates an existing user profile with minimal data
     */
    function updateProfile(
        string calldata _name,
        RoleType _roleType,
        uint _hourlyRate // Optional: Set to 0 if not applicable
    ) external onlyRegistered {
        Profile storage p = profiles[msg.sender];
        p.name = _name;
        p.roleType = _roleType;
        p.hourlyRate = _hourlyRate;

        emit ProfileUpdated(msg.sender);
    }

    /**
     * @notice Deletes a user profile
     */
    function deleteProfile() external onlyRegistered {
        profiles[msg.sender].exists = false; // Mark profile as deleted
        emit ProfileDeleted(msg.sender);
    }

    /**
     * @notice Retrieves the profile of a given user
     */
    function getProfile(address _user) external view returns (
        string memory name,
        string memory role,
        uint hourlyRate,
        bool exists
    ) {
        Profile memory p = profiles[_user];
        require(p.exists, "Profile does not exist");

        // Convert RoleType to string
        string memory roleStr = roleTypeToString(p.roleType);

        return (p.name, roleStr, p.hourlyRate, p.exists);
    }

    /**
     * @notice Converts RoleType enum to a human-readable string
     */
    function roleTypeToString(RoleType _role) public pure returns (string memory) {
        if (_role == RoleType.Freelancer) return "freelancer";
        if (_role == RoleType.Recruiter) return "recruiter";
        revert("Invalid role");
    }
}