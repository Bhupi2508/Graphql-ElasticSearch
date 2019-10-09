// constant file which has the query for Elastic Search
var elasticQuery = require('./elasticQuery');

// use the elastic client to perform query operation
var elasticClient = require('../client/elasticClient').elasticClient;

// resolves the methods and attributes
const resolvers = {
    Query:{        
            // get userdetails  (for a given userid ) and related active todos
            getUser(_,args){                
                return elasticClient.search(                    
                    elasticQuery.getUserTodoQuery(args)
            ).then(function(data){                   
                    return data.hits.hits[0]["inner_hits"].user.hits.hits[0]["_source"];                                                     
                },function (error) {
                    console.trace(error.message)
                }); 
           },           
           // get a specific todo item based on its id
           getTodo(_,args){                
               return elasticClient.search(                                          
                        elasticQuery.getSpecificTodoQuery(args)
                ).then(function(data){                    
                    return data.hits.hits[0]["_source"];                                     
                },function (error) {
                    console.trace(error.message)
                });                 
            },
            // get all active users and related todo items
            getActiveUsers(_,args){                                      
                return elasticClient.search(
                    elasticQuery.getActiveUsersQuery(args)
             ).then(function(data){                                       
                    var userList = [];
                    for(var counter=0; counter < data.hits.hits.length ; counter++){
                        userList[counter]=data.hits.hits[counter]["_source"];
                    }
                    return userList;                                                     
                },function (error) {
                    console.trace(error.message)
                }); 
            },    
            // for a specific user (for a given user id ) get active todos which has targetDate as today or tommorow      
            getTargetTodos(_,args){
                return elasticClient.search(
                    elasticQuery.getTargetTodosQuery(args)
                ).then(function(data){                       
                        var targetList = [];
                        for(var counter=0; counter < data.hits.hits[0]["inner_hits"].todos.hits.hits.length ; counter++){
                            targetList[counter]=data.hits.hits[0]["inner_hits"].todos.hits.hits[counter]["_source"];
                        }
                        return targetList;                        
                    },function (error) {
                        console.trace(error.message)
                    });
            },
    },    
    User:{
        // get the active todos for the specific user id
        todos(obj, args, context, info){                                                             
               return elasticClient.search(
                   elasticQuery.getActiveTodosForUser(obj)
               ).then(function(data){                    
                    var todosList = [];
                    for(var counter=0; counter < data.hits.hits.length ; counter++){
                        todosList[counter]=data.hits.hits[counter]["_source"];
                    }                  
                   return todosList;
                 },function (error) {
                    console.trace(error.message)
                });                             
        },
    },    
    Todo:{
        // get the todos for the parent user id
        users(obj,args){                                   
              return elasticClient.search(
                  elasticQuery.getTodosForUser(obj)
              ).then(function(data){                    
                    return [data.hits.hits[0]["_source"]];                                     
                },function (error) {
                    console.trace(error.message)
                });             
        },
    },
};

module.exports = resolvers;