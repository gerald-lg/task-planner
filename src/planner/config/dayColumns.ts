import type { ColorType, Day } from "@planner/models";

interface DayColumn {
  id: Day;
  name: string;
  color: ColorType;
}

export const dayColumns: DayColumn[] = [
  {
    id: "monday",
    name: "Monday",
    color: "emerald",
  },
  {
    id: "tuesday",
    name: "Tuesday",
    color: "blue",
  },
  {
    id: "wednesday",
    name: "Wednesday",
    color: "rose",
  },
  {
    id: "thursday",
    name: "Thursday",
    color: "amber",
  },
  {
    id: "friday",
    name: "Friday",
    color: "indigo",
  },
  {
    id: "saturday",
    name: "Saturday",
    color: "cyan",
  },
  {
    id: "sunday",
    name: "Sunday",
    color: "orange",
  },
];