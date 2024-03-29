const {createPool} = require('mysql');

const pool = createPool({
    host:"localhost",
    user:"root",
    password: '',
    connectionLimit: 10
});


pool.query('select * from belajar_oop.master_buku', (err, res) => {
    return console.log(res);
});