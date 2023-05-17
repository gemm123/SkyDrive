const express = require('express');
const app = express();
const session = require('express-session');
const sequelize = require('./database/index');

const User = require('./models/user')

const HomeRoutes = require('./routes/home');
const UserRoutes = require('./routes/user');

try {
  sequelize.authenticate().then(() => {
    console.log('database Connected!');
  })
  sequelize.sync().then(() => {
    console.log('migration table success!')
  })
} catch (error) {
  console.log(error);
}

// Set view engine dan direktori views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}))

// Inisialisasi route dari kelas Home
const HomeRoute = HomeRoutes.initialize();
const UserRoute = UserRoutes.initialize();

// Gunakan route
app.use('/home', HomeRoute);
app.use('/auth', UserRoute);

// Jalankan server
app.listen(3000, () => {
  console.log('app listening on port 3000');
});
