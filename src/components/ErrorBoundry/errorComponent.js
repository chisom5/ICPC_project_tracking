import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { MySnackbarContentWrapper } from "./snackbar";

// let open;
const withErrorHandling = WrappedComponent => ({
  error,
  success,
  children,
  clearErrorMessage,
  clearSuccessMessage
}) => {
  return (
    <WrappedComponent>
      {error || success ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={error || success ? true : false}
          //onClose={handleClose()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        >
          <MySnackbarContentWrapper
            onClose={error ? clearErrorMessage : clearSuccessMessage}
            variant={error ? "error" : "success"}
            message={error || success}
          />
        </Snackbar>
      ) : null}
      {children}
    </WrappedComponent>
  );
};

export const ErrorComponent = withErrorHandling(({ children }) => (
  <div>{children}</div>
));
