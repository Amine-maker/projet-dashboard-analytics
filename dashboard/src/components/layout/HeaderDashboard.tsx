import React, { type Dispatch, Fragment, type SetStateAction, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChartPieIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSite } from "../../hooks/SiteHook";
import { Link } from "react-router-dom";
import SiteService from "../../core/service/SiteService";
import { type ApiEvents } from "../../core/utils/interface";

interface PropHeader {
  siteId?: string;
  setEvents: Dispatch<SetStateAction<ApiEvents[]>>;
  children?: React.ReactElement;
}

const HeaderDashboard = (props: PropHeader): JSX.Element => {
  const { sites } = useSite();
  const { events } = SiteService();
  const refresh = async (siteId?: string): Promise<void> => {
    // eslint-disable-next-line no-useless-return
    if (siteId == null && sites?.length === 0) return;
    else if (siteId !== undefined) {
      const refreshedEvents = await events(siteId);
      props.setEvents(refreshedEvents);
    }
  };
  return (
    <header className="bg-white  w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <img className="w-8 h-8 mr-2" src="https://res.cloudinary.com/dvbzs4nlk/image/upload/v1678042412/portfolio/logo-portfolio_rji67t.svg" alt="logo" />
        </div>

        <Popover.Group className="lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-bold leading-6 text-gray-900">
              Mes sites
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {sites?.map((site) => (
                    <div key={site.name} className={`group ${props.siteId === site.id ? "border-2  border-indigo-300 bg-indigo-50 bg-opacity-75" : ""}  relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50`}>
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <ChartPieIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-800" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link to={`/dashboard/${site.id}`} className="block font-semibold text-gray-900">
                          {site.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-400">#{site.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
        <div className=" lg:flex lg:flex-1 lg:justify-end">
          <button
            title="Recharger les données"
            onClick={() => {
              void (async () => {
                await refresh(props.siteId);
              })();
            }}
            className="text-sm p-2 border rounded-lg shadow-sm font-semibold leading-6 text-gray-900"
          >
            <span aria-hidden="true">
              <ArrowPathIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderDashboard;
