import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { updateUserStatusPayment } from "@/components/getUser/pushPayment";
import { TextMobileStepper } from "@/components/products/Stepper";
import { useQueryUser } from "@/queries";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MediaCard(props) {
  const { lang, item, onFinish } = props;
  const [open, setOpen] = useState(false);
  const descriptions = JSON.parse(item.product_description);
  const { t } = useTranslation();
  const descriptionForLang =
    descriptions.find((desc) => desc[lang]) ||
    descriptions.find((desc) => desc["all"]);

  const {
    data: user,
    loading: userLoading,
    error: userError,
    errorMessage: userErrorMessage,
    refetch: refetchUser,
  } = useQueryUser();

  const onConfirm = async () => {
    const status_payment = JSON.stringify({
      status: "Waiting",
      timestamp: new Date().toISOString(),
      paymentMethod: item.product_name,
      paymentSumIn: item.products_amount,
      paymentAddress: email,
      USD: item.products_amount,
    });

    const body = JSON.stringify({
      id: user.id,
      status_payment,
      sumMinus: item.products_amount,
    });

  

    try {
      const response = await updateUserStatusPayment(body);
      onFinish();
      window.location.reload();
      console.log("response", response);
    } catch (e) {
      console.error("ERROR - onConfirm:", e);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");

  return (
    <div className="w-full">
      <div className="card flex flex-nowrap w-full justify-between items-center">
        <Image
          className=" flex"
          src={`/products/${item.product_image}.jpg`}
          alt={item.product_name}
          width={64}
          height={48}
        />
        <div className="basis-8/12 card-content flex">
          <div className="flex justify-between basis-3/12 mr-3">
            <p className="mr-3"> {item.product_name}</p>
            <p>{item.products_amount}$</p>
          </div>
          <p className="basis-8/12 ml-auto dm-none">
            {" "}
            <span>{descriptionForLang[lang] || descriptionForLang["all"]}</span>
          </p>
        </div>
        <Button
          onClick={handleOpen}
          className="btn-primary btn basis-1/12"
          variant="contained"
          size="small"
          disabled={userLoading || !user || +user.balance < +item.products_amount}
        >
          {t("Buy")}
        </Button>
      </div>

      <Modal
      className="modal-mui"
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <TextMobileStepper
            setEmail={setEmail}
            onConfirm={onConfirm}
            item={item}
            t={t}
          />
        </Box>
      </Modal>
    </div>
  );
}
