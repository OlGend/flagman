import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MediaCard(props) {
  const { lang, item } = props;
  const descriptions = JSON.parse(item.product_description);

  // Найти описание для текущего языка
  const descriptionForLang = descriptions.find(desc => desc[lang]) || descriptions.find(desc => desc["all"]);

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
            {item.products_amount}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          {/* Отображаем найденное описание */}
          <div>{descriptionForLang[lang] || descriptionForLang["all"]}</div>
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
