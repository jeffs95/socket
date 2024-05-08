const { Sequelize } = require('sequelize');

export const config = new Sequelize(
    {
        host: "localhost",
        dialect: "postgres",
        schema: "public",
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

export const connect = async () => {
    config.authenticate().then(() => {
        console.info("Connection has been established successfully.");
    }).catch((error) => {
        console.error("Unable to connect to the database:.", error);
    });
};

export const closeConnection = async () => await config.close();