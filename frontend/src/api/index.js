
// frontend/src/api/index.js
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

// export const createMeeting = (data) => API.post("/create-meeting", data);
// export const getMeetingInfo = (meetingId) => API.get(`/meeting/${meetingId}`);
// export const joinMeeting = (data) => API.post("/join-meeting", data);

export default API;
