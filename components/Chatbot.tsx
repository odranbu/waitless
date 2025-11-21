import React, { useState, useRef, useEffect } from 'react';

// ... (Icons remain the same)
const ChatIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72 3.72a1.05 1.05 0 0 1-1.485 0l-3.72-3.72a2.1 2.1 0 0 1-1.98-2.193v-4.286c0-.97.616-1.813 1.5-2.097M16.5 9.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
  </svg>
);

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M3.105 3.105a.75.75 0 0 1 .814-.158l14.682 4.894a.75.75 0 0 1 0 1.32l-14.682 4.894a.75.75 0 0 1-.972-.972l2.36-7.382-2.36-7.382a.75.75 0 0 1 .158-.814Z" clipRule="evenodd" />
    </svg>
);


interface Message {
    role: 'user' | 'model';
    parts: { text: string }[];
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const initialMessage: Message = {
        role: 'model',
        parts: [{ text: "Hello! I'm the WaitLess assistant. How can I help you learn about our queue management system? You can ask me about features, pricing, or how to get started." }]
    };
    const [messages, setMessages] = useState<Message[]>([initialMessage]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const suggestedQuestions = [
        "What are the key features?",
        "How much does it cost?",
        "How do I start my free trial?",
    ];

    useEffect(() => {
        chatBodyRef.current?.scrollTo(0, chatBodyRef.current.scrollHeight);
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen && !isLoading) {
            inputRef.current?.focus();
        }
    }, [isOpen, isLoading]);
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim()) return;

        const newUserMessage: Message = { role: 'user', parts: [{ text: messageText }] };
        const newMessages: Message[] = [...messages, newUserMessage];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        // Add a placeholder for the model's response immediately
        setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageText,
                    history: messages.slice(1)
                }),
            });

            // Check for demo environment
            const contentType = response.headers.get("content-type");
            if (!response.ok || (contentType && contentType.includes("text/html"))) {
                throw new Error('Demo Mode');
            }

            const reader = response.body!.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                fullResponse += decoder.decode(value, { stream: true });
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1].parts[0].text = fullResponse;
                    return updatedMessages;
                });
            }

        } catch (error) {
            // DEMO MOCK RESPONSE
            const mockResponse = "I'm in demo mode right now! In the full version, I would use Gemini AI to answer your question about: \"" + messageText + "\".\n\nFor now, I can tell you that WaitLess costs $29/month and features include virtual queuing, AI insights, and SMS notifications.";
            let currentText = "";
            const speed = 20;
            
            for (let i = 0; i < mockResponse.length; i++) {
                 await new Promise(r => setTimeout(r, speed));
                 currentText += mockResponse[i];
                 setMessages(prev => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1].parts[0].text = currentText;
                    return updatedMessages;
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg shadow-purple-500/30 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-transform transform hover:scale-110 ${!isOpen ? 'animate-pulse-chat' : ''}`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>

            <div 
                role="dialog"
                aria-modal="true"
                aria-labelledby="chatbot-header"
                className={`fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[65vh] max-h-[700px] bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-xl flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            >
                <header className="bg-slate-800 text-white p-4 rounded-t-2xl flex justify-between items-center flex-shrink-0">
                    <h3 id="chatbot-header" className="font-bold text-lg">WaitLess Assistant</h3>
                    <button onClick={() => setIsOpen(false)} aria-label="Close chat window"><CloseIcon /></button>
                </header>

                <div ref={chatBodyRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`py-2 px-4 rounded-2xl max-w-[85%] ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.parts[0].text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length-1].role === 'user' && (
                         <div className="flex justify-start">
                            <div className="py-2 px-4 rounded-2xl bg-slate-700 rounded-bl-none">
                                <div className="flex items-center space-x-1.5">
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    )}
                     {messages.length === 1 && !isLoading && (
                        <div className="p-2 space-y-2">
                           {suggestedQuestions.map(q => (
                             <button key={q} onClick={() => handleSendMessage(q)} className="w-full text-left text-sm text-purple-300 bg-purple-500/20 hover:bg-purple-500/30 p-2 rounded-lg transition-colors">
                                {q}
                             </button>
                           ))}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-slate-700">
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(userInput); }} className="flex items-center space-x-2">
                        <input
                            ref={inputRef} type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 px-4 py-2 bg-slate-800 text-white border border-slate-600 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            disabled={isLoading}
                        />
                        <button
                           type="submit" disabled={isLoading || !userInput.trim()}
                            className="p-3 bg-purple-600 text-white rounded-full disabled:bg-purple-400/50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                            aria-label="Send message"
                        ><SendIcon /></button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;