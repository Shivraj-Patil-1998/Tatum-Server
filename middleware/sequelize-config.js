module.exports = {
  development: {
    username: "postgres",
    password: "Spatil@1998",
    database: "postgres",
    host: "localhost",
    dialect: "postgres",
    timezone: "utc",
    port: 5432,
    ssl: true,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 20000,
    },
  },
};
