import { useEffect } from "react";
type EventType = "paste" | "copy" | "cut"
interface RestrictCopyPasteProps {
    window: Window
    actions: [EventType?,EventType?,EventType?]
}
export const useRestrictCopyPaste = (props: RestrictCopyPasteProps) => {
    useEffect(() => {
        props.actions?.forEach((action) => {
            action && window.addEventListener(action, preventPaste);
        })
        return () => {
            props.actions.forEach((action) => {
                action && window.removeEventListener(action, preventPaste);
            })
        };
    }, [props.window, props.actions]);

    const preventPaste = (e: Event) => {
        alert("Copy and/or Paste is not allowed!")
        e.preventDefault()
    }
}