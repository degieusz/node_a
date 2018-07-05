const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const config = {
  user: 'clients',
  password: 'Shalem!1',
  server: 'sgclients.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'SGClients',

  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};


sql.connect(config).catch((err) => { debug(err); });

const app = express();
const port = process.env.PORT;

const nav = [{ link: '/books', title: 'People' }, { link: '/authors', title: 'Authors' }];
const bookRouter = require('./src/routes/bookRoutes')(nav);


// app.use((a, b, n) => {
// debug('my msg');
// n();
// });
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('view engine', 'ejs');
app.set('views', './src/views/');


app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'my lib domini',
      nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
    });
});


app.listen(port, () => {
  debug(`listeln ${chalk.green(port)}`);
});
