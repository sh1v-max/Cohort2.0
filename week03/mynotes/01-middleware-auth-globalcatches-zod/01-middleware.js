// middleware is a function that runs between the request and the response
// it can be used for authentication, logging, etc
// here we will create a simple middleware for authentication

const express = require('express');
const app = express();

app.get('/health-checkup', (req, res) => {
    // doing simple authentication
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;

    if(username === 'admin' && password === 'admin') {
        if (kidneyId === '1' || kidneyId === '2') {
            res.json({ 
                status: 'success', 
                message: 'Your Kidney is Fine!' 
            });
        }
        else{
            res.json({ 
                status: 'Failed', 
                message: 'Bad Input!' 
            });
        }
    }

    res.status(401).json({
        status: 'Something unexpected happened!',
        message: 'Unauthorized'
    });
});

app.listen(3000);

// run - node index.js
// url - localhost:3000/health-checkup?kidneyId=1 (change kidneyId to 2 and 3 to see different outputs)
// headers - username: admin, password: admin (use postman)
