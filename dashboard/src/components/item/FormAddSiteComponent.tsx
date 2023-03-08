import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SiteService from "../../core/service/SiteService";
import { useAuth } from "../../hooks/AuthHook";

export const FormAddSiteComponent = ({ isDialogOpened, handleCloseDialog }: any): JSX.Element => {
  const { user } = useAuth();
  const handleClose = (): void => {
    // setOpen(false);
    handleCloseDialog(false);
  };

  function handleSubmitSite(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const siteName = formData.get("username") as string;
    void SiteService.addSite({ name: siteName, userId: user?.id as string }).then((res) => {
      console.log(res);
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
            <input type="text" name="siteName" id="siteName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nom du site" required />
          </form>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Annuler</button>
          <button type="submit">Ajouter</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
