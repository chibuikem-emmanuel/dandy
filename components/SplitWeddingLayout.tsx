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
  ExternalLink,
  Compass,
  Calendar,
  Clock,
  CheckCircle2,
  Lock,
  UserCheck,
  RefreshCw,
} from "lucide-react";
import api from "@/lib/api";

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

interface RsvpGuest {
  id: number | string;
  full_name: string;
  attendance: "yes" | "no";
  created_at?: string;
}

const HOTELS_DATA: Hotel[] = [
  {
    id: 1,
    name: "🏨 Don Eric's Hotel & Suites",
    rating: 4,
    distance: "0.1 km (At Venue)",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    ],
    description:
      "Don Erics & Suites/Chibuzor, Azubuike. Moniepoint account number 8273988954.",
    hostAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    statusText: "Available for guests.",
    price:
      "Classic Rooms cost ₦23,000. Deluxe Rooms cost ₦28,000. Executive Rooms cost ₦33,000. / night",
    bookUrl: "#",
  },
  {
    id: 2,
    name: "🏨 Hotel De Laurel",
    rating: 4,
    distance: "1.2 km from venue",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
      "https://images.unsplash.com/photo-1591088398332-8a7791972843",
    ],
    description:
      "Location: 104 Okpoli-Umuobo Road, Abia State. Email: hoteldelaurel@yahoo.com. Phone: 08144841427 and 08174431133.",
    hostAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    statusText: "Recommended Rooms.",
    price:
      "Royalton Suit is ₦40,000 with a deposit of ₦45,000. #Executive Lounge is ₦35,000 with a deposit of ₦40,000. #Crystal Lounge is ₦30,000 with a deposit of ₦35,000. #Ivory Lounge is ₦25,000 with a deposit of ₦30,000. / night",
    bookUrl: "#",
  },
  {
    id: 3,
    name: "🏨 Linksview Hotel & Suites, Aba, Abia State",
    rating: 5,
    distance: "2.5 km from venue",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    ],
    description:
      "Room categories and rates for single occupancy. A valid payment guarantee (cash, transfer, or approved card) is required for reservations.",
    hostAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    statusText: "All suites.",
    price:
      "#Royal Room ₦45,000. #Diplomatic Room ₦55,000. #Executive Room ₦60,000. #Ambassadorial Room ₦65,000. #Senatorial Suite ₦75,000. #Prestige Room ₦95,000. / night",
    bookUrl: "#",
  },
  {
    id: 4,
    name: "🏨 Luxury City Hotels – Classic",
    rating: 4,
    distance: "3.1 km from venue",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    ],
    description: "Tagline: A City to Be Discovered.",
    hostAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    statusText: "Standard rooms available.",
    price:
      "#Silver Classic ₦25,000. #Gold Classic ₦25,000. #Diamond Classic ₦30,000. #Platinum Classic ₦30,000. #Classic Mini Suites ₦30,000. / night",
    bookUrl: "#",
  },
  {
    id: 5,
    name: "🏨 Luxury City Hotels – Royal",
    rating: 4,
    distance: "4.0 km from venue",
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45",
    ],
    description: "Tagline: A City to Be Discovered.",
    hostAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    statusText: "Booking open for wedding weekend.",
    price:
      "#Classic Royale ₦25,000. #Deluxe Royale ₦30,000. #Superior Room ₦40,000. #Exclusive Royale ₦80,000. #Classic Exclusive ₦30,000. #Deluxe Exclusive ₦30,000. #Royal Suites ₦60,000. / night",
    bookUrl: "#",
  },
];

const SECTION_IMAGES: Record<string, string> = {
  home: "/images/crop2.jpeg",
  schedule: "/images/sch2.PNG",
  accommodation: "/images/location.png",
  registry: "/images/storytime.jpeg",
  faq: "/images/footer.jpeg",
};

const TARGET_DATE = new Date("2026-11-14T10:30:00+01:00").getTime();

export default function SplitWeddingLayout() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // RSVP Form States
  const [fullName, setFullName] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no">("yes");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  // Admin Modal States
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [rsvpList, setRsvpList] = useState<RsvpGuest[]>([]);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(false);

  const [currentImgSrc, setCurrentImgSrc] = useState(SECTION_IMAGES.home);
  const [previousImgSrc, setPreviousImgSrc] = useState(SECTION_IMAGES.home);

  
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
      const difference = TARGET_DATE - now;

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
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

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

  // Fetch RSVPs from API Backend
  const loadRsvps = async () => {
    setIsLoadingAdmin(true);
    try {
      const response = await api.get("/rsvp/");
      setRsvpList(response.data);
    } catch (e) {
      console.error("Failed to load RSVP entries", e);
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsSubmitting(true);
    setRsvpError("");

    try {
      await api.post("/rsvp/", {
        full_name: fullName.trim(),
        attendance: attendance,
      });
      setRsvpSubmitted(true);
      setFullName("");
    } catch (error: any) {
      console.error("RSVP Submission Error:", error);
      const message = error?.response?.data?.detail || error?.response?.data?.message || "Could not submit RSVP. Please try again.";
      setRsvpError(typeof message === "string" ? message : "Could not submit RSVP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "2026") {
      setIsAuthenticated(true);
      setAuthError("");
      loadRsvps();
    } else {
      setAuthError("Invalid passcode. Access denied.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F5F2EB] text-[#1A1A1A]">
      {/* Navigation Drawer */}
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
              className="fixed top-0 left-0 bottom-0 w-[280px] sm:w-[320px] bg-[#F5F2EB] z-50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-r border-[#C2A675]/30"
            >
              <div>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A]">
                    Dan'sJoy26
                  </h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-stone-200 rounded-full text-[#1A1A1A]"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-5 text-base sm:text-lg font-serif">
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
                className="w-full py-3 text-center border border-[#1A1A1A] text-[#1A1A1A] rounded-full font-semibold hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition text-sm"
              >
                RSVP
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Admin Dashboard Modal */}
      <AnimatePresence>
        {isAdminOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl bg-white rounded-2xl p-6 sm:p-8 z-50 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="flex justify-between items-center pb-4 border-b border-stone-200 mb-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="text-emerald-700" size={22} />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                    Guest List Admin
                  </h3>
                </div>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-1 hover:bg-stone-100 rounded-full text-stone-600"
                >
                  <X size={20} />
                </button>
              </div>

              {!isAuthenticated ? (
                <form onSubmit={handleAdminAuth} className="space-y-4 py-6">
                  <div className="flex items-center gap-2 text-stone-600 text-sm mb-2">
                    <Lock size={16} /> Enter admin passcode to view guest responses.
                  </div>
                  <input
                    type="password"
                    placeholder="Enter Passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  {authError && (
                    <p className="text-red-600 text-xs font-semibold">{authError}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1A1A1A] text-white font-semibold rounded-lg hover:bg-black transition text-sm"
                  >
                    Authenticate
                  </button>
                </form>
              ) : (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-4 bg-stone-100 p-3 rounded-xl text-xs sm:text-sm">
                    <span className="font-semibold text-stone-800">
                      Total RSVPs: {rsvpList.length}
                    </span>
                    <button
                      onClick={loadRsvps}
                      disabled={isLoadingAdmin}
                      className="flex items-center gap-1 text-stone-600 hover:text-black font-medium disabled:opacity-50"
                    >
                      <RefreshCw size={14} className={isLoadingAdmin ? "animate-spin" : ""} /> Refresh
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                    {isLoadingAdmin ? (
                      <p className="text-stone-500 text-center py-8 text-sm">
                        Loading guests from server...
                      </p>
                    ) : rsvpList.length === 0 ? (
                      <p className="text-stone-500 text-center py-8 text-sm">
                        No RSVP submissions recorded yet.
                      </p>
                    ) : (
                      rsvpList.map((guest) => (
                        <div
                          key={guest.id}
                          className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm"
                        >
                          <div>
                            <p className="font-bold text-stone-900">{guest.full_name}</p>
                            <p className="text-[10px] sm:text-xs text-stone-500">
                              {guest.created_at ? new Date(guest.created_at).toLocaleString() : ""}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                              guest.attendance === "yes"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {guest.attendance === "yes" ? "Attending" : "Declined"}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* LEFT PANEL: Sticky Header Image */}
        <div className="sticky top-0 w-full lg:w-1/2 h-[32vh] sm:h-[42vh] lg:h-screen lg:sticky lg:top-0 z-30 overflow-hidden bg-[#1A1A1A] flex items-center justify-center shadow-md lg:shadow-none">
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-15 pointer-events-none" />

          <button
            onClick={() => setIsMenuOpen(true)}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-white/90 backdrop-blur-md text-[#1A1A1A] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md hover:bg-white transition flex items-center gap-1.5 sm:gap-2 font-sans text-xs sm:text-sm font-semibold cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu size={16} className="sm:w-[18px] sm:h-[18px]" /> MENU
          </button>

          <div className="absolute bottom-3 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 z-20 text-white pointer-events-none">
            <h1 className="font-serif text-2xl sm:text-5xl lg:text-7xl font-semibold tracking-tight mb-1 sm:mb-3">
              Dan'sJoy<span className="font-light">26</span>
            </h1>
            <p className="text-[11px] sm:text-base opacity-95 max-w-md leading-relaxed font-sans font-light line-clamp-2 sm:line-clamp-none">
              We can't wait to share our special day with you! Capture every laugh and dance move, just make sure to get our good sides! 😉📸💃
            </p>
          </div>
        </div>

        {/* STICKY DATE & VENUE BAR FOR MOBILE */}
        <div className="lg:hidden sticky top-[32vh] sm:top-[42vh] z-20 bg-[#1A1A1A] text-[#F5F2EB] px-4 py-2.5 border-t border-[#C2A675]/30 shadow-md flex items-center justify-between text-xs font-serif">
          <div className="flex items-center gap-2 truncate">
            <Calendar size={14} className="text-[#C2A675] shrink-0" />
            <span className="font-semibold truncate">Sat, Nov 14, 2026 • Rhema Univ. Aba</span>
          </div>
          <a
            href="#rsvp"
            className="px-3 py-1 bg-[#F5F2EB] text-[#1A1A1A] rounded-full text-[10px] font-sans font-bold tracking-wider uppercase shrink-0"
          >
            RSVP
          </a>
        </div>

        {/* RIGHT PANEL - CONTENT SECTIONS */}
        <div className="w-full lg:w-1/2 bg-[#F5F2EB] relative z-10">
          {/* HOME SECTION */}
          <section
            id="home"
            className="relative min-h-[calc(100vh-32vh)] lg:min-h-screen flex flex-col justify-center items-center text-center p-6 sm:p-8 lg:p-12 border-b border-stone-300/60 overflow-hidden bg-[#F5F2EB]"
          >
            <div className="absolute top-0 right-0 w-28 sm:w-48 h-28 sm:h-48 pointer-events-none opacity-40">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#3B4728]">
                <path d="M200,0 C120,20 80,80 50,150 C40,170 30,200 0,200 C50,180 100,140 130,90 C160,40 180,10 200,0 Z" fill="currentColor"/>
                <path d="M200,40 C140,50 110,100 80,160 C120,120 160,70 200,40 Z" fill="currentColor"/>
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 w-28 sm:w-48 h-28 sm:h-48 pointer-events-none opacity-40 transform rotate-180">
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#3B4728]">
                <path d="M200,0 C120,20 80,80 50,150 C40,170 30,200 0,200 C50,180 100,140 130,90 C160,40 180,10 200,0 Z" fill="currentColor"/>
                <path d="M200,40 C140,50 110,100 80,160 C120,120 160,70 200,40 Z" fill="currentColor"/>
              </svg>
            </div>

            <div className="relative z-10 max-w-lg space-y-4 sm:space-y-6 px-2 sm:px-4 py-6 sm:py-8">
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-[#1A1A1A] tracking-tight leading-snug">
                Saturday, November 14, 2026
              </h2>

              <p className="font-serif text-base sm:text-xl text-stone-800 tracking-wide font-normal max-w-sm mx-auto leading-relaxed">
                Rhema University Auditorium,<br />Aba, Nigeria
              </p>

              <div className="py-1">
                {timeLeft.isPassed ? (
                  <p className="font-serif text-lg sm:text-xl text-stone-900 font-bold">
                    The Wedding Day is Here! 🎉
                  </p>
                ) : (
                  <p className="font-sans text-xs sm:text-base text-stone-700 font-medium tracking-wide">
                    {timeLeft.days} days {timeLeft.hours} hrs {timeLeft.minutes} mins {timeLeft.seconds} secs
                  </p>
                )}
              </div>

              <div className="pt-1">
                <a
                  href="#rsvp"
                  className="inline-block px-8 sm:px-10 py-2.5 rounded-full border border-[#1A1A1A] text-[#1A1A1A] font-sans font-medium text-xs tracking-widest uppercase bg-transparent hover:bg-[#1A1A1A] hover:text-[#F5F2EB] transition-all duration-300"
                >
                  RSVP
                </a>
              </div>

              <a
                href="#schedule"
                className="inline-flex flex-col items-center pt-6 sm:pt-8 text-stone-600 hover:text-black transition-colors group cursor-pointer"
              >
                <span className="font-serif text-xs sm:text-sm tracking-wide mb-1 sm:mb-2 text-stone-700">
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
                  <ChevronDown size={24} className="sm:w-7 sm:h-7 text-stone-700 group-hover:text-black" />
                </motion.div>
              </a>
            </div>
          </section>

          {/* SCHEDULE */}
          <section id="schedule" className="p-6 sm:p-8 lg:p-16 space-y-6 sm:space-y-8 border-b border-stone-300/60 bg-[#F5F2EB]">
            <h2 className="font-serif text-3xl sm:text-4xl text-center text-[#1A1A1A] mb-4 sm:mb-8">Schedule</h2>
            <div className="space-y-4 sm:space-y-6 max-w-lg mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-sm border border-stone-300/70 flex items-start gap-3 sm:gap-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-stone-800 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#1A1A1A]">
                    Dan'sJoy26 - Trad & Reception, Fri. 30th October 🥂
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 font-semibold mb-1.5 sm:mb-2">3:00 PM</p>
                  <p className="italic text-gray-600 text-xs sm:text-sm">
                    Cultural rites, family introductions, and traditional festivities at No. 4 Ubani Ukoma Close, Ogborhill, Aba.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-sm border border-stone-300/70 flex items-start gap-3 sm:gap-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-stone-800 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#1A1A1A]">
                    Dan'sJoy26 - Church Ceremony, Sat. 14th November 💍❤️
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 font-semibold mb-1.5 sm:mb-2">10:00 AM</p>
                  <p className="italic text-gray-600 text-xs sm:text-sm">
                    The holy solemnization of matrimony and exchange of vows at Rhema University Auditorium, Aba.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-sm border border-stone-300/70 flex items-start gap-3 sm:gap-4">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-stone-800 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#1A1A1A]">Wedding Reception 💍❤️🥂</h3>
                  <p className="text-xs sm:text-sm text-stone-700 font-semibold mb-1.5 sm:mb-2">1:00 PM</p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    The Reception at Rhema University Auditorium, Aba.
                  </p>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-sm border border-stone-300/70 flex items-start gap-3 sm:gap-4">
              ✒️
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#1A1A1A]">Our Journey❤️</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Some love stories begin with fireworks.
                    <br></br>
                    Ours began with something quieter… and far more lasting.
                    It started the day our paths crossed in a way that felt almost ordinary at first—until it wasn’t.<br></br><br></br> There was an ease between us from the very beginning, a gentle recognition that made the world feel a little softer. <br></br><br></br>

                    Conversations that should have been small stretched into hours. Laughter came easily. Silence felt comfortable. We didn’t know it then, but something rare had already begun to take root.<br></br><br></br>
                    As the days turned into weeks and the weeks into months, we discovered each other slowly, carefully, completely. We learned the way the other smiled when they were truly happy, the quiet ways we showed care, the dreams we carried and the fears we rarely spoke aloud.<br></br><br></br> With Ihechi, I found safety. With me, Ihechi found home. We became each other’s favorite place to land.<br></br>

                    There were ordinary moments that somehow felt extraordinary: shared meals that turned into late-night talks, quiet evenings that filled the room with warmth, and the simple joy of choosing each other again and again. Through every season, bright ones and the harder ones, we grew, not just side by side, but into each other. Love taught us patience. It taught us grace. It taught us that the most beautiful things are often built quietly, day by day.<br></br><br></br>
                    And then came the moment that changed everything.<br></br>

                    When the question was asked and the answer was yes, time seemed to pause. In that sacred space between two hearts, we both knew: this was the beginning of forever. Not a perfect story, but our story, one written with intention, kindness, and a love that keeps choosing the other, every single day.<br></br><br></br>

                    Today, as we stand on the edge of becoming husband and wife, we look back with full hearts and look forward with even fuller ones.<br></br><br></br>

                    This is our love journey.<br></br>
                    This is our forever.<br></br>
                    And we cannot wait to walk the rest of it together, hand in hand, heart to heart, always.<br></br>
                    With love.<br></br><br></br>

                    Dan & Rejoice
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ACCOMMODATION */}
          <section id="accommodation" className="p-6 sm:p-8 lg:p-16 space-y-6 sm:space-y-8 border-b border-stone-300/60 bg-[#F5F2EB]">
            <div className="text-center space-y-2 sm:space-y-3 max-w-lg mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">Where to Stay</h2>
              <p className="text-gray-600 text-xs sm:text-sm">
                Here are our favorite nearby hotels with special discounts just for our guests.
              </p>
            </div>

            <div className="max-w-md mx-auto relative rounded-2xl overflow-hidden shadow-sm border border-stone-300/70 bg-white">
              <div className="relative w-full h-[220px] sm:h-[260px] bg-[#E5E3DF]">
                <iframe
                  title="Rhema University Aba Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.8115682855146!2d7.3542!3d5.1328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10429910f5454157%3A0xb24d08b3e8aa4307!2sRhema%20University!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                  className="w-full h-full border-0 grayscale-[20%] contrast-[1.05]"
                  loading="lazy"
                  allowFullScreen
                />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1 rounded-full shadow-md border border-stone-200 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#1A1A1A] max-w-[90%] truncate">
                  <MapPin size={13} className="fill-[#1A1A1A] text-white shrink-0" />
                  <span className="truncate">Venue: Rhema University Auditorium</span>
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                  <a
                    href="https://maps.google.com/?q=Rhema+University+Aba+Nigeria"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white text-[#1A1A1A] border border-stone-300 font-sans text-xs font-semibold shadow-md hover:bg-[#1A1A1A] hover:text-white transition flex items-center gap-1.5 sm:gap-2"
                  >
                    <Compass size={14} /> Explore on Map
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8 max-w-md mx-auto">
              {HOTELS_DATA.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </section>

          {/* REGISTRY */}
          <section
            id="registry"
            className="p-6 sm:p-8 lg:p-16 space-y-4 sm:space-y-6 border-b border-stone-300/60 bg-[#F5F2EB] text-center"
          >
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wider text-[#1A1A1A] uppercase">
              Registry
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
              Your presence means the world to us! However, if you'd like to gift us something, cash contributions to these account would be greatly appreciated.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-stone-800 max-w-sm mx-auto font-sans bg-white/80 p-5 sm:p-6 rounded-2xl border border-stone-300/70 shadow-sm text-left sm:text-center">
              <p className="font-medium">
                Account Name: <span className="font-normal block sm:inline">Agha Dan & Ubani-Ukoma Ihechi</span>
              </p>
              <p className="font-medium">
                Bank: <span className="font-normal block sm:inline">United Bank for Africa (UBA)</span>
              </p>
              <p className="font-medium">
                Account Number: <span className="font-bold tracking-wider block sm:inline">2421572751</span>
              </p>
            </div>
          </section>

          {/* Q & A */}
          <section id="faq" className="p-6 sm:p-8 lg:p-16 space-y-8 sm:space-y-10 bg-[#F5F2EB]">
            <div className="text-center space-y-2 sm:space-y-4 max-w-lg mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">Q & A</h2>
              <p className="text-stone-700 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                For all our amazing friends and family with a million questions, please check out our Q&A first! It's like Google... but for our wedding 💍🥂
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8 max-w-lg mx-auto text-left text-xs sm:text-sm font-sans text-stone-800">
              <div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm mb-1">
                  When is the RSVP deadline?
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Please RSVP by <strong>14th November 2026</strong> — so we know exactly how many hugs, plates, and dance partners to prepare for! 🥂💃
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm mb-1">
                  Is the wedding indoors or outdoors?
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Our wedding ceremony will be held indoors in the hall, the same spot where the reception will happen too. No need to wander off... Just sit tight, eat, dance, and let the love and relief find you! 🥂💃🙌
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm mb-1">
                  Can I bring a date?
                </h3>
                <p className="text-stone-700">
                  Please check your invite for your +1!
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm mb-1">
                  What will the weather be like?
                </h3>
                <p className="text-stone-700">
                  Hopefully cool and breezy.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm mb-1">
                  What should I wear?
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  Colours of the Day are:
                      •
                      Burgundy
                      •
                      Gold
                      •
                      Dusty Rose
                      •
                      Beige
                      •
                      Olive Green•<br></br><br></br>
                  Think Whimsical Elegance! Stylish, romantic, floaty fabrics, soft colours and shoes that won't sink into the lawn (plus your dancing shoes).<br />
                  <em>P.S. Please do not dress "casually".</em>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm mb-1">
                  Are kids welcome?
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  As much as we love your little ones 👶🏽, we will not be including them in the ceremony or reception.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-stone-900 text-xs sm:text-sm mb-1">
                  Whom should I call with questions?
                </h3>
                <p className="text-stone-700">
                  Please call our lovely event planners:<br />
                  <span className="font-medium">Contacts:</span>{" "}
                  <a href="#" className="underline hover:text-black">
                    0810 462 6375<br />
                    0903 305 2748<br />
                    0810 395 9630
                  </a>
                </p>
              </div>
            </div>

            {/* RSVP Form Card */}
            <div id="rsvp" className="max-w-md mx-auto bg-white p-5 sm:p-8 rounded-2xl border border-stone-300/70 shadow-sm mt-8 sm:mt-12">
              <h3 className="font-serif text-xl sm:text-2xl text-center text-[#1A1A1A] mb-4">RSVP</h3>
              {rsvpSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg sm:text-xl text-stone-900">Thank You!</h4>
                  <p className="text-xs text-stone-600">Your RSVP has been submitted successfully.</p>
                  <button
                    onClick={() => setRsvpSubmitted(false)}
                    className="text-xs underline text-stone-500 hover:text-black pt-2"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Guest Name"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-stone-700 mb-1">Attendance</label>
                    <select
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value as "yes" | "no")}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black bg-white text-xs"
                    >
                      <option value="yes">Joyfully Accepts</option>
                      <option value="no">Regretfully Declines</option>
                    </select>
                  </div>

                  {rsvpError && (
                    <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                      {rsvpError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-[#1A1A1A] text-white font-semibold rounded-lg hover:bg-black transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit RSVP"}
                  </button>
                </form>
              )}
            </div>

            {/* Footer */}
            <footer className="pt-8 sm:pt-12 pb-6 border-t border-stone-300/60 text-center space-y-4">
              <p className="font-serif italic text-xl sm:text-2xl text-stone-800">Dan'sJoy</p>
              <div className="flex justify-center items-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-stone-500 font-sans flex-wrap">
                <a href="#home" className="hover:text-stone-800 transition">Guest Help</a>
                <span>•</span>
                <a href="#home" className="hover:text-stone-800 transition">About</a>
                <span></span>
                {/* <button
                  onClick={() => setIsAdminOpen(true)}
                  className="hover:text-stone-800 transition font-medium text-stone-600 underline"
                >
                  Admin Access
                </button> */}
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
      <div className="relative h-48 sm:h-56 w-full bg-stone-900 group overflow-hidden">
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

        {hotel.images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full transition opacity-0 group-hover:opacity-100"
              aria-label="Previous Image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full transition opacity-0 group-hover:opacity-100"
              aria-label="Next Image"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {hotel.images.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === currentIdx ? "bg-white w-3" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4 sm:p-5 space-y-3 font-sans">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="font-bold text-stone-900 text-sm sm:text-base">{hotel.name}</h4>
            <div className="flex items-center gap-1 text-xs text-stone-500 mt-0.5">
              <MapPin size={12} className="text-stone-400" />
              <span>{hotel.distance}</span>
            </div>
          </div>
          <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md text-amber-800 text-xs font-semibold shrink-0">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>{hotel.rating}</span>
          </div>
        </div>

        <p className="text-xs text-stone-600 line-clamp-2">{hotel.description}</p>

        {hotel.price && (
          <div className="p-2.5 bg-stone-50 rounded-lg text-[11px] sm:text-xs text-stone-700 border border-stone-200/60">
            <span className="font-semibold text-stone-900 block mb-0.5">Pricing:</span>
            {hotel.price}
          </div>
        )}

        <div className="pt-2 flex items-center justify-between border-t border-stone-100">
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            {hotel.statusText}
          </span>
          <a
            href={hotel.bookUrl || "#"}
            className="text-xs font-semibold text-stone-900 hover:text-black flex items-center gap-1 hover:underline"
          >
            Book Room <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}