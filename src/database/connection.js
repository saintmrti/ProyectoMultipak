const sql = require('mssql');

const dbSettings = {
    user: '*********',
    password: '*********',
    database: '*********',
    server: '*********',
    options: {
        encrypt: true,
    },
}

module.exports.getConnection = async function getConnection(){
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
};