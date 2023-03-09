import { type ApiEvents } from "../utils/interface";

class DataService {
  private readonly events: ApiEvents[];
  constructor(private readonly data: ApiEvents[]) {
    this.events = this.data;
  }

  public static getClick(): void {
    console.log("click");
  }

  public static getResize(): void {
    console.log("resize");
  }

  public getData(): ApiEvents[] {
    return this.events;
  }
}

export default DataService;
