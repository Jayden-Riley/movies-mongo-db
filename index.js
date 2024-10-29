import express from 'express';
// import "dontev/config"  
import { MongoClient, ObjectId } from 'mongodb';

let port = 3000;
let app = express();

let uri = `mongodb+srv://jaydendejong83:${process.env.MONGO_DB_PASSWORD}@cluster0.kmw7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


let client = new MongoClient(uri);

let db = client.db("movies");
let collection = db.collection("movies"); 

app.get('/', async(req, res) => {
   
    res.send("ok");
})  

// movies route 
app.get('/movies', async(req, res) => {
 
    let movies = await collection.find().toArray();
    res.send(movies);
})  
// individual movie route
app.get('/movies/:id', async(req, res) => {
    let id = req.params.id;
    let movie = await collection.findOne({_id: new ObjectId(id)});
    res.json(movie)
});

// route for filtering movies by genre 
app.get('/movies', async(req, res) => {
    let qeury = req.query
    let genre = qeury.genre;

    if(genre){

        console.log({qeury})
        let movies = await colletion.find({genre: genre}).toArray   ()
        res.json(movies)
    } else{
            let movies = await collection.find().toArray()
            res.json(movies)
    }
    // 

})

// ?genre=action
// abc.com/movies
// abc.com/movies/:id
// abc.com/movies?genre="action"


app.listen(port, () => console.log(`server started at port ${port}`));