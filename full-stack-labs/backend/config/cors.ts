import { CorsOptions } from "cors";


// Static, simplified CORS options
const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];
        
        // Allow no origin (for Postman, etc.)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS restriction"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

export default corsOptions;
