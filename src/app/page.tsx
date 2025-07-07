"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  Library,
  Users,
  Star,
  Phone,
  Mail,
  Book,
  Bookmark,
  Globe,
  Quote,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Types ---
type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
};

// --- Zod schema ---
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

// --- Components ---
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <motion.div
    className="group p-6 rounded-xl bg-white backdrop-blur-sm border border-orange-100 hover:bg-orange-50 hover:shadow-xl transition-all duration-300"
    whileHover={{ scale: 1.05, y: -10 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => (
  <motion.div
    className="p-6 rounded-xl bg-white border border-orange-100 shadow-md"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <Quote size={24} className="text-orange-500 mb-4" />
    <p className="text-gray-600 italic mb-4">{quote}</p>
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-orange-200" />
      <div>
        <p className="font-semibold text-gray-800">{author}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// --- Main Page ---
export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState({
    success: null as boolean | null,
    message: "",
    isLoading: false,
  });

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = () => {
    console.log("Navigating to /auth/login"); // Debug log
    router.push("/auth/login");
  };

  const handleRegister = () => {
    console.log("Navigating to /auth/register"); // Debug log
    router.push("/auth/register");
  };

  const handleFormSubmit = async (data: FormData) => {
    console.log("Form submitted:", data); // Debug log
    setFormStatus({ success: null, message: "", isLoading: true });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message.");
      setFormStatus({
        success: true,
        message: "Message sent successfully!",
        isLoading: false,
      });
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        success: false,
        message: "Failed to send message. Please try again.",
        isLoading: false,
      });
    }
  };

  const FloatingBook = ({ delay = 0, x = 0, y = 0 }: { delay?: number; x?: number; y?: number }) => (
    <motion.div
      className="absolute opacity-20 pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
      }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <BookOpen size={28} className="text-orange-300" />
    </motion.div>
  );

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 scroll-smooth">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,140,0,0.08),transparent_50%)]"></div>
        </div>

        {/* Floating Books */}
        {[15, 85, 10, 90, 45, 25, 75, 60, 30, 70].map((x, i) => (
          <FloatingBook key={i} delay={i * 0.5} x={x} y={(x + 30) % 100} />
        ))}

        {/* Navbar */}
        <motion.nav
          className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-orange-200 shadow-sm"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-xl font-bold text-orange-500">MyBookShelf</div>
          <div className="hidden md:flex space-x-6 font-medium text-gray-700">
            <a href="#features" className="hover:text-orange-600 transition">Features</a>
            <a href="#about" className="hover:text-orange-600 transition">About</a>
            <a href="#testimonials" className="hover:text-orange-600 transition">Testimonials</a>
            <a href="#contact" className="hover:text-orange-600 transition">Contact</a>
          </div>
          <div className="flex space-x-2">
            <motion.button
              onClick={handleLogin}
              className="text-sm text-orange-600 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition"
              whileHover={{ scale: 1.1 }}
              suppressHydrationWarning // Handle browser extension attributes
            >
              Login
            </motion.button>
            <motion.button
              onClick={handleRegister}
              className="text-sm bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
              whileHover={{ scale: 1.1 }}
              suppressHydrationWarning // Handle browser extension attributes
            >
              Register
            </motion.button>
          </div>
        </motion.nav>

        {/* Hero */}
        <motion.section
          className="pt-32 pb-20 px-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-orange-200 mb-8 shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Sparkles size={18} className="text-orange-500" />
            <span className="text-sm text-gray-700 font-medium">Your Digital Reading Sanctuary</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-orange-500">MyBookShelf</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Transform your reading journey. Discover, organize, and immerse yourself in a world of books with a seamless, personalized experience.
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handleRegister}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition"
              whileHover={{ scale: 1.1 }}
              suppressHydrationWarning // Handle browser extension attributes
            >
              Start Now
            </motion.button>
            <motion.button
              onClick={handleLogin}
              className="bg-white border border-orange-500 text-orange-600 px-6 py-3 rounded-lg shadow hover:bg-orange-50 transition"
              whileHover={{ scale: 1.1 }}
              suppressHydrationWarning // Handle browser extension attributes
            >
              Login
            </motion.button>
          </div>
        </motion.section>

        {/* Features */}
        <section id="features" className="px-6 py-16 bg-white/80">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Core Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={<Library size={28} className="text-white" />}
              title="Smart Organization"
              description="AI-powered categorization that learns your preferences and suggests the best layout for your digital library."
            />
            <FeatureCard
              icon={<Users size={28} className="text-white" />}
              title="Reading Community"
              description="Connect with readers, share reviews, join book clubs, and discover new titles together."
            />
            <FeatureCard
              icon={<Star size={28} className="text-white" />}
              title="Personalized Insights"
              description="Track reading habits, set goals, and receive tailored book recommendations."
            />
            <FeatureCard
              icon={<Book size={28} className="text-white" />}
              title="Seamless Reading"
              description="Access your books across devices with synchronized progress and notes."
            />
            <FeatureCard
              icon={<Bookmark size={28} className="text-white" />}
              title="Custom Bookmarks"
              description="Save your favorite passages and organize them with personalized tags."
            />
            <FeatureCard
              icon={<Globe size={28} className="text-white" />}
              title="Global Library"
              description="Explore a vast collection of books from around the world in multiple languages."
            />
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-6 py-16 bg-orange-50 text-center">
          <motion.h2
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.h2>
          <motion.div
            className="max-w-3xl mx-auto text-gray-600 leading-relaxed space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p>
              At MyBookShelf, we’re passionate about revolutionizing the way readers connect with books. Our mission is to create an inclusive, intuitive, and inspiring digital library that empowers readers worldwide to explore, organize, and share their love for literature.
            </p>
            <p>
              Founded by a team of book lovers and tech enthusiasts, we combine cutting-edge AI technology with a deep appreciation for storytelling. Whether you’re a casual reader or a literary scholar, our platform is designed to make your reading journey seamless, personalized, and community-driven.
            </p>
            <p>
              Join us in building a global community where every book finds its reader, and every reader finds their story. Let’s make reading not just a pastime, but a vibrant, shared experience.
            </p>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="px-6 py-16 bg-white/80">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What Our Readers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <TestimonialCard
              quote="MyBookShelf transformed how I organize my reading list. The AI suggestions are spot-on!"
              author="Sarah K."
              role="Avid Reader"
            />
            <TestimonialCard
              quote="The community feature helped me discover new authors and connect with fellow book lovers."
              author="James M."
              role="Book Club Leader"
            />
            <TestimonialCard
              quote="I love the seamless reading experience across my phone and laptop. It’s a game-changer!"
              author="Emma L."
              role="Student"
            />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 px-6 md:px-20 bg-orange-100 text-gray-800 scroll-mt-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Left Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-2">
                Contact <span className="text-orange-500">Us</span>
              </h2>
              <h3 className="text-lg font-semibold mb-4">We’d Love to Hear from You</h3>
              <p className="text-gray-700 mb-6">
                Reach out with questions, ideas, or partnership opportunities—our team is always ready to support fellow book lovers!
              </p>
              <p className="mb-2 flex items-center gap-2">
                <Mail size={18} />
                support@mybookshelf.com
              </p>
              <p className="mb-6 flex items-center gap-2">
                <Phone size={18} />
                +250 780 000 000
              </p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://facebook.com"
                  className="text-orange-500 border border-orange-500 rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-600 hover:text-white transition"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-orange-500 border border-orange-500 rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-600 hover:text-white transition"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  className="text-orange-500 border border-orange-500 rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-600 hover:text-white transition"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              className="bg-white p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div>
                <input
                  {...register("name")}
                  placeholder="Enter Your Name"
                  className="w-full mb-4 px-4 py-2 bg-orange-50 text-gray-800 rounded-md focus:ring-2 focus:ring-orange-400 outline-none pointer-events-auto"
                  aria-label="Your Name"
                  onClick={(e) => e.currentTarget.focus()}
                  suppressHydrationWarning // Handle browser extension attributes
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mb-2">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register("email")}
                  placeholder="Enter Your Email"
                  className="w-full mb-4 px-4 py-2 bg-orange-50 text-gray-800 rounded-md focus:ring-2 focus:ring-orange-400 outline-none pointer-events-auto"
                  aria-label="Your Email"
                  suppressHydrationWarning // Handle browser extension attributes
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mb-2">{errors.email.message}</p>
                )}
              </div>
              <div>
                <input
                  {...register("subject")}
                  placeholder="Subject"
                  className="w-full mb-4 px-4 py-2 bg-orange-50 text-gray-800 rounded-md focus:ring-2 focus:ring-orange-400 outline-none pointer-events-auto"
                  aria-label="Subject"
                  suppressHydrationWarning // Handle browser extension attributes
                />
                {errors.subject && (
                  <p className="text-red-600 text-sm mb-2">{errors.subject.message}</p>
                )}
              </div>
              <div>
                <textarea
                  {...register("message")}
                  rows={4}
                  placeholder="Message"
                  className="w-full mb-6 px-4 py-2 bg-orange-50 text-gray-800 rounded-md focus:ring-2 focus:ring-orange-400 outline-none pointer-events-auto"
                  aria-label="Your Message"
                  suppressHydrationWarning // Handle browser extension attributes
                ></textarea>
                {errors.message && (
                  <p className="text-red-600 text-sm mb-2">{errors.message.message}</p>
                )}
              </div>
              {formStatus.message && (
                <p
                  className={`mb-4 text-sm ${
                    formStatus.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {formStatus.message}
                </p>
              )}
              <motion.button
                type="submit"
                className="w-full py-2 rounded-md text-white font-semibold bg-orange-500 hover:bg-orange-600 transition"
                whileHover={{ scale: 1.05 }}
                disabled={formStatus.isLoading}
                suppressHydrationWarning // Handle browser extension attributes
              >
                {formStatus.isLoading ? "Sending..." : "Submit"}
              </motion.button>
            </motion.form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-orange-600 text-white py-10">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="text-white font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><a href="#about" className="hover:text-orange-200">About</a></li>
                <li><a href="#features" className="hover:text-orange-200">Features</a></li>
                <li><a href="#testimonials" className="hover:text-orange-200">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-orange-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Resources</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-orange-200">Blog</a></li>
                <li><a href="#" className="hover:text-orange-200">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-200">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Follow Us</h4>
              <ul className="space-y-1">
                <li><a href="https://twitter.com" className="hover:text-orange-200">Twitter</a></li>
                <li><a href="https://facebook.com" className="hover:text-orange-200">Facebook</a></li>
                <li><a href="https://instagram.com" className="hover:text-orange-200">Instagram</a></li>
              </ul>
            </div>
          </div>
        </footer>

        {/* Copyright */}
        <section className="bg-orange-700 text-center text-white text-xs py-4">
          © {new Date().getFullYear()} MyBookShelf. All rights reserved.
        </section>
      </div>
    </ErrorBoundary>
  );
}