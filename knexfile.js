import "dotenv/config";
console.log(process.env.DB_HOST); // Should print '127.0.0.1'
console.log(process.env.DB_NAME);

export default {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8",
  },
};