import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthHook";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { FormAddSiteComponent } from "./FormAddSiteComponent";

interface PropSite {
  selectedSite: string;
  onSiteChange: any;
  children?: React.ReactElement;
}

export const SiteComponent = (props: PropSite): JSX.Element => {
  const [isOpenDialogForm, setOpenDialogForm] = useState<boolean>(false);
  const { user } = useAuth();
  const handleOpen = (): void => {
    setOpenDialogForm(!isOpenDialogForm);
  };

  return (
    <div className="space-y-4">
      {" "}
      {user?.sites.map((site, i) => {
        return (
          <div key={i} className="p-4 bg-white border rounded-xl text-gray-800 space-y-2">
            <div className="flex justify-between">
              <div className="text-gray-400 text-xs">Site ID : {site.id}</div>
              <button
                onClick={() => {
                  props.onSiteChange(site.id);
                }}
                className="text-gray-400 text-xs"
              >
                <ContentCopyIcon fontSize="small" />
              </button>
            </div>
            <Link to={`/dashboard/${site.id}`} className="font-bold hover:text-indigo-900 hover:underline">
              {site.name}
            </Link>
          </div>
        );
      })}
      <div className="p-4 bg-gray-900 text-gray-300 rounded-xl space-y-2">
        <div className="flex justify-between">
          {" "}
          <FormAddSiteComponent
            isDialogOpened={isOpenDialogForm}
            handleCloseDialog={() => {
              setOpenDialogForm(false);
            }}
          />
          <button onClick={() => handleOpen()} className="font-bold hover:text-indigo-100 ">
            Ajouter un site
          </button>
          <AddCircleOutlineIcon></AddCircleOutlineIcon>
        </div>
      </div>
    </div>
  );
};
