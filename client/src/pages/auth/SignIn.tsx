import * as React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

// MUI
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Card, CardContent, CardHeader, Divider, Stack } from "@mui/material";

// icons
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// notifications
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../../components/Notification";

// types
import { TLoginInputs } from "../../@types/auth";

// services
import { loginApiService } from "../../services/authApiService";
import { useGlobalContext } from "../../global/GlobalContextProvider";
import LoadingButton from "../../components/LoadingButton";

// validation schema
const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email Address is required"),
  password: yup.string().required("Password is required."),
});

function SignIn() {
  const { setToken } = useGlobalContext();
  const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: TLoginInputs) => {
    setIsFormSubmitting(true);
    try {
      const res = await loginApiService(data);
      setToken(res.data.token);
      customSuccessNotification("Login Successful!");
      window.location.href = "/";
    } catch (error) {
      apiErrorNotification(error);
    }
    setIsFormSubmitting(false);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ minHeight: "80vh", alignItems: "center", display: "flex" }}
    >
      <Card
        sx={{
          width: "100%",
          alignItems: "center",
          ".MuiCardHeader-root": {
            justifyContent: "center",
          },
        }}
      >
        <CardHeader
          sx={{
            ".MuiCardHeader-content ": {
              flexGrow: 0,
            },
          }}
          titleTypographyProps={{ flexGrow: 0 }}
          avatar={
            <Avatar
              sx={{
                m: 0,
                bgcolor: "primary.main",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
          }
          disableTypography
          title={"Sign in"}
        />
        <Divider sx={{ mb: 4 }} />
        <CardContent>
          <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email?.message ? errors.email.message : null
                  }
                  {...field}
                  autoComplete="off"
                  label="Email Address"
                  fullWidth
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password?.message ? errors.password.message : null
                  }
                  autoComplete="off"
                  label="Password"
                  fullWidth
                />
              )}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <LoadingButton
              fullWidth={true}
              title={"Sign In"}
              isLoading={isFormSubmitting}
              type={"submit"}
            />

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SignIn;
