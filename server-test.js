var chai = require('chai');
var expect = require('chai').expect;
var server = require('./server');
var mocha = require('mocha');
var chaiHttp = require('chai-http');
var should = require('chai').should();
var unitTestQuery = require('./unitQuery.js');

chai.use(chaiHttp);

describe('/POST: Test Cases for User Todo', () => {
    //get a specific todo item based on its id
    it('get a specific todo item based on its id', (done) => {    
        chai.request(server)    
        .post('/graphql')    
        .set('content-type','application/json')    
        .send(JSON.stringify({ query: unitTestQuery.TC1_specificTodoQry}))
        .end(function(err, res) {                                
        //console.log("**** response: "+JSON.stringify(res.body.data.getTodo.text));                            
            res.should.have.status(200);        
            res.body.data.getTodo.text.should.equal(unitTestQuery.TC1_specificTodoQry_Text);        
            done();
        });
    });
    // get userdetails  (for a given userid ) and related active todos
    it('get userdetails  (for a given userid ) and related active todos', (done) => {    
        chai.request(server)    
        .post('/graphql')    
        .set('content-type','application/json')    
        .send(JSON.stringify({ query: unitTestQuery.TC1_userDetailsQry }))
        .end(function(err, res) {                                
         //console.log("**** response: "+JSON.stringify(res.body.data.getUser.id));                            
            res.should.have.status(200);        
            res.body.data.getUser.id.should.equal(unitTestQuery.TC1_userDetailsQry_ID);        
            done();
        });
    });
    // get all active users and related todo items
     it('get all active users and related todo items', (done) => {    
        chai.request(server)    
        .post('/graphql')    
        .set('content-type','application/json')    
        .send(JSON.stringify({ query: unitTestQuery.TC1_activeUserQry }))
        .end(function(err, res) {                                
        // console.log("**** response: "+JSON.stringify(res.body.data.getActiveUsers));                            
            res.should.have.status(200);        
            res.body.data.getActiveUsers[0].id.should.equal(unitTestQuery.TC1_activeUserQry_ID);        
            done();
        });
    });
    // for a specific user, get active todos which has targetDate as today or tommorow
    it('for a specific user, get active todos which has targetDate as today or tommorow', (done) => {    
        chai.request(server)    
        .post('/graphql')    
        .set('content-type','application/json')    
        .send(JSON.stringify({ query: unitTestQuery.TC1_targetTodoQry }))
        .end(function(err, res) {                                
         // console.log("**** response: "+JSON.stringify(res.body.data.getTargetTodos));                            
            res.should.have.status(200);        
            res.body.data.getTargetTodos[0].text.should.equal(unitTestQuery.TC1_targetTodoQry_Text);        
            done();
        });
    });  
});

