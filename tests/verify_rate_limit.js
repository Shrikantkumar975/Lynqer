
const http = require('http');

const TOTAL_REQUESTS = 105;
const URL = 'http://localhost:5000/api/health'; // This endpoint is covered by apiLimiter

let successCount = 0;
let rateLimitedCount = 0;
let errorCount = 0;

console.log(`Starting ${TOTAL_REQUESTS} requests to ${URL}...`);

async function sendRequest(i) {
    return new Promise((resolve) => {
        http.get(URL, (res) => {
            if (res.statusCode === 200) {
                process.stdout.write('.');
                successCount++;
            } else if (res.statusCode === 429) {
                process.stdout.write('X');
                rateLimitedCount++;
            } else {
                process.stdout.write('?');
                errorCount++;
            }
            res.resume();
            resolve();
        }).on('error', (e) => {
            console.error(`\nRequest ${i} error: ${e.message}`);
            errorCount++;
            resolve();
        });
    });
}

async function run() {
    for (let i = 1; i <= TOTAL_REQUESTS; i++) {
        await sendRequest(i);
        // Small delay to not overwhelm the network stack instantly, but fast enough to hit limit
        await new Promise(r => setTimeout(r, 10));
    }

    console.log('\n\n--- Results ---');
    console.log(`Successful (200 OK): ${successCount}`);
    console.log(`Rate Limited (429 Too Many Requests): ${rateLimitedCount}`);
    console.log(`Errors: ${errorCount}`);

    if (rateLimitedCount > 0) {
        console.log('\n✅ PROOF: Rate limiting is working! Requests were rejected after the limit.');
    } else {
        console.log('\n❌ PROOF FAILED: No requests were rate limited. Check if server is running or limit is higher.');
    }
}

run();
