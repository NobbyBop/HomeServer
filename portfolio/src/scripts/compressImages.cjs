// Finds all photos in relevant folders and converts them to webp

const fs = require('fs');
const path = require('path');
const sharp = require("sharp");

const inputOutput = [
  //Photos
  {
    input: path.join(__dirname, '../../public/photos'), 
  },
  //ORANGE SEASON
  {
    input: path.join(__dirname, '../../public/photos/OrangeSeason'), 
  },
  // Mobius
  {
    input: path.join(__dirname, '../../public/mobius'), 
  },
  {
    input: path.join(__dirname, '../../public/mobius/headers'), 
  },
  //Sketchbook
  {
    input: path.join(__dirname, '../../public/sketchbook'), 
  },
  // Worldly
  {
    input: path.join(__dirname, '../../public/worldly'), 
  },
  // Attention 
  {
    input: path.join(__dirname, '../../public/attention/'), 
  },
  {
    input: path.join(__dirname, '../../public/attention/packet_pages'), 
  },
  {
    input: path.join(__dirname, '../../public/attention/presentation_slides'), 
  },
  {
    input: path.join(__dirname, '../../public/attention/participants'), 
  },
  // Website Images
  {
    input: path.join(__dirname, '../../public/images/'), 
  },
  //On Comfort
  {
    input: path.join(__dirname, '../../public/comfort/'), 
  }
];

(async () => {
  for (let {input} of inputOutput) {
    const files = fs.readdirSync(input);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const inputPath = path.join(input, file);
      const outputPath = path.join(input, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        console.log(`Processing ${inputPath}...`);
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        // Optional: delete original after conversion
        fs.unlinkSync(inputPath);
      }
    }
  }
  console.log('Done!');
})();