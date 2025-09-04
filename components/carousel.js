import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import CareerHeroSlide from './HeaderCarousel1';
import HeaderCarousel3 from "@/components/HeaderCarousel3";
import QuizComponent from "@/components/HeaderCarousel4";
import TechStackCarousel from "@/components/HeaderCarousel2";

// Sample components - replace these with your actual components
const Component1 = () => (
  <div>
    <CareerHeroSlide/>
  </div>
);

const Component2 = () => (
  <div >
    <TechStackCarousel/>
  </div>
);

const Component3 = () => (
  <div >
    <HeaderCarousel3/>
  </div>
);

const Component4 = () => (
  <div >
    <QuizComponent/>
  </div>
);

const HeaderCarousel = () => {
  const components = [Component1, Component2, Component3, Component4];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Define custom timing for each slide (in milliseconds)
  const getSlideTiming = (slideIndex) => {
    // 4th slide (index 3) gets 8 seconds, others get 5 seconds
    return slideIndex === 3 ? 8000 : 5000;
  };

  // Auto-rotate functionality with custom timing
  useEffect(() => {
    if (!isAutoPlaying) return;

    const currentTiming = getSlideTiming(currentSlide);
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % components.length);
    }, currentTiming);

    return () => clearInterval(interval);
  }, [isAutoPlaying, components.length, currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + components.length) % components.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % components.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const CurrentComponent = components[currentSlide];

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Main carousel container */}
      <div className="relative">
        {/* Slide content */}
        <div >
          <CurrentComponent />
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
        >
          <ChevronRight size={24} />
        </button>

        {/* Auto-play toggle */}
        <button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 p-4 bg-gray-100">
        {components.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentSlide === index
                ? 'bg-blue-500 scale-110'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="text-center text-sm text-gray-500 pb-2">
        {currentSlide + 1} of {components.length}
      </div>
    </div>
  );
};

export default HeaderCarousel;