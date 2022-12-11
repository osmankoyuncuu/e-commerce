import Box from "@mui/material/Box";
import ProductCard from "../component/ProductCard";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import CategoryFilter from "../component/CategoryFilter";
import { minHeight } from "../styles/globalStyle";

const Home = () => {
  const { filterProductList } = useSelector((state) => state.product);

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
