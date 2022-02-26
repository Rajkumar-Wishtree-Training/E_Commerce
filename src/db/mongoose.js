const mongoose = require('mongoose')

mongoose.
connect('mongodb://localhost:27017/E_Commerce')
.then(() => console.log("DB Connected Successfully..."))
.catch((err) => console.log(err));
