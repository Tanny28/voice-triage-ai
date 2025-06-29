
import { Mic, Brain, FileText, CheckCircle } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Speak Your Symptoms",
      description: "Simply talk about what you're experiencing in your own words",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Analysis",
      description: "Our advanced AI processes your symptoms using medical knowledge",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Get Assessment",
      description: "Receive detailed triage results with recommended next steps",
      color: "from-teal-400 to-cyan-500"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Take Action",
      description: "Follow personalized guidance for your health situation",
      color: "from-emerald-400 to-teal-500"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            How It Works
          </h2>
          <p className="text-xl text-cyan-200/80 max-w-2xl mx-auto">
            Get professional health triage in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent z-0"></div>
              )}
              
              <div className="glass-effect rounded-xl p-8 text-center hover:glow-effect transition-all duration-500 hover:transform hover:scale-105 relative z-10">
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${step.color} mx-auto`}>
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -left-2 w-16 h-16 border-2 border-cyan-400/30 rounded-full animate-spin opacity-20"></div>
                </div>
                
                <div className="mb-3 text-sm font-semibold text-cyan-400">
                  Step {index + 1}
                </div>
                
                <h3 className="text-xl font-semibold text-cyan-200 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-white/60">
            <span className="text-cyan-400">⚡</span> Average triage time: Under 60 seconds
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
