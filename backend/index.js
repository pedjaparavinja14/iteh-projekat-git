const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
// const mysql = require('mysql2/promise');
const mysql = require('mysql2')
const app = express();
app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
    host: 'mysql', //gadjamo kao host mysql container_name = mysql
    user: 'root',
    password: 'root',
    database: 'simpledb',
    port: 3306
});

// Konekcija
db.connect(error => {
    if(error) {
        console.log(error, 'error in db connection');
        // ugasiti proces ako app ne moze da se konektuje na bazu, da bi docker opet restartovao kontejner (u medjuvremenu se db kontejner podigao)
        process.exit()
    }else{
        console.log('database connected...');
    }
    
});

//uzmi podatke
app.get('/user', (req, res) => {
    console.log('get users: ');
    let query = 'select * from user';
    db.query(query, (error, result) =>{
        if(error){
            console.log(error, 'err');
        }

        if(result.length > 0){
            res.send({
                message: 'all user data',
                data:result 
            });
        }
    });
});

app.get('/user/:id', (req,res)=>{
    let gID = req.params.id;
    let query = 'select * from user where id = ' + gID;
    db.query(query, (error,result)=>{
        if(error){console.log(error);}
        if(result.length > 0){
            res.send({
                message:'get single data',
                data:result
            });
        }
        else
        {
            res.send({
                message: 'data not found'
            });
        }
        
    });

});

app.post('/user/save',(req,res) =>{
    console.log(req.body, 'create data');
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    
    let qr = `INSERT INTO user (fullname, email, mobile) VALUES ('${fullName}', '${eMail}', '${mb}')`;
    db.query(qr,(err,result)=>{

        if(err){console.log(err);}
        console.log(result, 'result')
        res.send({
            message: 'data inserted',

        });


    });

});

//apdejt jednog usera

app.put('/user/save/:id', (req,res)=>{
    console.log(req.body, 'update data');
    let gID = req.params.id;


    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `UPDATE user SET fullname = '${fullName}', email = '${eMail}', mobile = '${mb}' WHERE id = ${gID}`;
    db.query(qr,(err,result) =>{
        if(err){console.log(err);}
        res.send({
            message: 'data updated'
        });


    });

});

//brisanje jednog usera

app.delete('/user/:id', (req, res) => {
    let qID = req.params.id;
    let qr = `DELETE FROM user WHERE id = '${qID}'`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'error delete user'
            });
        } else {
            res.send({
                message: 'user deleted succesfully'
            });
        }
    });
});

app.listen(3000, () => {
    console.log('server running on port 3000');
})