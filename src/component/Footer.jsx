import Box from "@mui/material/Box";
import { deepOrange } from "@mui/material/colors";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <>
      {/*<Box sx={{ height: "1rem" }}></Box>*/}
      <Box
        sx={{
          backgroundColor: deepOrange[500],
          color: "white",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "5rem",
          bottom: 0,
          boxShadow: "2px 2px 10px black",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <a href="https://github.com/osmankoyuncuu" target="_blank">
            <GitHubIcon
              sx={{
                fontSize: "2rem",
                color: "white",
                transition: "all .5s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          </a>

          <a href="https://www.linkedin.com/in/osman-koyuncu/" target="_blank">
            <LinkedInIcon
              sx={{
                fontSize: "2rem",
                color: "white",
                transition: "all .5s",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          </a>
        </Box>
        © {new Date().getFullYear()} Osman
      </Box>
    </>
  );
};

export default Footer;
