const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/',(req,res) => res.send("Hello World!"));

app.listen(8000, () => console.log(`Server started at port ${PORT}`));