const fs = require('fs');
const path = require('path');

const photopath = path.join(__dirname, '../../public/photos');
const orangeSeasonPath = path.join(__dirname, '../../public/photos/OrangeSeason');
let photoList = []
let orangeList = []

// Read main photos directory
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

// Read OrangeSeason directory
fs.readdir(orangeSeasonPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if(['.jpg', '.jpeg', '.png'].includes(ext) && !file.includes("thumbnail")){
        orangeList.push(file)
      }
    })

    const orangeString = JSON.stringify(orangeList);
    fs.writeFile(path.join(__dirname, "../../src/json/orangeList.json"), orangeString, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('Orange Season list saved successfully');
      }
    });
  }
}) 