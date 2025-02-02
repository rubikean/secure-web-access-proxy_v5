const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

exports.assignBladeToUser = async (req, res) => {
    const { userId, bladeId } = req.body;
    const client = await pool.connect();
    try {
        await client.query(
            'INSERT INTO user_blades (user_id, blade_id) VALUES ($1, $2)',
            [userId, bladeId]
        );
        res.redirect('/admin/assign-blades');
    } finally {
        client.release();
    }
};

exports.getUserBlades = async (req, res) => {
    const userId = req.session.user.id;
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT b.* FROM blades b JOIN user_blades ub ON b.id = ub.blade_id WHERE ub.user_id = $1',
            [userId]
        );
        res.render('dashboard', { blades: result.rows });
    } finally {
        client.release();
    }
};
