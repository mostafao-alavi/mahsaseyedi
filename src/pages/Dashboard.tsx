import React, { useState, useEffect } from "react";
import { CheckSquare, Square, Play, Download, CheckCircle, Send, ClipboardList, BookOpen, Lock, Shield, User, Star, AlertCircle } from "lucide-react";

export function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientData, setClientData] = useState({
    name: "امیررضا علوی",
    package: "پکیج مربیگری سیستمسازی ۳ ماهه",
    currentWeek: 4,
    streak: 4, // 4 weeks submitted
  });

  // Interactive Checklist State (stored locally)
  const [checklist, setChecklist] = useState([
    { id: 1, text: "تکمیل پرسشنامه اولیه و عارضه‌یابی بالینی مربی", done: true },
    { id: 2, text: "ساخت فضای کار دیجیتال نوشن (Notion HQ) و نصب متدولوژی PARA", done: true },
    { id: 3, text: "مکتوب کردن اولین سند فرآیند کاری استاندارد (SOP خوش‌آمدگویی مراجع)", done: false },
    { id: 4, text: "طراحی مسیر سفر مشتری و خودکارسازی فرم رزرو جلسات", done: false },
    { id: 5, text: "آموزش و مکتوب‌سازی فرآیند تفویض اختیار کارهای تکراری به دستیار", done: false },
  ]);

  // Weekly Evaluation Form State
  const [evaluation, setEvaluation] = useState({
    weekNumber: 4,
    achievements: "",
    blockers: "",
    focusNextWeek: "",
    rating: 5,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleCheck = (id: number) => {
    setChecklist(
      checklist.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!evaluation.achievements || !evaluation.blockers) {
      setError("لطفاً فیلدهای دستاوردهای کلیدی و چالش‌ها را پر کنید.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/evaluations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientData.name,
          ...evaluation,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setFormSubmitted(true);
        setClientData((prev) => ({ ...prev, streak: prev.streak + 1 }));
      } else {
        setError(data.error || "در ثبت ارزیابی خطایی به وجود آمد. مجدداً تلاش کنید.");
      }
    } catch (err) {
      setError("خطای اتصال شبکه. لطفاً دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto bg-[#fdfcf6] border border-[#e5e0d3] rounded-2xl p-8 text-center space-y-6 shadow-xl text-right" dir="rtl">
        <div className="w-16 h-16 bg-[#f0ede4] rounded-full flex items-center justify-center text-[#b8860b] mx-auto border border-[#e5e0d3]">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#1e3a34]">پنل اختصاصی و هوشمند مراجعین</h1>
          <p className="text-xs text-gray-500 leading-relaxed font-sans max-w-sm mx-auto">
            این بخش مخصوص کارآفرینانی است که پکیج‌های مربیگری مهسا سیدی را خریداری کرده‌اند تا جلسات ضبط شده، اسناد SOP و قالب‌های مدیریت پروژه خود را پیگیری کنند.
          </p>
        </div>

        <div className="bg-[#f0ede4] border border-[#e5e0d3] p-4 rounded-xl text-xs text-gray-600 leading-relaxed space-y-2">
          <p className="font-bold text-[#1e3a34] flex items-center gap-1">
            <Shield className="w-4 h-4 text-[#b8860b]" />
            <span>سیستم یکپارچه مربیگری</span>
          </p>
          <p>
            با خرید هر پکیج مربیگری، یک اکانت اختصاصی برای شما صادر می‌شود. برای مشاهده دمو و ارزیابی ویژگی‌های فنی پنل مراجعین، می‌توانید از ورود آزمایشی زیر استفاده کنید.
          </p>
        </div>

        <button
          onClick={handleDemoLogin}
          className="w-full bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] py-3 rounded-lg text-xs font-bold hover:bg-[#25443d] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <User className="w-4 h-4 text-[#b8860b]" />
          <span>ورود آزمایشی به عنوان مراجع دمو (امیررضا علوی)</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-right space-y-12 md:space-y-16" dir="rtl">
      {/* Dashboard Welcome Header */}
      <section className="bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] p-6 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[#b8860b] text-xs font-bold bg-[#2d4a3e] px-3 py-1 rounded-full border border-[#2d4a3e]/10">
            <span>پنل فعال مربیگری سیستمسازی</span>
          </div>
          <h1 className="text-xl md:text-3xl font-extrabold text-[#fdfcf6]">خوش آمدید، {clientData.name} گرانقدر</h1>
          <p className="text-xs text-gray-300 font-sans">{clientData.package} — هفته جاری مربیگری: هفته {clientData.currentWeek}</p>
        </div>

        <div className="flex gap-4 items-center">
          <div className="bg-[#181e1b] p-3 rounded-lg border border-[#2d4a3e] text-center min-w-[80px]">
            <span className="block text-2xl font-bold text-[#b8860b]">{clientData.streak}</span>
            <span className="block text-[9px] text-gray-400 mt-0.5">ارزیابی ثبت‌شده</span>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-xs bg-red-950/20 text-red-400 border border-red-900/30 px-3 py-2 rounded-lg hover:bg-red-950/40 transition-all cursor-pointer"
          >
            خروج از پنل دمو
          </button>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Right column: Roadmap & Resources (RTL: 7 columns) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Interactive Roadmap */}
          <div className="bg-[#fdfcf6] border border-[#e5e0d3] p-6 rounded-xl space-y-4 shadow-sm">
            <h2 className="text-base md:text-lg font-bold text-[#1e3a34] border-b border-[#e5e0d3] pb-2 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-[#b8860b]" />
              <span>نقشه راه مربیگری شما</span>
            </h2>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              این لیست تکالیف و فرآیندهایی است که مهسا سیدی شخصاً برای ارتقای کسب‌وکار شما تنظیم کرده است. با کلیک بر روی هر تسک می‌توانید وضعیت آن را تغییر دهید.
            </p>

            <div className="space-y-3 pt-2">
              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="w-full p-3 rounded-lg border border-[#e5e0d3] bg-[#fdfcf6] hover:bg-[#f0ede4]/40 transition-colors flex items-center justify-between text-right text-xs md:text-sm cursor-pointer"
                >
                  <span className={item.done ? "line-through text-gray-400" : "text-[#1e3a34] font-medium"}>
                    {item.text}
                  </span>
                  {item.done ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Downloadable templates & Resources */}
          <div className="bg-[#fdfcf6] border border-[#e5e0d3] p-6 rounded-xl space-y-4 shadow-sm">
            <h2 className="text-base md:text-lg font-bold text-[#1e3a34] border-b border-[#e5e0d3] pb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#b8860b]" />
              <span>قالب‌های آماده و اسناد اختصاصی</span>
            </h2>
            <p className="text-xs text-gray-500 font-sans">بر روی لینک هر قالب کلیک کنید تا اسناد آماده کپی شده در اختیارتان قرار گیرد:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("لینک قالب نوشن به حافظه موقت کپی شد!"); }}
                className="p-3.5 bg-[#fdfcf6] border border-[#e5e0d3] rounded-lg hover:bg-[#f0ede4] transition-colors flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-[#1e3a34]">قالب مدیریت نوشن (Notion PM)</h4>
                  <p className="text-[10px] text-gray-500 mt-1">طراحی شده بر اساس ساختار PARA</p>
                </div>
                <Download className="w-4 h-4 text-[#b8860b] group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("لینک برد مدیریت دستیار در ترلو کپی شد!"); }}
                className="p-3.5 bg-[#fdfcf6] border border-[#e5e0d3] rounded-lg hover:bg-[#f0ede4] transition-colors flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-[#1e3a34]">برد ترلو پیگیری کارهای دستیار</h4>
                  <p className="text-[10px] text-gray-500 mt-1">تسهیل واگذاری تسک‌های تکراری</p>
                </div>
                <Download className="w-4 h-4 text-[#b8860b] group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("لینک اکسل حسابگر قیمت‌گذاری کپی شد!"); }}
                className="p-3.5 bg-[#fdfcf6] border border-[#e5e0d3] rounded-lg hover:bg-[#f0ede4] transition-colors flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-[#1e3a34]">اکسل فرمول قیمت‌گذاری مراجع</h4>
                  <p className="text-[10px] text-gray-500 mt-1">محاسبه بهای تمام‌شده سودآوری خدمات</p>
                </div>
                <Download className="w-4 h-4 text-[#b8860b] group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert("لینک سند نمونه SOP کپی شد!"); }}
                className="p-3.5 bg-[#fdfcf6] border border-[#e5e0d3] rounded-lg hover:bg-[#f0ede4] transition-colors flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-[#1e3a34]">قالب خام مکتوب‌سازی SOP</h4>
                  <p className="text-[10px] text-gray-500 mt-1">الگوی استاندارد فرآیندنویسی خطی</p>
                </div>
                <Download className="w-4 h-4 text-[#b8860b] group-hover:translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Left column: Weekly Evaluation Form & Recorded sessions (RTL: 5 columns) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Weekly Evaluation Form */}
          <div className="bg-[#f0ede4] border border-[#e5e0d3] p-6 rounded-xl space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-[#1e3a34] border-b border-[#e5e0d3] pb-2">
              ارزیابی هفتگی و ردیابی گلوگاه‌ها
            </h3>

            {formSubmitted ? (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-lg text-center space-y-4 border border-emerald-200">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">ارزیابی هفته {evaluation.weekNumber} با موفقیت ثبت شد!</h4>
                <p className="text-xs leading-relaxed">
                  گزارش پیشرفت شما بلافاصله در گوگل شیت مراجعین آپدیت شد و اعلان آنی آن به اکانت تلگرام مربی ارسال گردید. مهسا پاسخ‌ها را مطالعه کرده و نکات تکمیلی را در جلسه بعدی مطرح خواهد کرد.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-transparent text-[#1e3a34] text-xs font-bold hover:underline cursor-pointer"
                >
                  ثبت ارزیابی جدید یا ویرایش اطلاعات
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                {error && (
                  <div className="bg-red-50 text-red-700 p-2.5 rounded-lg flex items-center gap-1 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="font-bold text-[#1e3a34]">شماره هفته آموزشی مربیگری</label>
                  <select
                    value={evaluation.weekNumber}
                    onChange={(e) => setEvaluation({ ...evaluation, weekNumber: parseInt(e.target.value) })}
                    className="w-full border border-[#e5e0d3] rounded-lg p-2 bg-[#fdfcf6] text-gray-800 outline-none"
                  >
                    <option value={1}>هفته ۱: عارضه‌یابی و نشانه‌شناسی</option>
                    <option value={2}>هفته ۲: بستر دیجیتال و ابزارسازی</option>
                    <option value={3}>هفته ۳: فرآیندنویسی و سند SOP اولیه</option>
                    <option value={4}>هفته ۴: تفویض اختیار و واگذاری کارها</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#1e3a34]">مهم‌ترین دستاوردهای کلیدی این هفته مربیگری چیست؟ <span className="text-red-500">*</span></label>
                  <textarea
                    rows={3}
                    placeholder="مکتوب کنید در ۷ روز گذشته چه گام‌های عملی در راستای سیستمسازی برداشتید..."
                    value={evaluation.achievements}
                    onChange={(e) => setEvaluation({ ...evaluation, achievements: e.target.value })}
                    className="w-full border border-[#e5e0d3] rounded-lg p-2.5 bg-[#fdfcf6] text-gray-800 outline-none resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#1e3a34]">چه گلوگاه‌ها یا چالش‌هایی مانع پیشرفت شما شدند؟ <span className="text-red-500">*</span></label>
                  <textarea
                    rows={3}
                    placeholder="توضیح دهید در کجای فرآیند دچار تردید یا آشفتگی شدید..."
                    value={evaluation.blockers}
                    onChange={(e) => setEvaluation({ ...evaluation, blockers: e.target.value })}
                    className="w-full border border-[#e5e0d3] rounded-lg p-2.5 bg-[#fdfcf6] text-gray-800 outline-none resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#1e3a34]">میزان رضایت کلی شما از پیشرفت شخصی این هفته</label>
                  <div className="flex gap-2 items-center pt-1 justify-between">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => setEvaluation({ ...evaluation, rating: val })}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold font-mono transition-all cursor-pointer ${
                          evaluation.rating === val
                            ? "bg-[#1e3a34] text-[#fdfcf6] border-[#1e3a34]"
                            : "bg-[#fdfcf6] text-gray-500 border-[#e5e0d3] hover:bg-gray-100"
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] py-2.5 rounded-lg font-bold hover:bg-[#25443d] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "در حال ارسال گزارش ارزیابی..." : "ثبت و ارسال گزارش هفتگی به مربی"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Recorded Sessions list */}
          <div className="bg-[#fdfcf6] border border-[#e5e0d3] p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-bold text-[#1e3a34] border-b border-[#e5e0d3] pb-2">
              تاریخچه ویدئوهای جلسات مربیگری
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs p-2 bg-[#f0ede4]/30 rounded border border-[#e5e0d3]/50">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[#1e3a34]">جلسه ۳: نوشن و مدیریت PARA</h4>
                  <p className="text-[10px] text-gray-400">برگزار شده در تاریخ ۱۴ تیر ۱۴۰۲</p>
                </div>
                <button
                  onClick={() => alert("در حال بارگذاری فایل ویدئویی جلسه ضبط شده...")}
                  className="p-1.5 bg-[#fdfcf6] border border-[#e5e0d3] text-[#b8860b] hover:text-[#1e3a34] rounded-full transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs p-2 bg-[#f0ede4]/30 rounded border border-[#e5e0d3]/50">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[#1e3a34]">جلسه ۲: متدولوژی عارضه‌یابی بالینی</h4>
                  <p className="text-[10px] text-gray-400">برگزار شده در تاریخ ۰۷ تیر ۱۴۰۲</p>
                </div>
                <button
                  onClick={() => alert("در حال بارگذاری فایل ویدئویی جلسه ضبط شده...")}
                  className="p-1.5 bg-[#fdfcf6] border border-[#e5e0d3] text-[#b8860b] hover:text-[#1e3a34] rounded-full transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs p-2 bg-[#f0ede4]/30 rounded border border-[#e5e0d3]/50 opacity-60">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-[#1e3a34]">جلسه ۱: معارفه و هدف‌گذاری ۳ ماهه</h4>
                  <p className="text-[10px] text-gray-400">برگزار شده در تاریخ ۳۰ خرداد ۱۴۰۲</p>
                </div>
                <button
                  onClick={() => alert("در حال بارگذاری فایل ویدئویی جلسه ضبط شده...")}
                  className="p-1.5 bg-[#fdfcf6] border border-[#e5e0d3] text-[#b8860b] hover:text-[#1e3a34] rounded-full transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
