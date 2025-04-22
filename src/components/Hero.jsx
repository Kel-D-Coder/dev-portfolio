
import React from 'react';
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="py-20 min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Content */}
          <div className="flex-1 flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="h-1 w-10 bg-blue-600"></div>
              <p className="text-gray-600">Fullstack Developer</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">digital experiences</span>{" "}
              that make an impact
            </h1>
            <p className="text-gray-600 text-lg max-w-xl">
              I'm a fullstack developer specialized in building modern web applications
              with React, Next.js, Node.js, and more. Let's bring your ideas to life.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-blue-600/50 shadow-lg overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="Developer Profile Picture" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
