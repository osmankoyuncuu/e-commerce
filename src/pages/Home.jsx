import Box from "@mui/material/Box";
import ProductCard from "../component/ProductCard";
import { useSelector } from "react-redux";
import { getProduct } from "../features/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import CategoryFilter from "../component/CategoryFilter";

const Home = () => {
  const { filterProductList } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
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
    </>
  );
};

export default Home;
