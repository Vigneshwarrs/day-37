const express = require('express')
const fs = require('fs');
const path = require('path');

const app = express()
const port = 5000;
const folderPath = path.join(__dirname,'public');

if(!fs.existsSync(folderPath)){
  console.log('Creating public folder');
  fs.mkdirSync(folderPath);
}

app.post('/create-file',(req,res)=>{
  const timestamp = new Date();
  const fileName = `${timestamp.toISOString().replace(/:/g,'-')}.txt`;
  const filePath = path.join(folderPath, fileName);
  fs.writeFile(filePath,timestamp.toString(),(err)=>{
    if(err){
      console.log('Error creating file', err);
      return res.status(500).json({"message":`Error Writing file - ${err}`});
    }
    res.json({"message":'File created successfully', fileName});
  })
})

app.get('/get-files', function (req, res) {
  // res.send('Hello World')
  fs.readdir(folderPath, (err, files)=>{
    if(err){
      console.log('Error Reading file', err);
      return res.status(500).json({"message":`Error Reading file - ${err}`});
    }
    res.json({"message":'Files retrived successfully', files});
  })
})

app.listen(port, ()=>{
    console.log(`Server running on a port ${port}`)
});