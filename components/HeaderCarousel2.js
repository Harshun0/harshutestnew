"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Rocket, Zap, Shield, Database, BarChart3 } from 'lucide-react';
import Link from "next/link";
import { BackgroundBeamsWithCollision } from './ui/background-beams-with-collision';
const TechStackCarousel = ({ isParentActive = true, parentCarouselIndex = 1, onParentSlideChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [rotation, setRotation] = useState({ x: -15, y: 25 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cubeRef = useRef(null);
  const animationRef = useRef(null);
  const autoSlideRef = useRef(null);
  const containerRef = useRef(null);

  // Updated slides data with href links
  const slides = useMemo(() => [
    {
      title: "MERN Stack",
      subtitle: "Full Stack JavaScript",
      description: "MongoDB, Express, React, and Node.js combined for robust web applications.",
      buttonText: "Explore MERN",
      href: "/mern-stack-course-in-pune",
      icon: <span className="text-3xl sm:text-4xl">🟢</span>
    },
    {
      title: "Tableau",
      subtitle: "Data Visualization Tool",
      description: "Powerful data visualization and business intelligence platform for creating interactive dashboards and insights.",
      buttonText: "Explore Tableau",
      href: "/tableau-course-in-pune",
      icon: <span className="text-3xl sm:text-4xl">📊</span>
    },
    {
      title: "Java Stack",
      subtitle: "Spring Boot + React", 
      description: "Java-based backend with React frontend and MySQL database.",
      buttonText: "Learn Java Stack",
      href: "/java-course-in-pune",
      icon: <span className="text-3xl sm:text-4xl">☕</span>
    },
    {
      title: "Python Stack",
      subtitle: "Django + Vue.js",
      description: "Full-stack development with Django, PostgreSQL, and Vue.js.",
      buttonText: "Explore Python", 
      href: "/python-course-in-pune",
      icon: <span className="text-3xl sm:text-4xl">🐍</span>
    },
    {
      title: "Salesforce",
      subtitle: "CRM Platform",
      description: "Leading cloud-based CRM platform to manage customer relationships, automate workflows, and boost business productivity.",
      buttonText: "Learn Salesforce",
      href: "/salesforce-course-in-pune",
      icon: <span className="text-3xl sm:text-4xl">☁️</span>
    },
    {
      title: "Full Stack Training",
      subtitle: "Frontend & Backend Mastery",
      description: "Learn complete web development with HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB to build dynamic, scalable applications.",
      buttonText: "Start Full Stack",
      href: "/full-stack-developer-course-in-pune",
      icon: <span className="text-3xl sm:text-4xl">💻</span>
    }    
  ], []);

  const features = useMemo(() => [
    {
      title: "Fast Implementation",
      description: "Accelerated deployment with proven methodologies",
      icon: "🚀",
      emoji: "⚡"
    },
    {
      title: "Custom Solutions", 
      description: "Tailored SAP solutions for your business needs",
      icon: "🛡️",
      emoji: "🔧"
    },
    {
      title: "High Performance",
      description: "Optimized for speed and scalability", 
      icon: "⚡",
      emoji: "🚀"
    },
    {
      title: "Enterprise Security",
      description: "Bank-level security standards",
      icon: "🔒",
      emoji: "🛡️"
    }
  ], []);

  const techStacks = useMemo(() => [
    {
      name: "MERN Stack",
      description: "MongoDB, Express, React, Node.js",
      icon: "🟢",
      color: "bg-green-100",
      textColor: "text-green-800"
    },
    {
      name: "Tableau",
      description: "Data Visualization & Business Intelligence",
      icon: "📊",
      color: "bg-indigo-100",
      textColor: "text-indigo-800"
    },
    {
      name: "Java Stack",
      description: "Spring Boot, MySQL, React",
      icon: "☕",
      color: "bg-orange-100", 
      textColor: "text-orange-800"
    },
    {
      name: "Python Stack",
      description: "Django, PostgreSQL, Vue.js",
      icon: "🐍",
      color: "bg-blue-100",
      textColor: "text-blue-800"
    },
    {
      name: "Salesforce", 
      description: "Cloud-based CRM Platform",
      icon: "☁️",
      color: "bg-sky-100",
      textColor: "text-sky-800"
    },
    {
      name: "Full Stack Training",
      description: "Frontend & Backend Mastery",
      icon: "💻",
      color: "bg-yellow-100",
      textColor: "text-yellow-800"
    }
  ], []);

  // Smooth animation with higher frequency for better performance
  useEffect(() => {
    let lastTime = 0;
    const animate = (currentTime) => {
      if (currentTime - lastTime >= 16) { // 60fps for smooth animation
        if (!isDragging && isParentActive) {
          setRotation(prev => ({
            x: prev.x + 0.5, // Increased rotation speed
            y: prev.y + 1.2
          }));
        }
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Animate when active (defaults to true) across all viewports
    if (isParentActive) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, isParentActive]);

  // Improved event detection - only handle events on the actual 3D cube faces
  const isWithinCubeFace = useCallback((target) => {
    return target.closest && target.closest('[data-cube-face="true"]');
  }, []);

  // Only handle mouse events on the actual cube faces
  const handleMouseDown = useCallback((e) => {
    // Only handle if clicking directly on cube faces
    if (!isWithinCubeFace(e.target)) {
      return; // Let parent carousel handle the event
    }
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX - rotation.y,
      y: e.clientY + rotation.x
    });
  }, [rotation.x, rotation.y, isWithinCubeFace]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const newRotationY = e.clientX - dragStart.x;
    const newRotationX = dragStart.y - e.clientY;
    
    setRotation({
      x: Math.max(-90, Math.min(90, newRotationX)),
      y: newRotationY
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback((e) => {
    setIsDragging(false);
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      // Attach to document to catch events outside component
      const handleDocumentMouseMove = (e) => {
        e.preventDefault();
        handleMouseMove(e);
      };
      
      const handleDocumentMouseUp = (e) => {
        e.preventDefault();
        handleMouseUp(e);
      };
      
      document.addEventListener('mousemove', handleDocumentMouseMove, { passive: false });
      document.addEventListener('mouseup', handleDocumentMouseUp, { passive: false });
      
      return () => {
        document.removeEventListener('mousemove', handleDocumentMouseMove);
        document.removeEventListener('mouseup', handleDocumentMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Only handle touch events on the actual cube faces
  const handleTouchStart = useCallback((e) => {
    // Only handle if touching directly on cube faces
    if (!isWithinCubeFace(e.target)) {
      return; // Let parent carousel handle the event
    }
    
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX - rotation.y,
      y: touch.clientY + rotation.x
    });
  }, [rotation.x, rotation.y, isWithinCubeFace]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const newRotationY = touch.clientX - dragStart.x;
    const newRotationX = dragStart.y - touch.clientY;
    
    setRotation({
      x: Math.max(-90, Math.min(90, newRotationX)),
      y: newRotationY
    });
  }, [isDragging, dragStart]);

  const handleTouchEnd = useCallback((e) => {
    setIsDragging(false);
  }, [isDragging]);

  // Navigation functions - no need to stop propagation for parent carousel
  const nextSlide = useCallback((e) => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback((e) => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleSlideClick = useCallback((index, e) => {
    setCurrentSlide(index);
  }, []);

  // Auto-slide with cleanup - only when parent is active and this slide is visible
  useEffect(() => {
    if (isParentActive && parentCarouselIndex === 1) { // Only auto-slide when this slide is active
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    } else if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [slides.length, isParentActive, parentCarouselIndex]);

  // Memoized cube transforms
  const cubeTransforms = useMemo(() => [
    'translateZ(140px)', // Front - reduced from 170px
    'translateZ(-140px) rotateY(180deg)', // Back
    'rotateY(90deg) translateZ(140px)', // Right
    'rotateY(-90deg) translateZ(140px)', // Left
    'rotateX(90deg) translateZ(140px)', // Top
    'rotateX(-90deg) translateZ(140px)' // Bottom
  ], []);

  return (
    <BackgroundBeamsWithCollision className="min-h-fit md:min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat">
    <div 
      ref={containerRef}
      
      
    >
      <div 
        className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-8 pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-10 md:pb-12 relative z-10"
        style={{ pointerEvents: 'none' }} // Disable pointer events on container
      >
        
        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between gap-4 md:gap-6 lg:gap-8 xl:gap-12">
            {/* Desktop: Carousel on Left */}
            <div className="w-1/2 max-w-xs md:max-w-sm lg:max-w-lg">
              <div className="relative">
                <div 
                  className="bg-[#0a174e] rounded-2xl md:rounded-3xl p-4 md:p-6 xl:p-8 text-white shadow-2xl transform transition-all duration-500 hover:scale-105 will-change-transform"
                  style={{ pointerEvents: 'auto' }} // Re-enable for carousel content
                >
                  <div className="flex items-center justify-center mb-3 md:mb-4 xl:mb-6">
                    {slides[currentSlide].icon}
                  </div>
                 
                  <div className="text-center">
                    <p className="text-blue-200 text-sm font-medium mb-2 tracking-wider">
                      {slides[currentSlide].subtitle}
                    </p>
                    <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 md:mb-4 xl:mb-6 leading-tight">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-blue-100 text-sm md:text-base xl:text-lg mb-4 md:mb-6 xl:mb-8 leading-relaxed">
                      {slides[currentSlide].description}
                    </p>
                   
                    <Link 
  href={slides[currentSlide].href}
  className="inline-block cursor-pointer bg-white text-blue-600 font-semibold px-4 md:px-6 xl:px-8 py-2 md:py-2.5 xl:py-3 rounded-lg md:rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-xs md:text-sm xl:text-base will-change-transform"
>
  {slides[currentSlide].buttonText}
</Link>
</div>
                </div>

                {/* Carousel Navigation - Allow parent carousel to work */}
                <div 
                  className="flex items-center justify-center mt-4 md:mt-6 space-x-3 md:space-x-4"
                  style={{ pointerEvents: 'auto' }} // Re-enable for navigation
                >
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 will-change-transform"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  </button>
                  <div className="flex space-x-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleSlideClick(index, e)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide ? 'bg-blue-600' : 'bg-blue-300'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-black will-change-transform"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop: 3D Cube on Right - Complete event isolation */}
            <div className="w-1/2 flex justify-center">
              <div 
                className="relative flex justify-center"
                style={{ pointerEvents: 'auto' }} // Re-enable for cube interaction only
              >
                <div
                  ref={cubeRef}
                  data-cube-container="true"
                  className="relative cursor-grab active:cursor-grabbing select-none md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px]"
                  style={{
                    width: '160px',
                    height: '160px',
                    perspective: '500px',
                    transformStyle: 'preserve-3d'
                  }}
  
                >
                  <div
                    className="relative w-full h-full transition-transform duration-300 ease-out will-change-transform"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                    }}
                  >
                    {/* Cube Faces */}
                    {techStacks.map((stack, index) => (
                      <div
                        key={index}
                        data-cube-face="true"
                        onClick={(e) => handleSlideClick(index, e)}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        className="absolute w-full h-full bg-white/40 rounded-xl md:rounded-2xl shadow-2xl flex flex-col items-center justify-center p-2 md:p-4 xl:p-6 transition-all duration-300 hover:shadow-3xl backdrop-blur-lg cursor-pointer will-change-transform"
                        style={{ 
                          transform: cubeTransforms[index]
                        }}
                      >
                        <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-1 md:mb-2 xl:mb-3">{stack.icon}</div>
                        <h3 className="text-xs md:text-sm lg:text-lg xl:text-2xl font-bold text-gray-800 mb-1 xl:mb-2 text-center leading-tight">{stack.name}</h3>
                        <p className="text-gray-600 text-center text-xs md:text-sm xl:text-base mb-1 md:mb-2 xl:mb-3 leading-tight px-1">{stack.description}</p>
                        <div className="px-2 md:px-3 xl:px-4 py-1 md:py-1.5 xl:py-2 bg-green-100 rounded-full">
                          <span className="text-green-800 font-semibold text-xs md:text-sm xl:text-base">Popular</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards - Desktop - Strip Style */}
          <div className="mt-8 md:mt-10 lg:mt-12 xl:mt-16">
            <div 
              className="flex flex-wrap justify-center gap-2 md:gap-3 xl:gap-4 max-w-6xl mx-auto"
              style={{ pointerEvents: 'auto' }} // Re-enable for feature cards
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#1884b6] rounded-full px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 will-change-transform flex items-center gap-2 md:gap-3 min-w-fit"
                >
                  <span className="text-base md:text-lg lg:text-xl">{feature.emoji}</span>
                  <span className="font-semibold text-white text-xs md:text-sm lg:text-base xl:text-lg whitespace-nowrap">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Cube Hidden */}
        <div 
          className="flex flex-col md:hidden gap-3 sm:gap-4 mt-4 sm:mt-6"
          style={{ pointerEvents: 'auto' }} // Re-enable for mobile layout
        >
          {/* Mobile: Carousel Card - Match HeaderCarousel1 Size */}
          <div className="w-full px-4 sm:px-6">
            <div className="relative max-w-full sm:max-w-lg mx-auto">
              <div className="bg-[#0a174e] rounded-2xl p-4 sm:p-6 text-white shadow-2xl transform transition-all duration-500 hover:scale-105 will-change-transform">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  {slides[currentSlide].icon}
                </div>
               
                <div className="text-center">
                  <p className="text-blue-200 text-sm sm:text-base font-medium mb-2 tracking-wider">
                    {slides[currentSlide].subtitle}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                    {slides[currentSlide].description}
                  </p>
                 
                  <a 
                    href={slides[currentSlide].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white text-blue-600 font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:-translate-y-1 overflow-hidden w-full sm:w-auto will-change-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {slides[currentSlide].buttonText}
                  </a>
                </div>
              </div>

              {/* Carousel Navigation - Match HeaderCarousel1 Size */}
              <div className="flex items-center justify-center mt-4 sm:mt-6 space-x-4">
                <button
                  onClick={prevSlide}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 will-change-transform"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </button>
                <div className="flex space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleSlideClick(index, e)}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide ? 'bg-blue-600' : 'bg-blue-300'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 border-black will-change-transform"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile: Feature Cards - Only 2 Cards Side by Side */}
          <div className="w-full px-4 sm:px-6 mt-2">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-sm mx-auto">
              {features.slice(0, 2).map((feature, index) => (
                <div
                  key={index}
                  className="bg-[#1884b6] rounded-lg p-1.5 sm:p-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 will-change-transform"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-base sm:text-lg mb-0.5">{feature.emoji}</span>
                    <h4 className="font-semibold text-white text-xs sm:text-sm text-center leading-tight">{feature.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </BackgroundBeamsWithCollision>
  );
};

export default TechStackCarousel;