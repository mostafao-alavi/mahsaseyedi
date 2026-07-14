import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, HeartPulse, User, Phone, Mail, MapPin, Send, AlertCircle, CheckCircle } from "lucide-react";

// Page Imports
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Packages } from "./pages/Packages";
import { Booking } from "./pages/Booking";
import { Blog } from "./pages/Blog";
import { Quiz } from "./pages/Quiz";
import { Dashboard } from "./pages/Dashboard";

// System Components
import { LogsConsole } from "./components/LogsConsole";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const path = window.location.pathname;
    return ["/", "/about", "/packages", "/booking", "/blog", "/quiz", "/dashboard"].includes(path) ? path : "/";
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Footer Contact Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Parse package query if booking from a package click
  const [selectedPackageFromUrl, setSelectedPackageFromUrl] = useState<string>("");

  const navigateTo = (route: string) => {
    // Check if package is specified in parameters (e.g., booking?package=name)
    if (route.startsWith("/booking?package=")) {
      const parts = route.split("?package=");
      setSelectedPackageFromUrl(decodeURIComponent(parts[1]));
      route = "/booking";
    } else if (route === "/booking") {
      setSelectedPackageFromUrl("");
    }

    window.history.pushState(null, "", route);
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentRoute(["/", "/about", "/packages", "/booking", "/blog", "/quiz", "/dashboard"].includes(path) ? path : "/");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);
    setContactSuccess(false);

    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactError("لطفاً فیلدهای الزامی نام، ایمیل و پیام را تکمیل کنید.");
      return;
    }

    setIsSubmittingContact(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setContactSuccess(true);
        setContactForm({ name: "", company: "", email: "", phone: "", message: "" });
      } else {
        setContactError(data.error || "در ارسال پیام مشکلی به وجود آمد.");
      }
    } catch (err) {
      setContactError("خطای اتصال شبکه. لطفاً ارتباط خود را بررسی کرده و مجدداً امتحان کنید.");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const navLinks = [
    { label: "خانه", path: "/" },
    { label: "درباره من", path: "/about" },
    { label: "پکیج‌های مربیگری", path: "/packages" },
    { label: "رزرو جلسه", path: "/booking" },
    { label: "مجله سیستمسازی", path: "/blog" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfcf6] text-[#2D332F] flex flex-col font-sans" dir="rtl">
      {/* Dynamic Header Navbar */}
      <header className="sticky top-0 z-40 bg-[#fdfcf6]/90 backdrop-blur-md border-b border-[#e5e0d3]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo / Personal Brand */}
          <button
            onClick={() => navigateTo("/")}
            className="flex items-center gap-2 text-right group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1e3a34] border border-[#2d4a3e] flex items-center justify-center text-[#b8860b] font-serif font-extrabold text-lg shadow">
              م
            </div>
            <div>
              <h1 className="text-base md:text-lg font-black text-[#1e3a34] leading-none group-hover:text-[#b8860b] transition-colors">
                مهسا سیدی
              </h1>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide">
                استراتژی، سیستم‌سازی و کوچینگ
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs md:text-sm font-bold text-gray-600">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={`hover:text-[#1e3a34] transition-colors relative py-1.5 cursor-pointer ${
                  currentRoute === link.path ? "text-[#1e3a34]" : ""
                }`}
              >
                <span>{link.label}</span>
                {currentRoute === link.path && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute bottom-0 right-0 left-0 h-0.5 bg-[#b8860b]"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => navigateTo("/dashboard")}
              className="text-xs font-bold text-[#1e3a34] hover:text-[#b8860b] transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5"
            >
              <User className="w-4 h-4" />
              <span>پنل مراجعین</span>
            </button>
            <button
              onClick={() => navigateTo("/quiz")}
              className="bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#25443d] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#b8860b] animate-pulse" />
              <span>تست عارضه‌یابی کسب‌وکار</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-600 hover:text-[#1e3a34] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#fdfcf6] border-t border-[#e5e0d3] overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3 flex flex-col text-right font-bold text-xs">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigateTo(link.path)}
                    className={`py-2 text-gray-600 hover:text-[#1e3a34] text-right block ${
                      currentRoute === link.path ? "text-[#1e3a34] border-r-2 border-[#b8860b] pr-2" : ""
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-[#e5e0d3]/60 flex flex-col gap-2.5">
                  <button
                    onClick={() => navigateTo("/dashboard")}
                    className="w-full text-center py-2.5 rounded-lg text-[#1e3a34] font-bold border border-[#e5e0d3] flex items-center justify-center gap-1.5"
                  >
                    <User className="w-4 h-4" />
                    <span>پنل مراجعین</span>
                  </button>
                  <button
                    onClick={() => navigateTo("/quiz")}
                    className="w-full text-center py-2.5 rounded-lg bg-[#1e3a34] text-[#fdfcf6] font-bold flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                    <span>شروع تست عارضه‌یابی</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentRoute === "/" && <Home onNavigate={navigateTo} />}
            {currentRoute === "/about" && <About />}
            {currentRoute === "/packages" && <Packages onNavigate={navigateTo} />}
            {currentRoute === "/booking" && (
              <Booking onNavigate={navigateTo} selectedPackageFromUrl={selectedPackageFromUrl} />
            )}
            {currentRoute === "/blog" && <Blog />}
            {currentRoute === "/quiz" && <Quiz onNavigate={navigateTo} />}
            {currentRoute === "/dashboard" && <Dashboard />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Automated Logs & Automation Console Widget */}
      <LogsConsole />

      {/* Full Professional Footer with Corporate Request Form */}
      <footer className="bg-[#121614] text-[#fdfcf6] border-t border-[#2d4a3e] pt-16 pb-8 text-right" dir="rtl">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-start pb-12 border-b border-[#2d4a3e]">
          {/* Footer Branding Info (5 columns) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#fdfcf6] border border-[#e5e0d3] flex items-center justify-center text-[#1e3a34] font-serif font-extrabold text-lg shadow">
                م
              </div>
              <div>
                <h3 className="text-lg font-black text-[#b8860b] leading-none">مهسا سیدی</h3>
                <span className="text-[10px] text-gray-400 font-medium">استراتژیست و معمار سیستم‌های کسب‌وکار</span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              با بهره‌گیری از منطق تشخیصی علوم پزشکی و تفکر عارضه‌یابی استراتژیک MBA دانشگاه تهران، ما به فریلنسرهای گران‌قیمت و سولورپرنورها کمک می‌کنیم سیستم‌هایی پایدار بسازند تا بتوانند بدون فدا کردن سلامتی و آرامش خود، رشد و توسعه کسب‌وکار را تجربه کنند.
            </p>
            <div className="space-y-3.5 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-[#b8860b]" />
                <span>paktia96@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-[#b8860b]" />
                <span>دانشکده مدیریت دانشگاه تهران، خیابان جلال آل احمد، تهران، ایران</span>
              </div>
            </div>
          </div>

          {/* Sitemap (3 columns) */}
          <div className="md:col-span-3 space-y-4 text-xs">
            <h4 className="font-bold text-[#b8860b] border-b border-[#2d4a3e] pb-2">دسته‌بندی‌های وب‌سایت</h4>
            <div className="flex flex-col gap-3 font-semibold text-gray-300">
              <button onClick={() => navigateTo("/")} className="text-right hover:text-[#b8860b] transition-colors cursor-pointer">صفحه اصلی</button>
              <button onClick={() => navigateTo("/about")} className="text-right hover:text-[#b8860b] transition-colors cursor-pointer">روایت داستان تحول (درباره من)</button>
              <button onClick={() => navigateTo("/packages")} className="text-right hover:text-[#b8860b] transition-colors cursor-pointer">پکیج‌های خدمات و فروش مستقیم</button>
              <button onClick={() => navigateTo("/booking")} className="text-right hover:text-[#b8860b] transition-colors cursor-pointer">رزرو جلسات مربیگری</button>
              <button onClick={() => navigateTo("/blog")} className="text-right hover:text-[#b8860b] transition-colors cursor-pointer">مجله سیستمسازی</button>
              <button onClick={() => navigateTo("/quiz")} className="text-right text-[#b8860b] hover:underline font-bold cursor-pointer">تست رایگان عارضه‌یابی</button>
            </div>
          </div>

          {/* Corporate Strategy Request Form (4 columns) */}
          <div className="md:col-span-4 bg-[#181e1b] p-5 rounded-xl border border-[#2d4a3e] space-y-4">
            <h4 className="text-xs md:text-sm font-bold text-[#b8860b] border-b border-[#2d4a3e] pb-1.5 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4" />
              <span>درخواست مشاوره سازمانی ویژه</span>
            </h4>
            <p className="text-[10px] text-gray-400">مخصوص مدیران عامل، هلدینگ‌ها و کسب‌وکارهای با پرسنل بالای ۱۰ نفر:</p>

            {contactSuccess ? (
              <div className="bg-emerald-950/40 text-emerald-400 p-4 rounded-lg text-center text-xs space-y-2 border border-emerald-900/30">
                <CheckCircle className="w-8 h-8 mx-auto" />
                <h5 className="font-bold">درخواست شما ارسال شد!</h5>
                <p className="text-[10px]">اطلاعات شما در گوگل شیت سازمانی ثبت گردید و پیام برای مربی فوروارد شد. به زودی با شما تماس می‌گیریم.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                {contactError && (
                  <div className="bg-red-950/40 text-red-400 p-2 rounded flex items-center gap-1 border border-red-900/20">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{contactError}</span>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="نام شما"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-[#121614] border border-[#2d4a3e] rounded p-2 text-gray-200 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="نام شرکت"
                    value={contactForm.company}
                    onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                    className="w-full bg-[#121614] border border-[#2d4a3e] rounded p-2 text-gray-200 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    placeholder="ایمیل شما"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-[#121614] border border-[#2d4a3e] rounded p-2 text-gray-200 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="تلفن تماس"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full bg-[#121614] border border-[#2d4a3e] rounded p-2 text-gray-200 outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="موضوع مشاوره و چالش اصلی سازمان..."
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full bg-[#121614] border border-[#2d4a3e] rounded p-2 text-gray-200 outline-none resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full bg-[#b8860b] text-[#121614] font-bold py-2 rounded hover:bg-[#d4b17f] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingContact ? "در حال ثبت درخواست..." : "ارسال درخواست و اتصال به وب‌هوک"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Brand Copyright */}
        <div className="max-w-6xl mx-auto px-4 pt-6 text-center text-[10px] text-gray-500 font-sans">
          <p>© {new Date().getFullYear()} وب‌سایت رسمی مربیگری و استراتژی مهسا سیدی. تمامی حقوق مادی و معنوی محفوظ است.</p>
          <p className="mt-1 opacity-70">طراحی و اجرا سازگار با معماری لبه Cloudflare Pages / Workers — بهینه‌سازی شده برای بالاترین سرعت لود بدون کاهش کارایی سخت‌افزاری</p>
        </div>
      </footer>
    </div>
  );
}
