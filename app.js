const convertExcel = require('excel-as-json').processFile;
const fs = require('fs');
const request = require('request');

// Import environmental variables from variables.env file
require('dotenv').config({ path: 'variables.env' });

// Path to store output in
const dest = "./output/";

// Create output directory if it does not exist
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

// Store image number to process (default is 0)
const index = process.argv[2] || 0;

convertExcel ('images.xlsx', undefined, undefined, (err, data) => {
  const images = [];

  for (let i = 0; i <= index; i++) {
    images.push(data[i].vcImagePath);
  }

  request({
    method: 'POST',
    url: 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk&detectOrientation=true',
    headers: {
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.SUBKEY 
    },
    body: JSON.stringify({"url": images[index]})
  },
  (error, response, body) => {
    if (error) {
      console.log(error)
    } else {
      jsonParse = JSON.parse(body);
      fs.writeFile(dest + index + ".json", JSON.stringify(jsonParse, null, 4), (err) => {
        if (err) {
            return console.log(err);
        }
    
        console.log("The file was written!");
        
      });
    }
  });
});