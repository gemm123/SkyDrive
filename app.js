const express = require('express');
const app = express();
const session = require('express-session');
const sequelize = require('./database/index');
const cors = require('cors');
const bodyParser = require('body-parser');

const User = require('./models/user');
const File = require('./models/file');
const Photo = require('./models/photo');
const Upload = require('./models/upload');
const Album = require('./models/album');

const HomeRoutes = require('./routes/home');
const UserRoutes = require('./routes/user');
const UploadRoutes = require('./routes/upload');
const PhotoRoutes = require('./routes/photo');
const FileRoutes = require('./routes/file');
const AlbumRoutes = require('./routes/album');

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

const path = require('path');

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set view engine dan direktori views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Menggunakan body parser untuk membaca request body
app.use(bodyParser.json()); // Untuk membaca JSON
app.use(bodyParser.urlencoded({ extended: true })); // Untuk membaca URL-encoded

app.use(session({
  secret: 'secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Contoh: session kedaluwarsa dalam 7 hari dari saat ini
    sameSite: 'lax'
  },
}))

// Inisialisasi route dari kelas Home
const HomeRoute = HomeRoutes.initialize();
const UserRoute = UserRoutes.initialize();
const UploadRoute = UploadRoutes.initialize();
const PhotoRoute = PhotoRoutes.initialize();
const FileRoute = FileRoutes.initialize();
const AlbumRoute = AlbumRoutes.initialize();

// Gunakan route
app.use('/home', HomeRoute);
app.use('/auth', UserRoute);
app.use('/upload', UploadRoute);
app.use('/photo', PhotoRoute);
app.use('/file', FileRoute);
app.use('/album', AlbumRoute);

// Jalankan server
app.listen(3000, () => {
  console.log('app listening on port 3000');
});
