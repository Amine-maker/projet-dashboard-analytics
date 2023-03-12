import React from "react";
import EventService, { type IEventService } from "../../core/service/EventService";
import { type ApiEvents } from "../../core/utils/interface";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

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

  const labels = Array.from({ length: 13 }, (_, index) => index * 2);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Nombre d'evenements",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default AreaChartComponent;
