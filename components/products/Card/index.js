import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard(item) {
  const descriptions = JSON.parse(item.item.product_description);

  const country = localStorage.getItem("country").toLowerCase();

  console.log(country);

  console.log(item.item);
  return (
    <Card className="relative" sx={{ maxWidth: 275, minWidth: 275 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`/products/${item.item.product_image}.jpg`}
        title={item.item.product_image}
      />
      <CardContent className="mb-12">
        <div className="flex justify-between">
          <Typography gutterBottom variant="h5" component="div">
            {item.item.product_name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {item.item.products_amount}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {descriptions.map((desc, index) => (
            <div key={index}>{desc.en}</div>
          ))}
        </Typography>
      </CardContent>
      <CardActions className="absolute bottom-0">
        <Button className="btn-primary" variant="contained" size="small">
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
