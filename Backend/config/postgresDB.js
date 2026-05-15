import { Pool } from "pg";
const pool = new Pool ({
    user : "postgres",
    host :"localhost",
    database : "ExamPortal",
    password : "vipul1234",
    port : "5432"
})

export default pool;