'use server';
/**
 * @fileOverview A flow to aggregate ESG data from various sources using AI.
 *
 * - aggregateEsgData - A function that handles the ESG data aggregation process.
 * - AggregateEsgDataInput - The input type for the aggregateEsgData function.
 * - AggregateEsgDataOutput - The return type for the aggregateEsgData function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getRegulatoryUpdates} from '@/services/regulatory-updates';
import {getEsgNews} from '@/services/news-api';

const AggregateEsgDataInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  industry: z.string().describe('The industry of the company.'),
});
export type AggregateEsgDataInput = z.infer<typeof AggregateEsgDataInputSchema>;

const AggregateEsgDataOutputSchema = z.object({
  esgSummary: z.string().describe('A summary of the company\'s ESG performance.'),
  regulatoryUpdates: z.array(z.object({
    framework: z.string(),
    description: z.string(),
    link: z.string(),
  })).describe('The latest regulatory updates for ESG frameworks.'),
  newsArticles: z.array(z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(),
    datePublished: z.string(),
  })).describe('The latest ESG-related news articles.'),
});
export type AggregateEsgDataOutput = z.infer<typeof AggregateEsgDataOutputSchema>;

export async function aggregateEsgData(input: AggregateEsgDataInput): Promise<AggregateEsgDataOutput> {
  return aggregateEsgDataFlow(input);
}

const aggregateEsgDataPrompt = ai.definePrompt({
  name: 'aggregateEsgDataPrompt',
  input: {
    schema: z.object({
      companyName: z.string().describe('The name of the company.'),
      industry: z.string().describe('The industry of the company.'),
      regulatoryUpdates: z.array(z.object({
        framework: z.string(),
        description: z.string(),
        link: z.string(),
      })).describe('The latest regulatory updates for ESG frameworks.'),
      newsArticles: z.array(z.object({
        title: z.string(),
        description: z.string(),
        url: z.string(),
        datePublished: z.string(),
      })).describe('The latest ESG-related news articles.'),
    }),
  },
  output: {
    schema: z.object({
      esgSummary: z.string().describe('A summary of the company\'s ESG performance.'),
    }),
  },
  prompt: `You are an AI ESG analyst providing a summary of a company's ESG performance.

  Company Name: {{{companyName}}}
  Industry: {{{industry}}}

  Latest Regulatory Updates:
  {{#each regulatoryUpdates}}
  - Framework: {{{framework}}}, Description: {{{description}}}, Link: {{{link}}}
  {{/each}}

  Latest ESG News Articles:
  {{#each newsArticles}}
  - Title: {{{title}}}, Description: {{{description}}}, URL: {{{url}}}, Date Published: {{{datePublished}}}
  {{/each}}

  Provide a concise summary of the company's ESG performance, taking into account the regulatory updates and news articles.
  The summary should be no more than 200 words.
  `,
});

const aggregateEsgDataFlow = ai.defineFlow<
  typeof AggregateEsgDataInputSchema,
  typeof AggregateEsgDataOutputSchema
>({
  name: 'aggregateEsgDataFlow',
  inputSchema: AggregateEsgDataInputSchema,
  outputSchema: AggregateEsgDataOutputSchema,
},
async input => {
  const regulatoryUpdates = await getRegulatoryUpdates();
  const newsArticles = await getEsgNews();

  const {output} = await aggregateEsgDataPrompt({
    ...input,
    regulatoryUpdates,
    newsArticles,
  });

  return {
    ...output,
    regulatoryUpdates,
    newsArticles,
  };
});

