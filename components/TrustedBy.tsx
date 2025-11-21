
import React, { useEffect, useRef, useState } from 'react';
import { businessImages, BusinessImage } from '../data/businessData';
import Skeleton from './Skeleton';

const Scroller: React.FC<{ direction?: 'left' | 'right', speed?: 'slow' | 'fast', children: React.ReactNode }> = ({ direction = 'left', speed = 'slow', children }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const addAnimation = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      scroller.setAttribute('data-animated', 'true');
      scroller.setAttribute('data-direction', direction);
      // Ensure CSS variable handles the speed correctly
      scroller.style.setProperty('--_animation-duration', speed === 'fast' ? '40s' : '80s');
    };

    addAnimation();
  }, [direction, speed]);

  return (
    <div ref={scrollerRef} className="scroller group overflow-hidden w-full max-w-full">
      <div className="scroller__inner flex w-max gap-8 group-hover:paused">
        {children}
      </div>
    </div>
  );
};

const TrustedBy: React.FC = () => {
  const [images, setImages] = useState<BusinessImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smoother UX transition
    const timer = setTimeout(() => {
      setImages(businessImages);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const renderImageCards = (imageList: BusinessImage[]) => {
    // Duplicate the list enough times to ensure smooth scrolling on wide screens
    const combinedImages = [...imageList, ...imageList];

    return combinedImages.map((image, index) => (
      <div
        key={`${image.category}-${index}`}
        className="relative w-72 h-48 flex-shrink-0 rounded-2xl overflow-hidden group/card border border-slate-700/50 shadow-lg shadow-black/20 transition-transform duration-300 hover:scale-105 z-0 hover:z-10 hover:shadow-indigo-500/20"
        aria-hidden={index >= imageList.length}
      >
        <img
          className="w-full h-full object-cover transition-all duration-700 filter grayscale-0 group-hover/card:saturate-150"
          src={image.src}
          alt={image.alt}
          loading="lazy"
        />
        {/* Glass Gradient Overlay - Lightened to show off the "shine" */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover/card:opacity-20 transition-opacity duration-300"></div>

        {/* Category Label */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30 shadow-sm">
            {image.category}
          </span>
        </div>
      </div>
    ));
  };

  const renderSkeletons = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <div key={`skeleton-${i}`} className="w-72 h-48 flex-shrink-0 bg-slate-800/50 border border-slate-700 rounded-2xl p-4 relative overflow-hidden">
        <Skeleton className="w-full h-full rounded-xl opacity-20" />
      </div>
    ));
  };

  return (
    <section id="trusted-by" className="relative bg-slate-950 py-12 border-y border-slate-800 overflow-hidden">
      {/* Soft Gradient Masks for seamless fade on edges */}
      <div className="absolute top-0 left-0 h-full w-24 sm:w-48 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-24 sm:w-48 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-10">
        <div className="text-center">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-[0.3em] mb-3">Industries We Serve</h2>
          <p className="text-2xl font-extrabold text-white tracking-tight">
            Powering queues for modern businesses everywhere
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {loading ? (
          <div className="flex gap-8 overflow-hidden px-4 justify-center opacity-50">
            {renderSkeletons()}
          </div>
        ) : (
          <Scroller speed="slow" direction="left">
            {renderImageCards(images)}
          </Scroller>
        )}
      </div>
    </section>
  );
};

export default TrustedBy;
