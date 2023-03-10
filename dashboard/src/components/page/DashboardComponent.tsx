import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type ApiEvents } from "../../core/utils/interface";
import { useSite } from "../../hooks/SiteHook";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import EventService, { type IEventService } from "../../core/service/EventService";
import HeaderDashboard from "../layout/HeaderDashboard";
import { parseUserAgents, RenderIf } from "../../core/utils/utils";
import BasicMetricComponent from "../item/BasicMetricComponent";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const Dashboard = (): JSX.Element => {
  const { getEvents, sites } = useSite();
  let { siteId } = useParams();
  const [events, setEvents] = useState<ApiEvents[]>([]);
  const eventService: IEventService = EventService(events);

  const data = {
    labels: parseUserAgents(eventService.getUnique("userAgent")).map((ua) => ua.browser),
    datasets: [
      {
        label: "Navigateurs utilisé",
        data: eventService.getUniqueValuesWithCount("userAgent").map((v) => v.count),
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

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

  console.log(eventService.getUnique("ipAddress"));

  return (
    <section className="bg-gray-50 h-screen ml-60">
      <HeaderDashboard setEvents={setEvents} siteId={siteId} />

      <div>{events.length > 0 ? <div>data</div> : <div>Aucune données concernant ce site</div>}</div>
      <RenderIf isTrue={events.length > 0}>
        <div className="flex flex-wrap">
          <div className="data-container">
            <Pie data={data} options={{ responsive: true, maintainAspectRatio: true, plugins: { title: { text: "user agent", display: true } } }}></Pie>
          </div>
          <BasicMetricComponent data={{ displayData: eventService.getEvents("click").length, title: "Nombre total de clicks" }}></BasicMetricComponent>
          <BasicMetricComponent data={{ displayData: eventService.getEvents("resize").length, title: "Nombre total de resize" }}></BasicMetricComponent>
          <BasicMetricComponent data={{ displayData: eventService.getUnique("ipAddress").length, title: "Nombre d'utilisateur unique" }}></BasicMetricComponent>
        </div>
      </RenderIf>
    </section>
  );
};
