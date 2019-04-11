const db = require("../models");
const moment = require("moment");
const Twilio = require("twilio");
const helpers = require("../helpers/sms");
const getStudioFromJwt = require("../helpers/decodeJwt");

module.exports = {
  createLead(req, res) {
    const { parentCellphone, studioId } = req.body;

    db.Parent.findOne({ parentCellphone: parentCellphone, studioId }).exec(
      function(err, parentResp) {
        if (err) {
          console.log(err);
        } else if (parentResp) {
          // parent found updating parent with new lead"
          const {
            cFirstName,
            cLastName,
            age,
            trialDate,
            classTrying,
            studioId
          } = req.body;
          const lead = {
            cFirstName,
            cLastName,
            age,
            trialDate,
            classTrying,
            parent: parentResp._id,
            studioId
          };
          db.Lead.create(lead).then(leadResp => {
            // if (leadResp) {
            //   console.log("leadResp", leadResp);
            // }
            // console.log("parent ID", parentId);
            // console.log("new Lead id", leadResp._id);
            db.Parent.findOneAndUpdate(
              { parentCellphone: parentResp.parentCellphone },
              { $push: { children: leadResp._id } },
              (err, resp) => {
                if (err) {
                  console.log(err);
                }
                res.json(resp);
              }
            );
          });
        } else {
          //   "parent not found creating parent and updating with new lead"
          const {
            pFirstName,
            pLastName,
            parentCellphone,
            email,
            cFirstName,
            cLastName,
            age,
            trialDate,
            classTrying,
            studioId
          } = req.body;
          const parent = {
            pFirstName,
            pLastName,
            parentCellphone,
            email,
            studioId
          };
          // console.log(parentCellphone);
          db.Parent.create(parent).then(parentResp => {
            const lead = {
              cFirstName,
              cLastName,
              age,
              trialDate,
              classTrying,
              parent: parentResp.id,
              studioId
            };
            db.Lead.create(lead).then(newLead => {
              // console.log('new lead', newLead._id)
              db.Parent.findOneAndUpdate(
                { parentCellphone },
                { $push: { children: newLead._id } },
                (err, parentUpdate) => {
                  console.log(parentUpdate, newLead);
                  helpers.sendSms(parentUpdate, newLead);
                  res.json({ parentUpdate, newLead });
                }
              );
            });
          });
        }
      }
    );
  },

  getAllLeads(req, res) {
    const { authorization } = req.headers;
    const studioId = getStudioFromJwt.getStudioFromJwt(authorization);
    db.Lead.find({ studioId })
      .populate("classTrying", { nameOfClass: 1, time: 1 })
      .sort({ trialDate: 1 })
      .populate("parent")
      .exec((err, resp) => {
        if (err) {
          console.log(err);
        } else {
          res.json(resp);
        }
      });
  },

  getOneLeadById(req, res) {
    const { id } = req.params;
    db.Lead.find({ _id: id })
      .populate("classTrying")
      .exec((err, resp) => {
        if (err) {
          console.log(err);
        } else {
          console.log(resp);
          res.json(resp);
        }
      });
  },

  handleSmsIn(req, res) {
    let { From, Body } = req.body;

    record.create({ from: From, body: Body }, function(err, resp) {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
      }
    });
    res.send(`<Response></Response>`);
  },

  updateStatus(req, res) {
    let { id } = req.params;
    db.Lead.findByIdAndUpdate(id, { $set: req.body }, (err, lead) => {
      res.status(200).json({ lead: lead });
    });
  }
};
