// FIX: Use 'import type' for Next.js API types to avoid module resolution errors.
import type { NextApiRequest, NextApiResponse } from 'next';
import { getROIAnalysis } from '../../../services/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { customers, timeSaved, avgSpend } = req.body;

    if (customers === undefined || timeSaved === undefined || avgSpend === undefined) {
        return res.status(400).json({ message: 'Missing required fields for ROI analysis' });
    }

    try {
        const analysis = await getROIAnalysis(customers, timeSaved, avgSpend);
        return res.status(200).json({ analysis });
    } catch (error) {
        console.error("Error in ROI API endpoint:", error);
        return res.status(500).json({ message: 'Failed to generate ROI analysis' });
    }
}
