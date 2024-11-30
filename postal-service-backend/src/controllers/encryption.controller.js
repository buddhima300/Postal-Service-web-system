//create a controller for encryption process of extracted text

//get the NODE-RSA library to encrypt using RSA algorithm
var nodeRSA = require("node-rsa"); // use node-rsa library to encrypt the text with customized public key
const PDFDocument = require("pdfkit");
const path = require("path");
const { encryptionModel } = require("../models/user.model");
const crypto = require("crypto");

//first do the RSA encryption for the extracted text
exports.RSAencryptionController = async (req, res) => {
  try {
    //get the values from fronend passing
    const encryptionData = req.body;
    //store the recieved object in two different variables
    const user = encryptionData.username;
    const extractedText = encryptionData.textExtracted;
    const publicKey = encryptionData.recipentKey; // recipent pubplic key
    const algorithm = encryptionData.algorithm; // recipent selected algorithm
    const format = encryptionData.format; // recipent selected format
    let encryptedText;

    if (publicKey) {
      // Handle RSA Encryption
      if (algorithm === "RSA") {
        const rsa = new nodeRSA(publicKey); // create an instance of node-RSA
        encryptedText = rsa.encrypt(extractedText, "base64");

        console.log("RSA button has selected");
      }
      // Handle AES, DES, and other algorithms...
      else if (algorithm === "AES") {
        // AES encryption logic here
        // generating keys from the Primary Key of the reciever
        const slicekey = publicKey.slice(0, 32); // slice the key to take 32-bit key from recipent public key

        const key = Buffer.from(slicekey); // 32-byte custom key for AES-256
        const iv = crypto.randomBytes(16); // Generate a random 16-byte IV

        // creating a function expression to encrypt text with AES
        const encrypt = (text, Key, iv) => {
          const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
          let encrypted = cipher.update(text, "utf8", "hex");
          encrypted += cipher.final("hex");
          return encrypted;
        };
        encryptedText = encrypt(extractedText, key, iv);
        console.log("AES button has selected");
      } else if (algorithm === "DES") {
        // DES encryption logic here
      } else if (algorithm === "3DES") {
        // 3DES encryption logic here
      }
    } else {
      console.log("Reciever public key is missing");
    }

    //importing the required libraries to convert into  pdf format

    // const pdf = require("pdf-lib");
    const fs = require("fs");

    // Generate the output based on the selected format
    if (format === "PDF FILE") {
      const doc = new PDFDocument({
        size: "A4",
        layout: "portrait",
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });
      const filePath = `./uploads/encrypted/encrypted_${Date.now()}.pdf`; // file path for uploaded file
      // Calculate available width and height after margins
      const availableWidth = 595.28; // A4 width in points
      const availableHeight = 841.89; // A4 height in points

      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);
      // Embed a font, set the font size, and render some text
      doc.image("./images/letter head.png", {
        fit: [availableWidth, availableHeight], // Set the image size
        align: "center", // Optional: center horizontally
        valign: "center", // Optional: center vertically
        x: 0, // Horizontal position
        y: 0, // Vertical position
      });

      doc
        .font("./fonts/Verdana.ttf")
        .fontSize(12)
        .text(encryptedText, 50, 200, {
          width: 500,
          align: "justify",
          indent: false,
          lineBreak: false,
        });

      // doc.image("./fonts/post office logo-black.png", {
      //   fit: [150, 150], // Set the image size
      //   align: "center", // Optional: center horizontally
      //   valign: "center", // Optional: center vertically
      //   x: 230, // Horizontal position
      //   y: 70, // Vertical position
      // });
      doc.end();

      console.log("PDF button has selected"); // to check that user has choosen this button
      console.log("this is the file path: ", filePath); //check that filpath also  coming

      writeStream.on("finish", () => {
        res.status(200).json({
          message: "Encryption successful and PDF generated",
          filePath: filePath,
          encryptedText: encryptedText,
        });
      });
    } else if (format === "TEXT FILE") {
      const filePath = `./uploads/encrypted/encrypted_${Date.now()}.txt`;
      fs.writeFileSync(filePath, encryptedText);

      res.status(200).json({
        message: "Encryption successful and Text file generated",
        filePath: filePath,
      });
    }
    //if the encryption  is successful, store data in mongodb for further usage
    const encryptedData = new encryptionModel({
      username: user,
      reciever_public_key: publicKey,
      algorithm: algorithm,
      encrypted_text: encryptedText,
    });
    await encryptionModel.create(encryptedData); //create the data document in the database
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "encryption Failed", error: error.message });
  }
};

//first do the Decryption for the encrypted text
exports.decryptionController = async (req, res) => {
  try {
    //get the values from fronend passing
    const decryptionData = req.body;
    //store the recieved object in two different variables
    const extractedText = decryptionData.textExtracted;
    const privateKey = decryptionData.recipentKey; // recipent private key
    const algorithm = decryptionData.algorithm; // recipent selected algorithm
    const format = decryptionData.format;

    // Get the first 10 characters extracted text to find it on  the database
    const firstSegment = extractedText.substring(0, 5);

    //find the similar value to the extractedText from the database
    const searchTerm = firstSegment;
    const results = await encryptionModel.aggregate([
      { $match: { encrypted_text: { $regex: searchTerm, $options: "i" } } },
      { $limit: 10 },
    ]);
    // Check if there are any results and log each encrypted_text field
    let textToDecrypt;
    if (results.length > 0) {
      results.forEach((result) => {
        // console.log(result.encrypted_text);
        textToDecrypt = result.encrypted_text; //assign the encrypted text to take for the decryption
      });
    } else {
      console.log("No matching records found.");
    }

    //creating a global variable to take the decrypted text to use in the next functions
    let decryptedText;

    if (privateKey) {
      // Handle RSA Encryption
      if (algorithm === "RSA") {
        const rsa = new nodeRSA(privateKey); // create an instance of node-RSA
        decryptedText = rsa.decrypt(textToDecrypt, "utf8");
        console.log("Decrypted Data:", decryptedText);
      }
      // Handle AES, DES, and other algorithms...
      else if (algorithm === "AES") {
        // AES encryption logic here
      } else if (algorithm === "DES") {
        // DES encryption logic here
      } else if (algorithm === "3DES") {
        // 3DES encryption logic here
      }
    } else {
      console.log("Reciever private key is missing");
    }
    // this is the process after the decryption such as converting into pdf or read only text file
    // const pdf = require("pdf-lib");
    const fs = require("fs");

    // Generate the output based on the selected format
    if (format === "PDF FILE") {
      const doc = new PDFDocument({
        size: "A4",
        layout: "portrait",
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });
      const filePath = `./uploads/decrypted/decrypted_${Date.now()}.pdf`; // file path for uploaded file

      // Calculate available width and height after margins
      const availableWidth = 595.28; // A4 width in points
      const availableHeight = 841.89; // A4 height in points
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // Embed a font, set the font size, and render some text
      doc.image("./images/letter head.png", {
        fit: [availableWidth, availableHeight], // Set the image size
        align: "center", // Optional: center horizontally
        valign: "center", // Optional: center vertically
        x: 0, // Horizontal position
        y: 0, // Vertical position
      });

      doc
        .font("./fonts/Verdana.ttf")
        .fontSize(12) // following replacement is done to  make the text readable without any un wanted white spaces

        .text(decryptedText.replace(/\n+/g, " "), 50, 150, {
          width: 500,
          align: "justify",
          indent: false,
          lineBreak: true,
        });

      doc.end();

      writeStream.on("finish", () => {
        res.status(200).json({
          message: "Decryption successful and PDF generated",
          filePath: filePath,
          decryptedText: decryptedText,
        });
      });
    } else if (format === "TEXT FILE") {
      const filePath = `./uploads/decrypted/decrypted_${Date.now()}.txt`;
      fs.writeFileSync(filePath, decryptedText);

      res.status(200).json({
        message: "Decryption successful and Text file generated",
        filePath: filePath,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Decryption Failed", error: error.message });
  }
};
