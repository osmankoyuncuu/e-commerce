import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "../component/ProductCard";
import { minHeight } from "../styles/globalStyle";

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
