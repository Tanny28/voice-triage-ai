
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl float-animation"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-xl float-animation" style={{ animationDelay: '4s' }}></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-full blur-xl float-animation" style={{ animationDelay: '1s' }}></div>
      
      {/* Circuit-like patterns */}
      <div className="absolute top-1/2 left-0 w-full h-full tech-pattern opacity-30"></div>
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(177, 251, 248, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(177, 251, 248, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Animated medical icons */}
      <div className="absolute top-1/4 left-1/4 opacity-20">
        <div className="w-8 h-8 border-2 border-cyan-400 rounded-full float-animation"></div>
      </div>
      <div className="absolute top-3/4 right-1/4 opacity-20" style={{ animationDelay: '3s' }}>
        <div className="w-6 h-6 border-2 border-purple-400 rounded-full float-animation"></div>
      </div>
    </div>
  );
};

export default FloatingElements;
