import axios from "axios";

const API = axios.create({
    baseURL: "https://task-management-system-backend-1.onrender.com/api",
});

// ✅ Token ko har request ke headers me add karna
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// ✅ Task APIs
export const createTask = async (taskData) => {
    const response = await API.post("https://task-management-system-backend-1.onrender.com/api/tasks", taskData);
    return response.data;
};

export const getTasks = async () => {
    const response = await API.get("https://task-management-system-backend-1.onrender.com/api/tasks");
    return response.data;
};

export const generateSuggestion = async (taskTitle) => {
    const response = await API.post("https://task-management-system-backend-1.onrender.com/api/ai/suggest", { title: taskTitle }); // ✅ Use correct key
    return response.data;
};


// ✅ AI Breakdown API
export const generateBreakdown = async (taskTitle) => {
    try {
        const response = await API.post("https://task-management-system-backend-1.onrender.com/api/ai/breakdown", { title: taskTitle });
        console.log("API Breakdown Data:", response.data); 
        return response.data;
    } catch (error) {
        console.error("API Error in Breakdown:", error);
        return { breakdown: "Error fetching breakdown." }; 
    }
};



// ✅ User Authentication APIs
export const registerUser = async (userData) => {
    const response = await API.post("https://task-management-system-backend-1.onrender.com/api/auth/register", userData);
    return response.data;
};
