import { useState } from "react";
import { Search, Clock, Calendar, ArrowRight, ArrowLeft, Share2 } from "lucide-react";
import { BlogPost } from "../types";

export function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("همه");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const blogPosts: BlogPost[] = [
    {
      id: "post-1",
      slug: "solopreneur-burnout",
      title: "چرا کارآفرینان تک‌نفره (Solopreneurs) بیشترین آسیب را از فرسودگی شغلی می‌بینند؟",
      excerpt: "تحلیل عمیق تله سخت‌کوشی بدون ساختار و بررسی مکانیزم‌های روانشناسی که فریلنسرهای ارشد را به مرز افسردگی کاری می‌رساند.",
      category: "روانشناسی کارآفرینی",
      date: "۱۸ تیر ۱۴۰۲",
      readTime: "۷ دقیقه مطالعه",
      content: `### تله‌ای به نام «همه کارها را خودم انجام می‌دهم»

در ابتدای مسیر کارآفرینی تک‌نفره یا فریلنسینگ ارشد، همه چیز جذاب به نظر می‌رسد. شما مدیر خودتان هستید، آزادی زمانی دارید و روی کارهایی که دوست دارید متمرکز می‌شوید. اما خیلی زود، واقعیت تلخ خود را نشان می‌دهد:
شما همزمان مدیر بازاریابی، مسئول فروش، متخصص فنی، حسابدار و پشتیبان مراجعین خودتان می‌شوید. اینجاست که **فرسودگی شغلی (Burnout)** آرام‌آرام خزیده و کنترل زندگی شما را به دست می‌گیرد.

### تفاوت خستگی عادی با فرسودگی بالینی

به عنوان یک پزشک، می‌توانم بگویم که فرسودگی شغلی صرفاً نیاز به یک خواب طولانی در آخر هفته نیست. فرسودگی یک اختلال روانی-فیزیولوژیکی ناشی از استرس مزمن و حل‌نشده در محیط کار است. علائم حیاتی آن عبارتند از:
۱. **خستگی عاطفی شدید:** احساس تخلیه انرژی حتی قبل از شروع روز کاری.
۲. **مسخ شخصیت یا بدبینی کاری:** بی‌تفاوتی نسبت به موفقیت پروژه‌ها یا مراجعین.
۳. **کاهش کارآمدی شخصی:** احساس اینکه هر چقدر کار می‌کنید، خروجی مفیدی ندارید.

### گلوگاه اصلی کجا قرار دارد؟

ریشه این بحران، تعهد عاطفی بیش از حد بدون داشتن اسناد عملیاتی و سیستم جذب مشتری است. وقتی سیستم مشخصی برای پروژه‌های خود ندارید، مغز شما دائماً در حالت هشدار (Fight or Flight) قرار دارد چرا که نگران است چیزی از قلم بیفتد.

### ۳ راهکار درمانی فوری برای نجات از آشفتگی

* **گام اول: زمان‌های کاری خود را مرزبندی کنید.** هیچ ایمیل یا پیامی را بعد از ساعت ۷ شب پاسخ ندهید. به مراجعین خود اعلام کنید که سیستم پشتیبانی شما در ساعت‌های خاصی فعال است.
* **گام دوم: فرآیندهای تکراری را مستند کنید.** کارهایی مثل ارسال فاکتور، خوش‌آمدگویی به مشتری یا برنامه‌ریزی تقویم را روی کاغذ بیاورید تا بتوانید در آینده به راحتی آن‌ها را به دستیار واگذار کنید.
* **گام سوم: از ابزارهای مدیریت پروژه متمرکز استفاده کنید.** تلگرام یا واتساپ بستر مدیریت کار نیستند؛ آن‌ها قتلگاه تمرکز شما هستند. پروژه‌ها را به نوشن یا ترلو منتقل کنید تا همیشه بدانید هر کار در چه مرحله‌ای قرار دارد.`,
    },
    {
      id: "post-2",
      slug: "how-to-write-sop",
      title: "راهنمای ۵ مرحله‌ای برای مستندسازی اولین سند فرآیند کاری (SOP)",
      excerpt: "SOP چیست و چطور مکتوب کردن کارهای تکراری روزانه می‌تواند ۱۵ ساعت از وقت هفتگی شما را برای واگذاری به دستیار آزاد کند؟",
      category: "سیستمسازی",
      date: "۱۴ تیر ۱۴۰۲",
      readTime: "۸ دقیقه مطالعه",
      content: `### سند فرآیند کاری استاندارد (SOP) چیست؟

یک **SOP (Standard Operating Procedure)** سند مکتوبی است که گام‌به‌گام نحوه انجام یک کار مشخص تکراری در کسب‌وکار شما را شرح می‌دهد. اگر هر زمان که می‌خواهید کاری را انجام دهید، مجبورید فکر کنید که باید از کجا شروع کنید، یا اگر واگذاری کار به دیگران برایتان سخت است چون فکر می‌کنید هیچکس مثل خودتان آن را انجام نمی‌دهد، شما نیاز فوری به SOP دارید.

### چرا کارآفرینان از مکتوب‌سازی فرار می‌کنند؟

بزرگترین مقاومت ذهنی کارفرما این است: "مکتوب کردن کارها زمان‌بر است، خودم انجامش دهم سریع‌تر است." این بزرگترین دروغی است که ذهن به شما می‌گوید. شما برای انجام یک کار تکراری ۱۰ دقیقه‌ای که در سال ۲۰۰ بار تکرار می‌شود، بیش از ۳۳ ساعت وقت هدر می‌دهید؛ در حالی که مکتوب کردن آن تنها ۳۰ دقیقه زمان نیاز دارد!

### راهنمای ۵ مرحله‌ای برای مکتوب‌سازی اولین SOP

#### ۱. فعالیت‌های تکراری خود را لیست کنید
یک برگه بردارید و تمام کارهایی که در هفته تکرار می‌شوند را بنویسید (مثلاً: ثبت صورت‌حساب، آپلود پادکست، خوش‌آمدگویی به مراجع جدید).

#### ۲. یک فعالیت بسیار ساده را برای شروع انتخاب کنید
با کارهای پیچیده شروع نکنید. کارهای ساده‌تر سریع‌تر مکتوب می‌شوند و به شما انگیزه می‌دهند.

#### ۳. مراحل انجام کار را به زبان ساده بنویسید
فرض کنید این سند را برای یک دانش‌آموز ۱۰ ساله می‌نویسید. گام‌ها باید بسیار شفاف، خطی و بدون ابهام باشند. به عنوان مثال:
* گام اول: وارد پنل مدیریت سایت شوید.
* گام دوم: روی دکمه رزروهای جدید کلیک کنید.
* گام سوم: نام مراجع را کپی کرده و در فایل گوگل شیت ثبت کنید.

#### ۴. از اسکرین‌شات یا ویدئوهای کوتاه ضبط‌شده استفاده کنید
یک تصویر کارسازتر از هزار واژه است. می‌توانید با ابزارهایی مثل Loom یک ویدئوی ۲ دقیقه‌ای از صفحه نمایش خود ضبط کرده و لینک آن را درون سند قرار دهید.

#### ۵. سند را تست و اصلاح کنید
سند را در اختیار یک فرد دیگر (دستیار یا حتی یکی از اعضای خانواده) بگذارید و از او بخواهید کار را طبق سند انجام دهد. هر جا که دچار ابهام شد، سند را اصلاح کنید تا کاملاً شفاف شود.`,
    },
    {
      id: "post-3",
      slug: "notion-business-hq",
      title: "چگونه نوشن (Notion) را به ستاد فرماندهی و سیستم مدیریت پروژه‌هایتان تبدیل کنید؟",
      excerpt: "بررسی الگوهای بهینه‌سازی فضاهای ابری و نحوه پیاده‌سازی متدولوژی PARA برای ساخت یک پورتفولیوی کاری منظم دیجیتال.",
      category: "مدیریت پروژه",
      date: "۰۹ تیر ۱۴۰۲",
      readTime: "۱۰ دقیقه مطالعه",
      content: `### چرا تلگرام و واتساپ قتلگاه مدیریت پروژه هستند؟

بسیاری از فریلنسرها و مدیران پروژه‌ها ترجیح می‌دهند کارهای خود را در چت‌های پراکنده تلگرام، یادداشت‌های موبایل یا دفترچه‌های کاغذی مدیریت کنند. این کار باعث می‌شود اطلاعات مهم در میان پیام‌ها گم شده، مهلت تحویل کارها فراموش شود و ذهن شما دائماً خسته و آشفته بماند.

### ورود به دنیای نوشن (Notion)

ابزار **نوشن (Notion)** فقط یک نرم‌افزار نوت‌برداری ساده نیست؛ بلکه یک بوم خالی فوق‌العاده قدرتمند است که به شما اجازه می‌دهد متناسب با فرآیندهای ذهنی و ساختار کسب‌وکار خودتان، یک سیستم مدیریت کار منحصربه‌فرد طراحی کنید.

### معرفی متدولوژی PARA برای سازمان‌دهی دیجیتال

این متدولوژی که توسط تیاگو فورته طراحی شده، سیستم ذخیره‌سازی اطلاعات شما را به ۴ بخش اصلی تقسیم می‌کند:
۱. **Projects (پروژه‌ها):** کارهایی با مهلت تحویل مشخص و اهداف معین (مثلاً: طراحی سایت کافه ایستا).
۲. **Areas (حوزه‌ها):** مسئولیت‌های مستمری که تاریخ اتمام ندارند اما باید پیگیری شوند (مثلاً: حسابداری، توسعه برند شخصی).
۳. **Resources (منابع):** اطلاعات و مطالب که در آینده به دردتان می‌خورند (مثلاً: قالب‌های آماده قیمت‌گذاری، مقالات خواندنی).
۴. **Archives (آرشیو):** پروژه‌ها و کارهای انجام‌شده که دیگر به آن‌ها نیاز ندارید اما می‌خواهید تاریخچه‌شان حفظ شود.

### پیاده‌سازی گام‌به‌گام نوشن در مربیگری مهسا سیدی

در پکیج سیستمسازی ۳ ماهه، یکی از اقدامات اصلی ما ساخت همین فضای کار دیجیتال متناسب با کسب‌وکار شماست. ما دیتابیس‌های متصل به هم می‌سازیم تا مراجعین شما مستقیماً با کارهایشان، فاکتورهای پرداختی‌شان و جلسات ضبط شده‌شان لینک باشند. این کار یعنی شفافیت مطلق و تسلط کامل بر کسب‌وکار شما.`,
    },
    {
      id: "post-4",
      slug: "automated-content-pipeline",
      title: "سیستم محتوایی خودکار: چطور بدون حضور مداوم در شبکه‌های اجتماعی مشتری جذب کنیم؟",
      excerpt: "چگونه با طراحی قیف‌های فروش ارگانیک و سیستم‌های بازاریابی محتوایی، فروش پکیج‌های مربیگری خود را به جریان بیندازید؟",
      category: "استراتژی محتوا",
      date: "۰۵ تیر ۱۴۰۲",
      readTime: "۹ دقیقه مطالعه",
      content: `### افسانه حضور ۲۴ ساعته در اینستاگرام

یکی از عوامل فرسودگی شدید در کارآفرینان ارشد، باور به این است که برای فروختن خدمات باید دائماً استوری بگذارند، چالش‌های ترند انجام دهند و در تمام شبکه‌های اجتماعی حضور داشته باشند. این کار شما را از یک کارآفرین استراتژیک به یک برده تولید محتوا تبدیل می‌کند.

### ساخت کارخانه تولید محتوا (Content Engine)

به جای تولید محتوای جرقه‌ای و بی‌برنامه، شما نیاز به ساخت یک موتور تولید محتوای سیستماتیک دارید. فرآیندی که ما طراحی می‌کنیم شامل ۳ بخش اساسی است:

#### ۱. دسته‌بندی و برنامه‌ریزی ماهانه (Batching)
به جای اینکه هر روز فکر کنید چه چیزی بنویسید، یک روز در ماه را صرف تحقیق، سناریونویسی و ضبط انبوه محتوا کنید. با این کار، کل محتوای ماه آینده شما در یک روز آماده شده و ذهن شما تا ۳۰ روز آینده کاملاً آزاد است.

#### ۲. ساخت مسیر تبدیل مخاطب (Conversion Funnel)
محتوا صرفاً برای لایک گرفتن نیست؛ بلکه برای هدایت مخاطب به سمت خرید است. هر پست یا مقاله شما باید دارای یک دعوت به اقدام (CTA) واضح باشد: مثلاً هدایت آن‌ها به صفحه تست عارضه‌یابی (/quiz) یا رزرو جلسه معارفه رایگان (/booking).

#### ۳. خودکارسازی فرآیند توزیع محتوا
با ابزارهایی مثل نوتیفیکیشن‌ها، ایمیل مارکتینگ خودکار و ربات‌های هماهنگ‌کننده، پاسخ به دایرکت‌ها و ایمیل‌های مراجعین را خودکار کنید تا فرآیند بدون حضور فیزیکی شما جلو برود. این یعنی درآمد مستمر از سیستم، نه از کار سخت دستی.`,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.includes(searchQuery) ||
      post.excerpt.includes(searchQuery) ||
      post.content.includes(searchQuery);
    const matchesCategory = selectedCategory === "همه" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["همه", "سیستمسازی", "روانشناسی کارآفرینی", "استراتژی محتوا", "مدیریت پروژه"];

  if (activePost) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-right space-y-6" dir="rtl">
        <button
          onClick={() => setActivePost(null)}
          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-[#1e3a34] text-xs font-bold transition-colors cursor-pointer animate-fade-in"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به لیست مقالات</span>
        </button>

        {/* Article Meta */}
        <div className="space-y-4">
          <span className="bg-[#1e3a34]/5 text-[#1e3a34] text-[10px] font-bold px-3 py-1 rounded-full border border-[#2d4a3e]/10">
            {activePost.category}
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#1e3a34] leading-tight">{activePost.title}</h1>
          <div className="flex items-center gap-4 text-xs text-gray-500 font-sans">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {activePost.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {activePost.readTime}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="prose prose-emerald max-w-none pt-6 border-t border-[#e5e0d3] text-gray-700 leading-relaxed font-sans text-sm md:text-base space-y-6">
          {activePost.content.split("\n\n").map((para, idx) => {
            const trimmed = para.trim();
            if (trimmed.startsWith("###")) {
              return (
                <h3 key={idx} className="text-xl font-bold text-[#1e3a34] pt-4 pb-1">
                  {trimmed.replace("###", "").trim()}
                </h3>
              );
            }
            if (trimmed.startsWith("####")) {
              return (
                <h4 key={idx} className="text-lg font-bold text-[#b8860b] pt-2 pb-1">
                  {trimmed.replace("####", "").trim()}
                </h4>
              );
            }
            if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
              return (
                <ul key={idx} className="space-y-2 pr-4 list-disc marker:text-[#b8860b]">
                  {trimmed.split("\n").map((li, i) => (
                    <li key={i} className="text-gray-700">{li.replace(/^[-*]\s*/, "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx} className="text-gray-700 leading-relaxed">{trimmed}</p>;
          })}
        </div>

        {/* Footer actions of reader */}
        <div className="pt-8 border-t border-[#e5e0d3] flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-[#b8860b] hover:text-[#1e3a34] text-xs font-bold transition-all cursor-pointer relative"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? "لینک کپی شد!" : "اشتراک‌گذاری مقاله"}</span>
          </button>

          <button
            onClick={() => setActivePost(null)}
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-[#1e3a34] text-xs font-bold transition-all cursor-pointer"
          >
            <span>مطالعه مقالات دیگر</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-right space-y-12 md:space-y-16" dir="rtl">
      {/* Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1e3a34]">مجله تخصصی استراتژی و سیستمسازی</h1>
        <p className="text-xs md:text-sm text-gray-600">
          مقالات عمیق، علمی و کاربردی درباره مدیریت هوشمند، تفکر سیستمی، روانشناسی مراجعین و رهایی عملیاتی از آشفتگی کارآفرینی
        </p>
      </section>

      {/* Filter and Search controls */}
      <section className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#f0ede4] border border-[#e5e0d3] p-4 rounded-xl">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1e3a34] text-[#fdfcf6]"
                  : "bg-[#fdfcf6] text-gray-600 border border-[#e5e0d3] hover:bg-[#fdfcf6]/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="جستجو در مقالات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-[#e5e0d3] rounded-lg p-2.5 pr-9 bg-[#fdfcf6] text-xs outline-none focus:border-[#b8860b] transition-colors"
          />
          <Search className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-400 text-xs md:text-sm">
            هیچ مقاله‌ای منطبق با جستجو یا دسته‌بندی انتخابی شما پیدا نشد.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-[#fdfcf6] border border-[#e5e0d3] p-6 rounded-xl hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-[#1e3a34]/5 text-[#1e3a34] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-sans">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h2 className="text-base md:text-lg font-extrabold text-[#1e3a34] group-hover:text-[#b8860b] transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 font-sans">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#e5e0d3]/50 mt-6 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-mono">{post.date}</span>
                <span className="inline-flex items-center gap-1 text-[#b8860b] font-bold text-xs group-hover:text-[#1e3a34] transition-colors">
                  <span>مطالعه مقاله تفصیلی</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default Blog;
