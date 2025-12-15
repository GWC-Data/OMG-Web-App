import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  Sparkles,
  Bot,
  User,
  Lightbulb,
  BookOpen,
  Calendar,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import omSymbol from "@/assets/om-symbol.png";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { icon: "🙏", text: "Which pooja should I do today?", category: "pooja" },
  { icon: "📿", text: "Tell me about Rudraksha benefits", category: "knowledge" },
  { icon: "📅", text: "What's today's tithi?", category: "calendar" },
  { icon: "🕉️", text: "Explain the meaning of Om", category: "spiritual" },
  { icon: "🔱", text: "Story of Lord Shiva", category: "stories" },
  { icon: "💫", text: "How to do meditation?", category: "guide" },
];

const AIGuide = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "🙏 Namaste! I am your AI Spiritual Guide. I'm here to assist you on your divine journey. You can ask me about:\n\n• Hindu scriptures & mantras\n• Pooja rituals & vidhi\n• Festival significance\n• Spiritual guidance\n• Meditation techniques\n\nHow may I serve you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: "bot",
        content: generateResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("rudraksha")) {
      return "📿 **Rudraksha Benefits:**\n\nRudraksha beads are sacred seeds from the Elaeocarpus ganitrus tree, believed to be the tears of Lord Shiva.\n\n**Key Benefits:**\n• 1 Mukhi: Spiritual enlightenment, liberation\n• 5 Mukhi: Peace, health, academics\n• 7 Mukhi: Wealth, prosperity\n• 14 Mukhi: Third eye activation\n\nWould you like to know more about a specific Mukhi Rudraksha?";
    }
    
    if (lowerQuery.includes("pooja") || lowerQuery.includes("puja")) {
      return "🪔 **Today's Recommended Pooja:**\n\nBased on the current day and tithi, I recommend:\n\n• **Ganesh Vandana** - Start your day by removing obstacles\n• **Surya Namaskar** - 12 salutations to the Sun God\n• **Evening Aarti** - Connect with the divine at dusk\n\nWould you like step-by-step guidance for any of these?";
    }
    
    if (lowerQuery.includes("om")) {
      return "🕉️ **The Sacred Om:**\n\nOm (ॐ) is the primordial sound of the universe, representing the essence of ultimate reality (Brahman).\n\n**Three Sounds of Om:**\n• **A** - Creation (Brahma)\n• **U** - Preservation (Vishnu)\n• **M** - Destruction (Shiva)\n\nThe silence after Om represents the infinite, formless Brahman. Chanting Om aligns your vibration with the universe.\n\n🎵 Shall I guide you through Om meditation?";
    }
    
    if (lowerQuery.includes("shiva")) {
      return "🔱 **Lord Shiva - The Auspicious One:**\n\nShiva is the Supreme Being in Shaivism, part of the Hindu Trinity as the Destroyer and Transformer.\n\n**Sacred Forms:**\n• Nataraja - Cosmic Dancer\n• Ardhanarishvara - Half male, half female\n• Dakshinamurthy - The Supreme Teacher\n• Lingam - Symbol of creation\n\n**Maha Mantra:** Om Namah Shivaya\n\nMonday is the most auspicious day for Shiva worship. Would you like to learn a Shiva stotram?";
    }
    
    if (lowerQuery.includes("meditation")) {
      return "🧘 **Meditation Guide:**\n\n**Simple Steps to Begin:**\n\n1. **Prepare** - Find a quiet space, sit comfortably\n2. **Breathe** - Take 3 deep breaths\n3. **Focus** - Concentrate on your breath or a mantra\n4. **Observe** - Let thoughts pass without judgment\n5. **Return** - Gently bring focus back when distracted\n\n**Recommended Duration:**\n• Beginners: 5-10 minutes\n• Intermediate: 15-20 minutes\n• Advanced: 30+ minutes\n\n🕉️ Would you like a guided mantra meditation?";
    }
    
    return "🙏 Thank you for your question! As your AI Spiritual Guide, I'm here to help with Hindu spirituality, scriptures, rituals, and divine wisdom.\n\nYou can ask me about:\n• Mantras and their meanings\n• Pooja procedures\n• Festival significance\n• Deity stories\n• Meditation techniques\n\nPlease feel free to ask anything specific!";
  };

  return (
    <div className="min-h-screen bg-background safe-top safe-bottom flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <img src={omSymbol} alt="OM" className="h-6 w-6 filter brightness-200" />
            </div>
            <div>
              <h1 className="font-bold text-gradient-divine">AI Spiritual Guide</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Online • Ready to assist
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Prompts */}
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickPrompts.map((prompt, index) => (
              <motion.button
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSend(prompt.text)}
                className="shrink-0 px-3 py-2 rounded-full bg-card border border-border text-sm flex items-center gap-2 hover:border-primary/50 transition-colors"
              >
                <span>{prompt.icon}</span>
                <span className="whitespace-nowrap">{prompt.text}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-gradient-to-br from-primary to-secondary"
                  }`}>
                    {message.type === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <Card className={`p-4 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <Card className="p-4">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      className="w-2 h-2 rounded-full bg-muted-foreground"
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-background/95 backdrop-blur-md p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="shrink-0">
              <Mic className="w-5 h-5" />
            </Button>
            <Input
              placeholder="Ask your spiritual question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="h-12"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="shrink-0 bg-gradient-to-r from-primary to-secondary"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            AI Guide provides spiritual guidance based on Hindu scriptures
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIGuide;
