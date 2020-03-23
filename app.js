const {app, port,route} = require('.//src/config/express')
const db = require("./src/db");
try {
  db.connect();
  app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`);
  })
  app.use("/api/v1", route);
}
  catch(e){
    
  }