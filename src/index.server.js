const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const taxRoutes = require('./routes/taxes');
const userRoutes = require('./routes/user');
const sellerRoutes = require('./routes/seller');
const couponRoutes = require('./routes/coupons');
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order.routes");

// mongodb://localhost:27017/ecomm
// mongodb connection
// `mongodb+srv://adminsf123:adminsf123@inventory.thgor.mongodb.net/ecommerce?retryWrites=true&w=majority`
mongoose.connect(
    `mongodb+srv://shubhi123:Sudha123@cluster0.spfw4.mongodb.net/ecommerce?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected');
});

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', taxRoutes);
app.use('/api', userRoutes);
app.use('/api', sellerRoutes);
app.use('/api', couponRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);

app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce store");
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started");
});
