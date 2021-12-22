const express = require("express");
const app = express();

app.get('/', (req, res) => {
  res.send('deneme');
  res.end();
});

const port = 3000;
app.listen(port, () => {
  console.log(` localhost:${port}`);
});
