import { Typography } from "@mui/material";
import Box from "@mui/system/Box";
import { useDispatch, useSelector } from "react-redux";
import Basket from "../component/Basket";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { minHeight } from "../styles/globalStyle";
import { useEffect, useState } from "react";
import { filterShopping } from "../features/shoppingSlice";

const Shopping = () => {
  const { shoppingList, filterShoppingList, total } = useSelector(
    (state) => state.shopping
  );
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(filterShoppingList);
  const newShopping = filterShoppingList.map(
    (item) => item?.currentShoppingList
  );
  const newShpppingPiece = newShopping.filter((item)=>)
  useEffect(() => {
    dispatch(
      filterShopping(
        shoppingList.filter((item) =>
          item?.currentUserList.includes(currentUser?.email)
        )
      )
    );
  }, [shoppingList]);

  return (
    <Box style={minHeight}>
      <Box
        sx={{
          display: "flex",
          padding: "2rem",
          gap: "3rem",
        }}
      >
        <Box
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
          }}
        >
          <Typography
            variant="h5"
            component="span"
            sx={{ paddingLeft: "1rem" }}
          >
            My Cart <Typography component="span">(1 product)</Typography>
          </Typography>
          {filterShoppingList.map((item) => (
            <Basket product={item} key={item?.id} />
          ))}
        </Box>
        <Box
          sx={{
            border: "1px solid grey",
            borderRadius: "0.5rem",
            width: "25%",
            height: "17rem",
            position: "sticky",
            top: "6rem",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: ".4rem",
          }}
        >
          <Typography variant="h6">SELECTED PRODUCT</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <Typography>Item(s) total</Typography>
            <Typography>$ 299</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Cargo</Typography>
            <Typography>$ 15</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid grey",
            }}
          >
            <Typography>Shop discount</Typography>
            <Typography>$ 15</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid grey",
            }}
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6">$ 300</Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 1 }}
            onClick={() => navigate("/pay")}
          >
            Complete your Shopping
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Shopping;
