import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageCircle } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const suggestedQuestions = [
  'Which serum should I choose?',
  'Can I use these two products together?',
  "What's the cheaper alternative?",
  'Find me a sunscreen under ₹800.',
  'Why did you recommend this product?',
  'Can I simplify my routine?',
];

const aiResponses: Record<string, string> = {
  'Which serum should I choose?': 'Based on your skin profile — Combination, Dehydrated, Sensitive — I recommend the Aqualis Hydrating Serum (94% match). It directly addresses your top priority of improving hydration, and its lightweight texture suits combination skin. The Floreum Nourishing Serum is a close alternative if barrier support is also a priority.',
  "Can I use these two products together?": "Yes, the Aqualis Hydrating Serum and Floreum Nourishing Serum can be used together. Apply the hydrating serum first on slightly damp skin, wait 30-60 seconds, then layer the nourishing serum. Both are water-based and won't conflict. Avoid using two strong active treatments in the same session.",
  "What's the cheaper alternative?": "The Floreum Nourishing Serum at ₹749 is your best value alternative. It still scores 91% match and addresses barrier support. You'd save ₹150 compared to the top match, with only a 3% lower skin match score.",
  'Find me a sunscreen under ₹800.': 'The Ovelle Mineral Shield SPF 50 at ₹699 fits your budget and scores 88% match. It uses zinc oxide, has no white cast, and is suitable for sensitive skin. It\'s available cheapest on Nykaa at ₹699.',
  'Why did you recommend this product?': 'The Aqualis Hydrating Serum scored 94% because it matches four of your profile criteria: hydration support, lightweight texture (ideal for combination skin), low sensitivity risk, and it fits your morning routine slot. The score is based on ingredient analysis, your skin metrics, and your stated priorities.',
  'Can I simplify my routine?': 'Your current routine has 6 steps across morning and evening. You could simplify to 4 by combining your evening treatment and repair into a single moisturizer with active ingredients — the Floreum Barrier Repair Cream already contains ceramides and niacinamide. This would maintain effectiveness while reducing steps.',
};

export default function AIAdvisor() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'I understand your skin profile, routine, and product comparisons. Ask me anything about your skincare.' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = aiResponses[text] || 'I can help you compare products, understand your skin profile, find alternatives, and optimize your routine. Try asking about specific products or your skin goals.';
      setMessages((prev) => [...prev, { role: 'ai', text: response }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <section id="advisor" className="bg-ivory-100 py-24 lg:py-40">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-16 text-center`}>
          <p className="editorial-eyebrow mb-5">AI Skin Advisor</p>
          <h2 className="font-serif text-display-2 font-light text-charcoal-900">
            ASK YOUR <span className="italic font-extralight text-sage-600">SKIN.</span>
          </h2>
        </div>

        <div className={`reveal reveal-delay-1 ${visible ? 'is-visible' : ''} mx-auto max-w-2xl`}>
          <div className="rounded-2xl border border-ivory-300 bg-ivory-50 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-ivory-300 bg-ivory-100 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-200">
                <Sparkles className="h-4 w-4 text-sage-700" />
              </div>
              <div>
                <p className="font-sans text-sm font-medium text-charcoal-900">Skin Canvas Advisor</p>
                <p className="font-sans text-xs text-sage-600">Knows your skin profile · Combination · Dehydrated</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="max-h-[340px] min-h-[280px] overflow-y-auto px-5 py-6 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-charcoal-900 text-ivory-50 rounded-br-sm'
                      : 'bg-ivory-200 text-charcoal-800 rounded-bl-sm'
                  }`}>
                    {msg.role === 'ai' && (
                      <div className="mb-1 flex items-center gap-1.5">
                        <MessageCircle className="h-3 w-3 text-sage-600" />
                        <span className="font-sans text-[0.65rem] text-sage-600">Advisor</span>
                      </div>
                    )}
                    <p className="font-sans text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-ivory-200 px-4 py-3 rounded-bl-sm">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 animate-pulse-soft rounded-full bg-charcoal-400" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 animate-pulse-soft rounded-full bg-charcoal-400" style={{ animationDelay: '300ms' }} />
                      <div className="h-2 w-2 animate-pulse-soft rounded-full bg-charcoal-400" style={{ animationDelay: '600ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested questions */}
            <div className="border-t border-ivory-200 px-5 pt-4">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="rounded-full border border-ivory-300 px-3 py-1.5 font-sans text-xs text-charcoal-600 transition-all hover:border-sage-400 hover:bg-sage-200/30 hover:text-sage-700"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-ivory-300 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="Ask about your skin, products, or routine..."
                  className="flex-1 rounded-full bg-ivory-100 px-5 py-3 font-sans text-sm text-charcoal-800 placeholder:text-charcoal-400 outline-none focus:ring-2 focus:ring-sage-300"
                />
                <button
                  onClick={() => handleSend(input)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal-900 text-ivory-50 transition-all hover:scale-105 active:scale-95"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
