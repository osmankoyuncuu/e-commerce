import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct } from "../features/productSlice";

const filterButtons = [
  "all",
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

const CategoryFilter = () => {
  const { productList } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    if (e.target.name === "all") {
      dispatch(filterProduct(productList));
    } else {
      const filtered = productList.filter(
        (item) => item.category === e.target.name
      );
      dispatch(filterProduct(filtered));
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "3rem",
        backgroundColor: grey[300],
        boxShadow: "0px 10px 10px 0px rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      {filterButtons.map((button) => {
        return (
          <Button
            key={button}
            variant="text"
            name={button}
            onClick={handleFilter}
          >
            {button}
          </Button>
        );
      })}
    </Box>
  );
};

export default CategoryFilter;
