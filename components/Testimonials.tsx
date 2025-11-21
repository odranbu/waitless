import React from 'react';

const testimonials = [
  {
    quote: "WaitLess completely transformed how I manage my time. I can't imagine going back to physical lines!",
    author: "Sarah M.",
    title: "Premium User",
    avatar: "https://storage.googleapis.com/aistudio-hosting/workspace-assets/c8d9e0f1-a2b3-c4d5-e6f7-a8b9c0d1e2f3/retail-manager.jpeg",
  },
  {
    quote: "We cut down our peak-hour wait times by half. The analytics are incredibly insightful. I can't recommend it enough.",
    author: "John S.",
    title: "Cafe Owner",
    avatar: "https://storage.googleapis.com/aistudio-hosting/workspace-assets/d9e0f1a2-b3c4-d5e6-f7a8-b9c0d1e2f3a4/cafe-owner.jpeg",
  },
  {
    quote: "A lifesaver for parents! We can join a restaurant queue from the playground. It makes family days out so much less stressful.",
    author: "David C.",
    title: "Parent & User",
    avatar: "https://storage.googleapis.com/aistudio-hosting/workspace-assets/e0f1a2b3-c4d5-e6f7-a8b9-c0d1e2f3a4b5/doctor-male.jpeg",
  },
];

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-20 sm:py-32 bg-slate-900/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
                        Loved by thousands of users
                    </h2>
                    <p className="mt-4 text-xl text-slate-300">
                        Don't just take our word for it. Here's what our customers are saying.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-2xl flex flex-col p-8 transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div className="flex-grow">
                                <blockquote className="text-slate-300">
                                    <p className="text-lg">"{testimonial.quote}"</p>
                                </blockquote>
                            </div>
                            <footer className="mt-8">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img className="h-12 w-12 rounded-full object-cover" src={testimonial.avatar} alt={`Avatar of ${testimonial.author}`} />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-base font-bold text-slate-50">{testimonial.author}</div>
                                        <div className="text-base text-slate-400">{testimonial.title}</div>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;