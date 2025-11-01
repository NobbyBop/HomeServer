const fs = require('fs');
const path = require('path');

const photopath = path.join(__dirname, '../../public/photos');
let photoList = []
fs.readdir(photopath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if(['.jpg', '.jpeg', '.png'].includes(ext) && !file.includes("thumbnail")){
        photoList.push(file)
      }
    })

    const photoString = JSON.stringify(photoList);
    fs.writeFile(path.join(__dirname, "../../src/json/photos.json"), photoString, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Photo list saved successfully');
      }
    });
  }
}) 