import { CorsOptions } from "cors";


const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        const value = process.env.FRONTEND_URL || '';
        const allowedOrigins = value.split(',').map(url => 
            url.trim().replace(/\/$/, "")
        );

        const cleanOrigin = origin.trim().replace(/\/$/, "");

        console.log(`CORS_DEBUG: Incoming_Origin:[${origin}]`);
        console.log(`CORS_DEBUG: Allowed_List:${JSON.stringify(allowedOrigins)}`);
        
        if(allowedOrigins.includes(cleanOrigin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS_REJECT: Origin ${origin} not in [${allowedOrigins}]`));
        }
    },
    // allow specific headers, methods, and inclusion of credentials
    allowedHeaders:['Content-Type', 'Authorization'],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true
}

export default corsOptions;