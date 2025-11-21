// FIX: Use 'import type' for Next.js API types to avoid module resolution errors.
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateNotificationMessage } from '../../../services/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { scenario, tone, details } = req.body;
    
    if (!scenario || !tone || !details) {
        return res.status(400).json({ message: 'Missing required fields: scenario, tone, details' });
    }

    try {
        const message = await generateNotificationMessage(scenario, tone, details);
        res.status(200).json({ message });
    } catch (error) {
        console.error("Error in notification API:", error);
        res.status(500).json({ message: 'Failed to generate notification' });
    }
}
