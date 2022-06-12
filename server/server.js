const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const apiRouter = require('./routes/api')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.get('/get', (req, res) => res.status(200).json({ username: 'hello' }));

app.use('/', apiRouter);
// Catch all for invalid endpoint requests
app.use('*', (req, res) => res.status(404).json('Invalid request, please try again'));

// Global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Unknown internal server error',
    status: 500,
    message: { err: 'An error has occurred server-side' }
  }
  const errObj = Object.assign({}, defaultErr, err);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});