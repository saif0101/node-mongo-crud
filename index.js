const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const password = 'QXNN7FtpJ5R@aDH';

const uri = "mongodb+srv://BatManUser:QXNN7FtpJ5R%40aDH@cluster0.d2twb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
})

client.connect(err => {
  const productCollection =  client.db("organicdb").collection("products");
  console.log('database connected');
// load all data

  app.get("/products",(req,res)=>{
    productCollection.find({})
    .toArray((err,documents)=>{
      res.send(documents);
    })
  })
// for update data
  app.get("/product/:id",(req,res)=>{
    productCollection.find({_id: ObjectId(req.params.id)})
    .toArray ((err,documents)=>{
      res.send(documents[0]);
    })
      
    })
  

// insert from form to database
  app.post("/addProduct",(req,res)=>{
    const product = req.body;
    productCollection.insertOne(product)
    .then(result => {
      console.log('data added successfully');
      res.send ('success');

    })
    
  })

  app.delete("/delete/:id",(req,res)=>{
    productCollection.deleteMany({_id: ObjectId(req.params.id)})
    .then(result =>{
      console.log(result)
    })
  })
 

});
// async function run() {
//   try {
//     await client.connect();
//     // database and collection code goes here
//     const db = client.db("organicdb");
//     const coll = db.collection("products");
//     // insert code goes here
//     const docs = [
//       {name: "Halley's Comet", officialName: "1P/Halley", orbitalPeriod: 75, radius: 3.4175, mass: 2.2e14},
//       {name: "Wild2", officialName: "81P/Wild", orbitalPeriod: 6.41, radius: 1.5534, mass: 2.3e13},
//       {name: "Comet Hyakutake", officialName: "C/1996 B2", orbitalPeriod: 17000, radius: 0.77671, mass: 8.8e12}
//     ];
//     const result = await coll.insertMany(docs)
//     // display the results of your operation
//     console.log(result.insertedIds);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
app.listen(3000);




// perform actions on the collection object
// client.close();



