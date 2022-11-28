import Box from "@mui/material/Box";
import ProductCard from "../component/ProductCard";
import { useSelector } from "react-redux";
import { getProduct } from "../features/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import CategoryFilter from "../component/CategoryFilter";
import {
  favoriteListenerFirebase,
  shoppingListenerFirebase,
  userObserver,
} from "../utils/firebase";
import { shoppingListener } from "../features/shoppingSlice";
import { clearCurrentUser, createCurrentUser } from "../features/authSlice";
import { minHeight } from "../styles/globalStyle";
import { favoriteListener } from "../features/favoriteSlice";

const Home = () => {
  const { filterProductList } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state) => state.favorite);
  console.log(currentUser);
  console.log(favoriteList);
  useEffect(() => {
    userObserver(dispatch, createCurrentUser, clearCurrentUser);
    favoriteListenerFirebase(dispatch, favoriteListener, currentUser);
    shoppingListenerFirebase(dispatch, shoppingListener, currentUser);
    dispatch(getProduct());
  }, []);

  return (
    <Box sx={minHeight}>
      <CategoryFilter />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container justifyContent="center" spacing={4} sx={{ m: 1 }}>
          {filterProductList?.map((product) => (
            <Grid item key={product?.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
