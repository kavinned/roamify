import { useEffect, useRef, useState } from "react";

export default function useCollapseText() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (textRef.current) {
            textRef.current.style.setProperty(
                "--scroll-height",
                `${textRef.current.scrollHeight}px`
            );
            setShowButton(
                textRef.current.scrollHeight > textRef.current.clientHeight
            );
        }
    }, []);

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
