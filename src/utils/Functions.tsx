import React from "react";
import {MONTH, DAYS} from "./Constants";

export function prepareSimulatorDate (event: any, type: string): any {
  const start_time = new Date(event.start_time);

  if (type === 'hours') {
    const end_time = new Date(event.end_time);
    return `${ZeroInTime(start_time.getHours())}:${ZeroInTime(start_time.getMinutes())}h a ${ZeroInTime(end_time.getHours())}:${ZeroInTime(end_time.getMinutes())}h`
  }
  return {
    dayOfWeek: DAYS[start_time.getDay()],
    day: start_time.getDate(),
    month: MONTH[start_time.getMonth()]
  }
}

function ZeroInTime(date: number) {
  if (date <= 9) return `0${date}`;
  return `${date}`;
}

function findTheZoneInMap() {
  return "";
}