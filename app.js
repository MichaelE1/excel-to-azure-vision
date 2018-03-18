const convertExcel = require('excel-as-json').processFile;
const fs = require('fs');

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

  console.log(images);

});