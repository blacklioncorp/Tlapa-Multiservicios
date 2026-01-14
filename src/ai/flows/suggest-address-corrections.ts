'use server';

/**
 * @fileOverview A flow that suggests address corrections using a GenAI model.
 *
 * - suggestAddressCorrections - A function that handles the address correction process.
 * - SuggestAddressCorrectionsInput - The input type for the suggestAddressCorrections function.
 * - SuggestAddressCorrectionsOutput - The return type for the suggestAddressCorrections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAddressCorrectionsInputSchema = z.object({
  address: z.string().describe('The address to correct.'),
});
export type SuggestAddressCorrectionsInput = z.infer<typeof SuggestAddressCorrectionsInputSchema>;

const SuggestAddressCorrectionsOutputSchema = z.object({
  correctedAddress: z.string().describe('The corrected address.'),
});
export type SuggestAddressCorrectionsOutput = z.infer<typeof SuggestAddressCorrectionsOutputSchema>;

export async function suggestAddressCorrections(
  input: SuggestAddressCorrectionsInput
): Promise<SuggestAddressCorrectionsOutput> {
  return suggestAddressCorrectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAddressCorrectionsPrompt',
  input: {schema: SuggestAddressCorrectionsInputSchema},
  output: {schema: SuggestAddressCorrectionsOutputSchema},
  prompt: `You are an address correction service. Given an address, you will correct any errors and standardize the format.

Address: {{{address}}}`,
});

const suggestAddressCorrectionsFlow = ai.defineFlow(
  {
    name: 'suggestAddressCorrectionsFlow',
    inputSchema: SuggestAddressCorrectionsInputSchema,
    outputSchema: SuggestAddressCorrectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
