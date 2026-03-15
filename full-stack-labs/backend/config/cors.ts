import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        const allowed = process.env.FRONTEND_URL;

        // 3. Compare them
        if (origin === allowed) {
            callback(null, true);
        } else {
            // Log the mismatch so you can FINALLY see it in Vercel
            console.error(`CORS FAIL: Incoming [${origin}] does not match Env [${allowed}]`);
            
            // Pass 'false' instead of an Error object to prevent 500 crashes
            callback(null, false); 
        }
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true
}

export default corsOptions;