import type { MomentDay } from "@planner/models";

const MORNING_START = 5 * 60;
const AFTERNOON_START = 12 * 60;
const EVENING_START = 17 * 60;
const NIGHT_START = 21 * 60;
const MINUTES_PER_DAY = 24 * 60;

export const momentDays: MomentDay[] = ['morning', 'afternoon', 'evening', 'night'];

export const getMomentDay = (date = new Date()): MomentDay => {
    const totalMinutes = date.getHours() * 60 + date.getMinutes();

    if (totalMinutes >= MORNING_START && totalMinutes < AFTERNOON_START) {
        return 'morning';
    }

    if (totalMinutes >= AFTERNOON_START && totalMinutes < EVENING_START) {
        return 'afternoon';
    }

    if (totalMinutes >= EVENING_START && totalMinutes < NIGHT_START) {
        return 'evening';
    }

    return 'night';
};

export const getMillisecondsUntilNextMomentDay = (date = new Date()): number => {
    const totalMinutes = date.getHours() * 60 + date.getMinutes();
    const totalMilliseconds = date.getSeconds() * 1000 + date.getMilliseconds();

    let nextBoundaryMinutes = MORNING_START;

    if (totalMinutes < MORNING_START) {
        nextBoundaryMinutes = MORNING_START;
    } else if (totalMinutes < AFTERNOON_START) {
        nextBoundaryMinutes = AFTERNOON_START;
    } else if (totalMinutes < EVENING_START) {
        nextBoundaryMinutes = EVENING_START;
    } else if (totalMinutes < NIGHT_START) {
        nextBoundaryMinutes = NIGHT_START;
    } else {
        nextBoundaryMinutes = MORNING_START + MINUTES_PER_DAY;
    }

    return (nextBoundaryMinutes - totalMinutes) * 60_000 - totalMilliseconds + 1;
};

export const backgroundByMoment = {
  morning: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
  afternoon: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)',
  evening: 'linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)',
  night: 'linear-gradient(to right, #434343 0%, black 100%)',
} as const;