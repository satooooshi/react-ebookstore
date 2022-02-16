const express = require('express');
const cors = require('cors')
const app = express();
const host = '0.0.0.0'
const port = 3002

app.use(cors());

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.listen(port, host, () => console.log('API is running on '+host+':'+port+'/login'));