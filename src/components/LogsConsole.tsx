import { useState, useEffect } from "react";
import { Terminal, Shield, RefreshCw, ChevronUp, ChevronDown, CheckCircle, ArrowRightLeft } from "lucide-react";
import { SystemLog } from "../types";

export function LogsConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLogs = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/logs");
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setLogs(data);
        }
      }
    } catch (err) {
      console.error("Error fetching system logs:", err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchLogs();
    // Poll logs every 4 seconds to catch new form submissions
    const interval = setInterval(fetchLogs, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm w-full font-sans text-right" dir="rtl">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#0B2E1E] text-[#FAF8F5] border border-[#1C4E37] px-4 py-2.5 rounded-lg shadow-xl hover:bg-[#113f2a] transition-all flex items-center justify-between text-xs"
        id="automation-console-trigger"
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <span className="font-medium">کنسول اتوماسیون و مانیتورینگ سیستم</span>
        </div>
        <div className="flex items-center gap-2">
          {isRefreshing ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#C29F6C]" />
          ) : (
            <Terminal className="w-3.5 h-3.5 text-[#C29F6C]" />
          )}
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Logs Drawer */}
      {isOpen && (
        <div className="mt-2 bg-[#121614] border border-[#1C4E37] rounded-lg shadow-2xl overflow-hidden max-h-72 flex flex-col">
          {/* Header */}
          <div className="bg-[#181E1B] px-3 py-2 border-b border-[#1C4E37] flex items-center justify-between text-[10px] text-gray-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-emerald-500" />
              <span>اتصال فعال به App Script & Telegram Bot API</span>
            </div>
            <button
              onClick={fetchLogs}
              disabled={isRefreshing}
              className="hover:text-[#C29F6C] transition-colors"
            >
              به‌روزرسانی دستی
            </button>
          </div>

          {/* Logs List */}
          <div className="p-3 overflow-y-auto space-y-2 flex-1 scrollbar-thin scrollbar-thumb-emerald-800">
            {logs.length === 0 ? (
              <p className="text-gray-500 text-[11px] text-center py-4">در حال راه‌اندازی و مانیتورینگ رویدادها...</p>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-2 rounded bg-[#171D1A] border-r-2 text-[10px] space-y-1"
                  style={{
                    borderColor:
                      log.type === "telegram"
                        ? "#3b82f6" // Blue for telegram
                        : log.type === "sheets"
                        ? "#10b981" // Green for sheets
                        : "#f59e0b", // Yellow/Gold for system/db
                  }}
                >
                  <div className="flex items-center justify-between text-[9px] text-gray-400">
                    <span className="font-mono">{log.timestamp}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                        log.type === "telegram"
                          ? "bg-blue-950 text-blue-400"
                          : log.type === "sheets"
                          ? "bg-emerald-950 text-emerald-400"
                          : "bg-amber-950 text-amber-400"
                      }`}
                    >
                      {log.type === "telegram"
                        ? "TELEGRAM BOT"
                        : log.type === "sheets"
                        ? "GOOGLE SHEETS"
                        : "SYSTEM DATABASE"}
                    </span>
                  </div>
                  <p className="text-gray-200 font-medium leading-relaxed">{log.message}</p>
                  {log.details && (
                    <div className="mt-1 bg-[#1d2421] p-1.5 rounded text-[8px] font-mono text-gray-400 overflow-x-auto whitespace-pre-wrap">
                      {JSON.stringify(log.details, null, 2)}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer explanation */}
          <div className="bg-[#181E1B] p-2 text-center border-t border-[#1C4E37] text-[8px] text-gray-500 leading-normal">
            سازگار با هاست لبه Cloudflare Pages / Workers (بدون پایگاه داده متمرکز سنگین)
          </div>
        </div>
      )}
    </div>
  );
}
