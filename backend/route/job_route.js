import express from"express";
import isauthenticated from"../middleware/isautheniticated.js";
import { postJob, getalljobs ,getjobbyid,getAdminjobs} from"../controllers/job_controller.js";
const router = express.Router();

router.route('/post').post(isauthenticated,postJob);
// Public endpoints (used by the frontend to list/browse jobs)
router.route('/get').get(getalljobs);
router.route('/get/:id').get(getjobbyid);
router.route('/getadminjobs').get(isauthenticated,getAdminjobs);
// router.route('/update/:id').post(isauthenticated,updatejob);
// router.route('/delete/:id').delete(isauthenticated,deletejob);

export default router;
