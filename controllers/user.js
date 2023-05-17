const UserRepository = require("../repositories/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
class UserController {
    static register(req, res) {
      res.render('register', { message: null });
    }

    static async postRegister(req, res) {
        const { username, email, password } = req.body;
        const userRepository = new UserRepository();

        try {
          const hashedPassword = bcrypt.hashSync(password, 10);
          const user = await userRepository.createUser(username, email, hashedPassword);
          req.session.message = `${user.email} successfully registered`
          res.redirect(302, '/auth/login');
        } catch (error) {
          console.error('Failed to register user:', error);
          res.status(500).render('register', { message: `failed to register user:` + error })
        }

    }

    static login(req, res) {
      const message = req.session.message;
      delete req.session.message;

      res.render('login', { message });
    }

    static async postLogin(req, res) {
        const { email, password } = req.body;
        const userRepository = new UserRepository();

        const user = await userRepository.getUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
          const userJWT = { id: user.id, username: user.username, email: user.email };
          const token = jwt.sign(userJWT, `${process.env.JWT_KEY}`, { expiresIn: '7d'})
          req.session.token = token;
          req.session.message = 'successfully login';
          res.redirect(302, '/home');
        } else {
          req.session.message = 'failed login wrong email or password';
          res.redirect(302, '/auth/login');
        }

    }

    static logout(req, res) {
      delete req.session.token;
      req.session.message = 'successfully logout';

      res.redirect(301, '/auth/login');
    }

  }
  
module.exports = UserController;