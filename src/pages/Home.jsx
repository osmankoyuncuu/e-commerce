import Box from "@mui/material/Box";
import ProductCard from "../component/ProductCard";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 3,
      }}
    >
      <ProductCard />
    </Box>
  );
};

export default Home;
