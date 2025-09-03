"use client";
import React, { useState, useEffect } from 'react';
import { Package, Award, Puzzle, Heart, Users, Globe, Calendar, Briefcase } from 'lucide-react';

const SAPProductsShowcase = () => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sapProducts = [
    {
      id: 1,
      icon: <Package className="w-8 h-8 text-blue-500" />,
      title: "SAP S/4HANA",
      subtitle: "ERP Suite",
      position: "top-left"
    },
    {
      id: 2,
      icon: <Award className="w-8 h-8 text-blue-500" />,
      title: "SAP SuccessFactors",
      subtitle: "HR Management",
      position: "top-right"
    },
    {
      id: 3,
      icon: <Puzzle className="w-8 h-8 text-blue-500" />,
      title: "SAP Ariba",
      subtitle: "Procurement",
      position: "middle-left"
    },
    {
      id: 4,
      icon: <Heart className="w-8 h-8 text-blue-500" />,
      title: "SAP Concur",
      subtitle: "Expense Management",
      position: "middle-right"
    },
    {
      id: 5,
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "SAP Analytics Cloud",
      subtitle: "Business Intelligence",
      position: "bottom-left"
    },
    {
      id: 6,
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      title: "SAP Commerce",
      subtitle: "E-Commerce Platform",
      position: "bottom-right"
    }
  ];

  const getPositionClasses = (position) => {
    const positions = {
      'top-left': 'absolute top-16 left-20',
      'top-right': 'absolute top-16 right-20',
      'middle-left': 'absolute top-1/2 left-20 transform -translate-y-1/2',
      'middle-right': 'absolute top-1/2 right-20 transform -translate-y-1/2',
      'bottom-left': 'absolute bottom-16 left-20',
      'bottom-right': 'absolute bottom-16 right-20'
    };
    return positions[position] || '';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < sapProducts.length) {
        setVisibleProducts(prev => [...prev, sapProducts[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      } else {
        // Reset animation after all products are shown
        setTimeout(() => {
          setVisibleProducts([]);
          setCurrentIndex(0);
        }, 3000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [currentIndex, sapProducts.length]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{backgroundColor: '#0c1c3c'}}>
      <div className="relative w-full max-w-8xl h-[800px]">
        
        {/* Central Container - SAP Box */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Animated Box */}
            <div className="w-64 h-64 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white transform transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold mb-2">SAP</div>
              <div className="text-lg opacity-90">Enterprise Solutions</div>
              <div className="mt-4 text-sm opacity-75">Products: {visibleProducts.length}/{sapProducts.length}</div>
            </div>

            {/* Floating Particles Effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-ping"
                  style={{
                    top: `${20 + (i * 15)}%`,
                    left: `${15 + (i * 12)}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards */}
        {visibleProducts.map((product, index) => (
          <div
            key={product.id}
            className={`${getPositionClasses(product.position)} transition-all duration-700 ease-out transform`}
            style={{
              animation: `slideOut${product.position.replace('-', '')} 0.7s ease-out forwards`,
              animationDelay: '0s'
            }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 w-64 border border-blue-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors duration-300">
                  {product.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{product.title.split(' ')[1] || 'SAP'}</div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-semibold text-gray-800">{product.title}</div>
                <div className="text-sm text-gray-600">{product.subtitle}</div>
              </div>
              
              {/* Hover Effect */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-10 w-16 h-16 bg-blue-600 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideOuttopleft {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes slideOuttopright {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes slideOutmiddleleft {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          100% { transform: translate(0, -50%) scale(1); opacity: 1; }
        }
        @keyframes slideOutmiddleright {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          100% { transform: translate(0, -50%) scale(1); opacity: 1; }
        }
        @keyframes slideOutbottomleft {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes slideOutbottomright {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SAPProductsShowcase;