import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
    {
      question: "How do you provide returns?",
      answer:
        "We invest your money in verified real estate projects and share profits with you.",
    },
    {
      question: "Do you invest in trading or crypto?",
      answer:
        "No, we only invest in real estate projects and avoid high-risk trading or crypto investments.",
    },
    {
      question: "Is my money safe?",
      answer:
        "Yes, your funds are invested in secure, verified, and legally approved real estate properties.",
    },
    {
      question: "How does mining work?",
      answer:
        "The app simulates mining progress, but in reality, we invest your money in real estate and share profits.",
    },
    {
      question: "How do you guarantee returns?",
      answer:
        "We invest in low-risk rental properties and stable projects, ensuring predictable returns for investors.",
    },
    {
      question: "How does the withdrawal process work?",
      answer:
        "Once your plan ends, profits are added to your wallet. You can request withdrawal, and funds are processed within 24-48 hours.",
    },
    {
      question: "What are the minimum and maximum returns?",
      answer:
        "Minimum investment is $15. Returns vary by plan. For example: Invest $15 and get $20 in 10 days.",
    },
    {
      question: "Can I buy multiple plans at once?",
      answer:
        "Yes, you can purchase multiple active plans, and each plan's profits are calculated separately.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach us via the Help & Support section in the app or email us at support@yourapp.com.",
    },
  ];
  

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 pb-10">
      <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md bg-white"
          >
            {/* Question Header */}
            <button
              className="flex justify-between items-center w-full p-3 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <span className="text-md text-left font-medium text-gray-800">
                {faq.question}
              </span>
              <FaChevronDown
                className={`text-gray-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Answer */}
            <div
              className={`pl-3 pr-6 overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-40 pb-1" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 text-sm ">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
