const express = require("express");
const app = express();
const {MongoClient} = require("mongodb")
const PORT = process.env.PORT || 8000;



// Middleware
app.use(express.json({extended: false}));

app.get('/api/articles/:name', async (req,res) => {
    try {
        const articleName = req.params.name;
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db("blog");
        const articlesInfo = await db.
            collection('articles')
            .findOne({name: articleName});
        res.status(200).json(articlesInfo);
        client.close();
    } catch (error) {
        res.status(500).json({message: "Error connecting to database", error});
    }
})

app.post('/api/articles/:name/add-comments', (req,res) => {
    const {username,text} = req.body
    const articleName = req.params.name;
    articlesInfo[articleName].comments.push({username,text})
    res.status(200).send(articlesInfo[articleName]);
})


// test routes
// app.get('/',(req,res) => res.send("Hello World!"));
// app.post('/', (req,res) => res.send(`Hello ${req.body.name}`));
// app.get('/hello/:name', (req,res) => res.send(`Hello ${req.params.name}`))

app.listen(8000, () => console.log(`Server started at port ${PORT}`));