import aj from '../config/arcjet.js'

// arcjet middleware
const arcjetMiddleware = async (req, res, next) => {
    try{
        // protect the requests (enable rate limiting
        const decision = await aj.protect(req, { requested : 1 });
        // requests flow monitoring
        if(decision.isDenied()) {
            if(decision.reason.isRateLimit()) return res.status(429).json({error: 'Rate limit is exceeded'}); // rate limit exceeded response
            if(decision.reason.isBot()) return res.status(403).json({error: 'Bot detected'}); // bot detected response
            // access response
            return res.status(403).json({error: 'Access Denied'});
        }

        next();
    }catch(error){
        console.log(`Arcjet Middleware Error : ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;