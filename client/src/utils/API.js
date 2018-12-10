import axios from "axios";

export default {
    getClasses: function () {
        return axios.get("/api/classes")
    },

    createClass: function (ClassData) {
        return axios.post('/api/classes', ClassData)
    },

    getClassesByAge: function (age) {
        return axios.get(`/api/classes/getClassesByAge/${age}`)
    },

    createLead: function (data) {
        return axios.post('/api/leads/createLead', data)

    },

    getLeads: function () {
        return axios.get('/api/leads/')
    }
}