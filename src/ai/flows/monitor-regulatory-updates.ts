// Monitor ESG regulatory frameworks and send alerts about changes.
'use server';
/**
 * @fileOverview Monitors ESG regulatory frameworks and sends alerts about changes.
 *
 * - monitorRegulatoryUpdates - A function that monitors regulatory updates.
 * - MonitorRegulatoryUpdatesInput - The input type for the monitorRegulatoryUpdates function.
 * - MonitorRegulatoryUpdatesOutput - The return type for the monitorRegulatoryUpdates function.
 */

import {ai} from '@/ai/ai-instance';
import {RegulatoryUpdate, getRegulatoryUpdates} from '@/services/regulatory-updates';
import {z} from 'genkit';

const MonitorRegulatoryUpdatesInputSchema = z.object({
  email: z.string().email().describe('The email address to send alerts to.'),
  slackWebhookUrl: z
    .string()
    .optional()
    .describe('The Slack webhook URL to send alerts to (optional).'),
});
export type MonitorRegulatoryUpdatesInput = z.infer<
  typeof MonitorRegulatoryUpdatesInputSchema
>;

const MonitorRegulatoryUpdatesOutputSchema = z.object({
  updates: z.array(z.string()).describe('A list of regulatory updates.'),
});
export type MonitorRegulatoryUpdatesOutput = z.infer<
  typeof MonitorRegulatoryUpdatesOutputSchema
>;

export async function monitorRegulatoryUpdates(
  input: MonitorRegulatoryUpdatesInput
): Promise<MonitorRegulatoryUpdatesOutput> {
  return monitorRegulatoryUpdatesFlow(input);
}

const sendAlert = ai.defineTool(
  {
    name: 'sendAlert',
    description: 'Sends an alert about regulatory updates via email and/or Slack.',
    inputSchema: z.object({
      email: z.string().email().describe('The email address to send the alert to.'),
      slackWebhookUrl:
        z.string().optional().describe('The Slack webhook URL to send the alert to.'),
      message: z.string().describe('The message to send in the alert.'),
    }),
    outputSchema: z.boolean().describe('Whether the alert was sent successfully.'),
  },
  async input => {
    // TODO: Implement sending the alert via email and/or Slack.
    // This is a placeholder implementation.
    console.log(`Sending alert to ${input.email} and Slack (${input.slackWebhookUrl}): ${input.message}`);
    return true;
  }
);

const regulatoryUpdatesPrompt = ai.definePrompt({
  name: 'regulatoryUpdatesPrompt',
  tools: [sendAlert],
  input: {
    schema: z.object({
      email: z.string().email().describe('The email address to send alerts to.'),
      slackWebhookUrl:
        z.string().optional().describe('The Slack webhook URL to send alerts to.'),
      updates: z.array(z.string()).describe('The regulatory updates to send in the alert.'),
    }),
  },
  output: {
    schema: z.object({
      success: z.boolean().describe('Whether the alert was sent successfully.'),
    }),
  },
  prompt: `You are a compliance officer assistant.

  New regulatory updates have been detected. Send an alert to the compliance officer with the following updates:

  Updates:
  {{#each updates}}
  - {{this}}
  {{/each}}

  Use the sendAlert tool to send the alert to the compliance officer's email address ({{{email}}}) and Slack webhook URL ({{{slackWebhookUrl}}}).
`,
});

const monitorRegulatoryUpdatesFlow = ai.defineFlow<
  typeof MonitorRegulatoryUpdatesInputSchema,
  typeof MonitorRegulatoryUpdatesOutputSchema
>(
  {
    name: 'monitorRegulatoryUpdatesFlow',
    inputSchema: MonitorRegulatoryUpdatesInputSchema,
    outputSchema: MonitorRegulatoryUpdatesOutputSchema,
  },
  async input => {
    const regulatoryUpdates: RegulatoryUpdate[] = await getRegulatoryUpdates();
    const updates = regulatoryUpdates.map(update => `${update.framework}: ${update.description} - ${update.link}`);

    if (updates.length > 0) {
      const {output} = await regulatoryUpdatesPrompt({
        ...input,
        updates,
      });
      return {updates};
    } else {
      return {updates: ['No new regulatory updates found.']};
    }
  }
);
