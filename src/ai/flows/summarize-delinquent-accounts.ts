'use server';
/**
 * @fileOverview A flow that summarizes delinquent accounts using a GenAI model.
 *
 * - summarizeDelinquentAccounts - A function that handles the summarization process.
 * - SummarizeDelinquentAccountsInput - The input type for the summarizeDelinquentAccounts function.
 * - SummarizeDelinquentAccountsOutput - The return type for the summarizeDelinquentAccounts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDelinquentAccountsInputSchema = z.object({
  delinquentAccountsData: z
    .string()
    .describe(
      'A string containing data about delinquent accounts, including account IDs, names, addresses, service types, and outstanding balances.'
    ),
});
export type SummarizeDelinquentAccountsInput = z.infer<typeof SummarizeDelinquentAccountsInputSchema>;

const SummarizeDelinquentAccountsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the delinquent accounts, highlighting key patterns and insights.'
    ),
});
export type SummarizeDelinquentAccountsOutput = z.infer<typeof SummarizeDelinquentAccountsOutputSchema>;

export async function summarizeDelinquentAccounts(
  input: SummarizeDelinquentAccountsInput
): Promise<SummarizeDelinquentAccountsOutput> {
  return summarizeDelinquentAccountsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDelinquentAccountsPrompt',
  input: {schema: SummarizeDelinquentAccountsInputSchema},
  output: {schema: SummarizeDelinquentAccountsOutputSchema},
  prompt: `You are an AI assistant helping an administrator understand delinquent accounts.

You are provided with data about delinquent accounts.  Your job is to create a summary that highlights key patterns and insights.

Delinquent Accounts Data: {{{delinquentAccountsData}}}`,
});

const summarizeDelinquentAccountsFlow = ai.defineFlow(
  {
    name: 'summarizeDelinquentAccountsFlow',
    inputSchema: SummarizeDelinquentAccountsInputSchema,
    outputSchema: SummarizeDelinquentAccountsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
