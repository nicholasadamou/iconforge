'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;

    const animate = (element: Element, keyframes: Keyframe[], duration: number, delay = 0) => {
      const animation = element.animate(keyframes, {
        duration,
        delay,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const stop = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const start = () => {
      stop();
      if (preference.matches) return;
      const content = document.querySelector('main');
      if (content) animate(content, [{ opacity: 0.6 }, { opacity: 1 }], 280);
      if (pathname !== '/') return;

      // Observe only offscreen sections; content stays visible without JavaScript.
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer?.unobserve(entry.target);
            const section = entry.target;
            const children = section.classList.contains('marketing-band')
              ? section.firstElementChild?.children
              : section.children;
            Array.from(children ?? []).forEach((child, index) =>
              animate(
                child,
                [
                  { opacity: 0.4, transform: 'translateY(14px)' },
                  { opacity: 1, transform: 'none' },
                ],
                520,
                Math.min(index, 3) * 55,
              ),
            );
          }
        },
        { rootMargin: '0px 0px -24px 0px', threshold: 0 },
      );
      document.querySelectorAll('main > section').forEach((section) => {
        if (section.getBoundingClientRect().top >= innerHeight) observer?.observe(section);
      });
    };

    start();
    preference.addEventListener('change', start);
    return () => {
      stop();
      preference.removeEventListener('change', start);
    };
  }, [pathname]);

  return null;
}
