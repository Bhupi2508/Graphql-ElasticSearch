const typeDefinitions = `
# User Schema definition 
type User{
    # User ID
    id: String!,
    # First Name of the User
    fName: String,
    # Last Name of the User
    lName: String,
    # Email ID of the User
    email: String,
    # Pincode of User address
    pinCode: String,
    # Date of Birth of User
    birthDate: String,
    # flag for status of the User
    isActive: Boolean
    # List of Todos mapped for User
    todos:[Todo]
}

# Todo Schema definition 
type Todo{
    # Todo ID
    id: String!,    
    # Specific Todo Description
    text: String,
    # flag for the Status 
    done: Boolean,
    # Target Date for the Task
    targetDate: String,
    # Task is mapped to User ID
    userid: String,
    # List of Users who have Tasks
    users: [User]
}

# Query definition 
type Query {  
    #get userdetails  (for a given userid ) and related active todos
        getUser(id: String!): User,        
    #get a specific todo item based on its id
        getTodo(id: String!): Todo,
    #get all active users and related todo items
        getActiveUsers(isActive: String!): [User],
    #for a specific user (for a given user id ) get active todos which has targetDate as today or tommorow
        getTargetTodos(id:String!): [Todo]
}
 
schema{
    query: Query
}
`;

module.exports = [typeDefinitions];