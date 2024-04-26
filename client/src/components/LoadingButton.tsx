// MUI
import { Button, CircularProgress } from "@mui/material";
import { TColorTypes } from "../@types/theme";

// types
interface ILoadingButtonProps {
  isLoading?: boolean;
  color?: TColorTypes;
  title?: string;
  type?: "button" | "submit";
  isDisabled?: boolean;
  fullWidth?: boolean;
}

function LoadingButton({
  isLoading = false,
  color = "primary",
  title = "Submit",
  type = "submit",
  isDisabled = false,
  fullWidth = false,
}: ILoadingButtonProps) {
  return (
    <Button
      disabled={isLoading || isDisabled}
      variant="contained"
      color={color}
      type={type}
      fullWidth={fullWidth}
    >
      {isLoading ? <CircularProgress size={24} /> : <>{title}</>}
    </Button>
  );
}

export default LoadingButton;
