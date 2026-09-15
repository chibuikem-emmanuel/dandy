"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Info,
  ExternalLink,
  Compass,
  Calendar,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface Hotel {
  id: number;
  name: string;
  rating: number;
  distance: string;
  images: string[];
  description: string;
  hostAvatar: string;
  statusText: string;
  price?: string;
  bookUrl?: string;
}

// Clean Unsplash URLs so Next.js handles real-time crisp resizing and DPI density
const HOTELS_DATA: Hotel[] = [
  {
    id: 1,
    name: "Rhema University Guest House",
    rating: 4,
    distance: "0.1 km (At Venue)",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    ],
    description:
      "Located directly within the Rhema University Campus premises. Perfect and convenient for wedding guests who prefer zero travel distance.",
    hostAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    statusText: "Special wedding guest discount available.",
    price: "₦25,000 / night",
    bookUrl: "#",
  },
  {
    id: 2,
    name: "Hotel De La Paix Aba",
    rating: 4,
    distance: "1.2 km from venue",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843",
    ],
    description:
      "A serene and comfortable hotel offering premium rooms, high-speed Wi-Fi, 24/7 power, and fine dining close to the university.",
    hostAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    statusText: "Recommended for families & groups.",
    price: "₦35,000 / night",
    bookUrl: "#",
  },
  {
    id: 3,
    name: "Enitona Hotel Aba",
    rating: 5,
    distance: "2.5 km from venue",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    ],
    description:
      "Luxury hospitality with spacious suites, outdoor swimming pool, top-tier security, and complimentary breakfast.",
    hostAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    statusText: "Limited executive suites remaining.",
    price: "₦45,000 / night",
    bookUrl: "#",
  },
  {
    id: 4,
    name: "Brites Suites Aba",
    rating: 4,
    distance: "3.1 km from venue",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    ],
    description:
      "Modern boutique hotel featuring cozy climate-controlled rooms, ambient lounge bar, and fast access to Aba city center.",
    hostAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    statusText: "Standard rooms available.",
    price: "₦30,000 / night",
    bookUrl: "#",
  },
  {
    id: 5,
    name: "Pinnacle Hotels Aba",
    rating: 4,
    distance: "4.0 km from venue",
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45",
    ],
    description:
      "Elegant accommodation with stylish interiors, ample parking space, and friendly service tailored for wedding visitors.",
    hostAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    statusText: "Booking open for wedding weekend.",
    price: "₦28,000 / night",
    bookUrl: "#",
  },
];

const SECTION_IMAGES: Record<string, string> = {
  home: "/images/footer.jpeg",
  schedule: "/images/sch2.PNG",
  accommodation: "/images/location.png",
  registry: "/images/storytime.jpeg",
  faq: "/images/gallery1.jpeg",
};

export default function SplitWeddingLayout() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const [currentImgSrc, setCurrentImgSrc] = useState(SECTION_IMAGES.home);
  const [previousImgSrc, setPreviousImgSrc] = useState(SECTION_IMAGES.home);

  const targetDate = new Date("2026-11-14T10:30:00+01:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const nextImg = SECTION_IMAGES[activeSection];
    if (nextImg && nextImg !== currentImgSrc) {
      setPreviousImgSrc(currentImgSrc);
      setCurrentImgSrc(nextImg);
    }
  }, [activeSection, currentImgSrc]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPosition >= top && scrollPosition < top + height && id) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F5F2EB] text-[#1A1A1A]">
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[320px] bg-[#F5F2EB] z-50 p-8 flex flex-col justify-between shadow-2xl border-r border-[#C2A675]/30"
            >
              <div>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1A1A1A]">
                    Dan'sJoy26
                  </h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-stone-200 rounded-full text-[#1A1A1A]"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 text-lg font-serif">
                  {[
                    { label: "Home", id: "home" },
                    { label: "Schedule", id: "schedule" },
                    { label: "Where to Stay", id: "accommodation" },
                    { label: "Registry", id: "registry" },
                    { label: "Q&A", id: "faq" },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[#1A1A1A] hover:text-[#800020] transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <a
                href="#rsvp"
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-3 text-center border border-[#1A1A1A] text-[#1A1A1A] rounded-full font-semibold hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition"
              >
                RSVP
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* LEFT PANEL */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden bg-[#1A1A1A] flex items-center justify-center">
          
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={previousImgSrc}
              alt="Previous Section Background"
              fill
              priority
              quality={85}
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center 15%" }}
            />
          </div>

          <AnimatePresence mode="sync">
            <motion.div
              key={currentImgSrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full z-10"
            >
              <Image
                src={currentImgSrc}
                alt={`${activeSection} visual preview`}
                fill
                priority
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover", objectPosition: "center 15%" }}
                onError={() => setCurrentImgSrc("/images/heropage.png")}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-15 pointer-events-none" />

          <button
            onClick={() => setIsMenuOpen(true)}
            className="absolute top-6 left-6 z-20 bg-white/90 backdrop-blur-md text-[#1A1A1A] px-4 py-2 rounded-full shadow-md hover:bg-white transition flex items-center gap-2 font-sans text-sm font-semibold cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu size={18} /> MENU
          </button>

          <div className="absolute bottom-10 left-8 right-8 z-20 text-white pointer-events-none">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-3">
              Dan'sJoy<span className="font-light">26</span>
            </h1>
            <p className="text-sm sm:text-base opacity-95 max-w-md leading-relaxed font-sans font-light">
              We can't wait to share our special day with you! Capture every laugh and dance move, just make sure to get our good sides! 😉📸💃
            </p>
          </div>
        </div>

        {/* RIGHT PANEL - CONTENT SECTIONS */}
        <div className="w-full lg:w-1/2 bg-[#F5F2EB]">
          {/* HOME */}
          <section
            id="home"
            className="relative min-h-screen flex flex-col justify-center items-center text-center p-6 lg:p-12 border-b border-stone-300/60 overflow-hidden bg-[#F5F2EB]"
          >
            <div className="absolute top-0 right-0 w-36 sm:w-48 h-36 sm:h-48 pointer-events-none opacity-40">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#3B4728]">
                <path d="M200,0 C120,20 80,80 50,150 C40,170 30,200 0,200 C50,180 100,140 130,90 C160,40 180,10 200,0 Z" fill="currentColor"/>
                <path d="M200,40 C140,50 110,100 80,160 C120,120 160,70 200,40 Z" fill="currentColor"/>
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-36 sm:w-48 h-36 sm:h-48 pointer-events-none opacity-40 transform rotate-180">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#3B4728]">
                <path d="M200,0 C120,20 80,80 50,150 C40,170 30,200 0,200 C50,180 100,140 130,90 C160,40 180,10 200,0 Z" fill="currentColor"/>
                <path d="M200,40 C140,50 110,100 80,160 C120,120 160,70 200,40 Z" fill="currentColor"/>
              </svg>
            </div>

            <div className="relative z-10 max-w-lg space-y-6 px-4 py-8">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] tracking-tight leading-snug">
                Saturday, November 14, 2026
              </h2>

              <p className="font-serif text-lg sm:text-xl text-stone-800 tracking-wide font-normal max-w-sm mx-auto leading-relaxed">
                Rhema University Auditorium,<br />Aba, Nigeria
              </p>

              <div className="pt-2 pb-2">
                {timeLeft.isPassed ? (
                  <p className="font-serif text-xl text-stone-900 font-bold">
                    The Wedding Day is Here! 🎉
                  </p>
                ) : (
                  <p className="font-sans text-sm sm:text-base text-stone-700 font-medium tracking-wide">
                    {timeLeft.days} days {timeLeft.hours} hrs {timeLeft.minutes} mins {timeLeft.seconds} secs
                  </p>
                )}
              </div>

              <div className="pt-2">
                <a
                  href="#rsvp"
                  className="inline-block px-10 py-2.5 rounded-full border border-[#1A1A1A] text-[#1A1A1A] font-sans font-medium text-xs tracking-widest uppercase bg-transparent hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-all duration-300"
                >
                  RSVP
                </a>
              </div>

              <a
                href="#schedule"
                className="inline-flex flex-col items-center pt-8 text-stone-600 hover:text-black transition-colors group cursor-pointer"
              >
                <span className="font-serif text-sm tracking-wide mb-2 text-stone-700">
                  View Details
                </span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown size={28} className="text-stone-700 group-hover:text-black" />
                </motion.div>
              </a>
            </div>
          </section>

          {/* SCHEDULE */}
          <section id="schedule" className="p-8 lg:p-16 space-y-8 border-b border-stone-300/60 bg-[#F5F2EB]">
            <h2 className="font-serif text-4xl text-center text-[#1A1A1A] mb-8">Schedule</h2>
            <div className="space-y-6 max-w-lg mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-300/70 flex items-start gap-4">
                <Clock className="w-6 h-6 text-stone-800 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-[#1A1A1A]">
                    Dan'sJoy26 - Church Ceremony & Reception 💍❤️
                  </h3>
                  <p className="text-sm text-stone-700 font-semibold mb-2">10:00 AM</p>
                  <p className="italic text-gray-600 text-sm">
                    "...but I have found him whom my soul loveth..." — Song of Solomon 3:4
                  </p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-stone-300/70 flex items-start gap-4">
                <Calendar className="w-6 h-6 text-stone-800 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-[#1A1A1A]">Dan'sJoy26 - Trad & Reception, 30th October 🥂</h3>
                  <p className="text-sm text-stone-700 font-semibold mb-2">3:00 PM</p>
                  <p className="text-sm text-gray-600">
                    Come ready for an evening of good vibes, plenty to eat, and dancing at the Main Banquet Hall!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ACCOMMODATION */}
          <section id="accommodation" className="p-8 lg:p-16 space-y-8 border-b border-stone-300/60 bg-[#F5F2EB]">
            <div className="text-center space-y-3 max-w-lg mx-auto">
              <h2 className="font-serif text-4xl text-[#1A1A1A]">Where to Stay</h2>
              <p className="text-gray-600 text-sm">
                Here are our favorite nearby hotels with special discounts just for our guests.
              </p>
            </div>

            <div className="max-w-md mx-auto relative rounded-2xl overflow-hidden shadow-sm border border-stone-300/70 bg-white">
              <div className="relative w-full h-[260px] bg-[#E5E3DF]">
                <iframe
                  title="Rhema University Aba Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.8115682855146!2d7.3542!3d5.1328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10429910f5454157%3A0xb24d08b3e8aa4307!2sRhema%20University!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  className="w-full h-full border-0 grayscale-[20%] contrast-[1.05]"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-md border border-stone-200 flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A]">
                  <MapPin size={14} className="fill-[#1A1A1A] text-white" />
                  <span>Venue: Rhema University Auditorium</span>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <a
                    href="https://maps.google.com/?q=Rhema+University+Aba+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full bg-white text-[#1A1A1A] border border-stone-300 font-sans text-xs font-semibold shadow-md hover:bg-[#1A1A1A] hover:text-white transition flex items-center gap-2"
                  >
                    <Compass size={14} /> Explore on Map
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8 max-w-md mx-auto">
              {HOTELS_DATA.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </section>

          {/* REGISTRY */}
          <section
            id="registry"
            className="p-8 lg:p-16 space-y-6 border-b border-stone-300/60 bg-[#F5F2EB] text-center"
          >
            <h2 className="font-serif text-3xl font-semibold tracking-wider text-[#1A1A1A] uppercase">
              Registry
            </h2>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              Your presence means the world to us! However, if you'd like to gift us something, cash contributions to these account would be greatly appreciated.
            </p>
            <div className="space-y-2 text-sm text-stone-800 max-w-sm mx-auto font-sans bg-white/80 p-6 rounded-2xl border border-stone-300/70 shadow-sm">
              <p className="font-medium">
                Account Name: <span className="font-normal">Agha Dan & Ubani-Ukoma IHECHI</span>
              </p>
              <p className="font-medium">
                Bank: <span className="font-normal">United Bank for Africa (UBA)</span>
              </p>
              <p className="font-medium">
                Account Number: <span className="font-bold tracking-wider">2421572751</span>
              </p>
            </div>
          </section>

          {/* Q & A */}
          <section id="faq" className="p-8 lg:p-16 space-y-10 bg-[#F5F2EB]">
            <div className="text-center space-y-4 max-w-lg mx-auto">
              <h2 className="font-serif text-4xl text-[#1A1A1A]">Q & A</h2>
              <p className="text-stone-700 text-sm max-w-md mx-auto leading-relaxed">
                For all our amazing friends and family with a million questions, please check out our Q&A first! It's like Google... but for our wedding 💍🥂
              </p>
            </div>

            <div className="space-y-8 max-w-lg mx-auto text-left text-xs sm:text-sm font-sans text-stone-800">
              <div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">
                  When is the RSVP deadline?
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Please RSVP by <strong>14th November 2026</strong> — so we know exactly how many hugs, plates, and dance partners to prepare for! 🥂💃
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">
                  Is the wedding indoors or outdoors?
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Our wedding ceremony will be held indoors in the hall, the same spot where the trad and reception will happen too. No need to wander off... Just sit tight, eat, dance, and let the love and relief find you! 🥂💃🙌
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">
                  Can I bring a date?
                </h3>
                <p className="text-stone-700">
                  Please check your invite for your +1!
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">
                  What will the weather be like?
                </h3>
                <p className="text-stone-700">
                  Hopefully cool and breezy.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">
                  What should I wear?
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Think Whimsical Elegance! Stylish, romantic, floaty fabrics, soft colours and shoes that won't sink into the lawn (plus your dancing shoes).<br />
                  <em>P.S. Please do not dress "casually".</em>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">
                  Are kids welcome?
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  As much as we love your little ones 👶🏽, we will not be including them in the ceremony or reception.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">
                  Whom should I call with questions?
                </h3>
                <p className="text-stone-700">
                  Please call our lovely event planner:<br />
                  <span className="font-medium">Brenda Adori:</span>{" "}
                  <a href="tel:+2348164802004" className="underline hover:text-black">
                    +234 816 480 2004
                  </a>
                </p>
              </div>
            </div>

            {/* RSVP Form Card */}
            <div id="rsvp" className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-stone-300/70 shadow-sm mt-12">
              <h3 className="font-serif text-2xl text-center text-[#1A1A1A] mb-4">RSVP</h3>
              {rsvpSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-xl text-stone-900">Thank You!</h4>
                  <p className="text-xs text-stone-600">Your RSVP has been submitted successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Guest Name"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Attendance</label>
                    <select className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black bg-white">
                      <option value="yes">Joyfully Accepts</option>
                      <option value="no">Regretfully Declines</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1A1A1A] text-white font-semibold rounded-lg hover:bg-black transition"
                  >
                    Submit RSVP
                  </button>
                </form>
              )}
            </div>

            {/* Footer */}
            <footer className="pt-12 pb-6 border-t border-stone-300/60 text-center space-y-4">
              <p className="font-serif italic text-2xl text-stone-800">Dan'sJoy</p>
              <div className="flex justify-center gap-6 text-xs text-stone-500 font-sans">
                <a href="#home" className="hover:text-stone-800 transition">Guest Help</a>
                <span>•</span>
                <a href="#home" className="hover:text-stone-800 transition">About</a>
                <span>•</span>
                <a href="#home" className="hover:text-stone-800 transition">Go to the top</a>
              </div>
            </footer>
          </section>

        </div>
      </div>
    </div>
  );
}

function HotelCard({ hotel }: { hotel: Hotel }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-300/70 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-52 sm:h-56 w-full bg-stone-900 group overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={hotel.images[currentIdx]}
              alt={`${hotel.name} room view`}
              fill
              quality={85}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-sm z-10">
          {currentIdx + 1}/{hotel.images.length}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition opacity-80 group-hover:opacity-100 z-10"
          aria-label="Previous Image"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition opacity-80 group-hover:opacity-100 z-10"
          aria-label="Next Image"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
          {hotel.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIdx ? "bg-white w-4" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5 space-y-3 font-sans">
        <div>
          <h3 className="font-semibold text-base text-gray-900">{hotel.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex text-amber-500">
              {Array.from({ length: hotel.rating }).map((_, i) => (
                <Star key={i} size={12} className="fill-amber-500" />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              • {hotel.distance}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-1">
          <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-stone-200">
            <Image
              src={hotel.hostAvatar}
              alt="Host"
              fill
              quality={85}
              sizes="50px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <p className="text-xs text-gray-600 leading-relaxed italic">
            "{hotel.description}"
          </p>
        </div>

        {hotel.price && (
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-stone-900">{hotel.price}</span>
            <a
              href={hotel.bookUrl}
              className="text-xs font-semibold text-stone-800 hover:underline flex items-center gap-1"
            >
              Book Room <ExternalLink size={12} />
            </a>
          </div>
        )}

        <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center gap-2 text-xs text-stone-600">
          <Info size={15} className="text-stone-800 shrink-0" />
          <span>{hotel.statusText}</span>
        </div>
      </div>
    </div>
  );
}