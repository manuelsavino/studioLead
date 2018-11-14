import axios from "axios";

export default {
    getClasses: function () {
        return axios.get("/api/classes")
    },
    createClass: function (ClassData) {
        return axios.post('/api/class', ClassData)
    }
}