module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PW,
    DB: process.env.DB_NAME,
    dialect: 'mysql',
    pool: {
        //maximum number of connection in pool
        max: 5,
        //minimum number of connection in pool
        min: 0,
        //maximum time, in milliseconds, that pool will try to get connection before throwing error
        acquire: 30000,
        //maximum time, in milliseconds, that a connection can be idle before being released
        idle: 10000
    }
};
