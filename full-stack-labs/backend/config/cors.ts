import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        console.log("CORS Check for Origin:", origin);
        const allowed = process.env.FRONTEND_URL;

        if(!origin || origin === allowed) {
            callback(null, true);
        } else {
            // Log the mismatch so you can see the typo
            console.error(`CORS REJECTED: [${origin}] does not match [${allowed}]`);
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    allowedHeaders:['Content-Type', 'Authorization'],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true
}

export default corsOptions;