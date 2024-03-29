const {Client} = require('pg');

const client = new Client({
    host:"localhost",
    user:"postgres",
    port:5050,
    password:"Admin",
    database:"postgres"
});

client.connect();

client.query('select * from user', (err, res) => {
    if(!err){
        console.log(res.rows);
    }else{
        console.log(err.message);
    }
    client.end;
})