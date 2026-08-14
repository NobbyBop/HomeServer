// Finds all photos in relevant folders and saves them to src/config/ files, that way I can just add them to folders and then they appear.

const fs = require('fs');
const path = require('path');

const inputOutput = [
  //Photos
  {
    input: path.join(__dirname, '../../public/photos'), 
    output: path.join(__dirname,"../config/photos.json")
  },
  //ORANGE SEASON
  {
    input: path.join(__dirname, '../../public/photos/OrangeSeason'), 
    output: path.join(__dirname,"../config/orange.json")
  },
  // Mobius
  {
    input: path.join(__dirname, '../../public/mobius'), 
    output: path.join(__dirname,"../config/mobius.json")
  },
  //Sketchbook
  {
    input: path.join(__dirname, '../../public/sketchbook'), 
    output: path.join(__dirname,"../config/sketchbook.json")
  },
  // Worldly
  {
    input: path.join(__dirname, '../../public/worldly'), 
    output: path.join(__dirname,"../config/worldly.json")
  },
  // Attention 
  {
    input: path.join(__dirname, '../../public/attention/packet_pages'), 
    output: path.join(__dirname,"../config/attentionPacket.json")
  },
  {
    input: path.join(__dirname, '../../public/attention/presentation_slides'), 
    output: path.join(__dirname,"../config/attentionPresentation.json")
  },
  {
    input: path.join(__dirname, '../../public/attention/participants'), 
    output: path.join(__dirname,"../config/attentionParticipants.json")
  }
]

for (let {input, output} of inputOutput){
  // Read main photos directory
  let photoList = []
  fs.readdir(input, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if(['.webp'].includes(ext) && !file.includes("thumbnail")){
          photoList.push(file)
        }
      })

      // Preserve the checked-in gallery order so builds do not reorder existing
      // photos based on filesystem enumeration order. Newly added photos append.
      let orderedPhotoList = photoList;
      try {
        const existingPhotoList = JSON.parse(fs.readFileSync(output, 'utf8'));
        const availablePhotos = new Set(photoList);
        orderedPhotoList = [
          ...existingPhotoList.filter(file => availablePhotos.has(file)),
          ...photoList.filter(file => !existingPhotoList.includes(file)),
        ];
      } catch (error) {
        // If no existing index is available, use the discovered files.
      }

      const photoString = JSON.stringify(orderedPhotoList);

      fs.writeFile(output, photoString, (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log(`Photo list saved successfully for ${input} to ${output}`);
        }
      });
    }
  })
}