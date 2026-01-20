const { Pool } = require('pg');
const games = require('./data.js');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function initDb(){
  const client = await pool.connect();

  try {

    await client.query(`
      CREATE EXTENSION IF NOT EXISTS pg_trgm;
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        platform TEXT NOT NULL,
        location TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL,
        image_url_number TEXT,
        platform_image_number TEXT,
        discount_price NUMERIC(10,2),
        discount_percent NUMERIC,
        cash_back NUMERIC(10,2),
        favourites NUMERIC,
        can_be_activated BOOLEAN DEFAULT TRUE
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS games_name_trgm_idx
      ON games
      USING GIN (name gin_trgm_ops);
    `);

    const rows = await client.query("SELECT * FROM games");
    
    if(rows.rowCount === 0){
      for(const game of games){
        console.log(game);
        await client.query(`
          INSERT INTO games (name, platform, location, price, image_url_number, platform_image_number, discount_price, discount_percent, cash_back, favourites, can_be_activated)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [game.name, game.platform, game.location, game.price, game.image_url_number, game.platform_image_number, game.discount_price, game.discount_percent, game.cash_back, game.favourites, game.can_be_activated]);
      }
    }

    console.log('DB initialied');
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

module.exports = {pool, initDb};