const express = require('express');
const pool = require('./db');
const app = express();

// routes
app.get('/', async(req, res) => {
    try{
        const data = await pool.query('SELECT * FROM schools');
        res.sendStatus(200).send({children: data.rows});
    }catch(err){
        console.log(err);
        res.sendStatus(400)
    }
});

app.post('/', async(req, res) => {
    const {name, address} = req.body();
    try{
        await pool.query(`INSERT INTO schools (name, address) VALUE (${name}, ${address})`);
        res.sendStatus(200).send({ message: "Successfully added childs"});
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
});

app.get('/setup', async(req, res) =>{
    try{
        await pool.query('CREATE TABLE schools(id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))');
        res.sendStatus(200).send({message: "Successfully created table"});
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
});

app.listen(3000, () => console.log('server has started on port 3000'));