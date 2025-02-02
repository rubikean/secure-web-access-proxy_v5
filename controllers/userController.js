const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

exports.createUser = async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await pool.connect();
    try {
        await client.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
            [username, hashedPassword, role]
        );
        res.redirect('/admin/manage-users');
    } finally {
        client.release();
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const client = await pool.connect();
    try {
        await client.query('DELETE FROM users WHERE id = $1', [id]);
        res.redirect('/admin/manage-users');
    } finally {
        client.release();
    }
};
