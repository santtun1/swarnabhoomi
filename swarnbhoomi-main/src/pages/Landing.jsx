import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Phone, HelpCircle, CloudSun, BookOpen, BarChart3 } from 'lucide-react';

// --- Header ---
const Header = () => (
  <header className="bg-gradient-to-r from-[#184C32] via-[#21663a] to-[#28a745] shadow-md py-3 px-6 flex justify-between items-center sticky top-0 z-30">
    <div className="flex items-center space-x-4">
      <img
        src="/landing_page/swarnbhoomi-logo.png"
        alt="SwarnBhoomi Logo"
        className="h-14 w-auto"
        style={{ background: "transparent" }}
      />
    </div>
    <div className="flex items-center gap-4">
      <span className="flex items-center text-green-100 font-semibold text-base">
        {/* <Phone className="w-5 h-5 mr-1" /> 1800-123-4567 */}
      </span>
      <button
        onClick={() => window.location.href = '/auth'}
        className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold px-7 py-2 rounded-full shadow transition text-lg"
        style={{ letterSpacing: 1 }}
      >
        लॉगिन / Login
      </button>
    </div>
  </header>
);

// --- Features / Value Proposition Bar ---
const FeaturesBar = () => (
  <div className="bg-white shadow rounded-xl mx-auto my-[-32px] relative z-20 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-8 border border-green-100">
    <div className="flex flex-col items-center text-center">
      <CloudSun className="w-10 h-10 mb-2 text-green-600" />
      <h3 className="font-bold text-lg text-green-900 mb-1">AI Weather Insights</h3>
      <p className="text-gray-700">Get hyper-local, timely weather updates and actionable crop suggestions powered by AI.</p>
    </div>
    <div className="flex flex-col items-center text-center">
      <BookOpen className="w-10 h-10 mb-2 text-yellow-600" />
      <h3 className="font-bold text-lg text-green-900 mb-1">Knowledge Hub</h3>
      <p className="text-gray-700">Access practical guides, best practices, and regional expertise for every stage of farming.</p>
    </div>
    <div className="flex flex-col items-center text-center">
      <BarChart3 className="w-10 h-10 mb-2 text-green-700" />
      <h3 className="font-bold text-lg text-green-900 mb-1">Market & Yield Tools</h3>
      <p className="text-gray-700">Monitor crop trends, get price forecasts, and optimize your farm’s profits and output.</p>
    </div>
  </div>
);

// --- Section Card ---
const Section = ({ title, description, image, reverse }) => (
  <section className={`py-14 md:py-24 px-4 md:px-0 ${reverse ? 'bg-[#f5f8f7]' : 'bg-white'}`}>
    <div className={`container mx-auto flex flex-col md:flex-row items-center ${reverse ? 'md:flex-row-reverse' : ''} gap-10 md:gap-20`}>
      <motion.div
        className="md:w-1/2 w-full"
        initial={{ opacity: 0, x: reverse ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">{title}</h2>
        <p className="mt-5 text-lg md:text-xl text-gray-700">{description}</p>
      </motion.div>
      <motion.img
        src={image}
        alt={title}
        className="md:w-1/3 w-2/3 mx-auto rounded-3xl shadow-xl border-4 border-green-100 object-cover"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      />
    </div>
  </section>
);

// --- Footer ---
const Footer = () => (
  <footer className="bg-[#184C32] text-white py-10 mt-10">
    <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center gap-6">
      <div className="text-center md:text-left">
        <p className="mb-1 text-lg font-semibold">Contact Us</p>
        <p className="text-sm mb-2 flex items-center justify-center md:justify-start gap-2">
          <Phone className="w-4 h-4 inline-block" /> Helpline: 1800-123-4567
        </p>
        <p className="text-xs text-green-200">© 2025 SwarnBhoomi. All rights reserved.</p>
      </div>
      <div className="flex gap-4">
        <a href="#"><Facebook className="w-7 h-7 hover:text-yellow-300 transition" /></a>
        <a href="#"><Twitter className="w-7 h-7 hover:text-yellow-300 transition" /></a>
        <a href="#"><Instagram className="w-7 h-7 hover:text-yellow-300 transition" /></a>
      </div>
      <div className="text-xs text-green-200 text-center">
        <div>AI Verified • Trusted by Farmers</div>
      </div>
    </div>
  </footer>
);

// --- Floating Help Button ---
const FloatingHelpButton = () => (
  <a
    href="https://wa.me/919876543210"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-8 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl z-40 flex flex-col items-center"
    title="Farmer Help"
    style={{ boxShadow: "0 2px 30px 0 rgba(47, 101, 36, 0.27)" }}
  >
    <HelpCircle className="w-8 h-8" />
    <span className="text-xs mt-1 font-bold">Help</span>
  </a>
);

// --- Main Landing Page ---
const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Language is always default; no selector
  }, []);

  return (
    <div className="min-h-screen font-inter" style={{
      background: 'linear-gradient(110deg, #f6fcf7 0%, #e3f9ed 65%, #fdf6e4 100%)'
    }}>
      <Header />

      {/* Hero Area */}
      <section
        className="flex flex-col items-center justify-center min-h-[70vh] text-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/landing_page/agri.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#15492e] via-[#1d753d99] to-[#27854290] opacity-85 z-0" />
        <div className="relative z-10 w-full pt-10">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-2xl leading-snug"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to SwarnBhoomi <span className="inline-block">🌱</span>
          </motion.h1>
          <motion.p
            className="mt-5 mb-8 text-lg md:text-2xl text-green-50 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Transforming farming with AI & smart data. Trusted by thousands of farmers across India.
          </motion.p>
          <motion.button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-500 hover:to-green-500 text-green-900 text-xl font-bold px-8 py-4 rounded-xl shadow-lg transition relative z-10"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Features */}
      <FeaturesBar />

      {/* Section Timeline */}
      <Section
  title="Who We Are"
  description="SwarnBhoomi is dedicated to empowering small and marginal farmers in India. Our team brings together expertise in agriculture, technology, and rural development to solve the most pressing challenges faced by the farming community."
  image="/landing_page/robot.jpeg"
/>
<Section
  title="The Challenge"
  description={
    <>
      <b>Small and marginal farmers</b>—the backbone of Indian agriculture—face critical barriers:
      <ul className="list-disc pl-6 mt-3 text-base text-gray-700">
        <li>Unpredictable weather patterns and climate change impacts</li>
        <li>Limited access to quality seeds, fertilizers, and modern equipment</li>
        <li>Soil degradation and loss of fertility</li>
        <li>Lack of timely, accurate agricultural information</li>
        <li>Inefficient and traditional practices prone to failure</li>
      </ul>
      <div className="mt-3">
        These challenges result in lower yields, economic hardships, and environmental damage—putting millions of rural livelihoods at risk.
      </div>
    </>
  }
  image="/landing_page/phone.jpg"
  reverse
/>
<Section
  title="Our Approach"
  description="SwarnBhoomi combines the power of AI, remote sensing, and IoT to deliver timely, relevant, and personalized agricultural advice. By leveraging machine learning, we help farmers adapt to changing weather, improve soil health, and optimize resources—turning data into practical actions in the field."
  image="/landing_page/voicebot.jpg"
/>
<Section
  title="What We Offer"
  description="Our platform delivers hyper-local weather alerts, crop and soil health insights, and simple, actionable recommendations. We connect farmers to best practices, local market trends, and affordable solutions—helping them make better decisions every season."
  image="/landing_page/robot.jpeg"
  reverse
/>
<Section
  title="Impact"
  description="With SwarnBhoomi, small and marginal farmers boost productivity, increase profits, and reduce risk—achieving greater resilience for their families and communities. Join us in building a more sustainable, food-secure future for rural India."
  image="/landing_page/happy.jpg"
/>
<Section
  title="Join Us"
  description="Be part of the movement to transform Indian agriculture. Together, we can empower every farmer with the knowledge and technology they need to succeed."
  image="/landing_page/joinus.jpg"
  reverse
/>

      <Footer />
      <FloatingHelpButton />
    </div>
  );
};

export default LandingPage;
