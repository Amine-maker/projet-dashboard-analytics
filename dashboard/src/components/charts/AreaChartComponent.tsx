import React from "react";
import EventService, { type IEventService } from "../../core/service/EventService";
import { type ApiEvents } from "../../core/utils/interface";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { getHours } from "../../core/utils/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const AreaChartComponent = (props: { events: ApiEvents[]; title: string }): JSX.Element => {
  const eventService: IEventService = EventService(props.events);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const hours = Array.from({ length: 12 }, (_, index) => index * 2);

  const h: number[] = [];
  hours.map((hour) => {
    const r = eventService.getUniqueValuesWithCount("clientTimestamp").filter((t) => getHours(t.value) === hour);

    if (r.length > 0) {
      console.log(r);
      const count = r.reduce((current, acc) => (current.count += acc.count));

      h.push(count);
    } else h.push(0);
  });

  console.log(h);

  const labels = Array.from({ length: 12 }, (_, index) => index * 2);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Nombre d'envoie d'evenements",
        data: h, // labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default AreaChartComponent;
