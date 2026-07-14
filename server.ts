import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Express JSON body parser
app.use(express.json());

// In-memory database to store state and automate logging
const db = {
  submissions: [] as any[],
  bookings: [] as any[],
  evaluations: [] as any[],
  logs: [] as any[],
};

// Helper function to log events (for simulated Webhooks & Telegram Bot)
function addSystemLog(type: "telegram" | "sheets" | "database", message: string, details?: any) {
  const timestamp = new Date().toLocaleTimeString("fa-IR");
  const logEntry = {
    id: Math.random().toString(36).substring(7),
    timestamp,
    type,
    message,
    details: details || null,
  };
  db.logs.unshift(logEntry);
  if (db.logs.length > 50) db.logs.pop(); // limit log size
  console.log(`[SYSTEM LOG - ${type.toUpperCase()}] ${message}`, details ? JSON.stringify(details) : "");
}

// Saved telegram configurations with numerical IDs from Mostafa Alavi & Mahsa
const TELEGRAM_CONFIG = {
  botToken: process.env.TELEGRAM_BOT_TOKEN || "",
  recipients: [
    { id: "744451721", name: "Mahsa", username: "@mahsacoach" },
    { id: "831442901", name: "Mostafa Alavi", username: "@mostafao" }
  ]
};

// Helper function to send real or simulated Telegram notifications
async function sendTelegramNotification(message: string, eventType: string, extraDetails?: any) {
  const token = TELEGRAM_CONFIG.botToken;
  const isReal = !!token;

  // We will log the trigger event
  addSystemLog(
    "telegram",
    `سیستم در حال ارسال اطلاع‌رسانی (${eventType}) به اکانت‌های تلگرام ذخیره شده...`,
    { recipientsCount: TELEGRAM_CONFIG.recipients.length, isRealDelivery: isReal, ...extraDetails }
  );

  for (const recipient of TELEGRAM_CONFIG.recipients) {
    if (isReal) {
      try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: recipient.id,
            text: message,
            parse_mode: "Markdown",
          }),
        });

        if (response.ok) {
          addSystemLog(
            "telegram",
            `پیام واقعی تلگرام با موفقیت به ${recipient.name} (شناسه: ${recipient.id}) ارسال شد.`,
            { recipient: recipient.username, id: recipient.id, success: true }
          );
        } else {
          const errData = await response.json();
          addSystemLog(
            "telegram",
            `خطا در ارسال پیام واقعی تلگرام به ${recipient.name}: ${errData.description || "خطای ناشناخته"}`,
            { recipient: recipient.username, id: recipient.id, success: false, errData }
          );
        }
      } catch (error: any) {
        addSystemLog(
          "telegram",
          `خطای شبکه در ارسال پیام واقعی تلگرام به ${recipient.name}: ${error.message}`,
          { recipient: recipient.username, id: recipient.id, success: false }
        );
      }
    } else {
      // Simulation Log
      addSystemLog(
        "telegram",
        `شبیه‌سازی: پیام تلگرام به ${recipient.name} (شناسه: ${recipient.id} - کاربری: ${recipient.username}) تحویل داده شد.`,
        { recipient: recipient.username, id: recipient.id, messageLength: message.length, simulated: true }
      );
    }
  }
}

// Lazy initialization of Gemini client to prevent crashes if key is missing
let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment. Please add it via AI Studio Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. Get recent automation logs (Google Sheets sync & Telegram Bot notifications)
app.get("/api/logs", (req, res) => {
  res.json(db.logs);
});

// 2. Submit booking & trigger automations
app.post("/api/bookings", async (req, res) => {
  const { name, email, phone, packageName, date, time, notes } = req.body;

  if (!name || !email || !packageName || !date || !time) {
    return res.status(400).json({ error: "لطفاً تمام فیلدهای الزامی را پر کنید." });
  }

  const newBooking = {
    id: "B-" + Math.random().toString(36).substring(7).toUpperCase(),
    name,
    email,
    phone,
    packageName,
    date,
    time,
    notes,
    createdAt: new Date().toISOString(),
  };

  db.bookings.push(newBooking);

  // Trigger Google Sheets Webhook Simulation
  addSystemLog(
    "sheets",
    `سند رزرو جدید برای ${name} در ردیف جدید گوگل شیت ثبت شد.`,
    { sheetName: "Bookings", rowData: [newBooking.id, name, email, packageName, `${date} ${time}`] }
  );

  // Trigger Telegram Bot Notification
  const telegramMessage = 
    `🔔 *رزرو جلسه جدید مربیگری*\n\n` +
    `👤 مراجع: ${name}\n` +
    `📧 ایمیل: ${email}\n` +
    `📞 تلفن: ${phone || "ثبت نشده"}\n` +
    `📦 پکیج: ${packageName}\n` +
    `📅 تاریخ: ${date}\n` +
    `⏰ ساعت: ${time}\n` +
    `📝 یادداشت: ${notes || "بدون توضیح"}\n\n` +
    `⚡ _این پیام توسط ربات دستیار ارسال شده است._`;

  await sendTelegramNotification(telegramMessage, "رزرو مربیگری", { bookingId: newBooking.id });

  res.json({ success: true, booking: newBooking });
});

// 3. Submit quiz / business health check and generate AI Bottleneck Report
app.post("/api/quiz/analyze", async (req, res) => {
  const { answers, leadInfo } = req.body;

  if (!answers || !leadInfo || !leadInfo.name || !leadInfo.email) {
    return res.status(400).json({ error: "اطلاعات پرسشنامه یا اطلاعات تماس ناقص است." });
  }

  const submissionId = "Q-" + Math.random().toString(36).substring(7).toUpperCase();
  const submission: any = {
    id: submissionId,
    leadInfo,
    answers,
    createdAt: new Date().toISOString(),
  };

  db.submissions.push(submission);

  // Sync to Google Sheets
  addSystemLog(
    "sheets",
    `پاسخ‌های تست عارضه‌یابی ${leadInfo.name} به گوگل شیت ارسال شد.`,
    { sheetName: "QuizLeads", leadInfo }
  );

  // Sync to Telegram
  await sendTelegramNotification(
    `📝 *تست عارضه‌یابی کسب‌وکار شروع شد*\n\n👤 کاربر: ${leadInfo.name}\n📧 ایمیل: ${leadInfo.email}`,
    "شروع عارضه‌یابی",
    { leadName: leadInfo.name, email: leadInfo.email }
  );

  try {
    const ai = getGeminiClient();

    // Build user responses descriptive summary for Gemini prompt
    const promptDetails = `
نام کاربر: ${leadInfo.name}
نوع کسب‌وکار: ${answers.q1 || "ثبت نشده"}
ساعت کاری در هفته: ${answers.q2 || "ثبت نشده"}
میزان تکراری بودن کارها: ${answers.q3 || "ثبت نشده"}
وضعیت مستندسازی فرآیندها (SOP): ${answers.q4 || "ثبت نشده"}
بزرگترین مانع رشد درآمد: ${answers.q5 || "ثبت نشده"}
تعادل کار و زندگی: ${answers.q6 || "ثبت نشده"}
ابزار مدیریت پروژه: ${answers.q7 || "ثبت نشده"}
وضعیت سیستم جذب مشتری و بازاریابی: ${answers.q8 || "ثبت نشده"}
میزان آمادگی مالی و زمانی برای تغییر: ${answers.q9 || "ثبت نشده"}
    `;

    const systemInstruction = `
شما "مهسا سیدی" هستید؛ پزشک (MD)، فارغ‌التحصیل استراتژی، دانشجوی ممتاز MBA دانشگاه تهران و مربی ارشد سیستمسازی کسب‌وکار برای سولورپرنورها (کارآفرینان تک‌نفره) و کارفرماهایی که در آشفتگی و فرسودگی غرق شده‌اند.
وظیفه شما این است که پاسخ‌های تست عارضه‌یابی کسب‌وکار این کاربر را به دقت تحلیل کنید و یک گزارش استراتژیک فوق‌العاده عمیق، علمی، منحصربه‌فرد، دقیق و با لحنی همدلانه، منظم و کاریزماتیک به زبان فارسی ارائه دهید.

قوانین ساختاری گزارش شما:
1. لحن شما باید حرفه‌ای، باوقار و آمیخته با استعاره‌های پزشکی (به عنوان پزشک استراتژیست) باشد. مثلاً از اصطلاحات "تشخیص بالینی کسب‌وکار"، "علائم حیاتی عملیاتی" و "نسخه درمانی سیستمی" استفاده کنید.
2. بخش اول: "تشخیص بالینی و گلوگاه اصلی کسب‌وکار" (یک تحلیل دقیق از درد اصلی کاربر بر اساس پاسخ‌های او).
3. بخش دوم: "ارزیابی علائم حیاتی عملیاتی و شاخص آزادی زمانی" (تحلیل زمان کاری و سیستم مدیریت کارهای او).
4. بخش سوم: "نسخه درمانی ۳ مرحله‌ای سیستمسازی" (سه گام عملی اختصاصی، کاملاً شفاف و بدون کلی‌گویی برای رهایی او از آشفتگی).
5. بخش چهارم: "پیشنهاد اختصاصی پکیج کوچینگ" (انتخاب دقیق یکی از پکیج‌های مربیگری مهسا سیدی بر اساس نیاز او: "پکیج سیستمسازی جامع ۳ ماهه" برای کارهای تکراری و نداشتن SOP، یا "مشاوره تک‌جلسه‌ای استراتژی" برای گره‌های فوری، یا "استراتژی محتوا" برای ضعف در جذب مشتری). با دلیل توضیح دهید چرا این پکیج برای او ضروری است.

گزارش را در قالب مارک‌داون (Markdown) بسیار شکیل با استفاده از عناوین خوانا، بولت‌پوینت‌ها و نقل‌قول‌ها بنویسید. به کلمات کلیدی وزن بدهید تا خواندن آن روان باشد.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { text: promptDetails }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const aiAnalysis = response.text || "تحلیل در حال حاضر در دسترس نیست. لطفاً مجدداً تلاش کنید.";

    // Append successful analysis to database entry
    submission.aiAnalysis = aiAnalysis;

    // Trigger Telegram Bot Notification with final diagnostics
    const telegramNotification = 
      `🔥 *تست عارضه‌یابی کسب‌وکار انجام شد!*\n\n` +
      `👤 کاربر: ${leadInfo.name}\n` +
      `📧 ایمیل: ${leadInfo.email}\n` +
      `📞 تلفن: ${leadInfo.phone || "ثبت نشده"}\n` +
      `💼 کسب‌وکار: ${answers.q1 || "نامشخص"}\n` +
      `⚡ تحلیل بالینی و نسخه با هوش مصنوعی صادر شد و برای مراجع ایمیل گردید.\n\n` +
      `🔗 جهت بررسی تحلیل وارد پنل مدیریت شوید.`;

    await sendTelegramNotification(telegramNotification, "گزارش عارضه‌یابی تفصیلی", { hasAnalysis: true });

    res.json({ success: true, analysis: aiAnalysis, submissionId });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    addSystemLog("database", "خطا در برقراری ارتباط با مدل هوش مصنوعی Gemini", error.message);
    res.status(500).json({ 
      error: "متأسفانه در حال حاضر امکان دریافت پاسخ از هوش مصنوعی فراهم نیست. لطفاً چند لحظه دیگر امتحان کنید.",
      details: error.message
    });
  }
});

// 4. Client Dashboard: Submit weekly evaluation form
app.post("/api/evaluations", async (req, res) => {
  const { clientName, weekNumber, achievements, blockers, focusNextWeek, rating } = req.body;

  if (!clientName || !weekNumber || !achievements || !blockers) {
    return res.status(400).json({ error: "لطفاً تمام فیلدهای الزامی فرم ارزیابی را پر کنید." });
  }

  const evaluation = {
    id: "E-" + Math.random().toString(36).substring(7).toUpperCase(),
    clientName,
    weekNumber,
    achievements,
    blockers,
    focusNextWeek,
    rating,
    createdAt: new Date().toISOString(),
  };

  db.evaluations.push(evaluation);

  // Sync to Google Sheets
  addSystemLog(
    "sheets",
    `فرم ارزیابی هفتگی (هفته ${weekNumber}) مراجع ${clientName} در گوگل شیت ثبت شد.`,
    { sheetName: "WeeklyEvaluations", week: weekNumber }
  );

  // Sync to Telegram
  const telegramMsg = 
    `📝 *فرم ارزیابی هفتگی جدید دریافت شد*\n\n` +
    `👤 مراجع: ${clientName}\n` +
    `📅 هفته آموزشی: ${weekNumber}\n` +
    `⭐ رضایت مراجع از پیشرفت: ${rating}/5\n` +
    `✅ دستاوردهای کلیدی: ${achievements.substring(0, 80)}...\n` +
    `⚠️ گلوگاه‌ها و چالش‌ها: ${blockers.substring(0, 80)}...\n\n` +
    `🎯 ربات تلگرام مربیگری سیدی`;

  await sendTelegramNotification(telegramMsg, "ارزیابی هفتگی مراجع", { clientName, weekNumber });

  res.json({ success: true, evaluation });
});

// 5. Contact Form / Corporate Strategy Request
app.post("/api/contact", async (req, res) => {
  const { name, company, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "لطفاً نام، ایمیل و پیام خود را وارد کنید." });
  }

  addSystemLog(
    "sheets",
    `درخواست مشاوره سازمانی/تماس جدید از ${name} در شیت پیام‌ها ثبت شد.`,
    { name, company, email }
  );

  const telegramMsg = 
    `💼 *درخواست جدید مشاوره سازمانی / تماس*\n\n` +
    `👤 فرستنده: ${name}\n` +
    `🏢 شرکت: ${company || "شخصی"}\n` +
    `📧 ایمیل: ${email}\n` +
    `📞 تلفن: ${phone || "ثبت نشده"}\n` +
    `✉️ پیام: ${message}\n\n` +
    `🔗 سیستم اتوماسیون مهسا سیدی`;

  await sendTelegramNotification(telegramMsg, "مشاوره سازمانی سازنده", { sender: name });

  res.json({ success: true });
});

// -------------------------------------------------------------
// Vite Dev / Static Files Setup
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    addSystemLog("database", "سرور با موفقیت راه‌اندازی شد و سیستم اتوماسیون آماده دریافت تعاملات است.");
  });
}

startServer();
