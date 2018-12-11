const db = require('../models')
const moment = require('moment');


module.exports = {

    createLead(req, res) {
        const lead = req.body;
        db.Lead.create(lead).then(res.send('done'))
    },

    getAllLeads(req, res) {
        // db.Lead.sendNotification();
        db.Lead.find({}).populate('classTrying', { 'nameOfClass': 1, 'time': 1 }).sort({ 'trialDate': 1 }).exec((err, resp) => {
            if (err) {
                console.log(err)
            } else {
                res.json(resp)
            }
        })
    },

    handleSmsIn(req, res) {
        let { From, Body } = req.body

        record.create({ from: From, body: Body }, function (err, resp) {
            if (err) {
                console.log(err)
            }
            else {
                console.log(resp)
            }
        })
        res.send(`<Response></Response>`)
    }


}