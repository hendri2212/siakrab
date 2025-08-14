import { useState, useEffect } from "react";

export function useScreen() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 576);
    const [isTablet, setIsTablet] = useState(
        window.innerWidth >= 576 && window.innerWidth < 992
    );
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 992);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 576);
            setIsTablet(width >= 576 && width < 992);
            setIsDesktop(width > 992);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { isMobile, isTablet, isDesktop };
}
