import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductCard from "../component/ProductCard";
import { minHeight } from "../styles/globalStyle";
import { useEffect } from "react";
import { filterFavorite } from "../features/favoriteSlice";

const Favorite = () => {
  const { favoriteList, filterFavoriteList } = useSelector(
    (state) => state.favorite
  );
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(
      filterFavorite(
        favoriteList.filter((item) =>
          item?.currentUserList.includes(currentUser?.email)
        )
      )
    );
  }, [favoriteList]);

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
          {filterFavoriteList?.map((favorite) => (
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
