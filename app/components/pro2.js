"use client";
import React, { useState, useEffect } from 'react';

const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const products = [
    {
      id: 1,
      title: "Real World Asset Tokenization",
      shortTitle: "RWA",
      description: "Transform physical assets into blockchain tokens, enabling fractional ownership and seamless trading of real estate, commodities, and tangible assets.",
      icon: "🏢",
      color: "from-cyan-400 to-blue-600",
      particles: "💎",
      tech: ["Blockchain", "Smart Contracts", "Tokenization"]
    },
    {
      id: 2,
      title: "Token Development",
      shortTitle: "Tokens",
      description: "End-to-end token creation services from utility tokens to governance tokens, ensuring security, scalability, and blockchain compatibility.",
      icon: "🪙",
      color: "from-purple-400 to-pink-600",
      particles: "⚡",
      tech: ["ERC-20", "BEP-20", "Solidity"]
    },
    {
      id: 3,
      title: "Telegram Mini Apps",
      shortTitle: "Mini Apps",
      description: "Interactive Telegram applications that enhance user engagement with gaming, productivity, and business automation features.",
      icon: "📱",
      color: "from-green-400 to-emerald-600",
      particles: "🚀",
      tech: ["Telegram API", "Web Apps", "Bot Development"]
    },
    {
      id: 4,
      title: "Memecoin Development",
      shortTitle: "Memecoins",
      description: "Viral memecoin creation with strategic tokenomics, community building, and marketing solutions for maximum adoption.",
      icon: "🐕",
      color: "from-orange-400 to-red-600",
      particles: "🔥",
      tech: ["Tokenomics", "Community", "Viral Marketing"]
    },
    {
      id: 5,
      title: "Smart Contracts",
      shortTitle: "DeFi",
      description: "Secure, automated blockchain contracts for DeFi, NFTs, and enterprise solutions with rigorous testing and optimization.",
      icon: "⚙️",
      color: "from-indigo-400 to-purple-600",
      particles: "🔗",
      tech: ["Solidity", "Web3", "DeFi Protocols"]
    },
    {
      id: 6,
      title: "Custom Web & Mobile",
      shortTitle: "Apps",
      description: "Tailored websites and applications with cutting-edge design, optimal performance, and seamless user experiences.",
      icon: "💻",
      color: "from-teal-400 to-cyan-600",
      particles: "✨",
      tech: ["React", "Next.js", "Mobile Development"]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: '#0c1c3c' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: activeProduct 
            ? `radial-gradient(circle, ${products.find(p => p.id === activeProduct)?.color.split(' ')[1]} 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          opacity: activeProduct ? 0.3 : 0.1
        }}
      />

      <div className="relative z-20 py-20 px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6 tracking-tight">
            PRODUCTS
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Navigate the future with our cutting-edge blockchain & AI solutions
          </p>
        </div>

        {/* Hexagonal Product Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="relative group"
                onMouseEnter={() => setActiveProduct(product.id)}
                onMouseLeave={() => setActiveProduct(null)}
                style={{
                  transform: index % 2 === 1 ? 'translateY(4rem)' : 'translateY(0)'
                }}
              >
                {/* Hexagonal Container */}
                <div className="relative">
                  {/* Main Hexagon */}
                  <div 
                    className={`
                      w-72 h-72 mx-auto relative cursor-pointer
                      transform transition-all duration-700 ease-out
                      ${activeProduct === product.id ? 'scale-110 rotate-6' : 'group-hover:scale-105'}
                    `}
                    style={{
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  >
                    {/* Background Gradient */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-80`}
                    />
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 border-4 border-white/20 group-hover:border-white/40 transition-all duration-500"
                         style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                      {/* Icon */}
                      <div className="text-6xl mb-4 transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                        {product.icon}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-white font-bold text-xl mb-2 opacity-90">
                        {product.shortTitle}
                      </h3>
                      
                      {/* Particle Animation */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`
                              absolute text-2xl opacity-0 group-hover:opacity-100
                              transform transition-all duration-1000 ease-out
                              ${activeProduct === product.id ? 'animate-bounce' : ''}
                            `}
                            style={{
                              left: `${20 + (i * 15)}%`,
                              top: `${20 + (i * 10)}%`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          >
                            {product.particles}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expanding Info Panel */}
                  <div className={`
                    absolute -bottom-20 left-1/2 transform -translate-x-1/2
                    w-80 bg-gray-900/95 backdrop-blur-lg rounded-2xl p-6
                    border border-gray-700/50 shadow-2xl
                    transition-all duration-500 ease-out origin-top
                    ${activeProduct === product.id 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                    }
                  `}>
                    <h4 className="text-white font-bold text-lg mb-3">
                      {product.title}
                    </h4>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 
                                   text-cyan-300 text-xs rounded-full border border-cyan-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connection Lines */}
                {index < products.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-12 h-px bg-gradient-to-r from-cyan-400/50 to-transparent transform -translate-y-1/2 z-10">
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-y-1/2 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-32">
          <button className="group relative inline-flex items-center px-12 py-6 text-lg font-bold text-white overflow-hidden rounded-full transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            <span className="relative z-10 flex items-center">
              Explore All Solutions
              <svg className="ml-3 w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-2" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;