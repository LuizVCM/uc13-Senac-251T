import banco from 'mysql2/promise';

export const pool = banco.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "livro"
})