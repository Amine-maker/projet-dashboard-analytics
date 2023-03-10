import React, { type Dispatch, type SetStateAction, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { Link } from "react-router-dom";
import { FormAddSiteComponent } from "./FormAddSiteComponent";
import { RenderIf } from "../../core/utils/utils";
import { useSite } from "../../hooks/SiteHook";

interface PropSite {
  selectedSite: string;
  onSiteChange: Dispatch<SetStateAction<string>>;
  children?: React.ReactElement;
}

export const SiteComponent = (props: PropSite): JSX.Element => {
  const { sites, deleteSite } = useSite();
  console.log(sites);

  const [isOpenDialogForm, setOpenDialogForm] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpenDialogForm(!isOpenDialogForm);
  };

  const isSelectedSite = (id: string): boolean => {
    return id === props.selectedSite;
  };

  const handleDeleteSite = (sitId: string): void => {
    deleteSite(sitId);
  };

  return (
    <div className="space-y-4">
      {" "}
      <RenderIf isTrue={!(sites == null)}>
        {sites?.map((site, i) => {
          return (
            <div key={i} className={`p-4   border rounded-xl text-gray-800 space-y-2 ${isSelectedSite(site.id) ? "bg-indigo-50" : "bg-white"}`}>
              <div className="flex justify-between">
                <div className="text-gray-400 text-xs">Site ID : {site.id}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      props.onSiteChange(site.id);
                    }}
                    className="text-gray-400 text-xs"
                  >
                    <ContentCopyIcon fontSize="small" />
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteSite(site.id);
                    }}
                    className="text-gray-400 text-xs"
                  >
                    <HighlightOffRoundedIcon fontSize="small" />
                  </button>
                </div>
              </div>
              <Link to={`/dashboard/${site.id}`} className="font-bold hover:text-indigo-900 hover:underline">
                {site.name}
              </Link>
            </div>
          );
        })}
      </RenderIf>
      <FormAddSiteComponent
        isDialogOpened={isOpenDialogForm}
        handleCloseDialog={() => {
          setOpenDialogForm(false);
        }}
      />
      <div
        onClick={() => {
          handleOpen();
        }}
        className="p-4 bg-gray-900 text-gray-300 rounded-xl space-y-2 cursor-pointer"
      >
        <div className="flex justify-between">
          {" "}
          <span className="font-bold">Ajouter un site</span>
          <AddCircleOutlineIcon></AddCircleOutlineIcon>
        </div>
      </div>
    </div>
  );
};
