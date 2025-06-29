
import { Shield, Brain, Clock, Users, Stethoscope, Heart } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Advanced AI Triage",
      description: "Sophisticated medical AI analyzes your symptoms using the latest healthcare protocols",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Assessment",
      description: "Get immediate health guidance without waiting rooms or appointments",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy First",
      description: "Your health data is encrypted and protected with enterprise-grade security",
      color: "from-teal-400 to-cyan-500"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Medical Grade",
      description: "Built with healthcare professionals using evidence-based medical knowledge",
      color: "from-indigo-400 to-purple-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Holistic Care",
      description: "Considers your complete health picture for personalized recommendations",
      color: "from-pink-400 to-red-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Friendly",
      description: "Safe and effective for all family members with age-appropriate guidance",
      color: "from-emerald-400 to-teal-500"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Why Choose VoiceTriage AI?
          </h2>
          <p className="text-xl text-cyan-200/80 max-w-2xl mx-auto">
            Experience the future of healthcare triage with cutting-edge AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect rounded-xl p-8 hover:glow-effect transition-all duration-500 hover:transform hover:scale-105 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-cyan-200 mb-4 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
