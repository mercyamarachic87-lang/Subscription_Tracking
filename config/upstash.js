import { Client as workflowClient } from '@upstatsh/workflow';

import { QSTASH_TOKEN, QTASH_URL } from './env.js';

export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH+TOKEN,
})