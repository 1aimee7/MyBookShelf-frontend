"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Sparkles,
  Library,
  Users,
  Star,
  Phone,
  Mail,
} from "lucide-react";

// FeatureCard type
type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

// FeatureCard component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="group p-6 rounded-xl bg-white backdrop-blur-sm border border-orange-100 hover:bg-orange-50 hover:shadow-lg transition-all">
    <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = () => {
    window.location.href = "/auth/login";
  };

  const handleRegister = () => {
    window.location.href = "/auth/register";
  };

  const FloatingBook = ({
    delay = 0,
    x = 0,
    y = 0,
  }: {
    delay?: number;
    x?: number;
    y?: number;
  }) => (
    <div
      className="absolute opacity-20 animate-pulse"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animationDelay: `${delay}s`,
        transform: `translate(${mousePosition.x * 0.01}px, ${
          mousePosition.y * 0.01
        }px)`,
      }}
    >
      <BookOpen size={28} className="text-orange-300" />
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 scroll-smooth">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,140,0,0.08),transparent_50%)]"></div>
      </div>

      {/* Floating Books */}
      {[15, 85, 10, 90, 45, 25, 75, 60].map((x, i) => (
        <FloatingBook key={i} delay={i} x={x} y={(x + 30) % 100} />
      ))}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-orange-200 shadow-sm">
        <div className="text-xl font-bold text-orange-500">MyBookShelf</div>
        <div className="hidden md:flex space-x-6 font-medium text-gray-700">
          <a href="#features" className="hover:text-orange-600">Features</a>
          <a href="#about" className="hover:text-orange-600">About</a>
          <a href="#contact" className="hover:text-orange-600">Contact</a>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleLogin} className="text-sm text-orange-600 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition">Login</button>
          <button onClick={handleRegister} className="text-sm bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">Register</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-orange-200 mb-8 shadow-lg">
          <Sparkles size={18} className="text-orange-500" />
          <span className="text-sm text-gray-700 font-medium">Your Digital Reading Sanctuary</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-6 text-orange-500">My BookShelf</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Transform your reading journey. Discover, organize, and enjoy a world of books online.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={handleRegister} className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition">Start Now</button>
          <button onClick={handleLogin} className="bg-white border border-orange-500 text-orange-600 px-6 py-3 rounded-lg shadow hover:bg-orange-50 transition">Login</button>
        </div>
      </div>

      {/* Features */}
      <section id="features" className="px-6 py-16 bg-white/80">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Library size={28} className="text-white" />}
            title="Smart Organization"
            description="AI-powered categorization that learns your preferences and suggests the best layout."
          />
          <FeatureCard
            icon={<Users size={28} className="text-white" />}
            title="Reading Community"
            description="Connect with readers, share reviews, and discover books together."
          />
          <FeatureCard
            icon={<Star size={28} className="text-white" />}
            title="Personalized Insights"
            description="Track habits, set goals, and receive personalized recommendations."
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-16 bg-orange-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          We are passionate about building an inclusive digital library to help readers explore and manage books with ease. Our goal is to empower readers worldwide.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6 md:px-20 bg-orange-100 text-gray-800 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Left Info */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Contact <span className="text-orange-500">Us</span></h2>
            <h3 className="text-lg font-semibold mb-4">We&apos;d Love to Hear from You</h3>
            <p className="text-gray-700 mb-6">Reach out with questions, ideas, or partnership opportunities—our team is always ready to support fellow book lovers!</p>
            <p className="mb-2 flex items-center gap-2"><Mail size={18} /> support@mybookshelf.com</p>
            <p className="mb-6 flex items-center gap-2"><Phone size={18} /> +250 780 000 000</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-orange-500 border border-orange-500 rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-600 hover:text-white transition">F</a>
              <a href="#" className="text-orange-500 border border-orange-500 rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-600 hover:text-white transition">T</a>
              <a href="#" className="text-orange-500 border border-orange-500 rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-600 hover:text-white transition">I</a>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white p-6 rounded-lg shadow-lg">
            <input type="text" placeholder="Enter Your Name" className="w-full mb-4 px-4 py-2 bg-orange-50 text-gray-800 rounded-md focus:ring-2 focus:ring-orange-400 outline-none" />
            <input type="email" placeholder="Enter Your Email" className="w-full mb-4 px-4 py-2 bg-orange-50 text-gray-800 rounded-md focus:ring-2 focus:ring-orange-400 outline-none" />
            <input type="text" placeholder="Subject" className="w-full mb-4 px-4 py-2 bg-orange-50 text-gray-800 rounded-md focus:ring-2 focus:ring-orange-400 outline-none" />
            <textarea rows={4} placeholder="Message" className="w-full mb-6 px-4 py-2 bg-orange-50 text-gray-800 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"></textarea>
            <button type="submit" className="w-full py-2 rounded-md text-white font-semibold bg-orange-500 hover:bg-orange-600 transition">Submit</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-600 text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6 text-center md:text-left">
          <div>
            <h4 className="text-white font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li><a href="#about" className="hover:text-orange-200">About</a></li>
              <li><a href="#features" className="hover:text-orange-200">Features</a></li>
              <li><a href="#contact" className="hover:text-orange-200">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Follow Us</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-orange-200">Twitter</a></li>
              <li><a href="#" className="hover:text-orange-200">LinkedIn</a></li>
              <li><a href="#" className="hover:text-orange-200">GitHub</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <section className="bg-orange-700 text-center text-white text-xs py-4">
        &copy; {new Date().getFullYear()} MyBookShelf. All rights reserved.
      </section>
    </div>
  );
}
