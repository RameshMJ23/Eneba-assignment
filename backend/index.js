require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {pool, initDb} = require('./db/db.js');

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

initDb().catch(err => {
  console.error(err);
})

app.get('/list', async (req, res) => {

  const search = req.query.search;

  try{
    if(!search){
      const response = await pool.query(`
        SELECT * FROM games
        ORDER BY RANDOM()
      `);

      return res.json(response.rows);
    }

    const response = await pool.query(`
      SELECT *
      FROM games
      WHERE similarity(name, $1) > 0.05
      ORDER BY similarity(name, $1) DESC
    `,[search]);

    return res.json(response.rows);
  }catch(error){
    console.error(error);
  }
  
});

app.listen(port, () => {
  console.log(process.env.PORT);
  console.log('Listening to port: ' + port);
})