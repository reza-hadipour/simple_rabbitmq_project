const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/auth-service")
.then(()=> console.log("Connected to auth-service DB."))
.catch(err=> console.error(`Error: Connected to auth-service DB failed.\n ${err}`))