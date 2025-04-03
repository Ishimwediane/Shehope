import React, { useState, useEffect } from "react";
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from "react-icons/fa";
import { MdEvent, MdAttachMoney, MdCreditCard, MdPhoneIphone, MdClose } from "react-icons/md";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const DonateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  // Step management
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD"); // Default to USD
  const [paymentMethod, setPaymentMethod] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");

  // Donation frequency options
  const frequencies = ["One-time", "Monthly", "Quarterly", "Annually"];

  // Predefined donation amounts based on frequency
  const donationOptions = {
    "One-time": [10, 50, 100, 250, 500],
    Monthly: [5, 20, 50, 100, 200],
    Quarterly: [15, 60, 150, 300, 600],
    Annually: [50, 200, 500, 1000, 2000],
  };

  // Payment options
  const paymentMethods = [
    { name: "MTN Mobile Money", icon: <MdPhoneIphone className="text-xl text-blue-800" /> },
    { name: "Airtel Money", icon: <MdPhoneIphone className="text-xl text-blue-800" /> },
    { name: "Credit/Debit Card", icon: <MdCreditCard className="text-xl text-blue-800" /> },
    { name: "PayPal", icon: <FaPaypal className="text-xl text-blue-800" /> },
  ];

  const handleFrequencyChange = (option) => {
    // Toggle the selection state
    if (frequency === option) {
      setFrequency("");
    } else {
      setFrequency(option);
    }
  };

  const handleNext = () => {
    if (step === 1 && frequency) setStep(2);
    else if (step === 2 && amount) setStep(3);
    else if (step === 3 && paymentMethod) setStep(4);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(10,10,10,0.9)] filter brightness(0.2)">
      <div className="bg-white p-6 rounded shadow-lg w-[450px] relative" data-aos="fade-up">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-2 right-2 text-xl text-gray-700">
          <MdClose />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Make a Donation</h2>

        {/* Step 1: Choose Donation Frequency */}
        {step === 1 && (
          <div data-aos="fade-up">
            <h3 className="text-lg font-semibold mb-2">Choose a Donation Frequency</h3>
            <div className="space-y-3">
              {frequencies.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={frequency === option}
                    onChange={() => handleFrequencyChange(option)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Choose Amount */}
        {step === 2 && (
          <div data-aos="fade-up">
            <h3 className="text-lg font-semibold mb-4 text-center">Select Donation Amount</h3>

            {/* Predefined amounts */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {donationOptions[frequency]?.map((amt) => (
                <button
                  key={amt}
                  className={`flex items-center justify-center py-3 px-4 rounded-lg border cursor-pointer transition duration-300 ease-in-out transform ${
                    amount === amt ? "bg-blue-600 text-white scale-105" : "bg-gray-100 hover:bg-blue-50"
                  }`}
                  onClick={() => setAmount(amt)}
                >
                  <MdAttachMoney className="text-2xl mr-2" />
                  {currency === "RWF" ? `RWF ${amt}` : `${amt}`} {/* Show RWF for RWF, show $ for USD */}
                </button>
              ))}
            </div>

            {/* Custom amount input */}
            <div className="flex flex-col mb-4">
              <input
                type="number"
                placeholder="Enter custom amount"
                className="border p-3 rounded-lg w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Currency selection */}
            <div className="flex text-sm justify-between items-center mb-4">
              <span className="text-lg">Currency</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="border p-2 rounded-lg"
              >
                <option value="USD">USD</option>
                <option value="RWF">RWF</option>
              </select>
            </div>

            {/* Amount validation message */}
            {amount && amount <= 0 && (
              <p className="text-red-600 text-sm">Please enter a valid amount.</p>
            )}
          </div>
        )}

        {/* Step 3: Choose Payment Method */}
        {step === 3 && (
          <div data-aos="fade-up">
            <h3 className="text-lg font-semibold mb-4 text-center">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map(({ name, icon }) => (
                <button
                  key={name}
                  className={`flex items-center text-sm justify-start gap-4 py-3 px-6 rounded-lg border cursor-pointer transition duration-300 ease-in-out transform ${
                    paymentMethod === name
                      ? "bg-blue-600 text-white scale-105"
                      : "bg-gray-100 hover:bg-blue-50"
                  }`}
                  onClick={() => setPaymentMethod(name)}
                >
                  {icon}
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Payment Details */}
        {step === 4 && (
          <div data-aos="fade-up">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="border p-4 rounded-md text-sm">
              <p>
                <strong>Donation Frequency:</strong> {frequency}
              </p>
              <p>
                <strong>Amount:</strong> {currency === "RWF" ? `RWF ${amount}` : `$${amount}`}
              </p>
              <p>
                <strong>Payment Method:</strong> {paymentMethod}
              </p>
            </div>

            {/* Handle Mobile Money details */}
            {paymentMethod === "MTN Mobile Money" || paymentMethod === "Airtel Money" ? (
              <div>
                <h4 className="text-md font-semibold mb-2">Mobile Money Details</h4>
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="border p-2 rounded w-full mb-2"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Name on Account"
                  className="border p-2 rounded w-full mb-2"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <h4 className="text-md font-semibold mb-2">Credit/Debit Card Details</h4>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="border p-2 rounded w-full mb-2"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="border p-2 rounded w-full"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Name on Card"
                  className="border p-2 rounded w-full mt-2"
                />
              </div>
            )}

            <button className="bg-blue-600 cursor-pointer text-white py-2 px-6 mt-4 ml-30 rounded shadow-lg">
              Donate Now
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={step === 1 ? onClose : () => setStep(step - 1)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            {step === 1 ? "Close" : "Back"}
          </button>
          {step < 4 && (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonateModal;