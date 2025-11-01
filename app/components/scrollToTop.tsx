'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Отключаем автоматическое восстановление скролла браузера
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        // Проверяем, есть ли якорь в URL
        const hash = window.location.hash;
        
        if (hash) {
            // Если есть якорь, скроллим к нему после небольшой задержки
            setTimeout(() => {
                const element = document.getElementById(hash.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            // Если якоря нет, скроллим наверх
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant' as ScrollBehavior
            });
        }
    }, [pathname]);

    return null;
}