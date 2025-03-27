import React  from "react";
import { CheckCircle } from "lucide-react"; 
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa"; // FaComment moved to fa6 in the latest versions
import prof from "../image/prof.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import stories from "./Stories"

import cover from "../image/cover1.png";
import join from "../image/freind.jpeg"
import pregnancy from "../image/pregnancy.jpg"
import sick from "../image/sick.jpg"
import '../styles/Home.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handlecommunity = () => {
    navigate("/Community"); // Navigate to the /Community path
  };

  const handlesupport = () => {
    navigate("/Support"); // Navigate to the /Community path
  };

  const handledonate = () => {
    navigate("/Donate"); // Navigate to the /Community path
  };

   useEffect(() => {
      AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
    }, []);
  return (
    <>
    <div className=" hero-section  flex  px-5 ">
      <div className=" flex gap-8" data-aos="fade-right">
        {/* Left Side - Text Content */}
        <div className="flex flex-col ml-40 mt-20">
          <h1 className="text-4xl f text-white " style={{ letterSpacing: '0.3rem', fontFamily: 'Bonheur Royale, serif' }}>
          Unplanned pregnancy?
          </h1><br/><br />
          <h1 className="text-white ">We’ve Got You. </h1>
          <p className="mt-4 text-gray-400 text-lg">
          Hope means knowing you're not alone.
          Every woman deserves <br />a future filled with hope and possibility.
          </p><br />
          <button
          onClick={handlesupport }
          class="bg-white text-blue-500 cursor-pointer font-semibold py-2 w-40 px-4 rounded-lg shadow-md hover:bg-gray-200">
  Get Support
</button>
        </div>

        {/* Right Side - Image */}
        <div className="flex justify-center">
          <img
            src={cover}
            alt="Hero Cover"
            className="hero-image "
          />
        </div>
      </div>
    </div>

<br /><br />
    <div className="flex mt-6 items-center bg-gray-100 p-8 ml-40 rounded-2xl shadow-lg max-w-5xl mx-auto" data-aos="fade-down">
      <img 
        src={pregnancy} 
        alt="" 
        className="w-80 h-60"
      />
      <div className="ml-30">
        <h2 className="text-2xl font-bold ">WHO WE ARE.</h2>
        <div className="bg-sky-800 text-white p-6 rounded-lg mt-4 w-100">
          <p>
            Our mission is to offer a safe space for women experiencing unplanned pregnancies,
             providing access to healthcare, counseling, and community support. We aim to empower each 
            woman to make informed decisions and build a positive future for herself and her child.
          </p>
        </div>
      </div>
    </div>



    <div className="flex  mt-10 items-center bg-white p-8 rounded-2xl shadow-lg max-w-5xl mx-auto" data-aos="fade-down">
      <div className="w-1/2 space-y-4">
        <h2 className="text-2xl font-bold">Support Young Women, Empower Their Future</h2>
        <p className="text-gray-600">
        Your contribution helps provide essential resources and support to young women in need. Together, we can make a difference in their lives.
        </p>
        <ul className="space-y-2">
          <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Ensure that young women have the legal support they need during critical times.</li>
          <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Fund programs offering counseling and mental wellness resources for those facing unwanted pregnancies.</li>
          <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" />  Help provide immediate aid for young women in crisis situations.</li>
          <li className="flex items-center"><CheckCircle className="text-green-500 mr-2" /> Support programs that equip young women with the knowledge to make informed decisions about their futures.</li>
        </ul>
        <button 
        onClick={handledonate}
        className="bg-blue-500 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600">
        Donate now
        </button>
      </div>
      <div className="w-1/2 ml-20">
        <img 
          src={sick}
          alt="Smiling woman with laptop" 
          className="w-full h-100 rounded-xl object-cover"
        />
      </div>
    </div>

    <section className="bg-gray-200 py-16 px-6" data-aos="fade-right">
      {/* Centered Title */}
      <h2 className="absolute  ml-120 mt-50 text-3xl font-bold ">
      Shared Stories
    </h2>

      <div className="grid grid-cols-2 gap-y-32 w-full">
        
        {/* Left Testimonial 1 - Moved Left */}
        <div className="flex items-center gap-4 ml-16 max-w-xs">
          <img src={prof} alt="User" className="w-16 h-16 rounded-full object-cover" />
          <div className="bg-white p-4 rounded-xl shadow-md text-left w-full">
            <p className="text-sm">
              Joining She Hopes was the best decision I made. The support I received helped me find strength during a time when I felt lost.
            </p>
            <span className="block mt-2 font-semibold text-gray-700">— Sarah</span>
            <div className="flex items-center gap-4 mt-3">
              <button className="flex items-center text-gray-600">
                <FaHeart className="mr-1 text-red-500" /> 12
              </button>
              <button className="flex items-center text-gray-600">
                <FaComment className="mr-1" /> 5
              </button>
            </div>
          </div>
        </div>

        {/* Right Testimonial 1 - Moved Right */}
        <div className="flex items-center gap-4 ml-40 max-w-xs">
          <img src={prof} alt="User" className="w-16 h-16 rounded-full object-cover" />
          <div className="bg-white p-4 rounded-xl shadow-md text-left w-full">
            <p className="text-sm">
              I finally found a place where I can share my story and be heard. This community has been life-changing.
            </p>
            <span className="block mt-2 font-semibold text-gray-700">— Emily</span>
            <div className="flex items-center gap-4 mt-3">
              <button className="flex items-center text-gray-600">
                <FaHeart className="mr-1 text-red-500" /> 20
              </button>
              <button className="flex items-center text-gray-600">
                <FaComment className="mr-1" /> 8
              </button>
            </div>
          </div>
        </div>

        {/* Left Testimonial 2 - Moved Left */}
        <div className="flex items-center gap-4 ml-16 max-w-xs">
          <img src={prof} alt="User" className="w-16 h-16 rounded-full object-cover" />
          <div className="bg-white p-4 rounded-xl shadow-md text-left w-full">
            <p className="text-sm">
              Being part of She Hopes has given me confidence and strength I never knew I had.
            </p>
            <span className="block mt-2 font-semibold text-gray-700">— Linda</span>
            <div className="flex items-center gap-4 mt-3">
              <button className="flex items-center text-gray-600">
                <FaHeart className="mr-1 text-red-500" /> 18
              </button>
              <button className="flex items-center text-gray-600">
                <FaComment className="mr-1" /> 7
              </button>
            </div>
          </div>
        </div>

        {/* Right Testimonial 2 - Moved Right */}
        <div className="flex items-center gap-4 ml-40 max-w-xs">
          <img src={prof} alt="User" className="w-16 h-16 rounded-full object-cover" />
          <div className="bg-white p-4 rounded-xl shadow-md text-left w-full">
            <p className="text-sm">
              I have never felt more supported in my journey. Thank you to everyone in this community.
            </p>
            <span className="block mt-2 font-semibold text-gray-700">— Anna</span>
            <div className="flex items-center gap-4 mt-3">
              <button className="flex items-center text-gray-600">
                <FaHeart className="mr-1 text-red-500" /> 25
              </button>
              <button className="flex items-center text-gray-600">
                <FaComment className="mr-1" /> 10
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
    
    <div className="relative mt-20 mb-10 bg-sky-800 text-white p-8 rounded-2xl flex items-center justify-between shadow-lg max-w-4xl mx-auto" data-aos="fade-up">
      <div className="space-y-4 ml-10">
        <h2 className="text-2xl font-bold">Join Our Supportive Community</h2>
        <h3 className="text-xl">Be part of a compassionate community that understands and </h3>
        <p className="text-sm">supports you every step of the way.</p>
        <button 
        onClick={handlecommunity}
        className="bg-white text-blue-500 cursor-pointer font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200">
          Join community
        </button>
      </div>
      <img 
        src={join}
        alt="Smiling woman with laptop" 
        className="join-image  rounded-xl object-cover"
      />
    </div>
    </>
  );
};

export default Home;
