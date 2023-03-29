const lockModel = require("./lock.model");

class  lockController {
  getAlllock(request, respond) {
    lockModel.find().exec()
      .then((locks) => {
        respond.status(200).json({
          success: true,
          message: "Done!",
          locks: locks,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  newlock = async function(req, res) {
    const { ten, viTri } = req.body;
    const lock = new lockModel({
      ten,
      viTri
    });
    try {
      await lock.save();
      res.status(200).send('New lock created!');
    } catch (error) {
      res.status(500).send(error);
    }
  }

  getLockById = async (req, res) => {
    const lockId = req.params.id;
    try {
      const lock = await lockModel.findById(lockId); 
      if (!lock) {
        return res.status(404).json({ message: "Lock not found" }); 
      }
      res.json(lock); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" }); 
    }
  };
}

module.exports = new lockController();
