import React, { useState, useEffect } from "react";
import { FaSearch } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from "lucide-react";
import { AiOutlineClose } from "react-icons/ai"; // Import close icon from react-icons
import ho from '../image/hh.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Support = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false); // New state for search
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms debounce

  // Dummy list of support centers
  const centers = [
    { name: "Kigali Support Center", address: "Kigali, Rwanda", coordinates: "-1.9441, 30.0619" },
    { name: "Gisenyi Support Center", address: "Gisenyi, Rwanda", coordinates: "-1.6928, 29.2499" },
    { name: "Musanze Support Center", address: "Musanze, Rwanda", coordinates: "-1.6821, 29.5893" },
    { name: "Huye Support Center", address: "Huye, Rwanda", coordinates: "-2.9290, 29.7427" },
  ];

  // Dummy legal resources data
  const legalResources = [
    { title: "Legal Rights for Pregnant Women", link: "#" },
    { title: "Abortion Laws in Rwanda", link: "#" },
    { title: "Support for Unplanned Pregnancies", link: "#" },
    { title: "Counseling Services for Legal Issues", link: "#" },
  ];

  // Filter legal resources based on debounced search query
  const filteredResources = legalResources.filter((resource) =>
    resource.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  // Function to highlight search terms
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">{part}</span>
      ) : part
    );
  };

  // Function to toggle the chat window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Function to handle user message input
  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Function to send the message
  const handleSendMessage = () => {
    if (userMessage.trim() === "") {
      alert("Please enter a message.");
    } else {
      setMessages([...messages, { sender: "user", text: userMessage }]);
      setUserMessage(""); // Clear the input field
    }
  };

  // Function to handle call support
  const handleCallSupport = () => {
    window.location.href = "tel:+250788123456"; // Rwanda support number
  };

  // Function to open the Find a Center modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the Find a Center modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to open Google Maps
  const openGoogleMaps = (coordinates) => {
    window.open(`https://www.google.com/maps?q=${coordinates}`, "_blank");
  };

  // Function to handle search
  const handleSearch = () => {
    setIsSearchActive(true); // Set search active when search is initiated
  };

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
    <div className="mt-2 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex bg-blue-500 p-10 text-white text-center shadow-lg" data-aos="fade-right">
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-3xl font-bold ml-60 -mt-16">How can we help you?</h1><br /><br />
          <div className="flex ml-50 items-center bg-white p-3 rounded-full shadow-lg">
            <input
              type="text"
              placeholder="Search for legal resources"
              className="w-160  p-1  border-none text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div
              onClick={handleSearch} // Call handleSearch on icon click
              className="cursor-pointer  p-3 rounded-r-lg flex items-center justify-center "
            >
              <FaSearch className="text-blue-400 size-5" />
            </div>
          </div>
        </div>
        <div className=" w-300 ml-10">
          <img src={ho} className="h-60 " />
        </div>
      </div>

      <div className="flex" data-aos="fade-down">
        {/* Support Options */}
        {!isSearchActive && ( // Hide cards if search is active
          <div className="flex justify-center mt-8 gap-6 ml-16 h-32">
            <div
              className="text-center bg-white shadow-lg rounded-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl p-6"
              onClick={toggleChat}
            >
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Live Chat</h3>
              <p className="text-gray-600">Get one-on-one support now</p>
            </div>
            <div
              className="text-center bg-white p-6 shadow-lg rounded-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={handleCallSupport}
            >
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Call Support</h3>
              <p className="text-gray-600">Call 0788-123-456</p>
            </div>
            <div
              className="text-center bg-white p-6 shadow-lg rounded-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
              onClick={openModal}
            >
              <h3 className="font-semibold text-xl text-gray-800 mb-2">Find a Center</h3>
              <p className="text-gray-600">Locate a support center in Rwanda</p>
            </div>
          </div>
        )}

        {/* Legal Resources Section */}
        <div className="mt-10 bg-white p-6 shadow-md rounded-lg ml-22" data-aos="fade-down">
          <h3 className="text-lg font-bold mb-4">Legal Resources</h3>
          {filteredResources.length === 0 ? (
            <p>No resources found for your search.</p>
          ) : (
            <ul className="space-y-2">
              {filteredResources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.link}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {highlightText(resource.title, debouncedSearchQuery)}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-10 bg-white p-6 shadow-md rounded-lg ml-16" data-aos="fade-down">
        <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h4 className="text-lg font-semibold">{faq.question}</h4>
              {openFAQ === index ? <ChevronUp /> : <ChevronDown />}
            </div>
            {openFAQ === index && <p className="mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>

      {/* Modal for Find a Center */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(10,10,10,0.9)] filter brightness(0.2) flex justify-center items-center" >
          <div className="bg-white p-6 rounded-lg max-w-sm w-full relative" data-aos="fade-up">
            <AiOutlineClose
              className="absolute top-2 right-2 text-2xl cursor-pointer"
              onClick={closeModal}
            />
            <h3 className="text-lg font-bold mb-4">Find a Support Center</h3>
            <ul>
              {centers.map((center, index) => (
                <li key={index} className="mb-3">
                  <p>{center.name}</p>
                  <p>{center.address}</p>
                  <button
                    onClick={() => openGoogleMaps(center.coordinates)}
                    className="text-blue-500 hover:underline mt-2"
                  >
                    View on Google Maps
                  </button>
                </li>
              ))}
            </ul>
           
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-0 right-0 m-4 bg-white p-4 rounded-lg shadow-lg w-80" data-aos="fade-up">
          <AiOutlineClose
            className="absolute top-2 right-2 text-2xl cursor-pointer"
            onClick={toggleChat}
          />
          <h4 className="font-semibold text-xl">Live Chat</h4>
          <div className="space-y-4 mt-4 h-48 overflow-auto">
            {messages.map((message, index) => (
              <div key={index} className={`text-sm ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <div
                  className={`inline-block ${message.sender === "user" ? "bg-blue-100" : "bg-gray-100"} p-2 rounded-lg`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={userMessage}
              onChange={handleMessageChange}
              placeholder="Type a message..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
