const express = require('express');
const cors = require('cors')
const app = express();
const objectId= require('mongodb').ObjectId;
const bodyParser = require('body-parser');
app.use(cors());
const { MongoClient } = require('mongodb');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const uri = "mongodb+srv://nayem_31:HELLOhello@cluster0.fwfzjhi.mongodb.net/school?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB successfully');
});

const productCollection = client.db("school").collection("student");

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/product', async (req, res) => {
  try {
    const documents = await productCollection.find({}).toArray();
    res.send(documents);
  } catch (err) {
    console.error('Error finding documents:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/addProduct', async (req, res) => {
  const product = req.body;

  try {
    const result = await productCollection.insertOne(product);
    console.log('Product inserted:', result.insertedId);
    res.send('Product inserted successfully');
  } catch (error) {
    console.error('Error inserting product:', error);
    res.status(500).send('Internal Server Error');
  }
});

// app.delete('/delete/:id', (req, res) => {
//   productCollection.deleteOne({ _id: objectId(req.param.id) })
//     .then(result => {
//       console.log(result);
//     })
//     .catch(error => {
//       console.error('Error deleting product:', error);
//       res.status(500).send('Internal Server Error');
//     });
// });

app.get('/delete/:id', async (req, res) => {
  try {
    const documents = await productCollection.find({ _id: objectId(req.param.id) }).toArray();
    console.log(documents)
    // res.send(documents);
  } catch (err) {
    console.error('Error finding documents:', err);
    res.status(500).send('Internal Server Error');
  }
});



app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
