import { ApiRequest, EdulinkApiResponse } from "./api";

type TimetableParams = {
  date: string;
  learner_id: string;
  format: number;
};

export type TimetableRequest = ApiRequest<"EduLink.Timetable", TimetableParams>;

export interface TimetablePeriods {
  id: string | number;
  external_id?: string | number;
  name: string;
  start_time: string;
  end_time: string;
  empty?: boolean;
}

export interface TimetableLessons {
  description: string;
  period_id: string | number;
  room: {
    id: number;
    name: string;
  };
  room_id: number;
  teacher?:
    | {
        id: number | string;
        title: string;
        forename: string;
        surname: string;
      }
    | string[];
  teachers?: (
    | {
        id: number;
        title: string;
        forename: string;
        surname: string;
      }
    | string[]
  )[];
  teaching_group?: {
    id: number;
    name: string;
    subject: string;
  };
  teaching_group_id?: number;
}

export interface TimetableDay {
  cycle_day_id: string;
  name: string;
  original_name: string;
  date: string;
  is_current: boolean;
  lessons: TimetableLessons[];
  periods: TimetablePeriods[];
}

export interface TimetableWeek {
  name: string;
  is_current: boolean;
  days: TimetableDay[];
}

export type TimetableResponse = EdulinkApiResponse<{
  method: "EduLink.Timetable";
  success: boolean;
  requested_date: string;
  showing_from: string;
  showing_to: string;
  weeks: TimetableWeek[];
}>;

export namespace TimetableResponse {
  export type Week = TimetableWeek;
  export type Day = TimetableDay;
  export type Period = TimetablePeriods;
  export type Lesson = TimetableLessons;
}