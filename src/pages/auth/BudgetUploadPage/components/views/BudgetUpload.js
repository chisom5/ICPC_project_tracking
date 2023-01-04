import React from "react";
import { UploadContainer } from "../../../../../styles/layout";
import { Box, Text, Label } from "../../../../../components/Primitives";
import { AntSelect } from "../../../../../components/AntFormik";
import { ButtonOutlined } from "../../../../../components/Button";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import colors from "../../../../../theme/colors";

const Schema = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Please choose a stronger password between 8 and 24. Try a mix of letters, numbers, and symbols"
    ),
});

const BudgetUpload = ({
  currentPage,
  handlePagination,
  handlePreviewReport,
  component,
  ...props
}) => {
  const value = {
    email: "",
    password: "",
  };

  const handleAdd = () => {
    console.log("he");
  };

  return (
    <UploadContainer>
      {/* forms here */}
      <Formik
        initialValues={value}
        validationSchema={Schema}
        onSubmit={handleAdd}
      >
        {({ touched, isValid, isSubmitting, submitCount }) => (
          <Form style={{ width: "100%" }}>
            <Box display="flex" justifyContent="space-between">
              <Box className="field-bg" width={"35%"}>
                <Label
                  color="labelColor"
                  fontSize={1}
                  fontWeight={600}
                  lineHeight="16px"
                  mb={"14px"}
                >
                  Project Tracking Year
                </Label>
                <Field
                  type="text"
                  name="email"
                  width="100%"
                  style={{
                    height: "40px",
                    borderRadius: "4px",
                  }}
                  placeholder="Select Project Tracking Year"
                  component={AntSelect}
                  submitCount={submitCount}
                  hasFeedback
                />
              </Box>

              <Box>
                <Text as="p">Please note the following.</Text>
                <ul>
                  <li>File must be in Excel, CSV, or PDF format</li>
                  <li>File size should not be more than 20MB</li>
                </ul>
              </Box>
            </Box>

            <Box display="flex" style={{ gap: "18px" }} alignItems="center">
              <Box className="field-bg" width={"60%"}>
                <Label
                  color="labelColor"
                  fontSize={1}
                  fontWeight={600}
                  lineHeight="16px"
                  mb={"14px"}
                >
                  Type of Budget / Project
                </Label>
                <Field
                  name="password"
                  type="text"
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "4px",
                  }}
                  component={AntSelect}
                  submitCount={submitCount}
                  hasFeedback
                />
              </Box>

              <Box className="field-bg" width={"40%"}>
                <Label
                  color="labelColor"
                  fontSize={1}
                  fontWeight={600}
                  lineHeight="16px"
                  mb={"14px"}
                >
                  Budget Year
                </Label>
                <Field
                  name="password"
                  type="text"
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "4px",
                  }}
                  component={AntSelect}
                  submitCount={submitCount}
                  hasFeedback
                />
              </Box>

              <Box className="field-bg" width={"60%"}>
                <Label
                  color="labelColor"
                  fontSize={1}
                  fontWeight={600}
                  lineHeight="16px"
                  mb={"14px"}
                >
                  Select Data File
                </Label>
                <Field
                  name="password"
                  type="text"
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "4px",
                  }}
                  component={AntSelect}
                  submitCount={submitCount}
                  hasFeedback
                />
              </Box>

              <Box display="flex" alignItems="center">
                <ButtonOutlined
                  width={"auto"}
                  p={"0px 19px"}
                  height="auto"
                  fontWeight={5}
                  borderColor={colors.modes.light.danger}
                  color={colors.modes.light.danger}
                  bg={colors.modes.light.white}
                  borderRadius={"4px"}
                  //   disabled={
                  //     (touched && !isValid) || loading || userNameError !== ""
                  //       ? true
                  //       : false
                  //   }
                  type="submit"
                >
                  {/* {loading ? "Please Wait..." : ""} */}
                  Add
                </ButtonOutlined>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      {/* table below */}
      {component}
      {/* buttons */}
      <Box
        width="75%"
        mt={"32px"}
        display="flex"
        justifyContent="flex-end"
        style={{ gap: "25px" }}
      >
        <ButtonOutlined
          width={"210px"}
          p={"0px 19px"}
          height="50px"
          fontWeight={7}
          fontSize={"18px"}
          letterSpacing={"0.01em"}
          borderColor={"#D0D4D7"}
          color={colors.modes.light.primaryColor}
          bg={colors.modes.light.white}
          borderRadius={"5px"}
          hover={colors.modes.light.primaryColor}
          onClick={() => handlePreviewReport()}
        >
          Preview
        </ButtonOutlined>
        <ButtonOutlined
          width={"210px"}
          p={"0px 19px"}
          height="50px"
          fontWeight={7}
          fontSize={"18px"}
          letterSpacing={"0.01em"}
          borderColor={colors.modes.light.danger}
          color={colors.modes.light.danger}
          bg={colors.modes.light.white}
          borderRadius={"5px"}
          hover={colors.modes.light.danger}
        >
          Upload
        </ButtonOutlined>
      </Box>
    </UploadContainer>
  );
};

export default BudgetUpload;
