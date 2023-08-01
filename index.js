const ConnectToMongo = require('./config/db');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');


ConnectToMongo();

const app = express()
const port = process.env.PORT || 5005;
app.use(express.json())

app.use(cookieParser())


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('x-auth-token', '*')
  next();
});
app.use(cors());

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get('/', (req, res) => {
  res.send("Hello Remax");
})

app.post('/webhook-verification', (req, res) => {
  console.log(req.body)
})



app.use('/auth', require('./routes/auth'))
app.use('/category', require('./routes/category'))
app.use('/subcategory', require('./routes/subCategory'))
app.use('/products', require('./routes/product'))
app.use('/orders', require('./routes/order'))
app.use('/payment', require('./routes/payment'))
app.use('/tiers', require('./routes/tier'))
app.use('/tags', require('./routes/tag'))
app.use('/design', require('./routes/design'))
app.use('/brand', require('./routes/brand'))
app.use('/model', require('./routes/model'))
app.use('/banner', require('./routes/banner'))
app.use('/carrier', require('./routes/carrier'))
app.use('/dropshipfee', require('./routes/dropshipFee'))
app.use('/uploads/images', express.static('uploads/images'))
// app.use('/inven', require('./invenrouter') )
app.use('/api', require('./routes/file'))
app.use('/posinven', require('./posInven'))



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
