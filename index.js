const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();

app.use(cors())

const port = 8080;

app.use(express.json())

app.use('/api/user', require('./routes/User'))

app.listen(port, () => {
    console.log(`EMS app listening on port ${port}`)
})