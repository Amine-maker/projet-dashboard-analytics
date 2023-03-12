import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import EventService, { type IEventService } from "../../core/service/EventService";
import { type ApiEvents } from "../../core/utils/interface";
import { parseUserAgents } from "../../core/utils/utils";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChartComponent = (props: { events: ApiEvents[]; title: string }): JSX.Element => {
  const eventService: IEventService = EventService(props.events);

  const option = { responsive: true, maintainAspectRatio: true, plugins: { title: { text: props.title, display: true } } };

  const data = {
    labels: parseUserAgents(eventService.getUnique("userAgent")).map((ua) => ua.browser),
    datasets: [
      {
        label: "Proportion d'envoie par navigateur",
        data: eventService.getUnique("userAgent").map(() => 1),
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} options={option}></Pie>;
};

export default PieChartComponent;
