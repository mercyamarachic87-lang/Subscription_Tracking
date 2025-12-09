import Subscription from '../model/subscription.js';
import {workflowClient} from "../config/upstash.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ... req.body,
            user: req.user._id
        });

        await workflowClient.trigger({url, body, header,workflowRunId, retries }, {
            url: `${SERVER_URL}`

        })
        res.status(201).json({ success: true, data: subscription });
    } catch (e) {
        next(e);

    }
}
export default createSubscription;