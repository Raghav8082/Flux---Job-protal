import express from 'express';
import isauthenticated from '../middleware/isautheniticated.js';
import { getcompany, getcompanybyid, registercompany, updatecompany } from '../controllers/company_controller.js';
import { uploadCompanyLogo } from "../middleware/multer.js";

const router = express.Router();

router.route('/register').post(isauthenticated,registercompany);
// Backward-compatible alias
router.route('/registercompany').post(isauthenticated,registercompany);
router.route('/get').get(isauthenticated,getcompany);
router.route('/get/:id').get(isauthenticated,getcompanybyid);
router.route('/update/:id').post(isauthenticated, uploadCompanyLogo, updatecompany);

export default router;

