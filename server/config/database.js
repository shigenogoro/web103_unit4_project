import pg from "pg"; 
import "./dotenv.js"; 
const config = {

    user: process.env.PGUSER, 
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    host: process.env.PGHOST,

};

console.log("Config: ", config);

export const pool = new pg.Pool(config); 