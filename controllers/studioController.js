const db = require("../models");
module.exports = {
  findAll(req, res) {
    db.Studio.find({}, (err, resp) => {
      res.json(resp);
    });
  },

  createNewStudio(req, res) {
    const {
      name,
      address,
      address2,
      city,
      state,
      zip,
      email,
      manager,
      phone,
      website
    } = req.body;

    const Studio = {
      name: name,
      location: [
        {
          Address: address,
          Address2: address2,
          City: city,
          State: state,
          Zip: zip,
          Email: email,
          Manager: manager,
          Phone: phone
        }
      ],
      website: website
    };
    db.Studio.create(Studio, (err, Studio) => {
      if (err) {
        console.log(err);
      }
      res.json(Studio);
    });
  }
};
