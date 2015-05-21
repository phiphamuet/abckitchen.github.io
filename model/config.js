/**
 * Created by PHI on 5/19/2015.
 */
var mysql=require('mysql');
var mysqlConfig={
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nha_hang'
};
var pool=mysql.createConnection(mysqlConfig);
pool.connect();
module.exports=pool;