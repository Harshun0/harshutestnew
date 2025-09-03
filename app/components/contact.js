import React from 'react';
import Image from 'next/image';
import { Linkedin, Twitter, Youtube, Facebook, Instagram, Send } from 'lucide-react';

const ConnectWithUs = () => {
  const socialLinks = [
    {
      icon: Linkedin,
      handle: '@lorem epsum',
      bgColor: 'bg-[#303E55] hover:bg-blue-700',
      link: '#'
    },
    {
      icon: Twitter,
      handle: 'lorem epsum',
      bgColor: 'bg-[#303E55] hover:bg-sky-600',
      link: '#'
    },
    {
      icon: Youtube,
      handle: '@lorem epsum',
      bgColor: 'bg-[#303E55] hover:bg-red-700',
      link: '#'
    },
    {
      icon: Facebook,
      handle: '@lorem epsum',
      bgColor: 'bg-[#303E55] hover:bg-blue-900',
      link: '#'
    },
    {
      icon: Instagram,
      handle: 'lorem epsum',
      bgColor: 'bg-[#303E55] hover:bg-pink-700',
      link: '#'
    },
    {
      icon: Send,
      handle: 'lorem epsum',
      bgColor: 'bg-[#303E55] hover:bg-blue-600',
      link: '#'
    }
  ];

  return (
    <div className="bg-[#0c1c3c] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Connect <span className="text-blue-400">with us</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Image */}
          <div className="lg:w-1/3 w-full">
            <div className="relative w-full h-45 md:h-80">
              <Image
                src="https://res.cloudinary.com/drvug594q/image/upload/v1751518516/image_tazd6s.jpg"
                alt="Team collaboration with digital interfaces"
                fill
                className="rounded-lg shadow-2xl object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-blue-600 bg-opacity-20 rounded-lg"></div>
            </div>
          </div>

          {/* Right side - Social Links */}
          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.link}
                    className={`${social.bgColor} transition-all duration-300 transform hover:scale-105 rounded-lg p-4 flex items-center gap-4 text-white shadow-lg hover:shadow-xl`}
                  >
                    <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                      <IconComponent size={24} />
                    </div>
                    <span className="font-medium text-lg">{social.handle}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16">
          <p className="text-xl md:text-2xl text-white">
            Think <span className="text-red-500 font-bold">SAP</span>, Think{' '}
            <span className="text-blue-400 font-bold">SoftCore Solutions</span>...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithUs;