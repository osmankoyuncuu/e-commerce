import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Basket = ({ product }) => {
  const { image, title, price } = product;
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="h5" color="primary">
            $ {price}
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
        >
          <AddCircleOutlineIcon />
        </IconButton>

        <Typography>1</Typography>
        <IconButton
          size="large"
          aria-haspopup="true"
          color="inherit"
          sx={{
            "&:hover": { color: "primary.main" },
            transition: "all .2s",
          }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Basket;
