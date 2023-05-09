const mongoose  = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();


function dbConnect(){
  mongoose.connect( "mongodb+srv://"+"nihatpmkc"+":"+"J0elEe2zRSDPS1fI"+"@cluster0-tkorh.mongodb.net/test?retryWrites=true&w=majority",
  {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => {
       console.log("DB Connection Error: ${err.message}");
  });
}

module.exports = dbConnect;