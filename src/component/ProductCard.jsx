import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import "../App.css";

const ProductCard = ({ product }) => {
  const { title, image, price } = product;
  return (
    <Card
      sx={{
        width: "300px",
        height: "525px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #c1c1c1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          padding: "0 .5rem",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          align="center"
          className="lineClamp"
        >
          {title}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        alt={title}
        height="300"
        image={image}
        sx={{ position: "cover", padding: "0 0.5rem" }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            textAlign: "center",
            margin: "0",
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          $ {price}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="large" aria-haspopup="true" color="inherit">
          <FavoriteIcon
            sx={{
              "&:hover": { color: "primary.main" },
              transition: "all .2s",
            }}
          />
        </IconButton>
        <IconButton size="large" aria-haspopup="true" color="inherit">
          <AddShoppingCartIcon
            sx={{
              "&:hover": { color: "primary.main" },
              transition: "all .2s",
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
