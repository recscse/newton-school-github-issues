function get_issues(req,res,conn,e){
    if(e){
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    }
    var offset=0;
    if(Boolean(req.query.page) === true){
        offset = 5*req.query.page
    }
    conn.query(`select * from \`${req.params.repo_name}\` limit 5 offset ${offset};`,(err,rows)=>{
        if(!err){
            res.status(200)
            res.json({"status" : "success", "result" : rows});
        }
        else{
            res.status(400)
            res.json({"status" : "some problem while querying in sql"})
        }
    })
    conn.on('error',(err)=>{
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    })
}

function post_issues(req,res,conn,e){
    if(e){
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    }
    conn.query(`insert into \`${req.params.repo_name}\` (author_name,description,title,entry_date) values ("${req.body.author_name}","${req.body.description}","${req.body.title}","${req.body.entry_date}");`,(err,rows)=>{
        if(!err){
            res.status(200)
            res.json({"status" : "added-successfully"})
        }
        else{
            res.status(400)
            res.json({"status" : "some problem while querying in sql"})
        }
    })
    conn.on('error',(err)=>{
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    })
}

function delete_issues(req,res,conn,e){
    if(e){
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    }
    if(Boolean(req.query.repo_name) && Boolean(req.query.id) === false){
        res.status(400)
        res.json({"status" : "repo_name or id is missing"})
    }
    conn.query(`delete from \`${req.query.repo_name}\` where id=${req.query.id};`,(err,rows)=>{
        if(!err){
            res.status(200)
            res.json({"status" : "deleted-successfully"})
        }
        else{
            res.status(400)
            res.json({"status" : "some problem while querying in sql"})
        }
    })
    conn.on('error',(err)=>{
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    })
}

function update_issues(req,res,conn,e){
    if(e){
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    }
    if(Boolean(req.query.repo_name) && Boolean(req.query.id) === false){
        res.status(400)
        res.json({"status" : "repo_name or id is missing"})
    }
    conn.query(`update from \`${req.query.repo_name}\` set author_name="${req.body.author_name}" description="${req.body.description}" title="${req.body.title}" entry_date="${req.body.entry_date}" where id=${req.query.id};`,(err,rows)=>{
        if(!err){
            res.status(200)
            res.json({"status" : "deleted-successfully"})
        }
        else{
            res.status(400)
            res.json({"status" : "some problem while querying in sql"})
        }
    })
    conn.on('error',(err)=>{
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    })
}

module.exports.get_issues = get_issues
module.exports.post_issues = post_issues
module.exports.delete_issues = delete_issues
module.exports.update_issues = update_issues