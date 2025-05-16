import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
    host: 'localhost',         
    user: 'root',              
    password: '1111111111',       
    database: 'be_luna',
});    