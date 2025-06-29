import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, ArrowRight, Shield, Phone, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CallToActionSection = () => {
  const [userPhone, setUserPhone] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    toast.success("🎤 Scroll up to start voice triage or use the widget!");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEmergencyCall = async () => {
    if (!userPhone || !/^\+?\d{10,15}$/.test(userPhone)) {
      toast.error("📵 Please enter a valid phone number with country code.");
      return;
    }

    try {
      setIsLoading(true);
      toast.info("📞 Connecting to emergency AI triage...");

      const { data, error } = await supabase.functions.invoke("dispatch-call", {
        body: {
          agentId: import.meta.env.VITE_OMNIDIM_AGENT_ID || "emergency-triage-001",
          userPhone,
          transcript: "Emergency consultation requested",
        },
      });

      if (error) {
        console.error("Emergency dispatch error:", error);
        toast.error("❌ For immediate emergencies, call 911.");
      } else {
        toast.success("✅ Emergency triage agent will call you shortly!");
        setUserPhone("");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("⚠️ System error. For emergencies, call 911.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="glass-effect rounded-3xl p-12 glow-effect">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Ready for AI-Powered Health Triage?
          </h2>
          <p className="text-xl text-cyan-200/80 max-w-2xl mx-auto mb-10">
            Join thousands who trust their health to our AI-powered voice triage system
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="px-12 py-6 text-xl font-semibold rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transform transition-all duration-300 hover:scale-105 shadow-2xl glow-effect"
            >
              <Mic className="w-6 h-6 mr-3" />
              Start Speaking
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="px-12 py-6 text-xl font-semibold rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-400 hover:to-fuchsia-500 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <Phone className="w-6 h-6 mr-3" />
              Get AI Call
            </Button>
          </div>

          <div className="flex items-center justify-center text-white/60 text-sm mb-8">
            <Shield className="w-4 h-4 mr-2" />
            100% Private & HIPAA Compliant
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400">24/7</div>
              <div className="text-white/60">Available Anytime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">&lt;30s</div>
              <div className="text-white/60">Avg Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400">99%</div>
              <div className="text-white/60">Accuracy Rate</div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8 text-white/50 text-sm">
            ⚠️ This tool provides guidance only. For life-threatening emergencies, call 911.
          </div>

          {/* MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-2 right-2 text-zinc-400 hover:text-white"
                >
                  <X />
                </button>
                <h3 className="text-lg font-semibold mb-4 text-zinc-100">Enter your phone number</h3>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="+919999999999"
                  className="w-full px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 mb-4"
                />
                <Button
                  onClick={handleEmergencyCall}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
                >
                  {isLoading ? "Calling..." : "Get AI Call"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
