import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ClipboardCheck, Sparkles, HeartPulse, ShieldCheck, Mail, Phone, User, AlertCircle, RefreshCw, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { QuizAnswers, LeadInfo } from "../types";
import { MarkdownView } from "../components/MarkdownView";

interface QuizProps {
  onNavigate: (route: string) => void;
}

export function Quiz({ onNavigate }: QuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
  });

  const [leadInfo, setLeadInfo] = useState<LeadInfo>({
    name: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<string | null>(null);

  const loadingMessages = [
    "در حال کالبدشکافی ساختار زمانی و علائم حیاتی کسب‌وکار شما...",
    "در حال آنالیز بالینی گلوگاه‌های عملیاتی و فرسودگی شغلی شما...",
    "در حال جراحی فرآیندهای تکراری و مکتوب‌نشده...",
    "در حال فرموله‌کردن نسخه استراتژیک و پیشنهاد پکیج توسط هوش مصنوعی مهسا سیدی...",
  ];

  const questions = [
    {
      id: "q1",
      title: "نوع اصلی فعالیت یا ساختار کسب‌وکار شما چیست؟",
      options: [
        { value: "سولورپرنور (کارآفرین تک‌نفره)", label: "سولورپرنور (کارآفرین تک‌نفره - فروش خدمات/محصول)" },
        { value: "فریلنسر ارشد", label: "فریلنسر ارشد (برنامه‌نویس، طراح، بازاریاب ارشد به صورت پروژه‌ای)" },
        { value: "مدیر کسب‌وکار کوچک", label: "مدیر کسب‌وکار کوچک یا استارتاپ (تیم کمتر از ۱۰ نفر)" },
        { value: "سایر مدل‌های کاری", label: "سایر مدل‌های کاری یا در آستانه راه‌اندازی کسب‌وکار" },
      ],
    },
    {
      id: "q2",
      title: "به طور متوسط در طول هفته چند ساعت را به کار اختصاص می‌دهید؟",
      options: [
        { value: "کمتر از ۴۰ ساعت (نسبتاً متعادل)", label: "کمتر از ۴۰ ساعت (زمان کافی برای استراحت دارم)" },
        { value: "بین ۴۰ تا ۶۰ ساعت (شلوغ و پرمشغله)", label: "بین ۴۰ تا ۶۰ ساعت (بیشتر زمانم صرف کار می‌شود)" },
        { value: "بیش از ۶۰ ساعت (در مرز فرسودگی کامل)", label: "بیش از ۶۰ ساعت (خواب آشفته، کار دائم حتی آخر هفته)" },
      ],
    },
    {
      id: "q3",
      title: "چه مقدار از کارهای روزانه شما به فعالیت‌های تکراری و اداری تعلق دارد؟",
      options: [
        { value: "بیش از ۷۰٪ کارها تکراری است", label: "بیش از ۷۰٪ کارها تکراری و فرساینده است" },
        { value: "حدود نیمی از کارها (۵۰٪)", label: "حدود نیمی از کارها تکراری و نیم دیگر خلاقانه است" },
        { value: "کمتر از ۳۰٪ کارهایم تکراری است", label: "بخش عمده کارهایم استراتژیک و منحصر‌به‌فرد است" },
      ],
    },
    {
      id: "q4",
      title: "آیا برای فرآیندهای کاری و اجرای تسک‌های خود سند مکتوب (SOP) دارید؟",
      options: [
        { value: "خیر، هیچ سندی مکتوب نیست", label: "خیر، همه چیز به صورت تجربی در ذهن من است" },
        { value: "تا حدی برای بعضی تسک‌ها مکتوب دارم", label: "تا حدی مکتوب دارم اما ناقص است یا آپدیت نیست" },
        { value: "بله، سیستم فرآیندی مکتوب و منظم دارم", label: "بله، اسناد SOP کامل و مکتوب برای کارها دارم" },
      ],
    },
    {
      id: "q5",
      title: "بزرگترین گلوگاه یا مانع شما در افزایش سودآوری و درآمد چیست؟",
      options: [
        { value: "کمبود شدید زمان", label: "کمبود زمان (سقفی برای پذیرش مشتری جدید دارم)" },
        { value: "عدم جذب منظم مشتریان گران‌قیمت", label: "ضعف در بازاریابی و نداشتن سیستم منظم جذب مراجع" },
        { value: "آشفتگی عملیاتی و تداخل تسک‌ها", label: "آشفتگی تسک‌ها، فراموشی کارها و بی‌نظمی در تحویل" },
        { value: "عدم ثبات قیمت‌گذاری", label: "ترس از افزایش قیمت و نداشتن ساختار قیمت‌گذاری شفاف" },
      ],
    },
    {
      id: "q6",
      title: "وضعیت تعادل بین زندگی شخصی و کار (Work-Life Balance) شما چگونه است؟",
      options: [
        { value: "عالی و رضایت‌بخش", label: "عالی؛ برای ورزش، خانواده و تفریح زمان کافی دارم" },
        { value: "نسبتاً آشفته و پرنوسان", label: "نسبتاً آشفته؛ زمان استراحت من مدام قربانی کار می‌شود" },
        { value: "کاملاً فرسوده و غرق در کار", label: "کاملاً فرسوده؛ تفریح و آرامش را به طور کامل فراموش کرده‌ام" },
      ],
    },
    {
      id: "q7",
      title: "برای مدیریت پروژه‌ها، تسک‌ها و مراجعین از چه ابزاری استفاده می‌کنید؟",
      options: [
        { value: "نرم‌افزارهای مدرن مثل نوشن/ترلو", label: "نرم‌افزارهای مدرن مثل نوشن (Notion)، ترلو یا کلیک‌آپ" },
        { value: "دفترچه، نوت موبایل یا چت شخصی تلگرام", label: "دفترچه یادداشت، نوت گوشی یا ارسال پیام به خودم در تلگرام" },
        { value: "به صورت کاملاً پراکنده و ذهنی", label: "سیستم خاصی ندارم، بیشتر به حافظه تکیه می‌کنم" },
      ],
    },
    {
      id: "q8",
      title: "فرآیند جذب مشتری جدید و بازاریابی محتوایی شما چقدر ساختاریافته است؟",
      options: [
        { value: "کاملاً سیستماتیک و خودکار", label: "سیستم ارگانیک و خودکار دارم که مراجع دائمی می‌آورد" },
        { value: "تفننی، تفننی و جرقه‌ای", label: "هروقت وقت آزاد داشته باشم استوری می‌گذارم یا پست می‌نویسم" },
        { value: "فقط متکی به معرفی شفاهی مراجعین", label: "معرفی شفاهی (Word of Mouth) تنها منبع جذب من است" },
      ],
    },
    {
      id: "q9",
      title: "چقدر آماده سرمایه‌گذاری زمانی و مالی برای ایجاد تحول و سیستمی‌سازی هستید؟",
      options: [
        { value: "کاملاً آماده برای ایجاد تحول اساسی", label: "کاملاً آماده‌ام؛ حاضرم وقت بگذارم و سیستم پایدار بسازم" },
        { value: "آماده برای تغییرات کوچک و گام‌به‌گام", label: "آماده‌ام اما ترجیح می‌دهم تغییرات کوچک و تدریجی باشد" },
        { value: "در حال حاضر فقط قصد ارزیابی دارم", label: "فقط می‌خواهم بدانم اشکال کارم در کجاست و فعلاً برنامه‌ای ندارم" },
      ],
    },
  ];

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 150);
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!leadInfo.name || !leadInfo.email) {
      setError("لطفاً فیلدهای الزامی نام و ایمیل را تکمیل کنید.");
      return;
    }

    setIsLoading(true);
    setLoadingStep(0);

    // Simulated staggered loading message steps for UX
    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 3000);

    try {
      const response = await fetch("/api/quiz/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          leadInfo,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReport(data.analysis);
      } else {
        setError(data.error || "در فرآیند تحلیل عارضه‌یابی خطایی رخ داد. لطفاً مجدداً امتحان کنید.");
      }
    } catch (err: any) {
      setError("خطا در ارتباط با سرور. لطفاً از اتصال صحیح اینترنت اطمینان حاصل کرده و دوباره دکمه دریافت تحلیل را بزنید.");
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAnswers({
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
      q6: "",
      q7: "",
      q8: "",
      q9: "",
    });
    setLeadInfo({ name: "", email: "", phone: "" });
    setReport(null);
    setError(null);
  };

  // Render Loader View
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto bg-[#fdfcf6] border border-[#e5e0d3] rounded-2xl p-8 text-center space-y-6 shadow-xl" dir="rtl">
        <div className="w-16 h-16 rounded-full border-4 border-t-[#b8860b] border-[#e5e0d3] animate-spin mx-auto" />
        <h2 className="text-lg md:text-xl font-extrabold text-[#1e3a34] flex items-center justify-center gap-1.5">
          <HeartPulse className="w-5 h-5 text-[#b8860b] animate-pulse" />
          <span>پزشکِ استراتژی در حال معاینه...</span>
        </h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs md:text-sm text-gray-600 leading-relaxed min-h-[50px] font-sans"
          >
            {loadingMessages[loadingStep]}
          </motion.p>
        </AnimatePresence>
        <div className="w-full bg-[#e5e0d3] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#1e3a34] h-full transition-all duration-1000"
            style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  // Render AI Report Diagnostics View
  if (report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-right space-y-8" dir="rtl">
        <div className="bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#b8860b] flex items-center justify-center text-[#fdfcf6]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-extrabold">نسخه درمانی و تحلیل استراتژیک صادر شد</h1>
              <p className="text-[10px] text-gray-300">طراحی شده توسط هوش مصنوعی اختصاصی پلتفرم مربیگری مهسا سیدی</p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-sans">
            مراجع گرامی، <strong>{leadInfo.name}</strong>؛ پاسخ‌های شما به پرسشنامه عارضه‌یابی کسب‌وکار نشان‌دهنده گلوگاه‌های ساختاری عمیقی است. گزارش زیر حاصل بررسی پارامترهای عملیاتی شما با متدولوژی تشخیصی پزشکی و استراتژی سیستمی دانشگاه تهران است.
          </p>
        </div>

        {/* AI Report Markdown */}
        <div className="bg-[#fdfcf6] border border-[#e5e0d3] p-6 md:p-8 rounded-2xl shadow-sm space-y-4">
          <MarkdownView content={report} />
        </div>

        {/* Suggested Package / Action Box */}
        <div className="bg-[#f0ede4] border-2 border-[#b8860b] p-6 rounded-xl space-y-4 text-center">
          <h3 className="text-lg font-bold text-[#1e3a34]">آیا آماده پیاده‌سازی گام‌به‌گام این نسخه درمانی هستید؟</h3>
          <p className="text-xs text-gray-600 max-w-xl mx-auto">
            بهترین مسیر برای رها شدن عملی از این فرسودگی و منظم کردن کارهای تکراری شما، رزرو یک جلسه مربیگری اختصاصی با مهسا سیدی است. ما اسناد SOP شما را طراحی کرده و فضای کار دیجیتال نوشن شما را با هم می‌سازیم.
          </p>
          <div className="flex flex-col sm:flex-row-reverse gap-3 justify-center pt-2">
            <button
              onClick={() => onNavigate("/booking")}
              className="bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-[#25443d] transition-all cursor-pointer"
            >
              رزرو جلسه مربیگری بر اساس نسخه درمانی
            </button>
            <button
              onClick={resetQuiz}
              className="bg-[#fdfcf6] text-gray-700 border border-[#e5e0d3] px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-[#f0ede4] transition-all cursor-pointer"
            >
              شروع مجدد تست عارضه‌یابی
            </button>
          </div>
        </div>

        <div className="bg-emerald-950/5 text-emerald-900 border border-emerald-500/10 p-3 rounded-lg text-xs leading-relaxed">
          🔒 <strong>اعلان همگام‌سازی:</strong> گزارش تشخیصی با موفقیت در پایگاه داده مراجعین مکتوب شد، به گوگل شیت ارسال گردید و ربات تلگرام مربی را از تمایل به شروع سیستمسازی آگاه ساخت.
        </div>
      </div>
    );
  }

  // Render Wizard Steps
  const isQuestionStep = step <= questions.length;
  const currentQuestion = questions[step - 1];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-right" dir="rtl">
      {/* Header and Step counter */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-1.5 text-[#b8860b] text-xs font-bold bg-[#f0ede4] px-3 py-1 rounded-full border border-[#e5e0d3]">
          <ClipboardCheck className="w-3.5 h-3.5" />
          <span>تست آنلاین عارضه‌یابی کسب‌وکار تک‌نفره</span>
        </div>
        <h1 className="text-xl md:text-3xl font-extrabold text-[#1e3a34]">تست تشخیص گلوگاه‌های سیستمی</h1>
        <p className="text-xs text-gray-500 font-sans max-w-md mx-auto leading-relaxed">
          با پاسخ به ۹ سوال کلیدی و مکتوب کردن اطلاعات تماس، گزارش تحلیلی عمیقی از وضعیت کسب‌وکار خود و نسخه درمانی ۳ مرحله‌ای رفع آشفتگی را دریافت کنید.
        </p>

        {/* Progress bar */}
        <div className="pt-4 max-w-xs mx-auto">
          <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5 font-mono">
            <span>مرحله {step} از {questions.length + 1}</span>
            <span>{Math.round((step / (questions.length + 1)) * 100)}% تکمیل شده</span>
          </div>
          <div className="w-full bg-[#e5e0d3] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#1e3a34] h-full transition-all duration-300"
              style={{ width: `${(step / (questions.length + 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#fdfcf6] border border-[#e5e0d3] p-6 md:p-8 rounded-2xl shadow-sm">
        {isQuestionStep ? (
          /* Question View */
          <div className="space-y-6">
            <h2 className="text-base md:text-lg font-extrabold text-[#1e3a34] leading-normal">
              {currentQuestion.title}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = (answers as any)[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelectOption(currentQuestion.id, option.value)}
                    className={`w-full p-3.5 rounded-xl border text-right text-xs md:text-sm transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#1e3a34] text-[#fdfcf6] border-[#1e3a34] font-bold"
                        : "bg-[#fdfcf6] text-gray-700 border-[#e5e0d3] hover:bg-[#f0ede4]/60"
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Check className="w-4.5 h-4.5 text-[#b8860b] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Back button */}
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1 text-gray-400 hover:text-[#1e3a34] text-xs font-bold transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>قبلی</span>
              </button>
            )}
          </div>
        ) : (
          /* Lead Capture Step (Step 10) */
          <form onSubmit={handleQuizSubmit} className="space-y-6">
            <div className="space-y-2 border-b border-[#e5e0d3] pb-4">
              <h2 className="text-base md:text-lg font-bold text-[#1e3a34]">آخرین قدم: مشخصات برای صدور نسخه</h2>
              <p className="text-xs text-gray-500 leading-normal">
                مشخصات خود را مکتوب کنید تا تحلیل عارضه‌یابی به نام شما ثبت شده و نسخه درمانی تفصیلی کسب‌وکار شما با هوش مصنوعی صادر گردد.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4 text-xs md:text-sm">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#1e3a34] flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>نام و نام خانوادگی <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: امیررضا علوی"
                  value={leadInfo.name}
                  onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                  className="w-full border border-[#e5e0d3] rounded-lg p-2.5 bg-[#fdfcf6] text-gray-800 outline-none focus:border-[#b8860b] transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#1e3a34] flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>آدرس ایمیل <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="مثال: client@example.com"
                  value={leadInfo.email}
                  onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                  className="w-full border border-[#e5e0d3] rounded-lg p-2.5 bg-[#fdfcf6] text-gray-800 outline-none focus:border-[#b8860b] transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#1e3a34] flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span>تلفن همراه (تلگرام / واتساپ)</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: 09123456789"
                  value={leadInfo.phone}
                  onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                  className="w-full border border-[#e5e0d3] rounded-lg p-2.5 bg-[#fdfcf6] text-gray-800 outline-none focus:border-[#b8860b] transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1 text-gray-400 hover:text-[#1e3a34] text-xs font-bold transition-all cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>برگشت به سوالات</span>
              </button>

              <button
                type="submit"
                className="bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] px-8 py-2.5 rounded-lg text-xs font-bold hover:bg-[#25443d] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>دریافت تحلیل و صدور نسخه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
export default Quiz;
