const multer = require("multer");
const path = require("path");

// Generic function to configure Multer
const configureMulter = (uploadPath) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let subfolder = file.fieldname === "photos" ? "photos" : "videos";
      cb(null, path.join(__dirname, "../uploads", uploadPath, subfolder));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === "photos" && !file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed for photos."), false);
    }
    if (file.fieldname === "videos" && !file.mimetype.startsWith("video/")) {
      return cb(new Error("Only video files are allowed for videos."), false);
    }
    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 1000 * 1024 * 1024 }, // 1000MB file size limit
  });
};

module.exports = configureMulter;

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs-extra");

// const createUploadMiddleware = (uploadFolder) => {
//   // Define the upload directory based on the provided folder name
//   const uploadDir = path.join(__dirname, `../uploads/${uploadFolder}`);

//   // Ensure the upload directory exists
//   fs.ensureDirSync(uploadDir);

//   // Multer Storage Configuration
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, uploadDir); // Use dynamic folder path
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
//     },
//   });

//   // File Filter (only allow images for example)
//   const fileFilter = (req, file, cb) => {
//     const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
//     if (allowedMimeTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(
//         new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
//         false
//       );
//     }
//   };

//   // Multer Upload Instance
//   const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 20 * 1024 * 1024 }, //  max file size
//   });

//   return upload;
// };

// module.exports = createUploadMiddleware;
