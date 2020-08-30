function get_repos(req,res,conn,e){
    if(e){
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    }
    conn.query("select * from repos;",(err,rows)=>{
        if(!err){
            res.status(200)
            res.json({"status" : "found", "result" : rows})
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


function post_repos(req,res,conn,e){
    if(e){
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    }
    conn.query(`show tables like '${req.body.repo_name}'`,(err,rows)=>{
        if(!err){
            if(rows.length === 0){
                conn.query(`CREATE TABLE \`${req.body.repo_name}\` (id INT AUTO_INCREMENT NOT NULL,author_name VARCHAR(20),description VARCHAR(150),title VARCHAR(20), entry_date DATE,primary key (id)); INSERT INTO repos VALUES ('${req.body.repo_name}','${req.body.auth_name}');`,(e,rows)=>{
                    res.status(200)
                    res.json({"status" : "table created"})
                })
            }
            else{
                res.status(400)
                res.json({"status" : "same repository present!! please try different repository name"});
            }
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

function find_repos(req,res,conn,e){
    if(e){
        res.status(500)
        res.json({"status" : "Database connection error"});
        return
    }
    conn.query(`select * from repos where repo_name like '%${req.params.repository}%';`,(err,rows)=>{
        if(!err){
            res.status(200)
            res.json({"status" : "found", "result" : rows})
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


module.exports.get_repos = get_repos
module.exports.post_repos = post_repos
module.exports.find_repos = find_repos