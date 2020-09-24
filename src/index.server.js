const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");



// Requiring routes 

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes  = require("./routes/cart");

mongoose.connect('mongodb://localhost:27017/ecomm',
{useNewUrlParser: true,
 useUnifiedTopology: true,
useCreateIndex: true}).then(() => {
     console.log("Database Connected");
 });

 app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});