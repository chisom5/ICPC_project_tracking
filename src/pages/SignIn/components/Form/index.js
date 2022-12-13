import React from "react";
import styled from "styled-components";
import { Box, Text, Label, Heading } from "../../../../components/Primitives";
import { AntInput, AntPassword } from "../../../../components/AntFormik";
import { ButtonOutlined } from "../../../../components/Button";
import { isRequired } from "../../../../utils";
import colors from "../../../../theme/colors";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Schema = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Please choose a stronger password between 8 and 24. Try a mix of letters, numbers, and symbols"
    ),
});

const FormComponent = () => {
  const navigate = useNavigate();
  const value = {
    email: "",
    password: "",
  };
  const handleSubmit = (values) => {
    console.log(values);
    navigate("/welcome");
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
      <Text
        as="h3"
        alignSelf="auto"
        mb={"32px"}
        fontSize="24px"
        color="#002E5A"
        fontWeight={600}
        letterSpacing={"-0.03em"}
      >
        Account login
      </Text>
      <Formik
        initialValues={value}
        validationSchema={Schema}
        onSubmit={handleSubmit}
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
                disabled={value.email !== "" ? true : false}
              />
            </Box>

            <Box className="transparen-bg">
              <Label
                color="labelColor"
                fontSize={1}
                fontWeight={600}
                lineHeight="16px"
              >
                Password
                {isRequired(Schema, "password") ? (
                  <span className="asterisk">*</span>
                ) : null}
              </Label>
              <Field
                placeholder="*********"
                name="password"
                type="text"
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "4px",
                  background: "transparent",
                }}
                component={AntPassword}
                submitCount={submitCount}
                hasFeedback
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
                //   disabled={
                //     (touched && !isValid) || loading || userNameError !== ""
                //       ? true
                //       : false
                //   }
                type="submit"
              >
                {/* {loading ? "Please Wait..." : ""} */}
                Log In
              </ButtonOutlined>
            </Box>

            <Box display="flex" alignItems="center" justifyContent="center">
              <Text
                onClick={() => navigate("/forgotPassword")}
                fontSize="12px"
                lineHeight="16px"
                letterSpacing={"0.01em"}
                fontWeight={600}
                color={colors.modes.light.mainBlue}
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </Text>
            </Box>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

const FormContainer = styled(Box)`
  // margin-bottom: 3rem;
  padding-top: 3.85rem;
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
