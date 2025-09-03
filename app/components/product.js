"use client";
import React, { useState, useEffect } from 'react';

const OrbitalProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const products = [
    {
      id: 1,
      title: "Real World Asset Tokenization",
      shortTitle: "RWA Tokenization",
      description: "Transform physical assets into blockchain tokens, enabling fractional ownership and global trading of real estate, commodities, and tangible assets with complete transparency.",
      icon: "🏢",
      color: "#00D4FF",
      glowColor: "rgba(0, 212, 255, 0.4)",
      size: 80,
      orbitRadius: 200,
      speed: 1.2,
      tech: ["Blockchain", "Smart Contracts", "Asset Management"]
    },
    {
      id: 2,
      title: "Advanced Token Development",
      shortTitle: "Token Development",
      description: "End-to-end token creation from concept to deployment. Utility tokens, governance tokens, and custom tokenomics designed for maximum security and scalability.",
      icon: "💎",
      color: "#FF6B9D",
      glowColor: "rgba(255, 107, 157, 0.4)",
      size: 75,
      orbitRadius: 280,
      speed: 0.8,
      tech: ["ERC-20", "BEP-20", "Tokenomics"]
    },
    {
      id: 3,
      title: "Telegram Mini Applications",
      shortTitle: "Telegram Mini Apps",
      description: "Interactive Telegram applications with seamless user experience. Gaming, productivity tools, and business automation integrated directly into Telegram.",
      icon: "📱",
      color: "#4ECDC4",
      glowColor: "rgba(78, 205, 196, 0.4)",
      size: 70,
      orbitRadius: 360,
      speed: 0.6,
      tech: ["Telegram API", "Web Apps", "Bot Development"]
    },
    {
      id: 4,
      title: "Memecoin Ecosystem",
      shortTitle: "Memecoin Development",
      description: "Viral memecoin creation with strategic community building, tokenomics optimization, and marketing campaigns designed for maximum adoption and engagement.",
      icon: "🚀",
      color: "#FFE66D",
      glowColor: "rgba(255, 230, 109, 0.4)",
      size: 65,
      orbitRadius: 440,
      speed: 0.4,
      tech: ["Community Building", "Viral Marketing", "Tokenomics"]
    },
    {
      id: 5,
      title: "Smart Contract Solutions",
      shortTitle: "Smart Contracts",
      description: "Secure, audited smart contracts for DeFi protocols, NFT marketplaces, and enterprise blockchain solutions with gas optimization and security focus.",
      icon: "⚙️",
      color: "#A8E6CF",
      glowColor: "rgba(168, 230, 207, 0.4)",
      size: 85,
      orbitRadius: 520,
      speed: 0.3,
      tech: ["Solidity", "DeFi", "Security Audits"]
    },
    {
      id: 6,
      title: "Custom Web & Mobile Development",
      shortTitle: "Web & Mobile Apps",
      description: "Cutting-edge websites and mobile applications with modern design, optimal performance, and seamless user experiences across all platforms.",
      icon: "💻",
      color: "#C7CEEA",
      glowColor: "rgba(199, 206, 234, 0.4)",
      size: 75,
      orbitRadius: 600,
      speed: 0.2,
      tech: ["React", "React Native", "Full Stack"]
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleProductClick = (product) => {
    setSelectedProduct(selectedProduct?.id === product.id ? null : product);
    setIsPlaying(!selectedProduct || selectedProduct.id !== product.id);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: '#0c1c3c' }}
    >
      {/* Cosmic Background - Removed */}

      {/* Header */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-30">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4">
          PRODUCTS
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl">
          Explore our constellation of blockchain & AI solutions
        </p>
      </div>

      {/* Control Panel */}
      <div className="absolute top-8 right-8 z-30">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

      {/* Orbital System */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Orbit Rings */}
        {products.map((product) => (
          <div
            key={`orbit-${product.id}`}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${product.orbitRadius * 2}px`,
              height: `${product.orbitRadius * 2}px`,
              animation: selectedProduct ? 'none' : undefined,
            }}
          />
        ))}

        {/* Central Hub */}
        <div className="absolute z-20">
          <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse opacity-50" />
            <div className="text-4xl relative z-10">🧬</div>
            <div className="absolute inset-0 rounded-full border-4 border-white/20" />
          </div>
        </div>

        {/* Product Planets */}
        {products.map((product, index) => {
          const angle = (rotation * product.speed + (index * (360 / products.length))) * (Math.PI / 180);
          const x = Math.cos(angle) * product.orbitRadius;
          const y = Math.sin(angle) * product.orbitRadius;

          return (
            <div
              key={product.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%) ${selectedProduct?.id === product.id ? 'scale(1.3)' : 'scale(1)'}`,
                transition: 'transform 0.3s ease',
              }}
              onClick={() => handleProductClick(product)}
            >
              {/* Planet */}
              <div 
                className="relative group"
                style={{ width: `${product.size}px`, height: `${product.size}px` }}
              >
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: product.glowColor }}
                />
                
                {/* Planet Body */}
                <div 
                  className="relative w-full h-full rounded-full flex items-center justify-center text-2xl shadow-2xl border-2 border-white/30 group-hover:border-white/50 transition-all duration-300"
                  style={{ backgroundColor: product.color }}
                >
                  {product.icon}
                </div>

                {/* Rings for larger planets */}
                {product.size > 75 && (
                  <div className="absolute inset-0 rounded-full border border-white/20 scale-150" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Information Panel */}
      {selectedProduct && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-30">
          <div className="bg-black/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-start gap-6">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: selectedProduct.color }}
              >
                {selectedProduct.icon}
              </div>
              
              <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-3">
                  {selectedProduct.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {selectedProduct.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProduct.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 group">
                  Learn More
                  <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              <button 
                onClick={() => setSelectedProduct(null)}
                className="text-white/60 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-8 right-8 text-right z-30">
        <p className="text-gray-400 text-sm">
          Click on planets to explore • Use ⏸️ to pause orbit
        </p>
      </div>
    </div>
  );
};

export default OrbitalProductShowcase;