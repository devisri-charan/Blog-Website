const express = require("express");
const app = express();
const { MongoClient } = require("mongodb")
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json({ extended: false }));

const withDB = async (operation, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db("blog");
        await operation(db);
        client.close();
    } catch (error) {
        res.status(500).json({ message: "Error connecting to database", error });
    }
}

app.get('/api/articles/:name', async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;

        const articlesInfo = await db.
            collection('articles')
            .findOne({ name: articleName });
        res.status(200).json(articlesInfo);
    }, res);
});

app.post('/api/articles/:name/add-comments', (req, res) => {
    const { username, text } = req.body
    const articleName = req.params.name;

    withDB(async (db) => {
        const articlesInfo = await db
            .collection("articles")
            .findOne({ name: articleName });
        await db.collection('articles').updateOne(
            { name: articleName },
            {
                $set: {
                    comments: articlesInfo.comments.concat({ username, text }),
                },
            }
        );
        const updateArticleInfo = await db
        .collection('articles')
        .findOne({name: articleName});
        res.status(200).json(updateArticleInfo);
    }, res);
})


// test routes
// app.get('/',(req,res) => res.send("Hello World!"));
// app.post('/', (req,res) => res.send(`Hello ${req.body.name}`));
// app.get('/hello/:name', (req,res) => res.send(`Hello ${req.params.name}`))

app.listen(8000, () => console.log(`Server started at port ${PORT}`));