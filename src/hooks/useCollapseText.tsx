import { useEffect, useRef, useState } from "react";

export default function useCollapseText() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    const currentRef = textRef.current;

    function checkShowButton() {
        if (textRef.current) {
            textRef.current.style.setProperty(
                "--scroll-height",
                `${textRef.current.scrollHeight}px`
            );
            setShowButton(
                textRef.current.scrollHeight !== textRef.current.clientHeight
            );
        }
    }

    useEffect(() => {
        setIsExpanded(false);
        setTimeout(() => checkShowButton(), 1000);

        const handleResize = () => checkShowButton();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [currentRef]);

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    };

    return {
        isExpanded,
        toggleText,
        textRef,
        showButton,
    };
}
