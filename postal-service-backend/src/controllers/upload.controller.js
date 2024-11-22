// Configure multer for file storage
const multer = require("multer"); //library used for file handling
const path = require("path"); // this is built in module of node js which work with file and directory paths
const tesseract = require("tesseract.js"); // library use to perform OCR function
const fs = require("fs"); // library used to handle files
const pdf2img = require("pdf2img");
const gm = require("gm");

//this will define where and how files should save
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //option define where files save
    cb(null, "./uploads"); // Save uploaded files in the 'uploads' folder in backend
  },
  //this is used to generate unique file name for each uploading file
  filename: (req, file, cb) => {
    // Name the file uniquely
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 1629872398123-123456.pdf
  },
});

// File type filtering (optional)
//allow user to upload only .pdf files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only .png or jpeg files are allowed"), false);
  }
};

// Setup multer
//creating ulter instance to combine storage and filefilter function
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

//creating a global variable for extracted text
let extractedTextGlobal = "";
exports.uploadController = (req, res) => {
  upload.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ message: "Multer error occurred during upload", error: err });
    } else if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }
    // File upload successful
    // res.status(200).json({
    //   message: "File uploaded successfully",
    //   filePath: req.file.path, // You can use this to further reference the uploaded file
    // });

    //performing of converting pdf into images
    const filePath = req.file.path;

    // pdf2img.setOptions({
    //   type: "jpg", // Output format (jpg or png)
    //   size: 1024, // Image size in pixels
    //   density: 300, // Image quality (DPI)
    //   outputdir: "uploads/images", // Directory where the images will be saved
    //   outputname: "converted_image", // Name of the output file
    // });

    // Convert PDF to images
    // pdf2img.convert(filePath, (err, info) => {
    //   if (err) {
    //     console.log("Error converting PDF to images:", err);
    //     res.status(500).json({
    //       message: "Error converting PDF to images",
    //       error: err.message,
    //     });
    //   } else {
    //     console.log("PDF converted to images:", info);
    //     // info contains the paths of the converted images

    //     // Use gm to resize the images
    //     const images = info.message;
    //     const resizedImages = [];
    //     images.forEach((imagePath) => {
    //       gm(imagePath)
    //         .resize(800, 600) // Resize the image to 800x600
    //         .write(imagePath, (err) => {
    //           if (err) {
    //             console.log("Error resizing image:", err);
    //           } else {
    //             resizedImages.push(imagePath);
    //             if (resizedImages.length === images.length) {
    //               res.status(200).json({
    //                 message: "PDF successfully converted to images",
    //                 images: resizedImages, // Array of resized image paths
    //               });
    //             }
    //           }
    //         });
    //     });
    //   }
    // });

    //perform the OCR function here
    tesseract
      .recognize(filePath, "eng", {
        logger: (info) => console.log(info), // Optional logging
      })
      .then(({ data: { text } }) => {
        // Successfully extracted text
        extractedTextGlobal = text;
        console.log(extractedTextGlobal);
        //send the response to the client side using this
        res.status(200).json({
          message: "file uploaded successfully and Text extracted successfully",
          extractedText: text, // Return the extracted text
          filePath: filePath,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Failed to extract text",
          error: err.message,
        });
      });
  });
};

//image is preprocessing to increase accuracy before it extracted
const sharp = require("sharp");

exports.uploadController2 = (req, res) => {
  upload.single("file")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ message: "Multer error occurred during upload", error: err });
    } else if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err.message });
    }

    //performing of converting pdf into images
    const filePath = req.file.path;

    //uploaded image will be preprocess before text extraction
    const preprocessImage = (filePath) => {
      return sharp(filePath)
        .threshold(200)
        .grayscale() // Convert to grayscale
        .normalize() // Normalize brightness and contrast
        .resize(1500) // Resize image to 1000px width, preserving aspect ratio
        .toBuffer(); // Return the processed image as a buffer
    };

    //perform the OCR function here
    preprocessImage(filePath)
      .then((processedpreImage) => {
        return tesseract.recognize(processedpreImage, "eng", {
          logger: (info) => console.log(info), // Optional logging
          preserve_interword_spaces: 0, // Disable preserving inter-word spaces
        });
      })

      .then(({ data: { text } }) => {
        // Successfully extracted text
        extractedTextGlobal = text;
        // extractedTextGlobal = text.replace(/[^A-Za-z0-9+/=]/g, "");
        // extractedTextGlobal = text;
        console.log(extractedTextGlobal);
        //send the response to the client side using this
        res.status(200).json({
          message: "file uploaded successfully and Text extracted successfully",
          extractedText: text, // Return the extracted text
          filePath: filePath,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Failed to extract text",
          error: err.message,
        });
      });
  });
};

//controller to get the extracted text to  the client side
exports.getExtractedText = (req, res) => {
  if (extractedTextGlobal) {
    res.status(200).json({
      message: "Text extracted successfully",
      extractedText: extractedTextGlobal, // store the extracted text in a new variable
    });
  } else {
    res.status(401).json("No extracted text available here");
  }
};
