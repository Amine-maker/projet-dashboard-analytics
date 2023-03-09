import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../hooks/AuthHook";
import { useSite } from "../../hooks/SiteHook";

export const FormAddSiteComponent = ({ isDialogOpened, handleCloseDialog }: any): JSX.Element => {
  const { user } = useAuth();
  const siteContext = useSite();

  const handleClose = (): void => {
    // setOpen(false);
    handleCloseDialog(false);
  };

  function handleSubmitSite(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const siteName = formData.get("siteName") as string;
    console.log(siteName);

    siteContext.addSite({ name: siteName, userId: user?.id as string }, () => {
      console.log(siteContext.sites);

      handleCloseDialog(false);
    });
  }

  return (
    <div>
      <Dialog fullWidth onClose={handleClose} open={isDialogOpened}>
        <DialogTitle>Ajouter un site</DialogTitle>
        <DialogContent>
          <DialogContentText>Ajouter un site pour pouvoir visualiser des données.</DialogContentText>

          <form className="mt-8" onSubmit={handleSubmitSite}>
            <label htmlFor="siteName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nom du site
            </label>
            <input type="text" name="siteName" minLength={5} id="siteName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nom du site" required />
            <div className="mt-8 flex gap-2 justify-end">
              <button type="button" className=" text-primary-600 bg-primary-200 hover:bg-primary-300 focus:ring-4 focus:outline-none focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-200 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleClose}>
                Annuler
              </button>
              <button className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" type="submit">
                Ajouter
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
