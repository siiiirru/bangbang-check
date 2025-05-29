process.env.MOCK_DYNAMODB = 'true';
const { handler } = require('../lambda_functions/deleteProjects/index'); 

const testEvent = {
    httpMethod: "POST",
    body: JSON.stringify({
        username: "testuser",
        projectId: "proj123"
    }),
    headers: {
        "Content-Type": "application/json"
    }
};

const context = {};

handler(testEvent, context)
    .then(response => {
        console.log("Response:", JSON.stringify(response, null, 2));
    })
    .catch(error => {
        console.error("Error:", error);
    });