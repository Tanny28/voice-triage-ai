
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Activity, Phone } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const [isListening, setIsListening] = useState(false);
  const [animatedText, setAnimatedText] = useState("Your Voice");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [transcript, setTranscript] = useState("");
  
  const textVariations = ["Your Voice", "Your Symptoms", "Instant AI Triage", "Better Health"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedText(prev => {
        const currentIndex = textVariations.findIndex(text => text === prev);
        const nextIndex = (currentIndex + 1) % textVariations.length;
        return textVariations[nextIndex];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        toast.success("🎤 Listening... Tell me about your symptoms");
      };
      
      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscript += transcriptPart;
          }
        }
        
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
          console.log('Final transcript:', finalTranscript);
        }
      };
      
      recognitionInstance.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        if (transcript.trim()) {
          setIsProcessing(true);
          toast.info("🧠 AI is analyzing your symptoms...");
          
          // Simulate AI processing
          setTimeout(() => {
            setIsProcessing(false);
            toast.success("✅ Analysis complete! Check the voice widget for your triage results.");
          }, 2000);
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          toast.error("❌ Microphone access denied. Please allow microphone access to use voice features.");
        } else if (event.error === 'no-speech') {
          toast.info("🔇 No speech detected. Try speaking again.");
        } else {
          toast.error("❌ Speech recognition error. Please try again.");
        }
      };
      
      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech recognition not supported');
    }
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const handleVoiceClick = async () => {
    if (!recognition) {
      toast.error("❌ Speech recognition not supported in this browser");
      return;
    }

    if (!isListening) {
      try {
        // Request microphone permission first
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setTranscript(""); // Clear previous transcript
        recognition.start();
      } catch (error) {
        console.error('Microphone access error:', error);
        toast.error("❌ Microphone access denied. Please allow microphone access to use voice features.");
      }
    } else {
      recognition.stop();
      toast.info("🛑 Stopped listening");
    }
  };

  const handleDispatchCall = async () => {
    try {
      setIsProcessing(true);
      toast.info("📞 Connecting you to AI triage agent...");

      const { data, error } = await supabase.functions.invoke('dispatch-call', {
        body: {
          agentId: 'voicetriage-agent-001',
          userPhone: '+1234567890', // In real app, get from user input
          transcript: transcript || 'User requested voice triage consultation'
        }
      });

      if (error) {
        console.error('Dispatch error:', error);
        toast.error("❌ Failed to connect to triage agent");
      } else {
        console.log('Dispatch success:', data);
        toast.success("✅ Connected! You'll receive a call shortly.");
      }
    } catch (error) {
      console.error('Error dispatching call:', error);
      toast.error("❌ Connection failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Animated Logo/Brand */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="relative">
            <Activity className="w-12 h-12 text-cyan-400 float-animation" />
            <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"></div>
          </div>
          <span className="text-2xl font-bold gradient-text">VoiceTriage AI</span>
        </div>

        {/* Main Heading with Animation */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-shadow">
            <span className="gradient-text transition-all duration-1000 ease-in-out">
              {animatedText}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-200/80 max-w-2xl mx-auto leading-relaxed">
            Speak your symptoms. Get instant AI-powered triage. 
            <span className="block text-lg text-white/60 mt-2">
              Your voice is your health navigator.
            </span>
          </p>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <div className="max-w-2xl mx-auto p-4 bg-black/20 rounded-lg border border-cyan-500/30">
            <p className="text-sm text-cyan-200/80 mb-2">Your symptoms:</p>
            <p className="text-white">{transcript}</p>
          </div>
        )}

        {/* Voice Interaction Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleVoiceClick}
            size="lg"
            disabled={isProcessing}
            className={`
              relative px-12 py-6 text-xl font-semibold rounded-full
              ${isListening 
                ? 'bg-red-500 hover:bg-red-600 listening-pulse' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
              }
              ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}
              transform transition-all duration-300 hover:scale-105
              shadow-2xl glow-effect
            `}
          >
            <div className="flex items-center space-x-3">
              {isListening ? (
                <>
                  <MicOff className="w-6 h-6" />
                  <span>Stop Listening</span>
                </>
              ) : isProcessing ? (
                <>
                  <Activity className="w-6 h-6 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6" />
                  <span>Start Speaking</span>
                </>
              )}
            </div>
            
            {/* Pulse rings for listening state */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-red-400/20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full bg-red-400/10 animate-ping animation-delay-300"></div>
              </>
            )}
          </Button>

          <Button
            onClick={handleDispatchCall}
            size="lg"
            disabled={isProcessing || isListening}
            className="px-12 py-6 text-xl font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 transform transition-all duration-300 hover:scale-105 shadow-2xl glow-effect"
          >
            <div className="flex items-center space-x-3">
              <Phone className="w-6 h-6" />
              <span>Get AI Call</span>
            </div>
          </Button>
        </div>
        
        {/* Instructions */}
        <div className="text-center space-y-2">
          <p className="text-sm text-white/40">
            🎤 Click "Start Speaking" to describe symptoms or "Get AI Call" for phone consultation
          </p>
          <p className="text-xs text-white/30">
            💬 The voice widget (bottom right) provides instant AI triage support
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
          {[
            { icon: "🎤", title: "Voice-First", desc: "Just speak naturally" },
            { icon: "🤖", title: "AI-Powered", desc: "Advanced medical AI" },
            { icon: "⚡", title: "Instant Results", desc: "Get triage in seconds" }
          ].map((benefit, index) => (
            <div 
              key={index}
              className="glass-effect rounded-xl p-6 hover:glow-effect transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="font-semibold text-cyan-200 mb-2">{benefit.title}</h3>
              <p className="text-sm text-white/60">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
