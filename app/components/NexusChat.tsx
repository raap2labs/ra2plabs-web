"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, XClose, Send } from "./Icons";
import {
  getChatResponse,
  getSuggestedQuestions,
  qualifyLead,
  GREETING_MESSAGE,
  type ChatMessage,
} from "../lib/chat";
import { trackNexusMessage, trackNexusLeadQualified } from "../lib/analytics";

export default function NexusChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: GREETING_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const leadTrackedRef = useRef(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const qualification = qualifyLead(messages);
  const suggestions = getSuggestedQuestions(messages);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!leadTrackedRef.current && qualification !== "cold") {
      leadTrackedRef.current = true;
      trackNexusLeadQualified(qualification, "chat");
    }
  }, [qualification]);

  const handleSend = useCallback(
    async (text?: string) => {
      const msg = (text || input).trim();
      if (!msg || isTyping) return;

      setInput("");
      const userMsg: ChatMessage = { role: "user", content: msg };
      setMessages((prev) => [...prev, userMsg]);
      trackNexusMessage("user");
      setIsTyping(true);

      const history = [...messages, userMsg];
      const response = await getChatResponse(msg, history);
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      trackNexusMessage("assistant");
    },
    [input, isTyping, messages],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-analytics="cta_click"
        data-analytics-label={isOpen ? "nexus-close" : "nexus-open"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-primary-hover rounded-full flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat Nexus"}
      >
        {isOpen ? (
          <XClose className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] origin-bottom-right transition-all duration-300 ease-premium ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-75 pointer-events-none"
        }`}
      >
        <div className="bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[600px]">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-surface-hover shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
              N
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-tight">Nexus</p>
              <p className="text-[11px] text-muted-foreground">
                {qualification === "hot"
                  ? "Cliente potencial"
                  : "Asistente virtual"}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.05]"
              aria-label="Cerrar chat"
            >
              <XClose className="w-4 h-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scroll-smooth"
            style={{ minHeight: 320, maxHeight: 380 }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-surface-hover border border-border text-foreground rounded-bl-md"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: m.content
                        .replace(/\n/g, "<br>")
                        .replace(
                          /\*\*(.+?)\*\*/g,
                          "<strong>$1</strong>",
                        ),
                    }}
                  />
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface-hover border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span
                      className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0s" }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.15s" }}
                    />
                    <span
                      className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {messages.length === 1 && !isTyping && (
              <div className="pt-2">
                <p className="text-[11px] text-muted-foreground mb-2">
                  Sugerencias:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="text-[12px] px-3 py-1.5 bg-surface-hover border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isTyping && messages.length > 1 && suggestions.length > 0 && (
            <div className="px-5 pb-1">
              <div className="flex flex-wrap gap-2">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-[11px] px-2.5 py-1 bg-surface-hover border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-border px-4 py-3 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              disabled={isTyping}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="p-2 bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
