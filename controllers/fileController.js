const asyncHandler = require("express-async-handler");
const fs = require("fs");

const uploadFile = asyncHandler(async (req, res) => {
    const files = req.files;
    let images = [];
    if (!files) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }
    const url = req.protocol + "s://" + req.get("host");

    for (var i = 0; i < req.files.length; i++) {
        images.push(url + "/uploads/images/" + req.files[i].filename);
    }
    res.send(images);
});


const deleteFile = asyncHandler(async (req, res) => {
    const file = req.params.img;
    const source = 'uploads/images/'
    fs.unlink(
        `${source}${file}`
        , (err) => {
            if (err) {
                
            }
        });
    res.send({ msg: "File Deleted" , file: file});
});



module.exports = { uploadFile, deleteFile };