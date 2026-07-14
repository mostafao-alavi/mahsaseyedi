import { useState } from "react";
import { Check, Info, ShieldCheck, ArrowLeft, Star, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface PackagesProps {
  onNavigate: (route: string) => void;
}

export function Packages({ onNavigate }: PackagesProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const packagesList = [
    {
      id: "strategy-single",
      title: "مشاوره استراتژی تک‌جلسه‌ای",
      subtitle: "حل گلوگاه‌های بحرانی و گره‌گشایی استراتژیک سریع",
      price: "۴,۹۰۰,۰۰۰ تومان",
      period: "یک جلسه ۹۰ دقیقه‌ای متمرکز",
      description: "مخصوص کارآفرینان و فریلنسرهایی که با یک چالش فوری مثل بحران در سازمان‌دهی پروژه‌ها، قیمت‌گذاری اشتباه یا گره در بازاریابی مواجه هستند.",
      features: [
        "بررسی جامع عارضه‌یابی پیش از جلسه",
        "۹۰ دقیقه جلسه ویدئویی خصوصی تعاملی با مربی",
        "طراحی سند راه‌کار اختصاصی (SOP اولیه بحران)",
        "یک هفته پشتیبانی پیگیری در تلگرام",
        "ضبط کامل جلسه و ارسال فایل برای بازبینی",
      ],
      color: "border-[#e5e0d3]",
      accent: false,
    },
    {
      id: "systematization-three-months",
      title: "پکیج مربیگری سیستمسازی ۳ ماهه",
      subtitle: "تحول کامل ساختار عملیاتی و آزادی زمانی کارفرما",
      price: "۲۹,۰۰۰,۰۰۰ تومان",
      period: "دوره فشرده ۱۲ هفته‌ای",
      badge: "محبوب‌ترین دوره عملیاتی",
      description: "پرچمدار خدمات مربیگری ما. جراحی و بازسازی کامل فرآیندهای کاری شما، مستندسازی دقیق SOPها، استخدام، ساخت فضای کار دیجیتال و خودکارسازی کامل.",
      features: [
        "۱۲ جلسه مربیگری اختصاصی هفتگی (حضوری یا آنلاین)",
        "کالبدشکافی کامل سیستم کاری و عارضه‌یابی تفصیلی",
        "طراحی و پیاده‌سازی فضای کار دیجیتال در نوشن (Notion)",
        "مکتوب‌سازی تا ۲۰ سند فرآیند کاری استاندارد (SOP)",
        "پشتیبانی مستمر و اولویت‌دار مربی در تلگرام (شنبه تا چهارشنبه)",
        "دسترسی VIP به پنل هوشمند مراجع و ارسال ارزیابی‌های هفتگی",
        "قالب‌های آماده مدیریت پروژه، بودجه و تقویم محتوایی اختصاصی",
      ],
      color: "border-[#b8860b] ring-2 ring-[#b8860b]",
      accent: true,
    },
    {
      id: "content-strategy",
      title: "استراتژی محتوا و جذب مراجع",
      subtitle: "ساخت سیستم ارگانیک جذب مخاطب ایده‌آل",
      price: "۱۴,۵۰۰,۰۰۰ تومان",
      period: "دوره فشرده ۶ هفته‌ای مربیگری",
      description: "طراحی مسیر اتوماتیک تولید محتوا و قیف بازاریابی. مخصوص افرادی که در جذب منظم مشتری مشکل دارند و می‌خواهند یک سیستم محتوایی بی‌نیاز از حضور دائم بسازند.",
      features: [
        "۶ جلسه کارگاهی زنده متمرکز بر قیف فروش",
        "شناسایی پرسونا و معماری پیام‌رسانی برند مراجع",
        "ساخت سیستم اتوماتیک ضبط و انتشار منظم محتوا",
        "طراحی لندینگ پیج و فرآیندهای لیدجنریشن",
        "۶ فرم ارزیابی هفتگی و اصلاح مداوم سناریوها",
        "قالب‌های انحصاری تقویم محتوایی و برنامه‌ریزی رسانه",
      ],
      color: "border-[#e5e0d3]",
      accent: false,
    },
  ];

  const comparisonTable = [
    { name: "عارضه‌یابی بالینی کسب‌وکار پیش از شروع", strategy: "پایه", system: "پیشرفته", content: "متمرکز بر بازاریابی" },
    { name: "تعداد جلسات اختصاصی مربیگری", strategy: "۱ جلسه", system: "۱۲ جلسه هفتگی", content: "۶ جلسه مربیگری" },
    { name: "مکتوب‌سازی اسناد SOP استاندارد", strategy: "۱ سند اولیه", system: "تا ۲۰ سند کامل فرآیندی", content: "اسناد بازاریابی محتوا" },
    { name: "ساخت اختصاصی فضای کار نوشن / ترلو", strategy: "خیر", system: "بله، پیاده‌سازی کامل", content: "قالب تقویم محتوا فقط" },
    { name: "مدت زمان پشتیبانی مستقیم مربی در تلگرام", strategy: "۱ هفته", system: "۳ ماه کامل روزانه", content: "۶ هفته فشرده" },
    { name: "دسترسی به پنل اختصاصی مراجعین (داشبورد)", strategy: "خیر", system: "بله، دسترسی دائم", content: "بله، در طول دوره" },
    { name: "فرم ارزیابی هفتگی و رصد مستمر گلوگاه‌ها", strategy: "خیر", system: "بله، هر هفته با فیدبک مربی", systemOnly: true, content: "بله، ارزیابی محتوا" },
  ];

  const faqs = [
    {
      q: "تفاوت مربیگری شما با دوره‌های آموزشی ضبط شده چیست؟",
      a: "این پلتفرم یک مربیگری شخصی (۱-on-۱) کاملاً تعاملی است. ما به جای تئوری، روی کسب‌وکار واقعی شما متمرکز می‌شویم. به همراه خود شما، فایل نوشن می‌سازیم، SOPها را مکتوب می‌کنیم و تا زمانی که سیستم شما مثل ساعت منظم کار نکند، همراهتان هستیم.",
    },
    {
      q: "آیا پکیج ۳ ماهه ضمانت اثربخشی دارد؟",
      a: "بله؛ اگر در پکیج سیستمسازی ۳ ماهه، تمامی تکالیف مکتوب‌سازی و فرآیندها را طبق نقشه راه مربی پیاده کنید اما بعد از ۳ ماه تغییری در کاهش آشفتگی و آزادسازی زمان خود حس نکنید، مربیگری شما تا زمان رسیدن به ثبات به صورت رایگان ادامه خواهد یافت.",
    },
    {
      q: "من مراجع خیلی شلوغی هستم؛ آیا وقتی برای این جلسات دارم؟",
      a: "سیستم‌سازی برای خریدن وقت است. ما ساختار جلسات را بسیار چابک طراحی کرده‌ایم. با صرف تنها ۳ ساعت در هفته برای جلسات و کارهای مرتبط، می‌توانید تا ۱۵ ساعت از هفته آینده خود را سیستمی و آزاد کنید. این یک معامله فوق‌العاده پرسود است.",
    },
    {
      q: "فرآیند هماهنگی و زمان‌بندی جلسات بعد از خرید به چه صورت است؟",
      a: "بلافاصله پس از پرداخت آنلاین یا ثبت درخواست خرید، حساب کاربری شما در پنل مراجعین (/dashboard) فعال می‌شود. سپس به صفحه زمان‌بندی تقویم (/booking) هدایت می‌شوید تا جلسات مربیگری خود را متناسب با زمان‌های خالی مهسا سیدی رزرو و ثبت کنید. پیام تایید آنی در تلگرام نیز برای شما و مربی ارسال می‌شود.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-right space-y-16 md:space-y-24" dir="rtl">
      {/* Page Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1e3a34]">پکیج‌های مربیگری استراتژی و سیستمسازی</h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          فرقی نمی‌کند یک سولورپرنور آشفته باشید یا فریلنسری ارشد که با فرسودگی شغلی روبروست؛ پلن‌های خدمات ما با قیمت‌گذاری کاملاً شفاف و خروجی‌های تضمینی، آزادی زمانی و رشد سودآوری شما را تضمین می‌کنند.
        </p>
      </section>

      {/* Pricing cards grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {packagesList.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-[#fdfcf6] rounded-2xl border flex flex-col p-6 md:p-8 hover:shadow-xl transition-all relative ${pkg.color}`}
          >
            {pkg.badge && (
              <span className="absolute top-4 left-4 bg-[#b8860b] text-[#fdfcf6] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {pkg.badge}
              </span>
            )}
            <div className="space-y-4 pb-6 border-b border-[#e5e0d3]">
              <h2 className="text-xl md:text-2xl font-extrabold text-[#1e3a34]">{pkg.title}</h2>
              <p className="text-xs text-gray-500">{pkg.subtitle}</p>
              <div className="pt-2">
                <span className="text-2xl md:text-3xl font-extrabold text-[#1e3a34]">{pkg.price}</span>
                <span className="text-xs text-gray-500 mr-1">/ {pkg.period}</span>
              </div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed pt-2">{pkg.description}</p>
            </div>

            <div className="flex-1 flex flex-col justify-between pt-6 space-y-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#1e3a34] uppercase tracking-wider">آنچه تحویل می‌گیرید:</h4>
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <Check className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onNavigate(`/booking?package=${encodeURIComponent(pkg.title)}`)}
                className={`w-full py-3 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  pkg.accent
                    ? "bg-[#1e3a34] text-[#fdfcf6] hover:bg-[#25443d] shadow-md"
                    : "bg-[#fdfcf6] text-[#1e3a34] border border-[#e5e0d3] hover:bg-[#f0ede4]"
                }`}
              >
                <span>رزرو و پرداخت آنلاین پکیج</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Service comparison table */}
      <section className="space-y-6 hidden md:block">
        <h3 className="text-xl md:text-2xl font-bold text-[#1e3a34] text-center">جدول مقایسه همه‌جانبه پلن‌های مربیگری</h3>
        <div className="overflow-hidden border border-[#e5e0d3] rounded-xl bg-[#fdfcf6] shadow-sm">
          <table className="w-full text-right border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-[#f0ede4] border-b border-[#e5e0d3] text-[#1e3a34] font-bold">
                <th className="p-4">ویژگی‌ها و جزئیات خدمت</th>
                <th className="p-4">مشاوره تک‌جلسه‌ای</th>
                <th className="p-4">پکیج مربیگری ۳ ماهه</th>
                <th className="p-4">استراتژی محتوا</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e0d3] text-gray-700">
              {comparisonTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#f0ede4]/30 transition-colors">
                  <td className="p-4 font-medium text-[#1e3a34]">{row.name}</td>
                  <td className="p-4">{row.strategy}</td>
                  <td className="p-4 font-semibold text-emerald-950">{row.system}</td>
                  <td className="p-4">{row.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQs section */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-[#1e3a34] text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#b8860b]" />
          سوالات متداول مراجعین
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#e5e0d3] rounded-lg bg-[#fdfcf6] overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
                className="w-full text-right p-4 font-bold text-[#1e3a34] hover:bg-[#f0ede4] transition-colors flex items-center justify-between gap-4 text-xs md:text-sm"
              >
                <span>{faq.q}</span>
                {openFAQ === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#b8860b] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#b8860b] shrink-0" />
                )}
              </button>
              {openFAQ === idx && (
                <div className="p-4 bg-[#f0ede4]/40 border-t border-[#e5e0d3] text-xs md:text-sm text-gray-600 leading-relaxed font-sans">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default Packages;
