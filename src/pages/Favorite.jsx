import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "../component/ProductCard";
import { minHeight } from "../styles/globalStyle";
import {
  favoriteCurrentUserFilter,
  favoriteListener,
} from "../features/favoriteSlice";
import { useEffect, useState } from "react";
import { favoriteListenerFirebase } from "../utils/firebase";

const Favorite = () => {
  const { favoriteList } = useSelector((state) => state.favorite);

  return (
    <Box style={minHeight}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container justifyContent="center" spacing={4} sx={{ m: 1 }}>
          {favoriteList?.map((favorite) => (
            <Grid item key={favorite?.id}>
              <ProductCard product={favorite} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Favorite;
