import { CorsOptions } from "cors";


// configure the type of requests that CORS will allow to be made to the backend
export const corsOptions = (): CorsOptions => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        // In development, allow all origins for convenience
        return {
            origin: true,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            allowedHeaders: ["Content-Type", "Authorization"],
        };
    }

    // In production, only allow origins listed in environment variable
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",").map(o => o.trim()) || [];

    return {
        origin: function(origin, callback) {
            if (!origin) return callback(null, true); // allow Postman or server-to-server requests
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`CORS blocked for origin: ${origin}`));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
}

export default corsOptions;