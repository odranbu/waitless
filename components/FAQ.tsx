import React, { useState } from 'react';

const faqData = [
  {
    question: "How easy is it to set up WaitLess?",
    answer: "It's incredibly simple! You can get started in under 5 minutes. Just sign up for the free trial, configure a few basic settings for your business, and you'll get a QR code to display. Customers scan it to join the queue—no app download required for them."
  },
  {
    question: "What happens after the 5-day free trial ends?",
    answer: "After your trial, you'll be prompted to subscribe to our simple plan for $29/month. If you choose not to subscribe, your account will be paused, but you won't lose your settings. You can upgrade at any time."
  },
  {
    question: "Can I customize the queue page with my own branding?",
    answer: "Absolutely. Our platform allows you to upload your logo, choose your brand colors, and customize the messages your customers see. This ensures a seamless brand experience from start to finish."
  },
  {
    question: "Is WaitLess suitable for my type of business?",
    answer: "WaitLess is designed for a wide range of businesses, including cafes, restaurants, medical clinics, retail stores, salons, and government services. If you have customers who have to wait, WaitLess can help."
  },
];

const FaqItem: React.FC<{ item: typeof faqData[0]; isOpen: boolean; onClick: () => void; }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-700">
      <button
        className="w-full text-left flex justify-between items-center py-5 focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-slate-100">{item.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
            <div className="pb-5 text-slate-300">
                {item.answer}
            </div>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-32 bg-slate-900/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-50 tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-slate-300">
            Have questions? We've got answers. If you need more help, feel free to use our chat assistant.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;