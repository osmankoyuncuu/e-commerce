import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../App.css";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

const OtherProductCard = ({ product }) => {
  const { image, title, rating, price, id, category } = product;
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "300px",
        height: "525px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #c1c1c1",
        borderRadius: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          padding: "0 .5rem",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          align="center"
          className="lineClamp"
        >
          {title}
        </Typography>
      </Box>
      <CardMedia
        component="img"
        alt={title}
        height="300"
        image={image}
        sx={{ position: "cover", padding: "0 0.5rem", cursor: "pointer" }}
        onClick={() => navigate(`/detail/${id}`, { state: category })}
      />
      <Rating
        name="read-only"
        value={rating?.rate || null}
        precision={0.1}
        readOnly
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            textAlign: "center",
            margin: "0",
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          $ {price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OtherProductCard;
