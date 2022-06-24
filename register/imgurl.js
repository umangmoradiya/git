


function imgurl(imageurl){
                        var matches = imageurl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);

                        response = {};

                        if (matches.length !== 3) {
                            return new Error('Invalid input string');
                        }
                        response.type = matches[1];
                        response.data = new Buffer(matches[2], 'base64');
                        let decodedImg = response;
                        let imageBuffer = decodedImg.data;
                        let type = decodedImg.type;
                        let extension = mime.getExtension(type);
                        let fileName = makeid(4) + '.' + extension;

                        image = "http://localhost:7055" + "/images/" + fileName;
}




module.exports = imgurl;