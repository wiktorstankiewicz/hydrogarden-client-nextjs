import {Dayjs} from "dayjs";

export interface Circuit {
    id: string;
    circuitName: string;
    circuitCode: number;
    circuitSchedule?: CircuitSchedule;
    circuitState: -1|0|1;
}




export interface CircuitSchedule {
    id: string;
    startTime: string;
    startDate: string;
    endDate: string;
    frequencyDays: number;
    wateringTime: number;
    deactivated: boolean;
}
