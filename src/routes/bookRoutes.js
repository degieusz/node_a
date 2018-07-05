const express = require('express');
const sql = require('mssql');
// const debug = require('debug')('app:bookRouters');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.route('/:id')
    .get((req, res) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request
        // .query(`select * from clients where id=${id}`);
          .input('id', sql.Int, id)
          .query('select * from clients where id=@id');
        // debug(recordset);
        res.render('personView',
          {
            title: 'my lib domini',
            nav,
            person: recordset[0],
          });
      }()
      );
    });

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();

        const { recordset } = await request.query('select * from clients');
        // debug(recordset);
        res.render('books',
          {
            title: 'my lib domini',
            nav,
            people: recordset,
          });
      }()
      );
    });

  return bookRouter;
}
module.exports = router;
