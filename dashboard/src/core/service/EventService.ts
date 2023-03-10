import { type ApiEvents } from "../utils/interface";

const EventService = (data: ApiEvents[]): IEventService => {
  return {
    getEvents(): void {
      console.log("events");
    },
    getClicks(): void {
      console.log("click");
    },
  };
};

export interface IEventService {
  getEvents: () => void;
  getClicks: () => void;
}

export default EventService;
