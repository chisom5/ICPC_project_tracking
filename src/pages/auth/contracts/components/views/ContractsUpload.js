import React, { useState } from "react";
import { UploadContainer } from "../../../../../styles/layout";
import { Box, Text, Label } from "../../../../../components/Primitives";
import { AntInput } from "../../../../../components/AntFormik";
import { ButtonOutlined } from "../../../../../components/Button";
import FileInput from "../uploadInput";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import colors from "../../../../../theme/colors";
import update from "immutability-helper";
import { useDispatch, useSelector } from "react-redux";
import {
  handleUploadContractDetailData,
  handleErrorRequest,
  handleRequestSuccess,
} from "../../../../../services/contracts/action";
import { fetchProjectTrackingId } from "../../../../../services/global/action";

import { useNavigate } from "react-router-dom";
import moment from "moment";

const FILE_SIZE = 20 * 1048576;
const SUPPORTED_FORMATS = [
  // "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const Schema = Yup.object().shape({
  trackingYear: Yup.string()
    .ensure()
    .required("Project tracking year is required"),

  contractFile: Yup.mixed()
    .required("Petition file is required")
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

const BudgetUpload = ({
  currentPage,
  handlePagination,
  handlePreviewReport,
  handleDownload,
  component,
  ...props
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filePayload, setFilePayload] = useState([]);
  const { isDownloading, isUploading } = useSelector((state) => state.contract);
  const { trackingId, trackingStatus, storedTrackingYear } = useSelector(
    (state) => state.global
  );

  const value = {
    trackingYear: storedTrackingYear !== null ? storedTrackingYear : "",
    contractFile: undefined,
  };

  const handleFileChange = (e, setFieldValue) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      setFieldValue("contractFile", files[0]);
      let index = filePayload.findIndex((i) => i.name === name);

      if (index === -1) {
        setFilePayload([
          ...filePayload,
          {
            name: name,
            data: files[0],
            filename: files[0].name,
          },
        ]);
      } else {
        setFilePayload((filePayload) =>
          update(filePayload, {
            [index]: {
              $merge: {
                name: name,
                data: files[0],
                filename: files[0].name,
              },
            },
          })
        );
      }
    }
  };

  const handleAdd = () => {
    if (
      trackingStatus !== null &&
      (trackingStatus?.tracking.Status === 6 ||
        trackingStatus?.tracking.Status === 7 ||
        trackingStatus?.tracking.Status === 8)
    ) {
      let formData = new FormData();
      formData.append("projectTrackingId", trackingId);
      formData.append("File", filePayload.length !== 0 && filePayload[0].data);

      let data = [];
      data.push({
        Id: 1,
        dataFile: filePayload[0].filename,
        dateUploaded: moment().format("DD-MM-YYYY"),
      });

      // formData
      dispatch(handleUploadContractDetailData(formData, data, navigate)).then(
        () => {
          dispatch(fetchProjectTrackingId({ id: trackingId }, navigate));
        }
      );
    } else if (
      trackingStatus !== null &&
      trackingStatus?.tracking.Status <= 6
    ) {
      dispatch(
        handleErrorRequest(
          "Ensure you have completed the Pre-selection module for this tracking year."
        )
      );
    } else if (
      trackingStatus !== null &&
      trackingStatus?.tracking.Status > 8
    ) {
      dispatch(
        handleRequestSuccess(
          "Project Details is complete for this tracking year."
        )
      );
      setFilePayload([]);
    }
  };

  return (
    <UploadContainer>
      <Formik
        initialValues={value}
        validationSchema={Schema}
        onSubmit={handleAdd}
      >
        {({
          touched,
          isValid,
          isSubmitting,
          submitCount,
          errors,
          values,
          setFieldValue,
        }) => {
          return (
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
                    name="trackingYear"
                    width="100%"
                    style={{
                      height: "48px",
                      borderRadius: "4px",
                    }}
                    component={AntInput}
                    value={value.trackingYear}
                    disabled={trackingId !== null ? true : false}
                    submitCount={submitCount}
                    hasFeedback
                  />
                </Box>

                <Box color={colors.modes.light.instructionNotice}>
                  <Text
                    as="p"
                    letterSpacing="0.01em"
                    fontWeight={4}
                    fontSize="12px"
                    lineHeight="16px"
                  >
                    Please note the following.
                  </Text>
                  <ul
                    style={{
                      letterSpacing: "0.01em",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "16px",
                    }}
                  >
                    <li>File must be in Excel format</li>
                    <li>File size should not be more than 20MB</li>
                  </ul>
                </Box>
              </Box>

              <Box
                display="flex"
                style={{ gap: "18px", marginBottom: "1.2rem" }}
              >
                <Box className="field-bg" width={"60%"}>
                  <Label
                    color="labelColor"
                    fontSize={1}
                    fontWeight={600}
                    lineHeight="16px"
                    mb={"14px"}
                  >
                    Upload Project Details File
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
                    name={"contractFile"}
                  />
                  {errors.contractFile && (
                    <div className="ant-form-item-explain ant-form-item-explain-error">
                      <div role="alert"> {errors.contractFile}</div>
                    </div>
                  )}

                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Text fontSize={"11px"} color="#CC3366" fontWeight={4}>
                      Download File upload Template
                    </Text>
                    {/* download icon */}
                    {isDownloading ? (
                      <Spin indicator={<LoadingOutlined />} />
                    ) : (
                      <DownloadOutlined
                        style={{ cursor: "pointer", color: "#CC3366" }}
                        onClick={handleDownload}
                      />
                    )}
                  </Box>
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
                    {isUploading ? (
                      <Spin indicator={<LoadingOutlined />} />
                    ) : (
                      "Add"
                    )}
                  </ButtonOutlined>
                </Box>
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
          onClick={() => handlePreviewReport()}
        >
          Preview
        </ButtonOutlined>
      </Box>
    </UploadContainer>
  );
};

export default BudgetUpload;
