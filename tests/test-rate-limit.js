const axios = require('axios');

async function testLockout() {
    const url = 'http://localhost:5000/api/auth/login';
    const email = `testuser_${Date.now()}@example.com`;

    // First, register a new user so we can cleanly test its lock state
    console.log("Registering test user:", email);
    try {
        await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test Setup', email, password: 'password123'
        });
    } catch (e) {
        console.log("Registration failed, but continuing:", e.response?.data);
    }

    console.log("\nStarting 6 incorrect login requests...");
    for (let i = 1; i <= 6; i++) {
        try {
            await axios.post(url, { email, password: 'wrongpassword' });
        } catch (error) {
            if (error.response) {
                console.log(`Request ${i} Failed: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
            } else {
                console.log(`Request ${i} Error: ${error.message}`);
            }
        }
    }

    console.log("\nTesting successful login with valid CAPTCHA on attempt 7...");
    try {
        await axios.post(url, { email, password: 'password123', captchaToken: 'valid_dummy_captcha' });
        console.log(`Request 7 Success!`);
    } catch (error) {
        if (error.response) {
            console.log(`Request 7 Failed: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
        } else {
            console.log(`Request 7 Error: ${error.message}`);
        }
    }
}

testLockout();
