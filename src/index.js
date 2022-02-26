const express = require("express");
require("./db/mongoose");
const app = express();
app.use(express.json());
const User = require("./models/user.model");
const Product = require("./models/product.model");
const Order = require("./models/order.model");
const cors = require('cors')

const auth = require('./middleware/auth');

const port = process.env.PORT || 4000;

app.use(cors());

app.get('/user' ,auth , async (req , res) =>{
  try {
      res.send(req.user);
  } catch (error) {
    res.status(500).send()
  }
})

app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.getAuthToken();
    // await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/user", auth , async (req , res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (error) {
    res.status(500).send()
  }
})

app.patch("/user" , auth , async ( req , res) =>{
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name' , 'email' , 'password'];
  const result = updates.every((update) => allowedUpdates.includes(update))
  if(!result){
    return res.status(401).send();
  }
  try {
    const user = req.user;
    updates.forEach((update) =>{
      user[update] = req.body[update];
    })
    await user.save();
    res.send(user)

  } catch (error) {
    res.status(500).send(error)
  }
})

app.get("/logout" , auth , async (req , res) => {
  try {
       console.log(req.user.token)
       const user =await req.user;
       user.token = null;
       console.log(user.token)
       await user.save();
       res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
       
})

app.post("/addtocart/:id", auth , async (req, res) => {
       try {
        const user = req.user;
        const product =await Product.findById(req.params.id);
        if(!product){
         return res.status(404).send("Product not available")
        }
        user.products = user.products.concat({_id : req.params.id})
        await user.save();
        res.status(201).send(user);
       } catch (error) {
         res.status(404).send(error);
       }
});

app.get("/mycart", auth , async (req , res) => {
  try {
    const user = req.user;
    const products_id = user.products;
    const product =await Product.find({_id : {$in : products_id}});
    if(!product){
      res.status(404).send()
    }
    res.send(product)
  } catch (error) {
    res.status(500).send()
  }
})
app.delete("/deletemycart/:id", auth , async (req , res) => {
  try {
    const user = req.user;
    const products_id = user.products;
    console.log(products_id)
    for (let i = 0; i < products_id.length; i++) {
         if(products_id[i]._id.toString() === req.params.id.toString()){
           console.log('mila kya?')
           products_id.splice(i , 1);
         }
    }
    user.products = products_id;
    await user.save().then(()=>console.log(products_id));
    // const product =await Product.find({_id : {$in : products_id}});
    if(!products_id){
      res.status(404).send()
    }
    res.send(products_id)
  } catch (error) {
    res.status(500).send()
  }
})


app.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByEmailPassword(req.body.email , req.body.password);
    // const user = await User.findOne({email : req.body.email , password : req.body.password})
    const token = await user.getAuthToken();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users' , auth , async (req , res) =>{
  try {
    if(req.user.isAdmin){
      const users = await User.find();
      res.send(users)
    }
    else{
      res.status(401).send()
    }
  } catch (error) {
    res.status(500).send({"error" : "server is not working"})
  }
})
// Admin 
app.post("/product", auth , async (req, res) => {
  try {
    if(req.user.isAdmin){
      const product = new Product(req.body);
      await product.save();
      res.status(201).send(product);
    }
    else{
      res.status(401).send();
    }
   
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/product", async (req, res) => {
  try {
    const product = await Product.find({ status: true });
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/products", auth , async (req, res) => {
  try {
    if(req.user.isAdmin){
      const product = await Product.find();
      res.send(product);
    }
    else{
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Admin
app.patch("/product/:id" , async (req , res) =>{
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name' , 'price' , 'description' , 'status' , 'qty'];
  const result = updates.every((update) => allowedUpdates.includes(update))
  if(!result){
    return res.status(401).send();
  }
  try {
    const product = await Product.findOne({_id : req.params.id})
    updates.forEach((update) => {
      product[update] = req.body[update];
    })
    await product.save()
    if(!product){
      return res.status(404).send();
    }
    res.send(product)
  } catch (error) {
    res.status(500).send(error);
  }
})
//Admin Task
app.delete("/product/:id" , async (req , res) =>{
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    res.send(product);
    if(!product){
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
})

//Remaining
app.get('/order' , auth , async ( req , res) =>{
  try {
     if(req.user.isAdmin){
      const order = await Order.find();
      if(!order){
        res.status(404).send({'error' : "not found"})
      }
      res.send(order)
     }
     else{
      res.status(401).send();
     }
  } catch (error) {
    res.status(500).send('Something is wrong with server')
  }
})
app.post("/order", auth , async (req, res) => {
  try {
    console.log(req.user)
    const order = new Order({
      address : req.body.address,
      contact : req.body.contact,
      user_id : req.user._id,
      amount : req.body.amount
    });
    // console.log(order)
    await order.save();
    const user = req.user
    user.products = [];
    await user.save();
    res.status(201).send(order);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log("Server is on " + port);
});
