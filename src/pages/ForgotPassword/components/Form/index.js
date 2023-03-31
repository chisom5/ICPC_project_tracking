import React, { useEffect } from "react";
import styled from "styled-components";
import { Box, Text, Label, Heading } from "../../../../components/Primitives";
import { AntInput, AntPassword } from "../../../../components/AntFormik";
import { ButtonOutlined } from "../../../../components/Button";
import colors from "../../../../theme/colors";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePage,
  handleForgotPassword,
  handleResetPassword,
} from "../../../../services/forgetPassword/action";

const ForgotPSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      "Invalid email address"
    ),
});

const ResetPSchema = Yup.object().shape({
  code: Yup.string().required("code is required"),
  newPassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Please choose a stronger password between 8 and 24. Try a mix of letters, numbers, and symbols"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Please choose a stronger password between 8 and 24. Try a mix of letters, numbers, and symbols"
    )
    .oneOf([Yup.ref("newPassword"), null], "Password must match"),
});

const FormComponent = () => {
  const { page, resetPLink, isLoading } = useSelector(
    (state) => state.forgetP
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ForgotPvalue = {
    email: "",
  };
  const ResetPvalue = {
    code: "",
    newPassword: "",
    confirmPassword: "",
  };
  useEffect(() => {
    if (resetPLink !== null) {
      dispatch(togglePage({ page: "forgetP2" }));
    }
  }, [dispatch, resetPLink]);

  const handleForgotPSubmit = (values) => {
    const params = {
      Email: values.email,
    };
    dispatch(handleForgotPassword(params, navigate));
  };

  const handleResetPSubmit = (values) => {
    const params = {
      key: resetPLink?.key,
      token: values.code,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };
    dispatch(handleResetPassword(params, navigate));
  };
  return (
    <FormContainer>
      <Heading
        as="h3"
        alignSelf="auto"
        mb={"44px"}
        fontSize="30px"
        lineHeight="25px"
        color="#002E5A"
        style={{ textTransform: "capitalize" }}
        fontWeight={600}
        letterSpacing={"-0.03em"}
      >
        Project Tracking System
      </Heading>

      {page === "forgetP1" && (
        <>
          <Text
            as="h3"
            alignSelf="auto"
            mb={"8px"}
            fontSize="24px"
            color="#002E5A"
            fontWeight={600}
            letterSpacing={"-0.03em"}
          >
            Forgot Password
          </Text>
          <Text
            as="p"
            alignSelf="auto"
            mb={"12px"}
            fontSize="14px"
            color="#002E5A"
            fontWeight={600}
            lineHeight="19px"
            letterSpacing={"-0.02em"}
          >
            A code will be sent to the email provided. This code will be used to
            reset your account password.
          </Text>
          <Formik
            initialValues={ForgotPvalue}
            validationSchema={ForgotPSchema}
            onSubmit={handleForgotPSubmit}
          >
            {({ touched, isValid, isSubmitting, submitCount }) => (
              <Form style={{ width: "100%" }}>
                <Box className="transparen-bg">
                  <Label
                    color="labelColor"
                    fontSize={1}
                    lineHeight="16px"
                    fontWeight={600}
                  >
                    Email
                  </Label>
                  <Field
                    type="text"
                    name="email"
                    width="100%"
                    style={{
                      height: "40px",
                      borderRadius: "4px",
                      background: "transparent",
                    }}
                    placeholder="Enter your company email address"
                    component={AntInput}
                    submitCount={submitCount}
                    hasFeedback
                    disabled={ForgotPvalue.email !== "" ? true : false}
                  />
                </Box>

                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ButtonOutlined
                    width={"100%"}
                    mt={"16px"}
                    mb={"24px"}
                    height="40px"
                    fontWeight={5}
                    borderColor={colors.modes.light.danger}
                    color={colors.modes.light.danger}
                    bg={colors.modes.light.white}
                    // disabled={(touched && !isValid) || isLoading ? true : false}
                    type="submit"
                  >
                    {isLoading ? "Please Wait..." : "Continue"}
                  </ButtonOutlined>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center">
                  <Text
                    onClick={() => navigate("/")}
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing={"0.01em"}
                    fontWeight={600}
                    color={colors.modes.light.mainBlue}
                    style={{ cursor: "pointer" }}
                  >
                    I remember my password
                  </Text>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}
      {page === "forgetP2" && (
        <>
          <Text
            as="h3"
            alignSelf="auto"
            mb={"8px"}
            fontSize="24px"
            color="#002E5A"
            fontWeight={600}
            letterSpacing={"-0.03em"}
          >
            Password Reset
          </Text>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              as="p"
              alignSelf="auto"
              mb={"12px"}
              fontSize="14px"
              color="#002E5A"
              fontWeight={600}
              lineHeight="19px"
              letterSpacing={"-0.02em"}
            >
              A code has been sent to your email.
            </Text>

            <Text
              fontSize="12px"
              lineHeight="16px"
              letterSpacing={"0.01em"}
              color={colors.modes.light.mainBlue}
            >
              Re-send Code
            </Text>
          </Box>
          <Formik
            initialValues={ResetPvalue}
            validationSchema={ResetPSchema}
            onSubmit={handleResetPSubmit}
          >
            {({ touched, isValid, isSubmitting, submitCount }) => (
              <Form style={{ width: "100%" }}>
                <Box className="transparen-bg">
                  <Label
                    color="labelColor"
                    fontSize={1}
                    fontWeight={600}
                    lineHeight="16px"
                  >
                    Code
                  </Label>
                  <Field
                    type="text"
                    name="code"
                    width="100%"
                    style={{
                      height: "40px",
                      borderRadius: "4px",
                      background: "transparent",
                    }}
                    placeholder="Enter the code sent to your email address"
                    component={AntInput}
                    submitCount={submitCount}
                    hasFeedback
                    disabled={ResetPvalue.code !== "" ? true : false}
                  />
                </Box>
                <Box className="transparen-bg">
                  <Label
                    color="labelColor"
                    fontSize={1}
                    fontWeight={600}
                    lineHeight="16px"
                  >
                    New Password
                  </Label>
                  <Field
                  type='text'
                    name="newPassword"
                    width="100%"
                    style={{
                      height: "40px",
                      borderRadius: "4px",
                      background: "transparent",
                    }}
                    placeholder="Enter a new password"
                    component={AntPassword}
                    submitCount={submitCount}
                    hasFeedback
                    disabled={ResetPvalue.newPassword !== "" ? true : false}
                  />
                </Box>
                <Box className="transparen-bg">
                  <Label
                    color="labelColor"
                    fontSize={1}
                    fontWeight={600}
                    lineHeight="16px"
                  >
                    Confirm Password
                  </Label>
                  <Field
                  type='text'
                    name="confirmPassword"
                    width="100%"
                    style={{
                      height: "40px",
                      borderRadius: "4px",
                      background: "transparent",
                    }}
                    placeholder="Re-enter your password"
                    component={AntPassword}
                    submitCount={submitCount}
                    hasFeedback
                    disabled={ResetPvalue.confirmPassword !== "" ? true : false}
                  />
                </Box>

                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ButtonOutlined
                    width={"100%"}
                    mt={"16px"}
                    mb={"24px"}
                    height="40px"
                    fontWeight={5}
                    borderColor={colors.modes.light.danger}
                    color={colors.modes.light.danger}
                    bg={colors.modes.light.white}
                    disabled={(touched && !isValid) || isLoading ? true : false}
                    type="submit"
                  >
                    {isLoading ? "Please Wait..." : "Reset Password"}
                  </ButtonOutlined>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="center">
                  <Text
                    onClick={() => navigate("/")}
                    fontSize="12px"
                    lineHeight="16px"
                    letterSpacing={"0.01em"}
                    fontWeight={600}
                    color={colors.modes.light.mainBlue}
                    style={{ cursor: "pointer" }}
                  >
                    I remember my password
                  </Text>
                </Box>
              </Form>
            )}
          </Formik>
        </>
      )}
    </FormContainer>
  );
};

const FormContainer = styled(Box)`
  padding-top: 5rem;
  padding-left: 3rem;

  .transparen-bg {
    .ant-input {
      background: transparent;
    }
  }

  .asterisk {
    margin-left: 4px;
    color: ${colors.modes.light.danger};
    font-weight: 600;
  }
`;
export default FormComponent;
