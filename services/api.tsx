
import { GoogleGenAI, Type } from '@google/genai';

// Helper to get AI instance or null if key is missing
const getAI = () => {
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    
    // Check if key is missing, empty, or is the default placeholder
    if (!apiKey || apiKey.includes('INSERT_YOUR') || apiKey.length < 10) {
        // We silently fail to null to trigger Demo Mode logic below
        return null;
    }
    
    return new GoogleGenAI({ apiKey: apiKey });
};

// --- Tip Generation ---
export const getAITipStream = async (businessType: string): Promise<ReadableStream<Uint8Array>> => {
    const genAI = getAI();
    const encoder = new TextEncoder();

    // Demo Mode Fallback
    if (!genAI) {
        const demoText = `(Demo Mode) For a ${businessType}, try creating a dedicated express lane for quick transactions. This simple change can reduce perceived wait times by up to 30% and improve customer satisfaction scores immediately.`;
        return new ReadableStream({
            start(controller) {
                // Simulate a slight delay for realism
                controller.enqueue(encoder.encode(demoText));
                controller.close();
            }
        });
    }

    const model = 'gemini-2.5-flash';
    const systemInstruction = 'You are a senior operations consultant specializing in customer flow and queue psychology. Your advice must be actionable, innovative, and concise.';
    
    const prompt = `Generate a single, high-impact operational tip for a "${businessType}" to reduce perceived wait time or improve customer patience. 
    
    Constraints:
    - Maximum 40 words.
    - Be specific to the industry.
    - Do not use introductory phrases like "Try this:".`;

    try {
        const responseStream = await genAI.models.generateContentStream({
            model,
            contents: prompt,
            config: {
                systemInstruction,
                temperature: 0.7,
            }
        });
        
        return new ReadableStream({
            async start(controller) {
                for await (const chunk of responseStream) {
                    const text = chunk.text;
                    if (text) controller.enqueue(encoder.encode(text));
                }
                controller.close();
            }
        });
    } catch (error) {
        console.error('AI Stream Error:', error);
        // Fallback if real API fails
        const errorText = "AI Service unavailable. Please check your internet connection.";
        return new ReadableStream({
            start(controller) {
                controller.enqueue(encoder.encode(errorText));
                controller.close();
            }
        });
    }
};

// --- Notification Generation ---
export const generateNotificationMessage = async (scenario: string, tone: string, details: string): Promise<string> => {
    const genAI = getAI();

    if (!genAI) {
        return `(Demo) Hi [Name], regarding your ${scenario}: ${details}. We appreciate your patience!`;
    }

    const model = 'gemini-2.5-flash';
    const prompt = `Write an SMS notification for a customer waiting in a queue.
    Scenario: ${scenario}, Tone: ${tone}, Details: ${details}.
    Requirements: MAX 160 chars. Output ONLY the message.`;
    
    try {
        const response = await genAI.models.generateContent({
            model,
            contents: prompt,
            config: { maxOutputTokens: 100 }
        });
        return response.text?.trim() || "Message generation failed.";
    } catch (e) {
        return "Unable to generate message at this time.";
    }
};

// --- ROI Analysis ---
export const getROIAnalysis = async (customers: number, timeSaved: number, avgSpend: number): Promise<string> => {
    const genAI = getAI();

    if (!genAI) {
        return `(Demo Analysis) Saving ${timeSaved} mins for ${customers} daily customers could increase annual revenue by approx $${(customers * avgSpend * 0.15 * 365).toLocaleString()} through improved retention.`;
    }

    const model = 'gemini-2.5-flash';
    const prompt = `Analyze financial impact: ${customers} daily customers, ${timeSaved} min saved/customer, $${avgSpend} avg spend. Provide 2 sentence executive summary on revenue uplift.`;
    
    try {
        const response = await genAI.models.generateContent({
            model,
            contents: prompt,
            config: { maxOutputTokens: 150 }
        });

        return response.text?.trim() || "Analysis unavailable.";
    } catch (e) {
        return "Analysis currently unavailable.";
    }
};

// --- Predictive Insights Generation ---
export const getPredictiveInsights = async (businessType: string): Promise<string> => {
    const genAI = getAI();

    if (!genAI) {
        return JSON.stringify({
            peakDay: "Saturday",
            peakHours: "11:00 AM - 2:00 PM",
            keyObservation: `(Demo) ${businessType} businesses often see a 40% traffic spike on weekends.`,
            recommendations: [
                { title: "Staff Up", description: "Add 1 staff member during peak hours." },
                { title: "Digital Check-in", description: "Enable remote join to reduce lobby crowding." }
            ]
        });
    }

    const model = 'gemini-2.5-flash';
    const prompt = `Analyze traffic patterns for a "${businessType}". Generate JSON with peakDay, peakHours, keyObservation, and recommendations (title, description).`;

    try {
        const response = await genAI.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        peakDay: { type: Type.STRING },
                        peakHours: { type: Type.STRING },
                        keyObservation: { type: Type.STRING },
                        recommendations: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    description: { type: Type.STRING }
                                }
                            }
                        }
                    }
                }
            }
        });
        
        return response.text?.trim() || "{}";
    } catch (e) {
        return "{}";
    }
};

// --- Chatbot Service ---
export const getChatbotResponseStream = async (history: any[], message: string): Promise<ReadableStream<Uint8Array>> => {
    const genAI = getAI();
    const encoder = new TextEncoder();

    if (!genAI) {
        const demoResponse = "I am currently in Demo Mode because no API key was detected. In Production, I would use Gemini 2.5 Flash to answer: " + message;
        return new ReadableStream({
            start(controller) {
                controller.enqueue(encoder.encode(demoResponse));
                controller.close();
            }
        });
    }

    try {
        const chat = genAI.chats.create({
            model: 'gemini-2.5-flash',
            history,
            config: {
                systemInstruction: 'You are Leah, the helpful AI support agent for WaitLess. Keep answers concise.',
            }
        });
        
        const resultStream = await chat.sendMessageStream({ message });
        
        return new ReadableStream({
            async start(controller) {
                for await (const chunk of resultStream) {
                    const text = chunk.text;
                    if (text) controller.enqueue(encoder.encode(text));
                }
                controller.close();
            },
        });
    } catch (e) {
         const errorResponse = "I'm having trouble connecting to the AI brain right now. Please try again later.";
         return new ReadableStream({
            start(controller) {
                controller.enqueue(encoder.encode(errorResponse));
                controller.close();
            }
        });
    }
};
