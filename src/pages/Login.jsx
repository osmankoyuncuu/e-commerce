import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import GoogleLogo from "../assets/google.png";
import { forgotPassword, signIn, signUpWithGoogle } from "../utils/firebase";
import { useNavigate, Link } from "react-router-dom";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLoading, loadingTrue } from "../features/authSlice";
const loginSchema = yup.object().shape({
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
});
const forgetSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please  enter an email"),
});

const Login = () => {
  const { loading } = useSelector((state) => state.auth);
  const [forgetPass, setForgetPass] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Grid
      container
      component="main"
      sx={{ minHeight: `calc(100vh - (64px + 5rem))` }}
    >
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
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {forgetPass ? "Forget Passworrd" : "Sign in"}
          </Typography>
          <Box sx={{ width: "100%", padding: "1rem 3rem" }}>
            <Formik
              initialValues={
                forgetPass ? { email: "" } : { email: "", password: "" }
              }
              validationSchema={forgetPass ? forgetSchema : loginSchema}
              onSubmit={(values, actions) => {
                {
                  forgetPass
                    ? forgotPassword(values, dispatch, clearLoading)
                    : signIn(values, navigate, dispatch, clearLoading);
                }
                dispatch(loadingTrue());
                actions.resetForm();
                actions.setSubmitting(false);
              }}
            >
              {({
                values,
                isSubmitting,
                handleChange,
                handleBlur,
                touched,
                errors,
              }) => (
                <Form>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.5,
                    }}
                  >
                    <TextField
                      label="Email Address"
                      name="email"
                      type="email"
                      margin="normal"
                      variant="outlined"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    {!forgetPass && (
                      <TextField
                        label="Password"
                        name="password"
                        id="password"
                        type="password"
                        variant="outlined"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    )}

                    <LoadingButton
                      type="submit"
                      loading={loading}
                      loadingPosition="center"
                      variant="contained"
                    >
                      {forgetPass ? "Send reset Link" : "Sing In"}
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
            <Grid container>
              <Grid item xs>
                <Link
                  to="#"
                  variant="body2"
                  onClick={() => setForgetPass(!forgetPass)}
                >
                  {forgetPass ? "Continue with email" : "Forgot password?"}
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  Don't have an account? Sign Up
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
    </Grid>
  );
};

export default Login;
