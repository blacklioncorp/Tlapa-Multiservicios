import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-delinquent-accounts.ts';
import '@/ai/flows/suggest-address-corrections.ts';