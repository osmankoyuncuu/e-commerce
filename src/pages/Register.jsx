import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import GoogleLogo from "../assets/google.png";
import { createUser, signUpWithGoogle } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearLoading, loadingTrue } from "../features/authSlice";

const loginSchema = yup.object().shape({
  firstname: yup
    .string()
    .matches(/[a-z]+/)
    .required(),
  lastname: yup
    .string()
    .matches(/[a-z]+/)
    .required(),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please  enter an email"),
  password: yup
    .string()
    .required("Please enter a password ")
    .min(8, "Password must have min 8 chars")
    .max(16, "Password must have max 16 chars")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have an uppercase")
    .matches(/[!,?{}><%&$#£+-.]+/, " Password must have a special char"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")])
    .required(),
});

const Register = () => {
  const { loading } = useSelector((state) => state.auth);
  console.log(loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Grid
      container
      component="main"
      sx={{ minHeight: `calc(100vh - (64px + 5rem))` }}
    >
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" mb={1}>
            Sign up
          </Typography>
          <Box sx={{ width: "100%", padding: "1rem 3rem" }}>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                passwordConfirm: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values, actions) => {
                dispatch(loadingTrue());
                createUser(values, navigate, dispatch, clearLoading);
                actions.resetForm();
                actions.setSubmitting(false);
              }}
            >
              {({ values, handleChange, handleBlur, touched, errors }) => (
                <Form>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".7rem",
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "0.2rem" }}>
                      <TextField
                        label="First Name"
                        name="firstname"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstname && Boolean(errors.firstname)}
                        helperText={touched.firstname && errors.firstname}
                      />
                      <TextField
                        label="Last Name"
                        name="lastname"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastname && Boolean(errors.lastname)}
                        helperText={touched.lastname && errors.lastname}
                      />
                    </Box>
                    <TextField
                      label="Email Address"
                      name="email"
                      type="email"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      variant="outlined"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <TextField
                      label="Password"
                      name="passwordConfirm"
                      type="password"
                      variant="outlined"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.passwordConfirm &&
                        Boolean(errors.passwordConfirm)
                      }
                      helperText={
                        touched.passwordConfirm && errors.passwordConfirm
                      }
                    />

                    <LoadingButton
                      type="submit"
                      loading={loading}
                      loadingPosition="center"
                      variant="contained"
                      sx={{ mt: 2 }}
                    >
                      Sing Up
                    </LoadingButton>
                  </Box>
                </Form>
              )}
            </Formik>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={() => signUpWithGoogle(navigate)}
            >
              <img src={GoogleLogo} width="25px" alt="google-logo" />
              Continue with Google
            </Button>

            <Grid container sx={{ display: "flex", justifyContent: "end" }}>
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>

            <Typography
              mt={4}
              variant="body2"
              color="text.secondary"
              align="center"
            >
              {"Copyright © "}
              {"Osman "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
};

export default Register;
