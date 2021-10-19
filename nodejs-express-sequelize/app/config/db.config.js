module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "101010",
    DB: "soccer_db",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };