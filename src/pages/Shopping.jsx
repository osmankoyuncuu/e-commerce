import { Typography } from "@mui/material";
import Box from "@mui/system/Box";
import { useSelector } from "react-redux";
import Basket from "../component/Basket";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Shopping = () => {
  const { shoppingList } = useSelector((state) => state.shopping);
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", m: 2, gap: "3rem" }}>
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
        }}
      >
        <Typography variant="h5" component="span" sx={{ paddingLeft: "1rem" }}>
          My Cart <Typography component="span">(1 product)</Typography>
        </Typography>
        {shoppingList.map((item) => (
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
          top: "1rem",
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
  );
};

export default Shopping;
