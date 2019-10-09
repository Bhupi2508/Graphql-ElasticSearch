// get the User Todos for the given User ID
function getUserTodoQuery(args) {
  return {
      index: 'master',                                
      body: {
        query: {
        has_parent: {
            type: 'user',
            query: {
                match: {
                        id: args.id
                    }
            },
            inner_hits: {				   
            }		   
        }		
        },
        post_filter: { 
            term: { done: true }
        }
    }
}
};

// get the specific Todo for the given ID
function getSpecificTodoQuery(args) {
  return {
    index: 'master',
    type: 'todos',
    filterPath: 'hits.hits._source',
    body: {                
            query: {
            match: {         
                id: args.id        
            }
            }                            
        }
    }
};

// get the active users
function getActiveUsersQuery(args) {
return {
    index: 'master',                                
        body: {
            query: {
            has_child: {
                type: 'todos',
                query: {
                    match_all: {                                      
                        }
                },
                inner_hits: {				   
                }		   
            }		
            },
            post_filter: { 
                term: { isActive: true }
            }
        }
    }
};

// get the todos targetted for the given User ID
function getTargetTodosQuery(args) {
    return {
    index: 'master',                                
    body: {
        query: {
        has_child: {
            type: 'todos',
            query: {
            bool : {
                must: [
                    { match: { userid: args.id}}, 
                    { match: { done: false }}  
                ],			
                should : {
                    range : {
                    targetDate : {
                        gte : 'now-1d',
                        lt :  'now+1d'
                    }
                    }   
                }
            }
            },
            inner_hits: {				   
            }
            }
        }
    }
}
};


// resolve the Active Todos
function getActiveTodosForUser(args) {
    return {               
        index: 'master',
        type: 'todos',
        filterPath: 'hits.hits._source',
        body: {                
        query: {
        match: {         
            userid: args.id                                 
        }
        },
        post_filter: { 
            term: { done: false }
        }                            
        }
    }
};

// resolve the Todos for User
function getTodosForUser(args) {
    return {               
        index: 'master',
        type: 'user',
        filterPath: 'hits.hits._source',
        body: {                
            query: {
                match: {         
                    id: args.userid      
                }
            }                            
        }
    }
};

// export the query methods
module.exports = {
    getUserTodoQuery  ,
    getSpecificTodoQuery,
    getActiveUsersQuery,
    getTargetTodosQuery,
    getActiveTodosForUser,
    getTodosForUser   
};