import { RefObject } from "react";

export const useDropdownPosition = (ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>) => {
    const getDropdownPosition = () => {
        if (!ref.current) return { top: 0, left: 0 };

        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240;

        // Calculate the initial position
        let top = rect.bottom + window.scrollY;
        let left = rect.left + window.scrollX

        // Check if the dropdown goes off the right side of the screen
        if (left + dropdownWidth > window.innerWidth) {
            // Align to the right side of the screen
            left = rect.right - dropdownWidth + window.scrollX;

            // If still off screen, align to the right edge of viewport with some padding
            if (left < 0) {
                left = window.innerWidth - dropdownWidth - 16; // 16px padding
            }
        }

        // Ensure dropdown doesn't go off left edge
        if (left < 0) {
            left = 16
        }

        return { top, left }
    }

    return { getDropdownPosition }
}