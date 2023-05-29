const express = require('express');
const app = express();
const bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const { MongoClient } = require('mongodb');

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
});

const uri = "mongodb+srv://nayem_31:HELLOhello@cluster0.fwfzjhi.mongodb.net/school?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

 client.connect();
    const productCollection = client.db("school").collection("student");
    
    app.get('/product', (req, res) => {
      productCollection.find({})
        .toArray((err, documents) => {
          if (err) {
            console.error('Error finding documents:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.send(documents);
          }
        });
    });

    app.post('/addProduct',(req,res)=>{
      const product=req.body;
      console.log(product)
        productCollection.insertOne(product)
        .then(result=>{
          console.log("success")
        })

    })


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
