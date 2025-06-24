"use client";
import React, { useState, useEffect } from "react";
import { BookOpen, Sparkles, Library, Users, Star, ArrowRight } from "lucide-react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (event: MouseEvent) => {
      if (
        !event ||
        typeof event.clientX !== "number" ||
        typeof event.clientY !== "number"
      )
        return;

      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = () => {
    window.location.href = "/auth/login";
  };

  const handleRegister = () => {
    window.location.href = "auth/register";
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
        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
      }}
    >
      <BookOpen size={28} className="text-orange-300" />
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,140,0,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>
      </div>

      {/* Floating Books */}
      <FloatingBook delay={0} x={15} y={25} />
      <FloatingBook delay={1} x={85} y={20} />
      <FloatingBook delay={2} x={10} y={75} />
      <FloatingBook delay={3} x={90} y={65} />
      <FloatingBook delay={4} x={45} y={15} />
      <FloatingBook delay={5} x={25} y={80} />
      <FloatingBook delay={6} x={75} y={85} />
      <FloatingBook delay={7} x={60} y={5} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Hero Section */}
        <div
          className={`text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-orange-200 mb-8 hover:bg-white/90 hover:border-orange-300 transition-all duration-300 shadow-lg">
            <Sparkles size={18} className="text-orange-500" />
            <span className="text-sm text-gray-700 font-medium">Your Digital Reading Sanctuary</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-orange-500">My Book</span>
            <br />
            <span className="text-gray-800">Shelf</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Transform your reading journey with our beautiful, intelligent bookshelf.
            <span className="text-orange-600 font-semibold"> Discover, organize, and fall in love</span> with books all over again.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={handleRegister}
              className="group relative px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl text-white font-semibold text-lg shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300 min-w-48"
            >
              <span className="flex items-center gap-2">
                Start Your Journey
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>

            <button
              onClick={handleLogin}
              className="group px-8 py-4 bg-white border-2 border-orange-500 rounded-2xl text-orange-600 font-semibold text-lg hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 min-w-48 shadow-lg"
            >
              <span className="flex items-center gap-2">
                <BookOpen size={20} />
                Welcome Back
              </span>
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <FeatureCard
            icon={<Library className="text-white" size={28} />}
            title="Smart Organization"
            description="AI-powered categorization that learns your reading preferences and suggests the perfect organization system."
          />
          <FeatureCard
            icon={<Users className="text-white" size={28} />}
            title="Reading Community"
            description="Connect with fellow book lovers, share reviews, and discover your next favorite read through our vibrant community."
          />
          <FeatureCard
            icon={<Star className="text-white" size={28} />}
            title="Personalized Insights"
            description="Track your reading habits, set goals, and receive tailored recommendations based on your unique taste."
          />
        </div>

        {/* Stats Section */}
        <div
          className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl w-full transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {[
            { number: "50K+", label: "Happy Readers" },
            { number: "2M+", label: "Books Cataloged" },
            { number: "15K+", label: "Reviews Shared" },
            { number: "99%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-orange-500 group-hover:scale-110 transition-transform duration-300 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-gray-500 text-sm">Join thousands of readers who&apos;ve transformed their reading experience</p>
        </div>
      </div>
    </div>
  );
}

// Optional extracted card component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100 hover:bg-white/90 hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
      <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
