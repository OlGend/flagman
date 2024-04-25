"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { updateGeo } from "@/components/getUser/updateGeo";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const [userData, setUserData] = React.useState(null);

  //   const updateG = () => {
  //     if (userData && (userData.country === "N/A" || userData.country === "")) {
  //       updateGeo(
  //         localStorage.getItem("user_id"),
  //         localStorage.getItem("country_data")
  //       );
  //     }
  //   };

  React.useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  console.log("USER", userData);
  const handleClose = () => {
    setOpen(false);
  };
  const handleYes = () => {
    setOpen(false);
    if (userData.geo_approve === null || userData.geo_approve === "") {
      updateGeo(
        localStorage.getItem("user_id"),
        localStorage.getItem("country_data")
      );
    }
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Are you from ${userData}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleYes} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
