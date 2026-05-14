"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  Settings,
  Volume2,
  VolumeX,
  Mail,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { CONTACT, SITE_NAME } from "@/lib/constants";

const quickQuestions = [
  "What services do you offer?",
  "How does the process work?",
  "Can you help with editing?",
  "How do I get a quote?",
];

type MessageType = "user" | "bot" | "system";

type Message = {
  id: string;
  text: string;
  type: MessageType;
  timestamp: Date;
};

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildBotReply(query: string) {
  return (
    "Thanks for reaching out. A publishing specialist will reply soon. " +
    "In the meantime, you can explore services or request a quote."
  );
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const welcomeMessage = useMemo<Message>(
    () => ({
      id: "welcome",
      text:
        "Hi, I am Ghost Writer. Ask me anything about publishing, editing, or packages.",
      type: "bot",
      timestamp: new Date(),
    }),
    []
  );

  useEffect(() => {
    if (isOpen) {
      setMessages([welcomeMessage]);
      setInput("");
      setSettingsOpen(false);
      setSelectedFiles([]);
    }
  }, [isOpen, welcomeMessage]);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed && selectedFiles.length === 0) return;

    if (trimmed) {
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        text: trimmed,
        type: "user",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setInput("");
    }

    if (selectedFiles.length > 0) {
      const fileMessages = selectedFiles.map(file => ({
        id: `file-${file.name}-${Date.now()}`,
        text: `Attachment: ${file.name}`,
        type: "system" as const,
        timestamp: new Date(),
      }));
      setMessages(prev => [...prev, ...fileMessages]);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }

    setIsTyping(true);
    window.setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: buildBotReply(trimmed),
        type: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 700);
  };

  const handleQuickSend = (question: string) => {
    handleSend(question);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleEmailTranscript = () => {
    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      text: `Transcript request noted. We will email it to ${CONTACT.email}.`,
      type: "system",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="group relative grid h-14 w-14 place-items-center rounded-full border border-white/30 bg-gradient-to-br from-brand-green via-brand-green-light to-brand-gold text-white shadow-[0_16px_30px_rgba(11,60,109,0.35)]"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,#ffffff33,transparent_60%)]" />
          <MessageCircle className="relative z-10 h-6 w-6" />
          <span className="pointer-events-none absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-brand-gold text-[10px] font-semibold text-brand-charcoal shadow" >
            GW
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 flex h-[72vh] w-[92vw] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-brand-green/15 bg-brand-cream shadow-[0_30px_60px_rgba(15,23,42,0.18)] sm:h-[640px]"
          >
            <div className="relative flex items-center justify-between border-b border-brand-green/15 bg-white/80 px-4 py-3 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-green text-white shadow">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-green">Ghost Writer</p>
                  <p className="text-xs text-brand-muted">Publishing assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="rounded-full border border-brand-green/10 bg-white/70 p-2 text-brand-green transition hover:border-brand-green/30"
                  onClick={() => setSettingsOpen(prev => !prev)}
                  aria-label="Settings"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  className="rounded-full border border-brand-green/10 bg-white/70 p-2 text-brand-green transition hover:border-brand-green/30"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {settingsOpen && (
              <div className="border-b border-brand-green/15 bg-white/70 px-4 py-3 text-xs text-brand-charcoal">
                <div className="flex flex-wrap gap-2">
                  <button
                    className="flex items-center gap-2 rounded-full border border-brand-green/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand-green shadow-sm transition hover:border-brand-green/30"
                    onClick={() => setSoundEnabled(prev => !prev)}
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    Sound {soundEnabled ? "On" : "Off"}
                  </button>
                  <button
                    className="flex items-center gap-2 rounded-full border border-brand-green/15 bg-white px-3 py-1.5 text-xs font-semibold text-brand-green shadow-sm transition hover:border-brand-green/30"
                    onClick={handleEmailTranscript}
                  >
                    <Mail className="h-4 w-4" />
                    Email transcript
                  </button>
                </div>
              </div>
            )}

            <div className="flex-1 space-y-4 overflow-auto px-4 py-4">
              <div className="rounded-2xl border border-brand-green/10 bg-white px-4 py-3 text-xs text-brand-muted">
                By chatting, you agree to possible recording by {SITE_NAME} and partners.
              </div>

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map(question => (
                    <button
                      key={question}
                      className="rounded-full border border-brand-green/15 bg-white px-3 py-1.5 text-xs font-medium text-brand-green transition hover:border-brand-green/40 hover:bg-brand-green/5"
                      onClick={() => handleQuickSend(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[82%] space-y-1 rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      message.type === "user"
                        ? "bg-brand-green text-white"
                        : message.type === "system"
                        ? "bg-brand-green/10 text-brand-charcoal"
                        : "bg-white text-brand-charcoal"
                    }`}
                  >
                    <p className="leading-relaxed">{message.text}</p>
                    <span
                      className={`block text-[11px] ${
                        message.type === "user" ? "text-white/70" : "text-brand-muted"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-brand-muted">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-brand-gold" />
                  Ghost Writer is typing...
                </div>
              )}

              <div ref={endRef} />
            </div>

            {selectedFiles.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-brand-green/10 bg-white/70 px-4 py-2 text-[11px] text-brand-muted">
                {selectedFiles.map(file => (
                  <span
                    key={file.name}
                    className="rounded-full border border-brand-green/15 bg-white px-2 py-1"
                  >
                    {file.name}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-brand-green/10 bg-white px-4 py-3">
              <div className="relative flex items-center">
                <Input
                  placeholder="Ask about publishing, editing, or packages"
                  className="h-10 rounded-full border-brand-green/20 bg-brand-cream pr-24 pl-11 text-sm text-brand-charcoal"
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === "Enter") {
                      handleSend(input);
                    }
                  }}
                />
                <button
                  className="absolute left-3 text-brand-muted transition hover:text-brand-green"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Attach file"
                >
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileUpload}
                />
                <button
                  className="absolute right-2 rounded-full bg-brand-green px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-brand-green-light"
                  onClick={() => handleSend(input)}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-brand-muted">
                <span>Powered by {SITE_NAME}</span>
                <a href="/privacy-policy" className="underline">
                  Privacy policy
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chatbot;
