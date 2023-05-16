class UserController {
    static register(req, res) {
      res.render('register');
    }

    static postRegister(req, res) {
        const { username, email, password } = req.body;
        console.log(username, email, password)
        res.render('register');
    }

    static login(req, res) {
        res.render('login');
    }

    static postLogin(req, res) {
        const { email, password } = req.body;
        console.log(email, password)
        res.render('login');
    }
  }
  
module.exports = UserController;