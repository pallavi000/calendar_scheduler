import * as React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

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

// components
import LoadingButton from "../../components/LoadingButton";

// services
import { registerApiService } from "../../services/authApiService";

// notifications
import {
  apiErrorNotification,
  customSuccessNotification,
} from "../../components/Notification";

// types
import { TRegisterInputs } from "../../@types/auth";

// validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup.string().email().required("Email Address is required"),
  password: yup.string().required("Password is required."),
});

function Register() {
  const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: TRegisterInputs) => {
    setIsFormSubmitting(true);
    try {
      await registerApiService(data);
      customSuccessNotification("Registration successfull. Please login!");
      navigate("/sign-in");
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
          title={"Register your account"}
        />
        <Divider sx={{ mb: 4 }} />
        <CardContent>
          <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message ? errors.name.message : null}
                  {...field}
                  autoComplete="off"
                  label="Your Full Name"
                  fullWidth
                />
              )}
            />

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
              title={"Register"}
              isLoading={isFormSubmitting}
              type={"submit"}
            />

            <Grid container>
              <Grid item>
                <Link href="/sign-in" variant="body2">
                  {"Alread have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Register;
