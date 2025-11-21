// FIX: Use 'import type' for Next.js API types to avoid module resolution errors.
import type { NextApiRequest, NextApiResponse } from 'next';
import { getChatbotResponseStream } from '../../../services/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { message, history } = req.body;

    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }

    try {
        const stream = await getChatbotResponseStream(history || [], message);
        
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
        console.error("Error in chat API:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
