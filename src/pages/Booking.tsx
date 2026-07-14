import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle, ArrowRight, User, Mail, Phone, MessageSquare, AlertCircle } from "lucide-react";

interface BookingProps {
  onNavigate: (route: string) => void;
  selectedPackageFromUrl?: string;
}

export function Booking({ onNavigate, selectedPackageFromUrl }: BookingProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    packageName: selectedPackageFromUrl || "مشاوره استراتژی تک‌جلسه‌ای",
    notes: "",
  });

  // Simple scheduler state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<any | null>(null);

  const availableDays = [
    { label: "شنبه", dateStr: "شنبه ۲۴ تیر", isAvailable: true },
    { label: "یکشنبه", dateStr: "یکشنبه ۲۵ تیر", isAvailable: true },
    { label: "دوشنبه", dateStr: "دوشنبه ۲۶ تیر", isAvailable: true },
    { label: "سه‌شنبه", dateStr: "سه‌شنبه ۲۷ تیر", isAvailable: true },
    { label: "چهارشنبه", dateStr: "چهارشنبه ۲۸ تیر", isAvailable: true },
    { label: "پنج‌شنبه", dateStr: "پنج‌شنبه ۲۹ تیر", isAvailable: true },
  ];

  const availableTimes = ["۰۹:۰۰ - ۱۰:۳۰ صبح", "۱۱:۰۰ - ۱۲:۳۰ ظهر", "۱۴:۰۰ - ۱۵:۳۰ عصر", "۱۶:۰۰ - ۱۷:۳۰ عصر", "۱۸:۰۰ - ۱۹:۳۰ غروب"];

  // Update selected package if package changes in URL
  useEffect(() => {
    if (selectedPackageFromUrl) {
      setFormData((prev) => ({ ...prev, packageName: selectedPackageFromUrl }));
    }
  }, [selectedPackageFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email) {
      setError("لطفاً نام و ایمیل خود را وارد کنید.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      setError("لطفاً یک تاریخ و ساعت معتبر را از تقویم زیر انتخاب کنید.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.booking);
      } else {
        setError(data.error || "خطایی در ثبت رزرو پیش آمد. مجدداً تلاش کنید.");
      }
    } catch (err: any) {
      setError("خطا در شبکه. لطفاً اتصال اینترنت خود را بررسی کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-[#fdfcf6] border border-[#e5e0d3] rounded-2xl p-6 md:p-8 text-center space-y-6 shadow-xl" dir="rtl">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-2 border-emerald-500/20">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-extrabold text-[#1e3a34]">جلسه شما با موفقیت رزرو شد!</h2>
          <p className="text-xs text-gray-500">کد رهگیری تراکنش: {success.id}</p>
        </div>

        <div className="bg-[#f0ede4] border border-[#e5e0d3] p-4 rounded-xl text-right space-y-3 text-xs text-gray-700">
          <p><strong>مراجع گرانقدر:</strong> {success.name}</p>
          <p><strong>پکیج انتخابی:</strong> {success.packageName}</p>
          <p><strong>زمان هماهنگ شده:</strong> {success.date} ساعت {success.time}</p>
          <p><strong>ایمیل هماهنگی:</strong> {success.email}</p>
        </div>

        <div className="bg-emerald-950/5 text-emerald-900 p-3 rounded-lg text-xs leading-relaxed text-right border border-emerald-500/10">
          📌 <strong>اتوماسیون فعال شد:</strong> داده‌ها با موفقیت در گوگل شیت و سرور مرکزی ذخیره شدند و پیام تأیید رزرو آنی به اکانت تلگرام مربی ارسال شد. لینک ورود به جلسه ویدئویی گوگل میت به زودی به ایمیل شما ارسال می‌شود.
        </div>

        <div className="flex flex-col gap-2.5 pt-4">
          <button
            onClick={() => onNavigate("/dashboard")}
            className="w-full bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] py-2.5 rounded-lg text-xs font-bold hover:bg-[#25443d] transition-all cursor-pointer"
          >
            ورود به پنل مراجعین و قالب‌های آماده
          </button>
          <button
            onClick={() => {
              setSuccess(null);
              setSelectedDate(null);
              setSelectedTime(null);
            }}
            className="w-full bg-transparent text-gray-500 text-xs py-2 hover:text-[#1e3a34] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>رزرو جلسه جدید</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-right space-y-12 md:space-y-16" dir="rtl">
      {/* Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#1e3a34]">سیستم هماهنگی و زمان‌بندی هوشمند جلسات</h1>
        <p className="text-xs md:text-sm text-gray-600">
          پکیج مورد نظر را انتخاب کرده، زمان دلخواه خود را تعیین کنید و اطلاعات تماس خود را بنویسید تا دستیار خودکار ما بقیه کارهای هماهنگی را انجام دهد.
        </p>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Booking Form Card (Right hand on RTL) */}
        <form onSubmit={handleSubmit} className="md:col-span-7 bg-[#fdfcf6] border border-[#e5e0d3] p-6 rounded-xl space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1e3a34] border-b border-[#e5e0d3] pb-2">فرم اطلاعات مراجع</h2>

          {error && (
            <div className="bg-red-50 text-red-700 p-3.5 rounded-lg text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4.5 h-4.5 shrink-0" />
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-[#e5e0d3] rounded-lg p-2.5 bg-[#fdfcf6] text-gray-800 outline-none focus:border-[#b8860b] transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#1e3a34] flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>تلفن همراه / آیدی تلگرام</span>
              </label>
              <input
                type="text"
                placeholder="مثال: 09123456789 یا @alavi_id"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-[#e5e0d3] rounded-lg p-2.5 bg-[#fdfcf6] text-gray-800 outline-none focus:border-[#b8860b] transition-colors"
              />
            </div>

            {/* Selected Package */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#1e3a34]">پکیج کوچینگ انتخابی</label>
              <select
                value={formData.packageName}
                onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
                className="w-full border border-[#e5e0d3] rounded-lg p-2.5 bg-[#fdfcf6] text-gray-800 outline-none focus:border-[#b8860b] transition-colors"
              >
                <option value="مشاوره استراتژی تک‌جلسه‌ای">مشاوره استراتژی تک‌جلسه‌ای (۴,۹۰۰,۰۰۰ تومان)</option>
                <option value="پکیج مربیگری سیستمسازی ۳ ماهه">پکیج مربیگری سیستمسازی ۳ ماهه (۲۹,۰۰۰,۰۰۰ تومان)</option>
                <option value="استراتژی محتوا و جذب مراجع">استراتژی محتوا و جذب مراجع (۱۴,۵۰۰,۰۰۰ تومان)</option>
                <option value="جلسه معارفه اولیه ۱۵ دقیقه‌ای">جلسه معارفه اولیه ۱۵ دقیقه‌ای (رایگان)</option>
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#1e3a34] flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>بزرگترین چالش فعلی کسب‌وکار شما چیست؟</span>
              </label>
              <textarea
                rows={4}
                placeholder="توضیح دهید در حال حاضر چه بخشی از کار باعث آشفتگی یا خستگی شما می‌شود..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full border border-[#e5e0d3] rounded-lg p-2.5 bg-[#fdfcf6] text-gray-800 outline-none focus:border-[#b8860b] transition-colors resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] py-3 rounded-lg font-bold hover:bg-[#25443d] transition-all cursor-pointer text-xs disabled:opacity-50"
          >
            {isSubmitting ? "در حال ثبت رزرو و ارسال اعلان‌ها..." : "ثبت قطعی رزرو جلسه"}
          </button>
        </form>

        {/* Visual Calendar Selection (Left hand on RTL) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#f0ede4] border border-[#e5e0d3] p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-[#1e3a34] flex items-center gap-1.5 border-b border-[#e5e0d3] pb-2">
              <CalendarIcon className="w-4 h-4 text-[#b8860b]" />
              <span>مرحله ۱: انتخاب روز جلسه</span>
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {availableDays.map((day) => (
                <button
                  type="button"
                  key={day.dateStr}
                  onClick={() => setSelectedDate(day.dateStr)}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    selectedDate === day.dateStr
                      ? "bg-[#1e3a34] text-[#fdfcf6] border-[#1e3a34]"
                      : "bg-[#fdfcf6] text-gray-700 border-[#e5e0d3] hover:bg-[#fdfcf6]/60"
                  }`}
                >
                  <span className="block text-xs font-bold">{day.label}</span>
                  <span className="block text-[10px] opacity-85 mt-1 font-mono">{day.dateStr.split(" ")[1] + " " + day.dateStr.split(" ")[2]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#f0ede4] border border-[#e5e0d3] p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-[#1e3a34] flex items-center gap-1.5 border-b border-[#e5e0d3] pb-2">
              <Clock className="w-4 h-4 text-[#b8860b]" />
              <span>مرحله ۲: انتخاب ساعت جلسه</span>
            </h3>
            <div className="space-y-2">
              {availableTimes.map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`w-full p-2.5 rounded-lg border text-center text-xs transition-all cursor-pointer block ${
                    selectedTime === time
                      ? "bg-[#1e3a34] text-[#fdfcf6] border-[#1e3a34] font-bold"
                      : "bg-[#fdfcf6] text-gray-700 border-[#e5e0d3] hover:bg-[#fdfcf6]/60"
                  }`}
                >
                  <span className="font-mono">{time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Slots Summary Box */}
          <div className="bg-[#fdfcf6] border border-[#e5e0d3] p-4 rounded-xl text-center text-xs text-gray-600">
            {selectedDate && selectedTime ? (
              <p>
                زمان انتخاب شده شما: <strong className="text-[#1e3a34]">{selectedDate}</strong> ساعت{" "}
                <strong className="text-[#1e3a34]">{selectedTime}</strong>
              </p>
            ) : (
              <p className="text-gray-400">لطفاً روز و ساعت حضور خود را از کادرهای بالا انتخاب کنید.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Booking;
