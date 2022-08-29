const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json({extended: false}));

app.get('/',(req,res) => res.send("Hello World!"));
app.post('/', (req,res) => res.send(`Hello ${req.body.name}`));

app.listen(8000, () => console.log(`Server started at port ${PORT}`));