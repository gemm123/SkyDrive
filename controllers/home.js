const UploadRepository = require("../repositories/upload");

class HomeController {
    static async getAllUpload(req, res) {
      const uploadRepository = new UploadRepository();

      try {
        const uploads = await uploadRepository.getAllUpload(req.user.id);
        res.render('home', { data: uploads });
      } catch (error) {
        throw error;
      }

    }
}
  
module.exports = HomeController;
  