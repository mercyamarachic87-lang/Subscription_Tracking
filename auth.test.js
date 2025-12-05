// test.js
const mongoose = require('mongoose');

const uri = 'mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected — credentials ok'); process.exit(0); })
    .catch(err => { console.error('Connection failed:', err.message); process.exit(1); });
