class HomeController {
    static homePage(req, res) {
      console.log(req.user);
      res.render('index');
    }
  }
  
module.exports = HomeController;
  