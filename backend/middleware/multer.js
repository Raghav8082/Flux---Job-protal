import multer from "multer";
import path from "path";

// 🔹 Store file in memory (needed for Cloudinary)
const storage = multer.memoryStorage();

// 🔹 Optional: file type filter
const fileFilter = (req, file, cb) => {
  // allowed file types
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Invalid file type"
      )
    );
  }
};

// 🔹 Base multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

/* =====================================================
   EXPORT DIFFERENT UPLOAD MIDDLEWARES
   ===================================================== */

// 📄 Resume upload (used in update profile)
export const uploadResume = upload.single("resume");

// 🖼️ Profile photo upload (used in signup / profile photo update)
export const uploadProfilePhoto = upload.single("profilePhoto");

// 🏢 Company logo upload (used in company update)
export const uploadCompanyLogo = upload.single("file");
