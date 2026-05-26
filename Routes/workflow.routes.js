import { Router } from 'express';
// controller
import {sendReminders} from "../controllers/workflow.controller.js";

const workflowRouter = Router();
// start the reminders workflow
workflowRouter.post('/subscription/reminder', sendReminders);

export default workflowRouter;