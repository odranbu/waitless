// FIX: Use 'import type' for Next.js API types to avoid module resolution errors.
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAITipStream } from '../../../services/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { businessType } = req.query;

    if (typeof businessType !== 'string' || !businessType) {
        return res.status(400).json({ message: 'businessType is required' });
    }

    try {
        const stream = await getAITipStream(businessType);
        
        res.writeHead(200, {
            'Content-Type': 'text/plain; charset=utf-8',
            'Transfer-Encoding': 'chunked',
        });

        const reader = stream.getReader();
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            res.write(value);
        }
        res.end();

    } catch (error) {
        console.error("Error in tip API:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
