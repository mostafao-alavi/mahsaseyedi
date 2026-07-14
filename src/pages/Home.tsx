import { motion } from "motion/react";
import { ArrowLeft, Clock, Zap, Target, BookOpen, ShieldCheck, HeartPulse, UserCheck, Star, Sparkles } from "lucide-react";

interface HomeProps {
  onNavigate: (route: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-20 text-right" dir="rtl">
        {/* Subtle decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#b8860b]/5 rounded-full filter blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#1e3a34]/5 rounded-full filter blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 md:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#f0ede4] border border-[#e5e0d3] px-3.5 py-1.5 rounded-full text-xs text-[#1e3a34] font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>پلتفرم استراتژی، سیستم‌سازی و مربیگری مراجعین ارشد</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#1e3a34] tracking-tight leading-tight md:leading-normal"
          >
            کارِ هوشمندانه و ساخت سیستم،
            <br />
            <span className="text-[#b8860b]">نه سخت‌کوشی کورکورانه</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            من <strong className="text-[#1e3a34] font-semibold">مهسا سیدی</strong> هستم؛ با تلفیق نظم تشخیصی پزشکی (MD)، مهندسی استراتژی کسب‌وکار و تفکر سیستمی MBA دانشگاه تهران، به کارآفرینان تک‌نفره (Solopreneurs) و فریلنسرهای ارشد کمک می‌کنم تا از آشفتگی، فرسودگی شغلی و سقف درآمدی رها شوند.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row-reverse items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => onNavigate("/quiz")}
              className="w-full sm:w-auto bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] px-8 py-3.5 rounded-lg font-bold hover:bg-[#25443d] transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>تست عارضه‌یابی کسب‌وکار (رایگان)</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("/booking")}
              className="w-full sm:w-auto bg-[#fdfcf6] text-[#1e3a34] border border-[#e5e0d3] px-8 py-3.5 rounded-lg font-bold hover:bg-[#f0ede4] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>رزرو جلسه معارفه ۱۵ دقیقه‌ای</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trust & Unique Value Proposition (The Medical Strategy Angle) */}
      <section className="bg-[#f0ede4] border-y border-[#e5e0d3] py-16 text-right" dir="rtl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#fdfcf6] p-8 rounded-xl border border-[#e5e0d3] space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#1e3a34]/5 flex items-center justify-center text-[#b8860b]">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a34]">تشخیص با متدولوژی پزشکی</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                همانند تشخیص بالینی یک پزشک، سیستم کاری شما را کالبدشکافی کرده و به جای پیچیدن نسخه‌های عمومی، گلوگاه اساسی و ریشه آشفتگی و فرسودگی شما را پیدا می‌کنیم.
              </p>
            </div>

            <div className="bg-[#fdfcf6] p-8 rounded-xl border border-[#e5e0d3] space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#1e3a34]/5 flex items-center justify-center text-[#b8860b]">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a34]">ساخت زیرساخت و سیستمسازی</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                طراحی سند‌های فرآیندی (SOP)، پورتفولیوها و فضاهای مدیریت پروژه یکپارچه با نوشن (Notion) یا ترلو تا کسب‌وکار شما حتی در زمان خواب یا غیبت شما هم به کار خود ادامه دهد.
              </p>
            </div>

            <div className="bg-[#fdfcf6] p-8 rounded-xl border border-[#e5e0d3] space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#1e3a34]/5 flex items-center justify-center text-[#b8860b]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1e3a34]">خریدن آزادی زمانی مراجع</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                هدف نهایی ما صرفاً افزایش درآمد نیست؛ بلکه ساخت پلتفرمی است که درآمد شما را از زمان حضور مستقیمتان جدا کند تا زمان و آرامش از دست رفته را مجدداً به دست آورید.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="max-w-6xl mx-auto px-4 text-right" dir="rtl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[#1e3a34]">پکیج‌های مربیگری و خدمات مستقیم</h2>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            پلن‌های درمانی شفاف و سازمان‌یافته برای گذار از یک کسب‌وکار آشفته شخصی به یک سیستم سودآور خودکار
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Package 1 */}
          <div className="bg-[#fdfcf6] rounded-xl border border-[#e5e0d3] overflow-hidden flex flex-col hover:shadow-xl transition-all">
            <div className="p-6 md:p-8 space-y-4 border-b border-[#e5e0d3]">
              <h3 className="text-xl font-extrabold text-[#1e3a34]">مشاوره استراتژی تک‌جلسه‌ای</h3>
              <p className="text-xs text-gray-500 font-mono">طول دوره: یک جلسه متمرکز ۹۰ دقیقه‌ای</p>
              <div className="text-2xl font-bold text-[#b8860b] pt-2">۴,۹۰۰,۰۰۰ تومان</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                گره‌یابی عملیاتی و حل فوری بزرگترین گلوگاه مدیریتی یا استراتژیک در کسب‌وکار شما همراه با سند خروجی.
              </p>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                  <span>آنالیز پیش‌جلسه پرسشنامه تخصصی عارضه‌یابی</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                  <span>طراحی نقشه راه اختصاصی حل بحران</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                  <span>پشتیبانی یک‌هفته‌ای در بستر تلگرام</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate("/booking")}
                className="w-full bg-[#fdfcf6] text-[#1e3a34] border border-[#e5e0d3] py-2.5 rounded-lg font-bold hover:bg-[#f0ede4] transition-all cursor-pointer text-xs"
              >
                رزرو مستقیم جلسه استراتژی
              </button>
            </div>
          </div>

          {/* Package 2 */}
          <div className="bg-[#fdfcf6] rounded-xl border-2 border-[#b8860b] overflow-hidden flex flex-col hover:shadow-2xl transition-all relative">
            <div className="absolute top-4 left-4 bg-[#b8860b] text-[#fdfcf6] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              پیشنهاد مربی
            </div>
            <div className="p-6 md:p-8 space-y-4 border-b border-[#e5e0d3] bg-[#f0ede4]">
              <h3 className="text-xl font-extrabold text-[#1e3a34]">پکیج مربیگری سیستمسازی ۳ ماهه</h3>
              <p className="text-xs text-[#b8860b] font-bold">همراهی گام‌به‌گام تا استقلال کامل کسب‌وکار</p>
              <div className="text-2xl font-bold text-[#1e3a34] pt-2">۲۹,۰۰۰,۰۰۰ تومان</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                سیستم‌سازی عمیق تمام جنبه‌های کسب‌وکار شما. تبدیل شما از یک نیروی اجرایی غرق در کار به یک رهبر ناظر.
              </p>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a34] mt-1.5 shrink-0" />
                  <span>۱۲ جلسه کوچینگ هفتگی (حضوری/آنلاین)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a34] mt-1.5 shrink-0" />
                  <span>طراحی کامل SOPها و پورتفولیوی کاری در نوشن</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a34] mt-1.5 shrink-0" />
                  <span>دسترسی به قالب‌های انحصاری و پنل هوشمند مراجع</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a34] mt-1.5 shrink-0" />
                  <span>پشتیبانی VIP روزانه مربی در تلگرام</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate("/booking")}
                className="w-full bg-[#1e3a34] text-[#fdfcf6] border border-[#2d4a3e] py-2.5 rounded-lg font-bold hover:bg-[#25443d] transition-all cursor-pointer text-xs"
              >
                خرید آنلاین و زمان‌بندی کوچینگ
              </button>
            </div>
          </div>

          {/* Package 3 */}
          <div className="bg-[#fdfcf6] rounded-xl border border-[#e5e0d3] overflow-hidden flex flex-col hover:shadow-xl transition-all">
            <div className="p-6 md:p-8 space-y-4 border-b border-[#e5e0d3]">
              <h3 className="text-xl font-extrabold text-[#1e3a34]">استراتژی محتوا و جذب مراجع</h3>
              <p className="text-xs text-gray-500 font-mono">طول دوره: ۶ هفته فشرده عملیاتی</p>
              <div className="text-2xl font-bold text-[#b8860b] pt-2">۱۴,۵۰۰,۰۰۰ تومان</div>
              <p className="text-xs text-gray-600 leading-relaxed">
                جذب ارگانیک و سیستماتیک مخاطب ایده‌آل و تبدیل او به خریدار وفادار پکیج‌ها بدون اتکا به الگوریتم‌های پرنوسان اینستاگرام.
              </p>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                  <span>۶ جلسه کارگاهی متمرکز بر ساخت قیف فروش</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                  <span>طراحی ساختار پیام‌رسانی و هویت محتوایی برند</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                  <span>فرم‌های ارزیابی و اصلاح هفتگی فرآیند تولید محتوا</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate("/booking")}
                className="w-full bg-[#fdfcf6] text-[#1e3a34] border border-[#e5e0d3] py-2.5 rounded-lg font-bold hover:bg-[#f0ede4] transition-all cursor-pointer text-xs"
              >
                رزرو پکیج استراتژی محتوا
              </button>
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => onNavigate("/packages")}
            className="inline-flex items-center gap-1 text-[#b8860b] hover:text-[#1e3a34] font-bold text-xs transition-colors cursor-pointer"
          >
            <span>مشاهده جزئیات کامل و مقایسه پکیج‌ها</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Case Studies / Testimonials (Niche Focus: Solopreneurs and Freelancers) */}
      <section className="bg-[#f0ede4]/50 rounded-2xl border border-[#e5e0d3] p-8 md:p-12 max-w-6xl mx-auto text-right" dir="rtl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a34]">مراجعین قبلی چه می‌گویند؟</h2>
          <p className="text-xs md:text-sm text-gray-500 max-w-lg mx-auto">
            روایت مراجعینی که از آشفتگی عملیاتی روزانه نجات پیدا کرده و به ثبات سیستماتیک رسیده‌اند.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#fdfcf6] p-6 rounded-xl border border-[#e5e0d3] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[10px] bg-[#1e3a34]/5 text-[#1e3a34] font-bold px-2.5 py-0.5 rounded-full">
                کارآفرین تک‌نفره حوزه مارکتینگ
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              «قبل از کار با مهسا، کسب‌وکار من مثل یک سیاه‌چاله زمانی بود. روزی ۱۳ ساعت کار می‌کردم اما همچنان پروژه‌ها آشفته بودند و کارفرماها ناراضی. جلسات کوچینگ او و مکتوب کردن فرآیندهای SOP زندگی من را زیر و رو کرد. حالا کارها با ترلو و نوشن منظم شده و زمان کاری من نصف، اما درآمدم بیشتر شده است.»
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#1e3a34] text-white font-bold flex items-center justify-center text-xs">
                اح
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1e3a34]">امیرحسین رضوی</h4>
                <p className="text-[10px] text-gray-500">مدیر آژانس بازاریابی دیجیتال</p>
              </div>
            </div>
          </div>

          <div className="bg-[#fdfcf6] p-6 rounded-xl border border-[#e5e0d3] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[10px] bg-[#1e3a34]/5 text-[#1e3a34] font-bold px-2.5 py-0.5 rounded-full">
                طراح ارشد و فریلنسر بین‌المللی
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              «مهسا سیدی یک استراتژیست به معنای واقعی است. تفکر پزشک‌گونه او باعث شد عارضه‌ای را که ماه‌ها بود در قیمت‌گذاری نامنظم کارهایم داشتم تشخیص دهد. قالب‌های آماده نوشن او و سیستم خودکاری که برای ثبت مراجعین جدیدم طراحی کرد، آرامش ذهنی فوق‌العاده‌ای به من بخشیده است.»
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#b8860b] text-[#fdfcf6] font-bold flex items-center justify-center text-xs">
                سد
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1e3a34]">سارا دانشور</h4>
                <p className="text-[10px] text-gray-500">طراح رابط کاربری و فریلنسر آزاد</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styled Logos Grid of Past Cooperations */}
      <section className="max-w-6xl mx-auto px-4 text-center space-y-8 pb-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#b8860b]">سوابق همکاری و تجارب استراتژیک</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-70 grayscale hover:grayscale-0 transition-all">
          <div className="bg-[#f0ede4] border border-[#e5e0d3] px-6 py-4 rounded-lg w-40 text-center font-bold text-gray-700 text-xs tracking-wider">
            کافه ایستا
          </div>
          <div className="bg-[#f0ede4] border border-[#e5e0d3] px-6 py-4 rounded-lg w-40 text-center font-bold text-gray-700 text-xs tracking-wider">
            PAGER Agency
          </div>
          <div className="bg-[#f0ede4] border border-[#e5e0d3] px-6 py-4 rounded-lg w-40 text-center font-bold text-gray-700 text-xs tracking-wider">
            اینباکسینو
          </div>
          <div className="bg-[#f0ede4] border border-[#e5e0d3] px-6 py-4 rounded-lg w-40 text-center font-bold text-gray-700 text-xs tracking-wider">
            سایکوترید
          </div>
        </div>
      </section>
    </div>
  );
}
