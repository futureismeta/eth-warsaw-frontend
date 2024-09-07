import React, { useState, createContext, useMemo, useCallback, ReactNode, FC } from 'react';
import GenericPopup from "../../components/Popup";

// Define the context type
export interface PopupContextType {
    isOpen: boolean;
    title: string;
    content: ReactNode | null;
    openPopup: (newContent: ReactNode, newTitle: string) => void;
    closePopup: () => void;
}

// Create a context with a default value
export const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Provider component to wrap around components that need access to the popup context
export const PopupProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState<ReactNode | null>(null);

    const openPopup = useCallback((newContent: ReactNode, newTitle: string) => {
        setContent(newContent);
        setTitle(newTitle);
        setIsOpen(true);
    }, []);

    const closePopup = useCallback(() => {
        setIsOpen(false);
        setContent(null);
        setTitle('');
    }, []);

    const value = useMemo(
        () => ({
            isOpen,
            title,
            content,
            openPopup,
            closePopup,
        }),
        [isOpen, title, content, openPopup, closePopup]
    );

    return (
        <PopupContext.Provider value={value}>
            {children}
            {isOpen && (
                <GenericPopup title={title} onClose={closePopup}>
                    {content}
                </GenericPopup>
            )}
        </PopupContext.Provider>
    );
};
