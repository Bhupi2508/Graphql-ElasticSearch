/* Test cases for the User USER55557*/
var unitTestQuery = {
    // get a specific todo item based on its id
    TC1_specificTodoQry:'{ getTodo(id: "ID1"){id,text,done} }',

    TC1_specificTodoQry_Text:'Book ticket',

    // get userdetails  (for a given userid ) and related active todos
    TC1_userDetailsQry: '{ getUser(id: "USER55557"){id,fName,lName,todos{id,text,done}} }',

    TC1_userDetailsQry_ID:'USER55557',

    // get all active users and related todo items
    TC1_activeUserQry:'{ getActiveUsers(isActive: "true") {id,fName,lName,todos{id,text,done}} }',

    TC1_activeUserQry_ID:'USER55557',

    // for a specific user, get active todos which has targetDate as today or tommorow
    TC1_targetTodoQry: '{ getTargetTodos(id: "USER55557"){id,text,done} }',

    TC1_targetTodoQry_Text:'Prepare lunch'
};

module.exports = unitTestQuery;