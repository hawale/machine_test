require('dotenv').config();
const app = require('./config/express');
const port = process.env.PORT || 3200;

// Start the server

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})