import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { UploadContainer } from "../../../../../styles/layout";
import { Box, Label } from "../../../../../components/Primitives";
import { AntInput, AntTextArea } from "../../../../../components/AntFormik";
import { ButtonOutlined } from "../../../../../components/Button";
import FileInput from "../uploadInput";
import { convertBase64 } from "../../../../../utils";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import colors from "../../../../../theme/colors";
import update from "immutability-helper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveAddedSupportingDocs,
  fetchSupportingDocumentsData,
  handleUploadSupporting,
  handleErrorRequest,
} from "../../../../../services/projects/action";
import { LoadingOutlined } from "@ant-design/icons";

const FILE_SIZE = 20 * 1048576;
const SUPPORTED_FORMATS = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const Schema = Yup.object().shape({
  filename: Yup.string().ensure().required("File name is required"),

  description: Yup.string().required("File Description is required"),

  uploadFile: Yup.mixed()
    .required("Supporting document file is required")
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

const SupportingDocument = ({
  currentPage,
  handlePagination,
  handlePreviewReport,
  component,
  ...props
}) => {
  const [filePayload, setFilePayload] = useState([]);
  const {
    isUploadingSupportingDocs,
    supportingDocumentData,
    projectId,
    uploadedSupportingDocs,
    storedTrackingObj,
  } = useSelector((state) => state.projects);
  const { authUser } = useSelector((state) => state.global);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const value = {
    filename: "",
    description: "",
    uploadFile: undefined,
  };

  useEffect(() => {
    dispatch(
      // I don't want pagination for this endpoint.
      fetchSupportingDocumentsData(
        { projectId: projectId, CurrentPage: 1, PageSize: 3 },
        navigate
      )
    );
  }, []);

  const handleFileChange = (e, setFieldValue) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      setFieldValue("uploadFile", files[0]);

      let index = filePayload.findIndex((i) => i.name === name);
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

  const handleTextChange = (e, setFieldValue) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFieldValue(name, value);
  };

  const handleAdd = (values, resetForm) => {
    if (storedTrackingObj.Status >= 8) {
      const params = {
        Name: values.filename,
        Description: values.description,
        base64: filePayload.length !== 0 && filePayload[0].base64.split(",")[1],
        documentExtension:
          filePayload.length !== 0 && filePayload[0].fileType.split("/")[1],
      };

      dispatch(saveAddedSupportingDocs(params)).then(() => {
        resetForm({
          filename: "",
          description: "",
          uploadFile: undefined,
        });
        setFilePayload([]);
      });
    } else {
      dispatch(
        handleErrorRequest(
          `Can't upload at the moment as you've not completed
             the process from budget upload to project details`
        )
      );
    }
  };

  const handleUploadAction = () => {
    if (storedTrackingObj.Status >= 8) {
      if(supportingDocumentData !== null){
      const params = {
        projectId: projectId,
        documents: supportingDocumentData,
      };
      dispatch(handleUploadSupporting(params, navigate));
    }else{
      dispatch(
        handleErrorRequest(
          `No file has been added yet.`
        )
      );
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

  useEffect(() => {
    if (uploadedSupportingDocs !== null) {
      dispatch(
        fetchSupportingDocumentsData({ projectId: projectId }, navigate)
      );
    }
  }, [uploadedSupportingDocs]);

  return (
    <UploadContainer>
      <Formik
        initialValues={value}
        validationSchema={Schema}
        onSubmit={(values, { resetForm }) => handleAdd(values, resetForm)}
      >
        {({
          touched,
          isValid,
          isSubmitting,
          submitCount,
          errors,
          setFieldValue,
          submitForm,
          values,
        }) => (
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
                  File Name
                </Label>
                <Field
                  type="text"
                  name="filename"
                  width="100%"
                  style={{
                    height: "48px",
                    borderRadius: "4px",
                  }}
                  defaultValue={values.filename}
                  onChange={(e) => handleTextChange(e, setFieldValue)}
                  component={AntInput}
                  submitCount={submitCount}
                  hasFeedback
                />
              </Box>

              <Box className="field-bg" width={"50%"}>
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
                  rows={2}
                  defaultValue={values.description}
                  onChange={(e) => handleTextChange(e, setFieldValue)}
                />
              </Box>
            </Box>

            <Box display="flex" style={{ gap: "18px" }}>
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
                  acceptedType={[
                    "application/vnd.ms-excel",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  ]}
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
                  onClick={submitForm}
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
          style={{
            disabled:
              authUser !== null && authUser.roleName === "MDA" ? false : true,
            cursor:
              authUser !== null && authUser.roleName === "MDA"
                ? "pointer"
                : "not-allowed",
          }}
          onClick={handleUploadAction}
        >
          {isUploadingSupportingDocs ? (
            <Spin indicator={<LoadingOutlined />} />
          ) : (
            "Upload"
          )}
        </ButtonOutlined>
      </Box>
    </UploadContainer>
  );
};

export default SupportingDocument;
