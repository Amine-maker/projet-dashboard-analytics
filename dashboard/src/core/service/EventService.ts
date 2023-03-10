import { type IEvent, type ApiEvents, type EventType } from "../utils/interface";

const EventService = (data: ApiEvents[]): IEventService => {
  return {
    getEvents<T extends EventType>(type: T): IEvent[] {
      const clicks = data
        .map((events) => {
          return events.events.filter((event) => event.type === type);
        })
        .flat(1);
      return clicks;
    },
    getData() {
      return data;
    },
    getUnique<T extends keyof ApiEvents>(label: T): Array<ApiEvents[T]> {
      return Array.from(new Set(data.map((events) => events[label])));
    },
    getUniqueValuesWithCount<T extends keyof ApiEvents>(property: T): Array<UniqueCount<ApiEvents[T]>> {
      const uniqueValues = Array.from(new Set(data.map((events) => events[property])));
      const counts = uniqueValues.map((value) => ({
        value,
        count: data.filter((events) => events[property] === value).length,
      }));
      return counts;
    },
  };
};

export interface IEventService {
  getEvents: <T extends EventType>(type: T) => IEvent[];
  getData: () => ApiEvents[];
  getUnique: <T extends keyof ApiEvents>(type: T) => Array<ApiEvents[T]>;
  getUniqueValuesWithCount: <T extends keyof ApiEvents>(property: T) => Array<UniqueCount<ApiEvents[T]>>;
}

export default EventService;

interface UniqueCount<T> {
  value: T;
  count: number;
}
