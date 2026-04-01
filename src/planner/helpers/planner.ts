import type { MomentDay } from "../models";

export const getMomentDay = (): MomentDay => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    const totalMinutes = hours * 60 + minutes;
    
    if (totalMinutes >= 5 * 60 && totalMinutes < 12 * 60) {
        return 'morning';
    } else if (totalMinutes >= 12 * 60 && totalMinutes < 17 * 60) {
        return 'afternoon';
    } else if (totalMinutes >= 17 * 60 && totalMinutes < 21 * 60) {
        return 'evening';
    } else {
        return 'night';
    }
}