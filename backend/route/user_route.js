import express from'express';

const router = express.Router();

import { registerUser, login, updateprofile,logout } from '../controllers/user_controller.js';
import { uploadProfilePhoto,uploadResume } from '../middleware/multer.js';
import isauthenticated from "../middleware/isautheniticated.js"

router.post('/register',uploadProfilePhoto, registerUser);
router.post('/login', login);
router.post('/profile/update',isauthenticated,uploadResume,updateprofile); 
router.get('/logout', logout);

export default router;
