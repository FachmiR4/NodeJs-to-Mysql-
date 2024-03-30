const client = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.listen(3300, () => {
    console.log('Serve is running at port 3300');
});

client.connect();

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    client.query('select * from users', (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

app.get('/users/:id', (req, res) => {
    client.query(`select * from users where id = ${req.params.id}`, (err, result) => {
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
});

app.post('/users', (req, res) => {
    const user = req.body;
    console.log(user);
    const insertQuery = `INSERT INTO users(
                        id, firstname, lastname, location)
                        VALUES (${user.id}, '${user.firstname}', '${user.lastname}', '${user.location}');`;
    client.query(insertQuery, (err, result) => {
        if(!err){
            res.send('Insert was Successful');
        }else{
            console.log(err.message);
        }
    });
    client.end;
});

app.put('/users/:id', (req, res) => {
    const user = req.body;
    const updateQuery = `UPDATE users
                        SET id=${user.id}, firstname='${user.firstname}', lastname='${user.lastname}', location='${user.location}'
                        WHERE id = ${req.params.id};`;
    client.query(updateQuery, (err, result) => {
        if(!err){
            res.send('Update was Successful');
        }else{
            console.log(err.message);
        }
    });
    client.end;
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM users WHERE id = ${id};`;
    client.query(deleteQuery, (err, result)=>{
        if(!err){
            res.send('delete was Success');
        }else{
            console.log(err.message);
        }
    });
    client.end;
});
