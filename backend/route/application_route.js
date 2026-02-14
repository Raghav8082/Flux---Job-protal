import express from'express';
import isauthenticated from'../middleware/isautheniticated.js';

import {applyjob,getappliedjobs,getapplications,updatestatus} from "../controllers/application_controller.js";


const router = express.Router();

router.route('/apply/:id').get(isauthenticated,applyjob);
router.route('/appliedjobs').get(isauthenticated,getappliedjobs);
router.route('/getapplications/:id').get(isauthenticated,getapplications);
router.route('/status/:id/update').post(isauthenticated,updatestatus);

export default router;
