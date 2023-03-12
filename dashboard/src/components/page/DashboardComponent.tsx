import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type ApiEvents } from "../../core/utils/interface";
import { useSite } from "../../hooks/SiteHook";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import EventService, { type IEventService } from "../../core/service/EventService";
import HeaderDashboard from "../layout/HeaderDashboard";
import { parseUserAgents, RenderIf } from "../../core/utils/utils";
import BasicMetricComponent from "../charts/BasicMetricComponent";
import PieChartComponent from "../charts/PieChartComponent";
import AreaChartComponent from "../charts/AreaChartComponent";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const Dashboard = (): JSX.Element => {
  const { getEvents, sites } = useSite();
  let { siteId } = useParams();
  const [events, setEvents] = useState<ApiEvents[]>([]);
  const eventService: IEventService = EventService(events);

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

  return (
    <section className="bg-gray-50 h-screen ml-60">
      <HeaderDashboard setEvents={setEvents} siteId={siteId} />
      <RenderIf isTrue={events.length === 0}>
        <div>Aucune données concernant ce site</div>
      </RenderIf>
      <RenderIf isTrue={events.length > 0}>
        <div className="flex flex-wrap">
          <div className="data-container">
            <PieChartComponent events={events} title="User Agents" />
          </div>
          <div className="data-container">
            <AreaChartComponent events={events} title="Répartition d'utilisation par heure"></AreaChartComponent>{" "}
          </div>
          <BasicMetricComponent data={{ displayData: eventService.getEvents("click").length, title: "Nombre total de clicks" }}></BasicMetricComponent>
          <BasicMetricComponent data={{ displayData: eventService.getEvents("resize").length, title: "Nombre total de resize" }}></BasicMetricComponent>
          <BasicMetricComponent data={{ displayData: eventService.getUnique("ipAddress").length, title: "Utilisateur unique" }}></BasicMetricComponent>
        </div>
      </RenderIf>
    </section>
  );
};
