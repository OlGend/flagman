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
  const { lang, item, userId, onFinish } = props;
  const [open, setOpen] = useState(false);
  const descriptions = JSON.parse(item.product_description);

  const descriptionForLang =
    descriptions.find((desc) => desc[lang]) ||
    descriptions.find((desc) => desc["all"]);

  const onConfirm = async () => {
    const status_payment = JSON.stringify({
      status: "Waiting",
      timestamp: new Date().toISOString(),
      paymentMethod: item.product_name,
      paymentSumIn: item.products_amount,
      paymentAddress: "Gift Card",
      USD: item.products_amount,
    });

    const body = JSON.stringify({
      id: userId,
      status_payment,
      sumMinus: item.products_amount,
    });

    console.log("body", body);

    try {
      const response = await updateUserStatusPayment(body);
      onFinish();
      console.log("response", response);
    } catch (e) {
      console.error("ERROR - onConfirm:", e);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className="relative" sx={{ maxWidth: 275, minWidth: 275 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`/products/${item.product_image}.jpg`}
        title={item.product_image}
      />
      <CardContent className="mb-12">
        <div className="flex justify-between">
          <Typography gutterBottom variant="h5" component="div">
            {item.product_name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {item.products_amount}$
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          <span>{descriptionForLang[lang] || descriptionForLang["all"]}</span>
        </Typography>
      </CardContent>
      <CardActions className="absolute bottom-0">
        <Button
          onClick={handleOpen}
          className="btn-primary"
          variant="contained"
          size="small"
        >
          Buy
        </Button>
      </CardActions>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Purchase
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to buy this product for {item.products_amount}
            $?
          </Typography>
          <Button
            className="btn btn-primary mt-4"
            onClick={async () => {
              await onConfirm(); // Вызываем onConfirm здесь для обработки покупки
              handleClose(); // Закрываем модальное окно после покупки
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </Card>
  );
}
