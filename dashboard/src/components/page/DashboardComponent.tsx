import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type ApiEvents } from "../../core/utils/interface";
import { useSite } from "../../hooks/SiteHook";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import DataService from "../../core/service/DataService";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Dashboard = (): JSX.Element => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const { getEvents, sites } = useSite();
  let { siteId } = useParams();
  const [events, setEvents] = useState<ApiEvents[]>([]);
  const dataService = new DataService(events);

  useEffect(() => {
    if (siteId == null && sites != null && sites?.length > 0) {
      siteId = sites[0].id;
    } else if (sites?.length === 0) {
      return;
    }
    void getEvents(siteId as string).then((apiEvents) => {
      setEvents(apiEvents);
    });
  }, [siteId]);

  console.log(dataService.getData());

  return (
    <section className="ml-60">
      <div>{events.length > 0 ? <div>data</div> : <div>pas data</div>}</div>
      <Pie height={200} width={200} data={data} />
    </section>
  );
};
