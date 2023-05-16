const express = require('express');
const app = express();
const HomeRoutes = require('./routes/home');
const UserRoutes = require('./routes/user')

// Set view engine dan direktori views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));

// Inisialisasi route dari kelas Home
const Home = HomeRoutes.initialize();
const User = UserRoutes.initialize();

// Gunakan route
app.use('/', Home);
app.use('/auth', User);

// Jalankan server
app.listen(3000, () => {
  console.log('Server berjalan pada http://localhost:3000');
});
