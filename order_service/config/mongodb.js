const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/oder_service")
.then(()=> console.log("Connected to oder_service DB."))
.catch(err=> console.error(`Error: Connected to oder_service DB failed.\n ${err}`))