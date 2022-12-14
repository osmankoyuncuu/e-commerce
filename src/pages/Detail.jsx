import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import OtherProductCard from "../component/OtherProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addBasket,
  addFavorite,
  newBasket,
  newFavorite,
  noneBasket,
  noneFavorite,
} from "../utils/firebase";
import { lightGreen } from "@mui/material/colors";
//import {
//  deleteFavorite,
//  deleteShopping,
//  newFavorite,
//  newShopping,
//} from "../utils/firebase";

const Detail = () => {
  const { id } = useParams();
  const { state: category } = useLocation();
  const [detail, setDetail] = useState("");
  const [otherCard, setOtherCard] = useState([]);
  const { productList } = useSelector((state) => state.product);
  const { favoriteList } = useSelector((state) => state.favorite);
  const { shoppingList } = useSelector((state) => state.shopping);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getDetail = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    const { data } = await axios(url);
    setDetail(data);
  };
  const { title, price, description, image, rating } = detail;

  const getOtherCategoryCard = () => {
    const otherFilter = productList.filter(
      (item) => item.category === category && item.id != id
    );
    setOtherCard(otherFilter);
  };

  const includes = (arr, val, key) => {
    return arr.some((arrVal) => Number(val) === arrVal[key]);
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

  useEffect(() => {
    getDetail(id);
    getOtherCategoryCard();
  }, [id]);

  return (
    <Box
      sx={{
        width: "100%",
        padding: "3rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "350px",
        }}
      >
        <Box>
          <img src={image} alt={title} width="300px" height="350px" />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "2rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Typography variant="h5">{title}</Typography>
            <Box sx={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
              <Rating
                name="read-only"
                value={rating?.rate || null}
                precision={0.1}
                readOnly
              />
              <Typography variant="h6">{rating?.rate}</Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: "800", color: "primary.main" }}
            >
              $ {price}
            </Typography>
            <Typography variant="p" align="justify">
              {description}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1rem", mt: 2 }}>
            <Button variant="contained" onClick={() => handleFavorite(detail)}>
              Add to Favorite
            </Button>
            <Button variant="contained" onClick={() => handleShopping(detail)}>
              Add to basket
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">
          People who viewed this product also viewed these
        </Typography>
        <Box
          sx={{ display: "flex", gap: "1rem", mt: 3, justifyContent: "center" }}
        >
          {otherCard.map((item) => (
            <OtherProductCard key={item.id} product={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Detail;
