import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { UploadContainer } from "../../../../../styles/layout";
import { Box, Text, Label } from "../../../../../components/Primitives";
import {
  AntInput,
  AntSelect,
  AntTextArea,
} from "../../../../../components/AntFormik";
import { ButtonOutlined } from "../../../../../components/Button";
import FileInput from "../uploadInput";
import { convertBase64 } from "../../../../../utils";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import colors from "../../../../../theme/colors";
import update from "immutability-helper";
import { LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAddedFieldReport,
  handleFieldReportUpload,
  fetchUploadedFieldData,
  handleErrorRequest,
} from "../../../../../services/projects/action";
import { useNavigate } from "react-router-dom";

const FILE_SIZE = 20 * 1048576;
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];

const Schema = Yup.object().shape({
  description: Yup.string().required("File Description is required"),

  uploadFile: Yup.mixed()
    .required("Field report file is required")
    .test(
      "fileSize",
      "File too large",
      (value) => !value || (value && FILE_SIZE > value.size)
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    ),
});

const FieldReport = ({
  currentPage,
  handlePagination,
  component,
  ...props
}) => {
  const [filePayload, setFilePayload] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authUser } = useSelector((state) => state.global);
  const {
    fieldReportList,
    isUploading,
    trackingIdFromList,
    storedTrackingObj,
  } = useSelector((state) => state.projects);

  const value = {
    description: "",
    uploadFile: undefined,
  };

  useEffect(() => {
    dispatch(
      // I don't want pagination for this endpoint.
      fetchUploadedFieldData(
        { TrackingId: trackingIdFromList, CurrentPage: 1, PageSize: 3 },
        navigate
      )
    );
  }, []);

  const handleFileChange = (e, setFieldValue) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      setFieldValue("uploadFile", files[0]);

      let index = filePayload.findIndex((i) => i.name === name);
      // const fileSize = Math.round(files[0].size / 1024);
      convertBase64(files[0]).then((data) => {
        if (index === -1) {
          setFilePayload([
            ...filePayload,
            {
              name: name,
              fileType: files[0].type,
              filename: files[0].name,
              base64: data,
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
                  base64: data,
                },
              },
            })
          );
        }
      });
    }
  };

  const handleDescriptionChange = (e, setFieldValue) => {
    e.preventDefault();
    const { value } = e.target;
    setFieldValue("description", value);
  };

  const handleAdd = (values, resetForm) => {
    if (
      authUser !== null &&
      (authUser.roleName.toLowerCase().includes("field") ||
        authUser.roleName.toLowerCase().split("-")[0].includes("field"))
    ) {
      if (storedTrackingObj.Status >= 8) {
        // before uploading field report they must have been done with all the process from budget upload.
        const params = {
          name: filePayload.length !== 0 && filePayload[0].filename,
          description: values.description,
          base64:
            filePayload.length !== 0 && filePayload[0].base64.split(",")[1],
          documentExtension:
            filePayload.length !== 0 && filePayload[0].fileType.split("/")[1],
        };

        dispatch(saveAddedFieldReport(params)).then(() => {
          resetForm({
            description: "",
            uploadFile: undefined,
          });
          setFilePayload([]);
        });
      } else {
        //
        dispatch(
          handleErrorRequest(
            `Can't upload at the moment as you've not completed
            the process from budget upload to project details`
          )
        );
      }
    } else {
      dispatch(
        handleErrorRequest(
          "Only a Field User can upload field reporting document."
        )
      );
    }
  };

  const handleUploadAction = () => {
    if (
      authUser !== null &&
      (authUser.roleName.toLowerCase().includes("field") ||
        authUser.roleName.toLowerCase().split("-")[0].includes("field"))
    ) {
      if (storedTrackingObj.Status >= 8) {
        if (fieldReportList !== null) {
          const params = {
            TrackingId: trackingIdFromList,
            documents: fieldReportList,
          };
          dispatch(handleFieldReportUpload(params, navigate));
        } else {
          dispatch(handleErrorRequest(`No file has been added yet.`));
        }
      }
    } else {
      dispatch(
        handleErrorRequest(
          `Can't upload at the moment as you've not completed
             the process from budget upload to project details`
        )
      );
    }
  };

  return (
    <UploadContainer>
      <Formik
        initialValues={value}
        validationSchema={Schema}
        onSubmit={(values, { resetForm }) => handleAdd(values, resetForm)}
      >
        {({ submitCount, errors, values, setFieldValue, submitForm }) => {
          return (
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
                    name="trackingYear"
                    width="100%"
                    style={{
                      height: "48px",
                      borderRadius: "4px",
                    }}
                    component={AntInput}
                    value={storedTrackingObj.Period}
                    disabled={storedTrackingObj !== null ? true : false}
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
                    handleChange={(e) => handleFileChange(e, setFieldValue)}
                    file={
                      filePayload &&
                      filePayload[0] !== undefined &&
                      filePayload[0]
                    }
                    bg={colors.modes.light.inputBgColor}
                    acceptedType={["image/jpg", "image/png", "image/jpeg"]}
                    name={"uploadFile"}
                  />
                  {errors.uploadFile && (
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                      <div role="alert"> {errors.uploadFile}</div>
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
                    onClick={submitForm}
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
                  type="text"
                  name="description"
                  width="100%"
                  className="ant-textarea"
                  style={{
                    borderRadius: "4px",
                  }}
                  component={AntTextArea}
                  submitCount={submitCount}
                  hasFeedback
                  rows={3}
                  defaultValue={values.description}
                  onChange={(e) => handleDescriptionChange(e, setFieldValue)}
                />
              </Box>
            </Form>
          );
        }}
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
          onClick={handleUploadAction}
          style={{
            disabled:
              authUser !== null &&
              (authUser.roleName.toLowerCase().includes("field") ||
                authUser.roleName.toLowerCase().split("-")[0].includes("field"))
                ? false
                : true,
            cursor:
              authUser !== null &&
              (authUser.roleName.toLowerCase().includes("field") ||
                authUser.roleName.toLowerCase().split("-")[0].includes("field"))
                ? "pointer"
                : "not-allowed",
          }}
        >
          {isUploading ? <Spin indicator={<LoadingOutlined />} /> : "Upload"}
        </ButtonOutlined>
      </Box>
    </UploadContainer>
  );
};

export default FieldReport;
