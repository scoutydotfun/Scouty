import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe all elements with morph classes
    const morphElements = document.querySelectorAll(
      '.morph-enter, .morph-slide-left, .morph-slide-right, .morph-fade-up, .reveal-on-scroll'
    );

    morphElements.forEach((el) => observer.observe(el));

    // Cleanup
    return () => {
      morphElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
