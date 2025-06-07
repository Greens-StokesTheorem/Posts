import path from "path";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({
    override: true,
    path: path.join(process.cwd(), "development.env")
});

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORTDB
})

export async function connect(query) {

    try {
        const client = await pool.connect(); 
        const {rows} = await client.query(query);
        client.release();
        return rows;
    } catch (err) {
        console.log(err)
    }

}
