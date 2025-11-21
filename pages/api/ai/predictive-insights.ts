
// FIX: Use 'import type' for Next.js API types to avoid module resolution errors.
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPredictiveInsights } from '../../../services/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { businessType } = req.body;

    if (!businessType) {
        return res.status(400).json({ message: 'businessType is required' });
    }

    try {
        let insights = await getPredictiveInsights(businessType);
        
        // Robust JSON extraction: find the first '{' and last '}' to ignore potential markdown blocks or preamble
        // This handles cases where the model wraps output in ```json ... ``` or adds conversational filler.
        const firstBrace = insights.indexOf('{');
        const lastBrace = insights.lastIndexOf('}');
        
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            insights = insights.substring(firstBrace, lastBrace + 1);
        }

        const parsedInsights = JSON.parse(insights);
        return res.status(200).json(parsedInsights);
    } catch (error) {
        console.error("Error in predictive insights API endpoint:", error);
        return res.status(500).json({ message: 'Failed to generate insights' });
    }
}
