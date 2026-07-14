import { motion } from "motion/react";
import { Award, GraduationCap, HeartPulse, ShieldCheck, MapPin, Milestone, TrendingUp } from "lucide-react";

export function About() {
  const timelineEvents = [
    {
      year: "۱۴۰۳ - اکنون",
      title: "دانشگاه تهران - دانشجوی ممتاز دوره MBA",
      institution: "دانشکده مدیریت دانشگاه تهران",
      description: "تمرکز بر تئوری‌های نوین مدیریت، استراتژی‌های رشد کسب‌وکار و بازاریابی مدرن مراجع‌محور.",
    },
    {
      year: "۱۴۰۲ - ۱۴۰۳",
      title: "آژانس تبلیغاتی PAGER",
      role: "مدیر عملیات و طراحی فرآیندهای سیستمی",
      description: "سیستم‌سازی فرآیند تحویل پروژه‌های محتوایی و عملیاتی، کاهش زمان تحویل تا ۳۵٪ و استانداردسازی SOPهای داخلی.",
    },
    {
      year: "۱۴۰۱ - ۱۴۰۲",
      title: "اینباکسینو (Inboxino)",
      role: "توسعه‌دهنده کسب‌وکار و معمار قیف فروش",
      description: "طراحی مسیر سفر مراجع و ساخت سیستم‌های لیدجنریشن خودکار برای سرویس‌های اشتراکی و پکیج‌های گران‌قیمت.",
    },
    {
      year: "۱۴۰۰ - ۱۴۰۱",
      title: "سایکوترید (Psychotrade)",
      role: "کوچ روانشناسی معامله‌گری و مشاور تفکر سیستمی",
      description: "تحلیل الگوهای رفتاری و شناختی معامله‌گران مالی، عارضه‌یابی فرسودگی شغلی و بهینه‌سازی ریسک‌های فردی.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-right space-y-12 md:space-y-16" dir="rtl">
      {/* Introduction Bio */}
      <section className="space-y-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 justify-between">
          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-1.5 text-[#b8860b] text-xs font-bold bg-[#f0ede4] px-3 py-1 rounded-full border border-[#e5e0d3]">
              <HeartPulse className="w-3.5 h-3.5" />
              <span>پزشکِ استراتژی‌های کسب‌وکار</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-[#1e3a34]">داستان تغییر مسیر من: از پزشکی تا تفکر سیستمی</h1>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              من در سال ۱۳۹۸ با مدرک دکتری حرفه‌ای پزشکی (MD) فارغ‌التحصیل شدم. اما اشتیاق عمیق‌تر من در جای دیگری بود: به جای کالبدشکافی بدن انسان، تمایل داشتم سیستم‌های بیجان و خسته کسب‌وکارها را جراحی و احیا کنم.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              این تغییر مسیر، یک فرار از علم نبود؛ بلکه یک تکامل بود. من آموخته بودم که چطور نشانه‌ها را به بیماری مرتبط کنم. این دقیقاً همان متدولوژی است که امروز در حوزه استراتژی و سیستمسازی استفاده می‌کنم. من کسب‌وکار شما را کالبدشکافی می‌کنم، علائم بالینی (مانند زمان کاری بالا، سودآوری پایین، فرسودگی ذهنی و کارهای تکراری) را تحلیل می‌کنم و نسخه اختصاصی رشد را صادر می‌کنم.
            </p>
          </div>

          <div className="relative">
            <div className="w-48 h-48 md:w-60 md:h-60 rounded-2xl bg-[#1e3a34] border-4 border-[#b8860b] flex items-center justify-center text-white text-5xl font-extrabold shadow-xl overflow-hidden relative group">
              {/* Fallback elegant monogram placeholder */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1e3a34] to-[#2d4a3e] flex flex-col items-center justify-center space-y-2">
                <span className="text-[#b8860b] font-serif text-6xl tracking-widest">MS</span>
                <span className="text-xs text-gray-300 font-sans tracking-wide">مهسا سیدی</span>
              </div>
            </div>
            {/* Custom abstract background decor */}
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-[#b8860b]/20 rounded-lg -z-10" />
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#1e3a34]/20 rounded-lg -z-10" />
          </div>
        </div>
      </section>

      {/* Professional Philosophy */}
      <section className="bg-[#f0ede4] rounded-xl border border-[#e5e0d3] p-6 md:p-8 space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#1e3a34]">فلسفه کاری مربی: ساخت سیستم, نه سختکوشی کورکورانه</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div className="space-y-2 border-r-2 border-[#b8860b] pr-4">
            <h3 className="font-bold text-[#1e3a34] flex items-center gap-1.5">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-700" />
              مخالفت با فرهنگ هسل و فرسودگی (Hustle Culture)
            </h3>
            <p className="text-xs leading-relaxed text-gray-600">
              باور رایج این است که کارآفرینی یعنی خوابیدن روی کیبورد و دوری از تفریح. اما من معتقدم کارآمدترین کارآفرینان، آن‌هایی هستند که از طریق سیستم‌ها زمان آزاد خود را خریده‌اند. سیستم کار می‌کند تا شما زندگی کنید.
            </p>
          </div>

          <div className="space-y-2 border-r-2 border-[#b8860b] pr-4">
            <h3 className="font-bold text-[#1e3a34] flex items-center gap-1.5">
              <TrendingUp className="w-4.5 h-4.5 text-emerald-700" />
              پایداری ثروت و آرامش عملیاتی
            </h3>
            <p className="text-xs leading-relaxed text-gray-600">
              یک سیستم قوی ترافیک ارگانیک ورودی تولید می‌کند، رزرو جلسات را بدون چت طولانی اتوماتیک هماهنگ می‌کند و مراجعین را در بستری امن و سازمان‌یافته نگه می‌دارد. این یعنی سودآوری پایدار بدون اضطراب مداوم.
            </p>
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="space-y-8">
        <div className="text-center md:text-right space-y-2">
          <h2 className="text-xl md:text-3xl font-bold text-[#1e3a34] flex items-center gap-2 justify-center md:justify-start">
            <Milestone className="w-6 h-6 text-[#b8860b]" />
            سوابق اجرایی و مسیر توسعه شخصی
          </h2>
          <p className="text-xs md:text-sm text-gray-500">سوابق تحول و مدیریت در آژانس‌ها، کافه‌ها و پلتفرم‌های تکنولوژیک</p>
        </div>

        <div className="relative border-r-2 border-[#e5e0d3] mr-4 md:mr-6 space-y-8 py-4">
          {timelineEvents.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pr-6 group"
            >
              {/* Bullet node */}
              <div className="absolute right-[-7px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#b8860b] border-2 border-[#fdfcf6] group-hover:bg-[#1e3a34] transition-colors" />

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-[#b8860b] tracking-wide font-mono">{event.year}</span>
                <h3 className="text-base md:text-lg font-bold text-[#1e3a34] group-hover:text-[#b8860b] transition-colors">
                  {event.title}
                </h3>
                {event.role && <p className="text-xs font-semibold text-emerald-800">{event.role}</p>}
                {event.institution && <p className="text-xs font-semibold text-emerald-800">{event.institution}</p>}
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-2xl">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Academic Qualifications Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#e5e0d3]">
        <div className="p-5 bg-[#fdfcf6] border border-[#e5e0d3] rounded-lg flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#1e3a34]/5 text-[#b8860b] shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[#1e3a34] text-sm">دانشجوی کارشناسی ارشد MBA دانشگاه تهران</h4>
            <p className="text-xs text-gray-500">دانشکده مدیریت - گرایش عمومی و استراتژی</p>
          </div>
        </div>

        <div className="p-5 bg-[#fdfcf6] border border-[#e5e0d3] rounded-lg flex items-start gap-4">
          <div className="p-3 rounded-lg bg-[#1e3a34]/5 text-[#b8860b] shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[#1e3a34] text-sm">دکتری حرفه‌ای پزشکی عمومی (MD)</h4>
            <p className="text-xs text-gray-500">دانشگاه علوم پزشکی شهید بهشتی - فارغ‌التحصیل ۱۳۹۸</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default About;
