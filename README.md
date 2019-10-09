#Inquiry API - Assignments!!!#

### Assignments - Objective: ###
* get userdetails  (for a given userid ) and related active todos.
* get a specific todo item based on its id.
* get all active users and related todo items.
* for a specific user (for a given user id ) get active todos which has targetDate as today or tommorow.

  The above objective is met in two steps.
1) Elastic Search acts as a data store
2) NodeJS with Apollo-Graphql acts as a graphql server

### Prerequisites: ###
* Node js - installed
* Elastic Search - installed

### Process: ###
1) Elastic Search: 
execute the queries present in elastic_query.txt file using POST MAN. This would create the initial setup for User and Todo data model. The assignment queries are given for the stand alone elastic search as well.

2) Graphql: 
Apollo Graphql Server fires the elastic search query and resolves the result as the client expects.

#### Queries: ###
* Elastic Search: 
  elastic_query.txt
    * This file contains the list of queries for Creating the index, type & its mapping.
    * It also has the data setup queries to populate the initial data.
    * Using POST MAN, the data setup queries shall be executed using PUT method. 
* Graphql:
 graphql_queries.txt
    * This file has the client queries, which can be fired in the graphiql IDE.
	
### GraphQL exceution ###
```
1) Copy the files and paste into the specific folder
2) Start the elastic server from the Elastic server installation folder.
3) Go to Command Prompt
4) Navigate to the specific folder, where the files got copied.
5) type node server.js
6) The Graphql server will be started listening to the port 8090.
7) Open any browser and type http://localhost:8090/graphiql.
8) On the Left side window, fire the queries present in graphql_queries.txt.
9) The output will be shown on the right side window
```

### Test cases (Mocha Chai): ###
```
1) Open command prompt
2) Go to the specific folder
3) type 'npm test'
4) press enter
5) The test suite will get executed with the result.
```