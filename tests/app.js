const express = require('express');
const app = express();
const port = 3000;

app.get('/init', (req) => {
    const sqlite3 = require('sqlite3').verbose()

    db.serialize(() => {
      db.run('CREATE TABLE lorem (info TEXT)')
      const stmt = db.prepare('INSERT INTO lorem VALUES (?)')

      for (let i = 0; i < 10; i++) {
        stmt.run(`${i}`)
      }

      stmt.finalize()

      db.each('SELECT rowid AS id, info FROM lorem', (err, row) => {
        console.log(`${row.id}: ${row.info}`)
      })
    })

    db.close()

})

app.get('/', (req, res) => {
  const data = { message: 'Hello, world!', number: 123 };
  res.json(data);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });