const UploadRepository = require("../repositories/upload");
const UserRepository = require("../repositories/user");

class HomeController {
    static async getAllUpload(req, res) {
      const uploadRepository = new UploadRepository();
      const userRepository = new UserRepository();

      try {
        const uploads = await uploadRepository.getAllUpload(req.user.id);
        const user = await userRepository.getUserByUserId(req.user.id);
        res.render('home', { data: uploads, user: user });
      } catch (error) {
        throw error;
      }

    }
}
  
module.exports = HomeController;
  