// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------
// AUTH
// ----------------------
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getUsers = () => API.get("/auth/users");

// ----------------------
// SUBJECTS (Clases)
// ----------------------
export const createSubject = (data) => API.post("/subjects/", data);
export const getSubjects = () => API.get("/subjects/");
export const getSubjectByName = (name) => API.get(`/subjects/by-name/${name}`);
export const getEnrolledSubjects = (userId) => API.get(`/subjects/enrolled/${userId}`);
export const getTeachedSubjects = (userId) => API.get(`/subjects/by-educator/${userId}`);

// ----------------------
// ACTIVITIES (Actividades)
export const createActivities = (data) => API.post("/activities/",data);
export const getActivitiesBySubject = (subjectId) => API.get(`/activities/read-by-subject-id/${subjectId}`);

// ----------------------
// THEMES (Temas por clase)
// ----------------------

export const getThemesBySubject = (subjectId) => {
  console.log("subjectId clic aca ", subjectId);
  return API.get(`/themes/subject/${subjectId}`);
};

export const createTheme = (data) => API.post("/themes/", data);

// ----------------------
// TASKS (Tareas o preguntas)
// ----------------------
export const createTask = (data) => API.post("/tasks/", data);

export const getTasksByTheme = (themeId) => API.get(`/tasks/theme/${themeId}`);

export const deleteTask = (taskId) => API.delete(`/tasks/${taskId}`);
