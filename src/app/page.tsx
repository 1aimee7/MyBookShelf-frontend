"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  BookOpen,
  Sparkles,
  Library,
  Users,
  Star,
  Quote,
  Upload,
} from "lucide-react";

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
    <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center mb-4">{icon}</div>
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

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

// --- Main Page ---
export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState({ success: null as boolean | null, message: "", isLoading: false });
  const [profile, setProfile] = useState<{ username?: string; email?: string; profilePicture?: string }>({});
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      const storedData = localStorage.getItem("currentUser");
      if (storedData) {
        try {
            const { username, profilePicture } = JSON.parse(storedData);
            setProfile({ username, profilePicture });
        } catch (e) {
            console.error("Failed to parse user data from localStorage", e);
        }
      }
    }
    fetchProfile();
  }, []);

  const handleLogin = () => router.push("/auth/login");
  const handleRegister = () => router.push("/auth/register");

  const handleFormSubmit = async (data: FormData) => {
    setFormStatus({ success: null, message: "", isLoading: true });
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setFormStatus({ success: true, message: "Message sent successfully!", isLoading: false });
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({ success: false, message: "Failed to send message. Please try again.", isLoading: false });
    }
  };

  const FloatingBook = ({ delay = 0, x = 0, y = 0 }: { delay?: number; x?: number; y?: number }) => (
    <motion.div
      className="absolute opacity-20 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)` }}
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 3, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <BookOpen size={28} className="text-orange-300" />
    </motion.div>
  );

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to upload a profile picture.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post("https://mybooklibrary-5awp.onrender.com/api/auth/profile-picture", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      alert("Profile picture updated!");
      const newProfilePicture = response.data.profilePicture;
      setProfile((prev) => ({ ...prev, profilePicture: newProfilePicture }));
      const storedData = localStorage.getItem("currentUser");
      if(storedData) {
        const currentUser = JSON.parse(storedData);
        currentUser.profilePicture = newProfilePicture;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload profile picture.");
    }
  };

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 scroll-smooth">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,140,0,0.08),transparent_50%)]"></div>
        </div>

        {[15, 85, 10, 90, 45, 25, 75, 60, 30, 70].map((x, i) => (
          <FloatingBook key={i} delay={i * 0.5} x={x} y={(x + 30) % 100} />
        ))}

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

          <div className="flex items-center space-x-4">
            {profile.username ? (
              <>
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500 cursor-pointer" title={profile.username}>
                  <Image src={profile.profilePicture || "/default-avatar.png"} alt={profile.username || "Profile"} fill sizes="40px" style={{ objectFit: "cover" }} />
                  <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-1 cursor-pointer" title="Upload new profile picture">
                    <Upload className="w-4 h-4 text-white" />
                  </label>
                  <input id="profile-image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
                <span className="text-orange-600 font-semibold hidden sm:inline">{profile.username}</span>
              </>
            ) : (
              <>
                <motion.button onClick={handleLogin} className="text-sm text-orange-600 border border-orange-500 px-4 py-2 rounded-lg hover:bg-orange-50 transition" whileHover={{ scale: 1.1 }} suppressHydrationWarning>Login</motion.button>
                <motion.button onClick={handleRegister} className="text-sm bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition" whileHover={{ scale: 1.1 }} suppressHydrationWarning>Register</motion.button>
              </>
            )}
          </div>
        </motion.nav>

        <motion.section className="pt-32 pb-20 px-6 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-orange-200 mb-8 shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
            <Sparkles size={18} className="text-orange-500" />
            <span className="text-sm text-gray-700 font-medium">Your Digital Reading Sanctuary</span>
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-orange-500">MyBookShelf</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Transform your reading journey. Discover, organize, and immerse yourself in a world of books with a seamless, personalized experience.</p>
          <div className="flex justify-center gap-4">
            <motion.button onClick={handleRegister} className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow hover:bg-orange-600 transition" whileHover={{ scale: 1.1 }} suppressHydrationWarning>Start Now</motion.button>
            <motion.button onClick={handleLogin} className="bg-white border border-orange-500 text-orange-600 px-6 py-3 rounded-lg shadow hover:bg-orange-50 transition" whileHover={{ scale: 1.1 }} suppressHydrationWarning>Login</motion.button>
          </div>
        </motion.section>

        <section id="features" className="px-6 py-16 bg-white/80">
          <motion.h2 className="text-3xl font-bold text-center text-gray-800 mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>Core Features</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard icon={<Library size={28} className="text-white" />} title="Smart Organization" description="AI-powered categorization that learns your preferences and suggests the best layout for your digital library." />
            <FeatureCard icon={<Users size={28} className="text-white" />} title="Reading Community" description="Connect with readers, share reviews, join book clubs, and discover new titles together." />
            <FeatureCard icon={<Star size={28} className="text-white" />} title="Personalized Recommendations" description="Tailored suggestions based on your reading habits and interests." />
          </div>
        </section>

        <section id="about" className="px-6 py-16 max-w-4xl mx-auto text-center text-gray-700">
          <h2 className="text-3xl font-bold mb-6">About MyBookShelf</h2>
          <p className="max-w-xl mx-auto text-lg leading-relaxed">
            MyBookShelf is your trusted digital companion designed to simplify
            and enrich your reading experience. Whether you&#39;re a casual reader
 reader
            or a bibliophile, our platform offers tools to organize, discover,
            and engage with books like never before.
          </p>
        </section>

        <section id="testimonials" className="bg-white/90 py-16 px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Readers Say</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard quote="MyBookShelf has revolutionized how I organize my reading list. The recommendations are spot on!" author="Jane Doe" role="Avid Reader" />
            <TestimonialCard quote="Connecting with other readers has never been easier. Love the community feature!" author="John Smith" role="Book Club Organizer" />
            <TestimonialCard quote="The interface is so intuitive and beautiful. I spend more time reading now." author="Emma Wilson" role="Casual Reader" />
          </div>
        </section>

        <section id="contact" className="max-w-3xl mx-auto px-6 py-16 bg-white/90 rounded-xl shadow-lg my-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Contact Us</h2>
          <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Name</label>
              <input {...register("name")} type="text" id="name" placeholder="Your full name" className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 ${errors.name ? "focus:ring-red-500" : "focus:ring-orange-500"}`} />
              {errors.name && <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
              <input {...register("email")} type="email" id="email" placeholder="you@example.com" className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 ${errors.email ? "focus:ring-red-500" : "focus:ring-orange-500"}`} />
              {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">Subject</label>
              <input {...register("subject")} type="text" id="subject" placeholder="Subject" className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 ${errors.subject ? "focus:ring-red-500" : "focus:ring-orange-500"}`} />
              {errors.subject && <p className="text-red-600 mt-1 text-sm">{errors.subject.message}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Message</label>
              <textarea {...register("message")} id="message" rows={5} placeholder="Write your message here..." className={`w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 ${errors.message ? "focus:ring-red-500" : "focus:ring-orange-500"}`}></textarea>
              {errors.message && <p className="text-red-600 mt-1 text-sm">{errors.message.message}</p>}
            </div>
            <button type="submit" disabled={formStatus.isLoading} className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition disabled:opacity-60">{formStatus.isLoading ? "Sending..." : "Send Message"}</button>
            {formStatus.success !== null && <p className={`mt-4 text-center font-medium ${formStatus.success ? "text-green-600" : "text-red-600"}`}>{formStatus.message}</p>}
          </form>
        </section>

        <footer className="py-8 bg-orange-100 text-gray-700 text-center text-sm">
          © {new Date().getFullYear()} MyBookShelf. All rights reserved.
        </footer>
      </div>
    </ErrorBoundary>
  );
}