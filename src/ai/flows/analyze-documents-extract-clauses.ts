'use server';

/**
 * @fileOverview A document analysis AI agent for extracting key clauses related to ESG.
 *
 * - analyzeDocumentsExtractClauses - A function that handles the document analysis process.
 * - AnalyzeDocumentsExtractClausesInput - The input type for the analyzeDocumentsExtractClauses function.
 * - AnalyzeDocumentsExtractClausesOutput - The return type for the analyzeDocumentsExtractClauses function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeDocumentsExtractClausesInputSchema = z.object({
  documentText: z.string().describe('The text content of the document to analyze.'),
});
export type AnalyzeDocumentsExtractClausesInput = z.infer<typeof AnalyzeDocumentsExtractClausesInputSchema>;

const AnalyzeDocumentsExtractClausesOutputSchema = z.object({
  clauses: z.array(z.string()).describe('Key clauses related to ESG found in the document.'),
});
export type AnalyzeDocumentsExtractClausesOutput = z.infer<typeof AnalyzeDocumentsExtractClausesOutputSchema>;

export async function analyzeDocumentsExtractClauses(
  input: AnalyzeDocumentsExtractClausesInput
): Promise<AnalyzeDocumentsExtractClausesOutput> {
  return analyzeDocumentsExtractClausesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDocumentsExtractClausesPrompt',
  input: {
    schema: z.object({
      documentText: z.string().describe('The text content of the document to analyze.'),
    }),
  },
  output: {
    schema: z.object({
      clauses: z.array(z.string()).describe('Key clauses related to ESG found in the document.'),
    }),
  },
  prompt: `You are an AI assistant specialized in analyzing documents for ESG compliance.
  Your task is to extract key clauses related to Environmental, Social, and Governance (ESG) factors from the given document.
  Identify clauses that pertain to sustainability, ethical conduct, social responsibility, and corporate governance.
  Return these clauses in a list.

  Document:
  {{documentText}}`,
});

const analyzeDocumentsExtractClausesFlow = ai.defineFlow<
  typeof AnalyzeDocumentsExtractClausesInputSchema,
  typeof AnalyzeDocumentsExtractClausesOutputSchema
>(
  {
    name: 'analyzeDocumentsExtractClausesFlow',
    inputSchema: AnalyzeDocumentsExtractClausesInputSchema,
    outputSchema: AnalyzeDocumentsExtractClausesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
