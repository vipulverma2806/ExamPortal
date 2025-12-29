import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchSubjects = () => axios.get(`${API_URL}/Subjects`);
export const findOrCreatesubject = (subjectName) =>
  axios.post(`${API_URL}/Subjects/findOrCreate`, { name: subjectName });
export const addQuestion = (questionData) =>
  axios.post(`${API_URL}/questions`, questionData);
