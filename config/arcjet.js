import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import {ARCJET_KEY} from "./env.js";

const aj = arcjet({
    key: ARCJET_KEY, // process the arcjet key from the .evn.dev.local
    characteristics : ["ip.src"], // filter by ip address
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",  // for the search engines to access the website
            ],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // Refill 5 tokens per interval
            interval: 10, // Refill every 10 seconds
            capacity: 10, // Bucket capacity of 10 tokens
        }),
    ],
});

export default aj;