import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const Help = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What should I do if I have an unplanned pregnancy?",
      answer:
        "If you're facing an unplanned pregnancy, take a deep breath and seek support. You can talk to a trusted friend, family member, or counselor. Our platform also provides professional guidance and resources to help you navigate this situation.",
    },
    {
      question: "Where can I find medical and emotional support?",
      answer:
        "You can access confidential medical advice and emotional support through certified professionals on our platform. We also connect you with local healthcare providers and mental health resources.",
    },
    {
      question: "Are my conversations with counselors private?",
      answer:
        "Yes, all conversations with counselors on SheHope are fully confidential. Your privacy and security are our top priorities.",
    },
    {
      question: "What financial help is available for pregnant women?",
      answer:
        "There are various financial assistance programs available, including grants, community support funds, and government assistance. You can explore our crowdfunding feature to raise support for your needs.",
    },
    {
      question: "How can I learn about my legal rights regarding pregnancy?",
      answer:
        "Laws vary by region, but SheHope provides up-to-date legal guidance based on your location to help you understand your rights and available options.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="ml-64 mt-20 max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Help and Support
      </h2>

      {/* FAQ Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </h4>
                {openFAQ === index ? (
                  <ChevronUp size={20} className="text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />
                )}
              </div>
              {openFAQ === index && (
                <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Contact Support
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          If you need further assistance, feel free to reach out. We are here to help!
        </p>
        <button
          onClick={() => window.location.href = "mailto:support@shehope.com"}
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300"
        >
          Email Support
        </button>
      </div>

      {/* Report an Issue Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Report an Issue
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          If you encounter any problems, please describe them below.
        </p>
        <textarea
          placeholder="Describe the issue..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <button className="mt-3 px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition duration-300">
          Submit Report
        </button>
      </div>

     

      {/* Community Support Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
          Community Support
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Join our SheHope community to connect with others for support.
        </p>
        <a
          href="https://community.shehope.com"
          target="_blank"
          className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition duration-300 inline-block"
        >
          Visit Community Forum
        </a>
      </div>
    </div>
  );
};

export default Help;
