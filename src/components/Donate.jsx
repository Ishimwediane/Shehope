import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import donate from '../image/donate.webp';
import help from '../image/help.jpg';
import volunteer from '../image/volunteer.jpg';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FaTwitter, FaFacebook, FaWhatsappSquare } from "react-icons/fa";
import DonateModal from './DonateModal';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Donate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mt-12  bg-blue-600 text-white">
        {/* Breadcrumb Navigation */}
        <div className="ml-12 p-4 flex gap-4" data-aos="fade-down">
          <a href="/" className="text-white hover:text-gray-400 transition duration-300">Home</a>
          <span>/</span>
          <a href="/Donate" className="text-white hover:text-gray-400 transition duration-300">Donate</a>
        </div>

        {/* Title and Description */}
        <h2 className="ml-12 text-3xl font-bold mb-4" data-aos="fade-up">Donate</h2>
        <p className="ml-12 text-lg mb-6" data-aos="fade-up">
          Your contribution empowers women facing unplanned pregnancies with <br />
          support, resources, and hope.
        </p>

        {/* Statistics Section */}
        <div className="bg-[#E5E7EB] w-full max-w-md ml-185 mx-auto -mt-20 flex justify-between p-6 rounded-t-2xl" data-aos="fade-up">
          <div className="flex-1 text-center border-r border-black last:border-none">
            <h3 className="text-2xl font-bold text-black">
              <CountUp start={0} end={50} duration={5} separator="," />+
            </h3>
            <p className="text-black text-[12px]">Women Supported</p>
          </div>

          <div className="flex-1 text-center border-r border-black last:border-none">
            <h3 className="text-2xl font-bold text-black">
              $<CountUp start={0} end={500} duration={5} separator="," />+
            </h3>
            <p className="text-black text-[12px]">Funds Raised</p>
          </div>

          <div className="flex-1 text-center">
            <h3 className="text-2xl font-bold text-black">
              <CountUp start={0} end={100} duration={5} />+
            </h3>
            <p className="text-black text-[12px]">Legal Cases Assisted</p>
          </div>
        </div>
      </div>

      <section className="bg-white py-12 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="text-gray-600 text-sm" data-aos="fade-up">
            <p>SHARE THIS PAGE</p>
            <div className="flex gap-4 mt-2">
              <FacebookShareButton url={window.location.href}>
                <FaFacebook alt="Facebook" className="w-6 h-6 transition-transform transform hover:scale-125" />
              </FacebookShareButton>
              <TwitterShareButton url={window.location.href}>
                <FaTwitter alt="Twitter" className="w-6 h-6 transition-transform transform hover:scale-125" />
              </TwitterShareButton>
              <WhatsappShareButton url={window.location.href}>
                <FaWhatsappSquare alt="WhatsApp" className="w-6 h-6 transition-transform transform hover:scale-125" />
              </WhatsappShareButton>
            </div>
            <br /><br />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
            <div className="text-center" data-aos="fade-up">
              <img
                src={volunteer}
                alt="Volunteer"
                className="mx-auto mb-2 w-32 h-32 object-cover rounded-full shadow-lg transform transition-all hover:scale-110 hover:shadow-xl"
              />
              <h3 className="font-semibold text-lg">Become a Volunteer</h3>
              <p className="text-sm text-gray-600">
                Join us in providing guidance and support to women in need.
              </p>
            </div>
            <div className="text-center" data-aos="fade-up">
              <img
                src={help}
                alt="Fundraise"
                className="mx-auto mb-2 w-32 h-32 object-cover rounded-full shadow-lg transform transition-all hover:scale-110 hover:shadow-xl"
              />
              <h3 className="font-semibold text-lg">Start a Fundraiser</h3>
              <p className="text-sm text-gray-600">
                Organize a campaign to support our mission and help more women.
              </p>
            </div>
            <div className="text-center" data-aos="fade-up">
              <img
                src={donate}
                alt="Donate"
                className="mx-auto mb-2 w-32 h-32 object-cover rounded-full shadow-lg transform transition-all hover:scale-110 hover:shadow-xl"
              />
              <h3 className="font-semibold text-lg">Start Donating</h3>
              <p className="text-sm text-gray-600">
                Every contribution counts in building a better future for women facing unplanned pregnancies.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full ml-16 md:w-1/3 text-sm p-6 border-l-4 border-[#E5E7EB]">
          <h3 className="text-xl font-bold mb-4" data-aos="fade-up">Donation Questions</h3>
          <ul className="text-gray-700 space-y-3" data-aos="fade-up">
            <li><strong>How can I donate?</strong> <br />You can donate via credit card, PayPal, Mobile Money and Airtel Money.</li>
            <li><strong>Is my donation tax-deductible?</strong><br /> Yes, all donations are tax-deductible.</li>
            <li><strong>Can I set up recurring donations?</strong> <br />Yes, you can choose one time, monthly, quarterly, or annual donations.</li>
            <li><strong>How will my donation be used?</strong><br /> Your donation directly supports women facing unplanned pregnancy problems.</li>
          </ul>
        </div>
      </section>

      <section className="bg-[#E5E7EB] py-12 px-4">
        <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
          <div className="relative flex justify-center items-center w-full md:w-1/2 mb-8 md:mb-0">
            <div className="flex space-x-4">
              <div className="overflow-hidden transition-transform transform hover:scale-105" data-aos="fade-up">
                <img
                  src={donate}
                  alt="Farmer"
                  className="rounded-tl-[22px] h-86 w-56"
                />
              </div>
              <div className="overflow-hidden transition-transform transform hover:scale-105" data-aos="fade-up">
                <img
                  src={help}
                  alt="Family on farm"
                  className="rounded-br-[22px] object-cover h-86 w-56 mt-12"
                />
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left px-4">
            <h4 className="text-sm uppercase text-gray-500 mb-2" data-aos="fade-up">
              Welcome to SheHope Initiative
            </h4>
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 leading-tight mb-4" data-aos="fade-up">
              Empowering Women, <br /> Providing Hope & Support
            </h2>
            <p className="text-gray-700 mb-6" data-aos="fade-up">
              SheHope is dedicated to supporting young women facing unplanned pregnancies by providing legal guidance, mental health support, and access to essential resources.
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2" data-aos="fade-up">
              <li><i className="fas fa-comment-alt text-blue-600"></i> Confidential counseling and emotional support.</li>
              <li><i className="fas fa-gavel text-yellow-500"></i> Legal guidance on rights and available options.</li>
              <li><i className="fas fa-stethoscope text-green-500"></i> Access to healthcare professionals and resources.</li>
              <li><i className="fas fa-users text-purple-500"></i> Community support and empowerment programs.</li>
            </ul>
            <button 
              onClick={handleOpenModal} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow-lg transition-all transform hover:scale-105"
              data-aos="fade-up"
            >
              Support Now
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-center">
        <h3 className="text-sm font-semibold text-gray-500" data-aos="fade-up">TESTIMONIALS</h3>
        <h2 className="text-3xl font-bold text-gray-900 mt-2" data-aos="fade-up">Your Support Changes Lives</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-4" data-aos="fade-up">
          SheHope has helped countless women find the support they need in times of crisis. Here’s what they have to say:
        </p>
        <div className="mt-12 flex flex-col md:flex-row justify-center gap-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow-md relative w-full md:w-1/3 transition-transform transform hover:scale-105" data-aos="fade-up">
            <span className="text-yellow-500 text-3xl font-bold">"</span>
            <p className="text-gray-700 mt-2">
              Thanks to SheHope, I found the legal guidance and emotional support I needed during a tough time.
            </p>
            <div className="flex items-center mt-4">
              <img 
                src="https://randomuser.me/api/portraits/women/50.jpg" 
                alt="Aisha" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3 text-left">
                <h4 className="text-gray-900 font-semibold">Aisha</h4>
                <p className="text-gray-500 text-sm">Beneficiary</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-md relative w-full md:w-1/3 transition-transform transform hover:scale-105" data-aos="fade-up">
            <span className="text-yellow-500 text-3xl font-bold">"</span>
            <p className="text-gray-700 mt-2">
              SheHope gave me the resources and counseling I needed to regain confidence and make informed decisions.
            </p>
            <div className="flex items-center mt-4">
              <img 
                src="https://randomuser.me/api/portraits/men/48.jpg" 
                alt="David" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="ml-3 text-left">
                <h4 className="text-gray-900 font-semibold">David</h4>
                <p className="text-gray-500 text-sm">Supporter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Component */}
      <DonateModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Donate;