import mysql from 'mysql2/promise';

export const db = await mysql.createPool({
    host: 'localhost',         
    user: 'root',              
    password: '12345678',       
    database: 'be_luna',
});