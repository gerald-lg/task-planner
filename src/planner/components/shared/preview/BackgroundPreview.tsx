import { momentDays } from "@/planner/helpers/planner";
import type { MomentDay } from "@/planner/models/planner.types";
import React from "react";

interface BackgroundPreviewProps {
    previewMomentDay: MomentDay | null;
    setPreviewMomentDay: (day: MomentDay | null) => void;
}

export const BackgroundPreview = React.memo<BackgroundPreviewProps>(({ previewMomentDay, setPreviewMomentDay }) => {

    const isDev = import.meta.env.DEV;
    console.log("BackgroundPreview rendered");

    if (!isDev) {
        return null;
    }

    const changePreview = (day: MomentDay | null) => {
        setPreviewMomentDay(day);
    }

    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/20 p-3 backdrop-blur-sm">
            <div className="text-left text-sm font-semibold text-white">
            Background preview
            </div>
            <div className="flex flex-wrap gap-2">
            <button
                type="button"
                className={`rounded-full px-3 py-1 text-sm font-medium transition ${previewMomentDay === null ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
                onClick={() => changePreview(null)}
            >
                Real time
            </button>
            {momentDays.map((day) => (
                <button
                key={day}
                type="button"
                className={`rounded-full px-3 py-1 text-sm font-medium capitalize transition ${previewMomentDay === day ? 'bg-white text-slate-900' : 'bg-white/20 text-white hover:bg-white/30'}`}
                onClick={() => setPreviewMomentDay(day)}
                >
                {day}
                </button>
            ))}
            </div>
        </div>
    )
})