import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { deleteShopping } from "../features/shoppingSlice";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Basket = ({ product }) => {
  const dispatch = useDispatch();
  const { image, title, price, id } = product;
  const [piece, setPiece] = useState(1);
  const [itemTotal, setItemTotal] = useState(0);

  const handlePieceMinus = () => {
    if (piece > 1) {
      setPiece(piece - 1);
    } else {
      dispatch(deleteShopping(product));
    }
  };

  const handleRemove = () => {
    dispatch(deleteShopping(product));
  };
  useEffect(() => {
    setItemTotal(price * piece);
  }, [piece]);

  return (
    <Box
      sx={{
        border: "1px solid grey",
        width: "100%",
        height: "200px",
        borderRadius: "0.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      <Checkbox {...label} defaultChecked />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        <Box>
          <img src={image} alt="" width="100px" />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h5" color="primary">
            $ {itemTotal}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <IconButton
          size="large"
          aria-haspopup="true"
          color="inherit"
          sx={{
            "&:hover": { color: "primary.main" },
            transition: "all .2s",
          }}
          onClick={() => setPiece(piece + 1)}
        >
          <AddCircleOutlineIcon />
        </IconButton>

        <Typography>{piece}</Typography>
        <IconButton
          size="large"
          aria-haspopup="true"
          color="inherit"
          sx={{
            "&:hover": { color: "primary.main" },
            transition: "all .2s",
          }}
          onClick={handlePieceMinus}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => handleRemove(id)}
        >
          Remove
        </Button>
      </Box>
    </Box>
  );
};

export default Basket;
