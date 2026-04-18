import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Step = 'idle' | 'greeting' | 'ask_mobile' | 'ask_name' | 'completed';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [messages, setMessages] = useState<{ text: React.ReactNode; sender: 'bot' | 'user' }[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [inputValue, setInputValue] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const services = [
    "Pre-Wedding Stories",
    "Mahanadi Moments",
    "Haldi Celebrations",
    "Wedding Stories",
    "Maternity Memories",
    "Baby Moments"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, step]);

  useEffect(() => {
    if (isOpen && step === 'idle') {
      setTimeout(() => {
        setMessages([
          { text: "Hi! How can we help you capture your special moments today? Please select a service you're interested in:", sender: 'bot' }
        ]);
        setStep('greeting');
      }, 500);
    }
  }, [isOpen, step]);

  const resetChat = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep('idle');
      setMessages([]);
      setSelectedService('');
      setMobileNumber('');
      setName('');
      setInputValue('');
    }, 300);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setMessages(prev => [
      ...prev,
      { text: service, sender: 'user' },
      { text: <>Great choice! Could you please share your <b>mobile number</b> so we can reach out regarding {service}?</>, sender: 'bot' }
    ]);
    setStep('ask_mobile');
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (step === 'ask_mobile') {
      setMobileNumber(inputValue.trim());
      setMessages(prev => [
        ...prev,
        { text: inputValue.trim(), sender: 'user' },
        { text: <>Thank you! And what is your <b>name</b>?</>, sender: 'bot' }
      ]);
      setInputValue('');
      setStep('ask_name');
    } else if (step === 'ask_name') {
      const finalName = inputValue.trim();
      setName(finalName);
      setMessages(prev => [
        ...prev,
        { text: finalName, sender: 'user' },
        { text: `Thanks, ${finalName}! Redirecting you to WhatsApp to connect with us!`, sender: 'bot' }
      ]);
      setInputValue('');
      setStep('completed');

      const waNumber = '919742493337';
      const message = `Hi Wedding Dreams, my name is ${finalName}. My number is ${mobileNumber}. I am interested in exploring ${selectedService}.`;
      const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <>
      {/* Bot Icon Overlay - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsOpen(true)}
              className="bg-gold text-white p-4 rounded-full shadow-lg hover:bg-gold-dark transition-colors flex items-center justify-center"
            >
              <MessageCircle className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-0 right-0 w-[350px] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col h-[500px]"
            >
              {/* Header */}
              <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-gold p-2 rounded-full">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold">Wedding Dreams</h3>
                    <p className="text-xs text-stone-300">We reply quickly</p>
                  </div>
                </div>
                <button onClick={resetChat} className="text-stone-300 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 p-4 overflow-y-auto bg-stone-50 flex flex-col gap-3">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user'
                        ? 'bg-gold text-white rounded-tr-none'
                        : 'bg-white text-stone-800 rounded-tl-none border border-stone-100'
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Service Options Options */}
                {step === 'greeting' && (
                  <div className="flex flex-col gap-2 mt-2 items-start pl-2">
                    {services.map((service, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleServiceSelect(service)}
                        className="text-xs px-4 py-2 border border-gold text-gold rounded-full hover:bg-gold hover:text-white transition-colors text-left"
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                )}

                {/* Automated WhatsApp Redirect on Complete */}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {['ask_mobile', 'ask_name'].includes(step) && (
                <div className="p-3 bg-white border-t border-stone-100">
                  <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
                    <input
                      type={step === 'ask_mobile' ? 'tel' : 'text'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={step === 'ask_mobile' ? "Type your number..." : "Type your name..."}
                      className="flex-1 bg-stone-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                      required
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="bg-stone-900 text-white p-2 rounded-full hover:bg-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
