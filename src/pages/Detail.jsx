import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import OtherProductCard from "../component/OtherProductCard";
import { useSelector } from "react-redux";

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState("");
  const { productList } = useSelector((state) => state.product);
  const getDetail = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    const { data } = await axios(url);
    setDetail(data);
  };
  const { title, price, description, category, image, rating } = detail;

  const getOtherCategoryCard = () => {
    const otherFilter = productList.filter((item) =>
      console.log(item.category == category)
    );
    console.log(otherFilter);
  };

  useEffect(() => {
    getDetail(id);
    getOtherCategoryCard();
  }, []);

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
            <Button variant="contained">Add to Favorite</Button>
            <Button variant="contained">Add to basket</Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">
          People who viewed this product also viewed these
        </Typography>
        <OtherProductCard category={category} id={id} />
      </Box>
    </Box>
  );
};

export default Detail;
