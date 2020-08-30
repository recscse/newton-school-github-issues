// Importing module
var mysql = require('mysql');
var express = require("express");
const cors=require('cors')
const bodyParser = require('body-parser');

var app = express();

var repos = require('./schemas/repository')
var issues = require('./schemas/issues');
const { response } = require('express');

app.use(cors())
app.use(bodyParser.json())

// Make database connection to handle 10 concurrent users
var database_connection = mysql.createPool({
    connectionLimit :10,
    host : 'localhost',
    user : 'root',
    password : '12345678',
    database : 'githubissues',
    debug : true,
    multipleStatements:true
});

/* Make pooled connection with a database and read specific records from a table of that
 database */
database_connection.getConnection((e,conn)=>{
    app.get("/",(req,res)=>{
        res.status(200)
        res.send({status:'working'}) //this api is created for checking if server is up and running
    })
    app.get("/repos/all",(req,res)=>{
        repos.get_repos(req,res,conn,e) //this api is created for fetching all the repository created by user
    })
    app.get("/repos/find/:repository",(req,res)=>{
        repos.find_repos(req,res,conn,e) //this api is created for finding a particular repository
    })
    app.post("/repos/post",(req,res)=>{
        repos.post_repos(req,res,conn,e) //this api is created for adding a repository 
    })
    app.get("/list-issues/:repo_name",(req,res)=>{
        issues.get_issues(req,res,conn,e) //this api is created for listing all the issues created by the user in particular repository mentioned by user
    })
    app.post("/add-issues/:repo_name",(req,res)=>{
        issues.post_issues(req,res,conn,e) //this api is used for adding issues in particular repository mentioned by user
    })
    app.delete("/issues/delete",(req,res)=>{
        issues.delete_issues(req,res,conn,e) //this api is used for deleting issues in particular repository mentioned by user
    })
    app.put("/update-issues",(req,res)=>{
        issues.update_issues(req,res,conn,e) //this api is used for updating issues in particular repository mentioned by user
    })
})


// Listen the connection request on port 5000
app.listen(5000);