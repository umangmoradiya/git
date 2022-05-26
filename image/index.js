const encode = require("node-base64-image").encode;
const decode = require("node-base64-image").decode;

async function img() {

    const url = "https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg";

    // encode img
    const options = {
        string: true,
        Headers: {
            "user-Agent": "my-app",
        },
    };
    const image = await encode(url, options);

    console.log(image)

    // decode img
    await decode(image, { fname: "./umang234", ext: "jpg" });
}
img()

// const fs = require("fs");
// const mime = require("mime");

// const input = "data:image/jpeg;base64,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";
             
// function img() {

//   var matches = input.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

//   response = {};

//   if (matches.length !== 3) {
//     return new Error('Invalid input string');
//   }

//   response.type = matches[1];
//   response.data = new Buffer(matches[2], 'base64');
//   let decodedImg = response;
//   let imageBuffer = decodedImg.data;
//   let type = decodedImg.type;
//   let extension = mime.getExtension(type);
//   let fileName = 'img5' + '.' + extension;
//   fs.writeFileSync('./' + fileName, imageBuffer, 'utf8');
//   // console.log(matches);
// }
// img();