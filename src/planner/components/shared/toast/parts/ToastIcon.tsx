import { useEffect, useState } from "react";
import type { ToastIconComponent } from "../types";

type ToastIconProps = {
    className?: string;
    loadIcon: () => Promise<ToastIconComponent>;
    size?: number;
    strokeWidth?: number;
};

export const ToastIcon = ({ className, loadIcon, size = 18, strokeWidth = 2.2 }: ToastIconProps) => {
    const [Icon, setIcon] = useState<ToastIconComponent | null>(null);

    useEffect(() => {
        let mounted = true;

        loadIcon().then((nextIcon) => {
            if (mounted) {
                setIcon(() => nextIcon);
            }
        });

        return () => {
            mounted = false;
        };
    }, [loadIcon]);

    if (!Icon) {
        return <div className="h-5 w-5 shrink-0" aria-hidden="true" />;
    }

    return (
        <div className={className}>
            <Icon size={size} strokeWidth={strokeWidth} />
        </div>
    );
};