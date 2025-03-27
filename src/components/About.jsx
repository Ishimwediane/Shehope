import React, { useState,useEffect } from 'react';
import pregnancy2 from '../image/pregnancyy.jpg';
import pregnancy1 from '../image/hope.webp';
import hope from '../image/hope.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { FaChevronLeft, FaUserCircle, FaComments, FaChevronRight } from 'react-icons/fa';
import { FaHeart, FaUser, FaLightbulb, FaBalanceScale, FaHandHoldingUsd, FaHandsHelping, FaChartLine } from "react-icons/fa";

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
      }, []);
    
  const [currentPoint, setCurrentPoint] = useState(0);

  const helpPoints = [
    <p className="flex items-center gap-3 text-lg text-gray-700">
      <FaUser Circle className="text-blue-200 text-xl" /> <strong> Sign Up:</strong> Women can register and access support anonymously.
    </p>,
    <p className="flex items-center gap-3 text-lg text-gray-700">
      <FaComments className="text-blue-200 text-xl" /> <strong>Get Counseling:</strong> Speak with professional counselors confidentially.
    </p>,
    <p className="flex items-center gap-3 text-lg text-gray-700">
      <FaBalanceScale className="text-blue-200 text-xl" /> <strong>Legal Guidance:</strong> Understand legal rights and available options.
    </p>,
    <p className="flex items-center gap-3 text-lg text-gray-700">
      <FaHandHoldingUsd className="text-blue-200 text-xl" /> <strong>Crowdfunding Support:</strong> Get financial assistance for medical and living needs.
    </p>,
  ];

  const nextPoint = () => {
    setCurrentPoint((prev) => (prev + 1) % helpPoints.length);
  };

  const prevPoint = () => {
    setCurrentPoint((prev) => (prev - 1 + helpPoints.length) % helpPoints.length);
  };

  return (
    <>
      <div className="mt-10 relative w-full h-74 bg-blue-600 flex justify-start px-10 overflow-hidden">
        <div className="text-left max-w-lg py-10 " data-aos="fade-up">
          <div className="flex gap-4">
            <a href="/" className="text-white hover:text-gray-400 transition duration-300">Home</a>
            <span>/</span>
            <a href="/About" className="text-white hover:text-gray-400 transition duration-300">About Us</a>
          </div><br />
          <p className="text-white text-4xl uppercase font-semibold">Our vision</p><br />
          <h2 className="text-white">
            <p>To empower every woman facing an unwanted pregnancy with the support and resources needed to make informed decisions and live with dignity.</p>
          </h2>
        </div>
        <div className="absolute -right-20 flex">
          <div className="relative w-160 h-74 flex">
            <div className="w-120 h-74 bg-[#f5ecde] rounded-l-full absolute left-0"></div>
            <div className="w-96 h-74 bg-blue-600 rounded-l-full absolute left-60"></div>
          </div>
        </div>
      </div>
      <div className="about-container p-6 md:p-12">
        <section className="mission-section mb-8 flex">
          <div className="w-140">
            <img src={pregnancy2} alt="Support for Women" className="rounded-lg shadow-md transition-transform duration-300 hover:scale-105" />
          </div>
          <div className="w-140 ml-12" data-aos="fade-up">
            <h1 className="text-3xl font-bold mb-4 text-blue-400">Our Mission</h1>
            <p className="text-lg text-gray-700">
              SheHope is dedicated to providing young women with the support, resources, and guidance they need when facing unwanted pregnancies.
              We aim to empower women by offering a platform that ensures they are not alone, with services such as anonymous counseling, legal guidance, mental health support, and crowdfunding for their medical and living needs.
            </p>
            <div className="mt-6 p-4 border-l-4 border-blue-500 bg-gray-100 text-gray-700 italic">
              <p>
                "SheHope changed my life. When I felt lost, they gave me the strength and support I needed."  
                <br /> - <strong>Marie, 22</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="mission-section mb-8 flex" data-aos="fade-up">
          <div className="relative w-140 h-74 flex">
            <section className="about-details-section mb-8 p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-blue-400 mb-4 text-center">Who we are</h2>
              <p className="text-l text-gray-700 mb-6 text-center">
                SheHope provides a safe space for women facing unwanted pregnancies, ensuring they have access to support, guidance, and essential resources.
              </p>
              <ul className="list-none space-y-2">
                <li className="flex items-center gap-2">
                  <FaHeart className="text-blue-500 text-xl" />
                  <span className="text-sm text-gray-700"><strong>Empathy:</strong> Non-judgmental and compassionate support.</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaUser Shield className="text-blue-500 text-xl" />
                  <span className="text-sm text-gray-700"><strong>Confidentiality:</strong> Ensuring privacy and trust.</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaLightbulb className="text-blue-500 text-xl" />
                  <span className="text-sm text-gray-700"><strong>Empowerment:</strong> Equipping women with the right resources.</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaHandsHelping className="text-blue-500 text-xl" />
                  <span className="text-sm text-gray-700"><strong>Access:</strong> Providing essential help, legal aid, and funding.</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaChartLine className="text-blue-500 text-xl" />
                  <span className="text-sm text-gray-700"><strong>Impact:</strong> Helping women gain support, legal guidance, and financial assistance.</span>
                </li>
              </ul>
            </section>
          </div>
          <div className='w-140'>
            <img src={pregnancy1} className="rounded-lg shadow-md transition-transform duration-300 hover:scale-105" />
          </div>
        </section>

        <section className="how-we-help-section mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-semibold flex justify-center mb-4">How It Works</h2>
          <div className="flex justify-center">
            <div className="relative bg-white px-16 py-16 rounded-lg shadow-lg w-260 text-center">
              <p className="text-lg text-gray-700 mb-4">{helpPoints[currentPoint]}</p>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 cursor-pointer" onClick={prevPoint}>
                <FaChevronLeft className="text-blue-500 text-3xl hover:text-blue-600 transition duration-300" />
              </div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 cursor-pointer" onClick={nextPoint}>
                <FaChevronRight className="text-blue-500 text-3xl hover:text-blue-600 transition duration-300" />
              </div>

              {/* Point Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {helpPoints.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${currentPoint === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="relative mt-20 mb-10 bg-sky-800 text-white p-8 rounded-2xl flex items-center justify-between shadow-lg max-w-4xl mx-auto" data-aos="fade-up">
          <div className="space-y-4 ml-10">
            <h2 className="text-2xl font-bold">Welcome to SheHope!</h2>
            <p className="text-lg mb-6">
              Join us today to get the support you deserve. Sign up now to start your journey with confidential counseling, legal guidance, and more.
            </p>
            <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
              Sign up
            </button>
          </div>
          <img 
            src={hope}
            alt="Smiling woman with laptop" 
            className="join-image rounded-xl object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </>
  );
};

export default About;