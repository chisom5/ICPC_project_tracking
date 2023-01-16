import React, { useState } from "react";
import { UploadContainer } from "../../../../../styles/layout";
import { Box, Text, Label } from "../../../../../components/Primitives";
import { AntSelect, AntTextArea } from "../../../../../components/AntFormik";
import { ButtonOutlined } from "../../../../../components/Button";
import FileInput from "../uploadInput";
import { convertBase64 } from "../../../../../utils";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import colors from "../../../../../theme/colors";
import update from "immutability-helper";

const Schema = Yup.object().shape({
  email: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Please choose a stronger password between 8 and 24. Try a mix of letters, numbers, and symbols"
    ),
});

const FieldReport = ({
  currentPage,
  handlePagination,
  handlePreviewReport,
  component,
  ...props
}) => {
  const [filePayload, setFilePayload] = useState([]);

  const value = {
    email: "",
    password: "",
  };

  const handleAdd = () => {
    console.log("he");
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      let index = filePayload.findIndex((i) => i.name === name);
      // let imgSrc = URL.createObjectURL(files[0]);

      // const fileSize = Math.round(files[0].size / 1024);
      convertBase64(files[0]).then((data) => {
        if (index === -1) {
          setFilePayload([
            ...filePayload,
            {
              name: name,
              fileType: files[0].type,
              filename: files[0].name,
              PatnerApprovalFile: data,
            },
          ]);
        } else {
          setFilePayload((filePayload) =>
            update(filePayload, {
              [index]: {
                $merge: {
                  name: name,
                  fileType: files[0].type,
                  filename: files[0].name,
                  PatnerApprovalFile: data,
                },
              },
            })
          );
        }
      });
    }
  };

  return (
    <UploadContainer>
      <Formik
        initialValues={value}
        validationSchema={Schema}
        onSubmit={handleAdd}
      >
        {({ touched, isValid, isSubmitting, submitCount, errors }) => (
          <Form style={{ width: "100%" }}>
            <Box display="flex" style={{ gap: "14px" }}>
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
                    height: "48px",
                    borderRadius: "4px",
                  }}
                  placeholder="Select Project Tracking Year"
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
                  Upload Schedule
                </Label>

                <FileInput
                  handleChange={(e) => handleFileChange(e)}
                  file={
                    filePayload &&
                    filePayload[0] !== undefined &&
                    filePayload[0]
                  }
                  bg={colors.modes.light.inputBgColor}
                  name={"partnerApproval"}
                />
                {errors.ImmigrationSalary && (
                  <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert"> {errors.ImmigrationSalary}</div>
                  </div>
                )}
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="113px"
              >
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

            <Box className="field-bg" width="70%">
              <Label
                color="labelColor"
                fontSize={1}
                fontWeight={600}
                lineHeight="16px"
                mb={"14px"}
              >
                File Description
              </Label>
              <Field
                name="email"
                width="100%"
                className="ant-textarea"
                style={{
                  borderRadius: "4px",
                }}
                component={AntTextArea}
                submitCount={submitCount}
                hasFeedback
                rows={2}
              />
            </Box>
          </Form>
        )}
      </Formik>

      {/* table below */}
      {component}
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
          fontWeight={6}
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

export default FieldReport;
