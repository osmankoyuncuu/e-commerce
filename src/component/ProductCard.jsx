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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addBasket,
  addFavorite,
  deleteShopping,
  newBasket,
  newFavorite,
  newShopping,
  noneBasket,
  noneFavorite,
} from "../utils/firebase";

const ProductCard = ({ product }) => {
  const { favoriteList } = useSelector((state) => state.favorite);
  const { shoppingList } = useSelector((state) => state.shopping);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { title, image, price, id, category } = product;

  const includes = (arr, val, key) => {
    return arr.some((arrVal) => val === arrVal[key]);
  };
  const handleFavorite = (product) => {
    if (includes(favoriteList, id, "id")) {
      const filterId = favoriteList.filter((item) => id == item.id);
      if (filterId[0].currentUserList?.includes(currentUser.email)) {
        noneFavorite(filterId, currentUser);
      } else {
        addFavorite(filterId, currentUser);
      }
    } else {
      newFavorite(product, currentUser);
    }
  };

  const handleShopping = (product) => {
    if (includes(shoppingList, id, "id")) {
      const filterId = shoppingList.filter((item) => id == item.id);
      if (filterId[0].currentUserList?.includes(currentUser.email)) {
        noneBasket(filterId, currentUser);
      } else {
        addBasket(filterId, currentUser);
      }
    } else {
      newBasket(product, currentUser);
    }
  };

  return (
    <Card
      sx={{
        width: "250px",
        height: "525px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #c1c1c1",
        borderRadius: "0.5rem",
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
        sx={{ position: "cover", padding: "0 0.5rem", cursor: "pointer" }}
        onClick={() => navigate(`/detail/${id}`, { state: category })}
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
        <IconButton
          size="large"
          aria-haspopup="true"
          color="inherit"
          onClick={() => handleFavorite(product)}
        >
          <FavoriteIcon
            sx={{
              "&:hover": { color: "primary.main" },
              transition: "all .2s",
              color: `${includes(favoriteList, id) && "primary.main"}`,
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          aria-haspopup="true"
          color="inherit"
          onClick={() => handleShopping(product)}
        >
          <AddShoppingCartIcon
            sx={{
              "&:hover": { color: "primary.main" },
              transition: "all .2s",
              color: `${includes(shoppingList, id) && "primary.main"}`,
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
