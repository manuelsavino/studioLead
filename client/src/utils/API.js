import axios from "axios";

export default {
  getClasses: function() {
    return axios.get("/api/classes");
  },

  createClass: function(ClassData) {
    return axios.post("/api/classes", ClassData);
  },
  getActiveClasses: function() {
    return axios.get("/api/classes/active");
  },
  createLead: function(data) {
    return axios.post("/api/leads/createLead", data);
  },

  getLeads: function() {
    return axios.get("/api/leads/");
  },

  getOneLead: async function(id) {
    const lead = axios.get(`/api/leads/${id}`);
    return await lead;
  },

  getOneParent: function(id) {
    return axios.get(`/api/parents/${id}`);
  },

  sendSms: async function(messageData) {
    const res = axios.post("/api/sms/out", messageData);
    return await res;
  },

  call: function(leadParent) {
    let data = {
      leadParent: leadParent
    };
    return axios.post("/api/calls/call", data);
  },

  writeNote: async function(note) {
    let data = {
      id: note.id,
      body: note.body
    };

    const res = axios.post("/api/parents/writeNote", data);
    return await res;
  },

  updateLeadStatus: function(data, id) {
    return axios.put(`/api/leads/updateStatus/${id}`, data);
  },
  updateClassStatus: function(data, id) {
    return axios.put(`/api/classes/updateStatus/${id}`, data);
  },
  deleteParent: async function(id) {
    const res = axios.delete(`/api/parents/${id}`);
    return await res;
  }
};
