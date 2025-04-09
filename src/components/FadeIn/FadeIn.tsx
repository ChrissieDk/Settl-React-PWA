import React, { useEffect, useState, useRef, ReactNode, CSSProperties } from 'react';

interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  duration = 500, 
  delay = 0,
  threshold = 0.1,
  once = true,
  className = '',
  style = {}
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const domRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const current = domRef.current;
    
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && current) observer.unobserve(current);
        }
      });
    }, { threshold });
    
    if (current) {
      observer.observe(current);
    }
    
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [once, threshold]);
  
  const fadeInStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
    transitionDelay: `${delay}ms`,
    ...style
  };
  
  return (
    <div 
      ref={domRef}
      style={fadeInStyle}
      className={className}
    >
      {children}
    </div>
  );
};

export default FadeIn;