const convertExcel = require('excel-as-json').processFile;
const fs = require('fs');
const request = require('request');

// Import environmental variables from variables.env file
require('dotenv').config({ path: 'variables.env' });

// Path to store output in
const dest = "./output";

// Create output directory if it does not exist
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest);
}

// Store number of images to process
const count = process.argv[2] || 1;

convertExcel ('images.xlsx', undefined, undefined, (err, data) => {
  const images = [];

  for (let i = 0; i < count; i++) {
    images.push(data[i].vcImagePath);
  }

  request({
    method: 'POST',
    url: 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0/ocr?language=unk&detectOrientation=true',
    headers: {
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.SUBKEY 
    },
    body: JSON.stringify({"url": images[0]})
  },
  function (error, response, body) {
    console.log(body);
  });
   
});