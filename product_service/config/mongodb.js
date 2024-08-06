const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/product_service")
.then(()=> console.log("Connected to product_service DB."))
.catch(err=> console.error(`Error: Connected to product_service DB failed.\n ${err}`))