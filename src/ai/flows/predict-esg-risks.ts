'use server';
/**
 * @fileOverview Predicts ESG risks and performs scenario modeling.
 *
 * - predictEsgRisks - A function that handles the ESG risk prediction process.
 * - PredictEsgRisksInput - The input type for the predictEsgRisks function.
 * - PredictEsgRisksOutput - The return type for the predictEsgRisks function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const PredictEsgRisksInputSchema = z.object({
  companyDescription: z.string().describe('A description of the company and its operations.'),
  industry: z.string().describe('The industry the company operates in.'),
  location: z.string().describe('The geographical location of the company.'),
  financialData: z.string().describe('Key financial data of the company.'),
  esgPolicies: z.string().optional().describe('A description of the company\'s ESG policies and initiatives.'),
});
export type PredictEsgRisksInput = z.infer<typeof PredictEsgRisksInputSchema>;

const PredictEsgRisksOutputSchema = z.object({
  riskSummary: z.string().describe('A summary of the predicted ESG risks.'),
  riskDetails: z.array(z.object({
    riskCategory: z.string().describe('The category of the ESG risk (e.g., environmental, social, governance).'),
    riskDescription: z.string().describe('A detailed description of the specific ESG risk.'),
    likelihood: z.string().describe('The likelihood of the risk occurring (e.g., high, medium, low).'),
    potentialImpact: z.string().describe('The potential impact of the risk on the company (e.g., financial, reputational).'),
    mitigationStrategies: z.string().describe('Recommended strategies to mitigate the risk.'),
  })).describe('Detailed information about each identified ESG risk.'),
  scenarioModeling: z.string().describe('Results of scenario modeling based on different ESG factors.'),
});
export type PredictEsgRisksOutput = z.infer<typeof PredictEsgRisksOutputSchema>;

export async function predictEsgRisks(input: PredictEsgRisksInput): Promise<PredictEsgRisksOutput> {
  return predictEsgRisksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictEsgRisksPrompt',
  input: {
    schema: z.object({
      companyDescription: z.string().describe('A description of the company and its operations.'),
      industry: z.string().describe('The industry the company operates in.'),
      location: z.string().describe('The geographical location of the company.'),
      financialData: z.string().describe('Key financial data of the company.'),
      esgPolicies: z.string().optional().describe('A description of the company\'s ESG policies and initiatives.'),
    }),
  },
  output: {
    schema: z.object({
      riskSummary: z.string().describe('A summary of the predicted ESG risks.'),
      riskDetails: z.array(z.object({
        riskCategory: z.string().describe('The category of the ESG risk (e.g., environmental, social, governance).'),
        riskDescription: z.string().describe('A detailed description of the specific ESG risk.'),
        likelihood: z.string().describe('The likelihood of the risk occurring (e.g., high, medium, low).'),
        potentialImpact: z.string().describe('The potential impact of the risk on the company (e.g., financial, reputational).'),
        mitigationStrategies: z.string().describe('Recommended strategies to mitigate the risk.'),
      })).describe('Detailed information about each identified ESG risk.'),
      scenarioModeling: z.string().describe('Results of scenario modeling based on different ESG factors.'),
    }),
  },
  prompt: `You are an expert ESG risk analyst. Given the following information about a company, predict potential ESG risks and perform scenario modeling.

Company Description: {{{companyDescription}}}
Industry: {{{industry}}}
Location: {{{location}}}
Financial Data: {{{financialData}}}
ESG Policies: {{{esgPolicies}}}

Provide a summary of the predicted ESG risks, detailed information about each risk (category, description, likelihood, potential impact, mitigation strategies), and the results of scenario modeling based on different ESG factors. Focus on potential labor violations and emissions penalties.
`,
});

const predictEsgRisksFlow = ai.defineFlow<
  typeof PredictEsgRisksInputSchema,
  typeof PredictEsgRisksOutputSchema
>({
  name: 'predictEsgRisksFlow',
  inputSchema: PredictEsgRisksInputSchema,
  outputSchema: PredictEsgRisksOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
