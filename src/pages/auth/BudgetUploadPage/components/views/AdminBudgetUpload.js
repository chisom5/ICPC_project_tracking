import React, { useState } from "react";
import { UploadContainer } from "../../../../../styles/layout";
import { Box, Text, Label } from "../../../../../components/Primitives";
import { AntDatePicker, AntSelect } from "../../../../../components/AntFormik";
import { ButtonOutlined } from "../../../../../components/Button";
import { Formik, Field, Form } from "formik";
import FileInput from "../uploadInput";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import colors from "../../../../../theme/colors";
import update from "immutability-helper";
import { handleAddBudgetWithoutTrackingCycle } from "../../../../../services/budgetPage/action";

import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

const FILE_SIZE = 30 * 1048576;
const SUPPORTED_FORMATS = [
  "application/pdf",
  "text/csv",
  ".csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const Schema = Yup.object().shape({
  budgetType: Yup.string().required("Budget/Project type is required"),
  budgetYear: Yup.string().when("trackingYear", {
    is: (trackingYear) => {
      const splittedVal =
        trackingYear !== undefined && trackingYear?.split(" ");

      return trackingYear !== undefined ? splittedVal[0] : true;
    },

    then: Yup.string().required("Budget year is required"),
  }),

  budgetFile: Yup.mixed()
    .required("Budget file is required")
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

const AdminBudgetUpload = ({
  currentPage,
  handlePagination,
  handlePreviewReport,
  component,
  ...props
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAdding } = useSelector((state) => state.budget);

  const [filePayload, setFilePayload] = useState([]);

  const value = {
    budgetType: "",
    budgetYear: "",
    budgetFile: undefined,
  };

  const selectBudgetType = (e, setFieldValue) => {
    const { Name } = JSON.parse(e);
    setFieldValue("budgetType", Name);
  };

  const selectBudgetYear = (date, dateString, setFieldValue) => {
    let d = moment(dateString);
    // console.log(d, dateString)
    setFieldValue("budgetYear", d);
  };

  const handleFileChange = (e, setFieldValue) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      setFieldValue("budgetFile", files[0]);
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

  const handleAdd = (values, { resetForm }) => {
    let formData = new FormData();
    formData.append(
      "Type",
      values?.budgetType.toLowerCase() === "executive"
        ? 1
        : values?.budgetType.toLowerCase() === "constituency"
        ? 2
        : null
    );
    formData.append("Year", values.budgetYear._i);
    formData.append("BudgetFileNameWithFormat", values.budgetFile?.name);
    formData.append("File", filePayload.length !== 0 && filePayload[0].data);

    dispatch(handleAddBudgetWithoutTrackingCycle(formData, navigate));
    // reset value
    resetForm({
      budgetType: "",
      budgetYear: "",
      budgetFile: undefined,
    });
    setFilePayload([])
  };

  return (
    <UploadContainer>
      <Formik
        initialValues={value}
        validationSchema={Schema}
        onSubmit={handleAdd}
      >
        {({ submitCount, errors, setFieldValue, values }) => (
          <Form style={{ width: "100%" }}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" style={{ flex: 1, gap: "1rem" }}>
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
                    name="budgetType"
                    type="text"
                    style={{
                      width: "100%",
                      height: "48px",
                      borderRadius: "4px",
                    }}
                    selectType="budgetType"
                    component={AntSelect}
                    onChange={(e) => selectBudgetType(e, setFieldValue)}
                    selectOptions={[
                      { Name: "Executive", Value: 1 },
                      { Name: "Constituency", Value: 2 },
                    ]}
                    submitCount={submitCount}
                    hasFeedback
                    // value={values.budgetType}
                  />
                </Box>
              </Box>

              <Box>
                <Text as="p">Please note the following.</Text>
                <ul>
                  <li>File must be in Excel, CSV, or PDF format</li>
                  <li>File size should not be more than 30MB</li>
                </ul>
              </Box>
            </Box>

            <Box display="flex" style={{ gap: "18px" }}>
              <Box className="field-multi-bg" width={"40%"}>
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
                  name="budgetYear"
                  style={{
                    width: "100%",
                    height: "48px",
                    borderRadius: "4px",
                  }}
                  onChange={(e, dateString) =>
                    selectBudgetYear(e, dateString, setFieldValue)
                  }
                  component={AntDatePicker}
                  picker="year"
                  // value={moment(values.budgetYear)}
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

                <FileInput
                  handleChange={(e) => handleFileChange(e, setFieldValue)}
                  file={
                    filePayload &&
                    filePayload[0] !== undefined &&
                    filePayload[0]
                  }
                  supportFormat={SUPPORTED_FORMATS}
                  name={"budgetFile"}
                />

                {errors.budgetFile && (
                  <div className="ant-form-item-explain ant-form-item-explain-error">
                    <div role="alert"> {errors.budgetFile}</div>
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
                  height="30px"
                  fontWeight={5}
                  borderColor={colors.modes.light.danger}
                  color={colors.modes.light.danger}
                  bg={colors.modes.light.white}
                  borderRadius={"4px"}
                  type="submit"
                >
                  {isAdding ? (
                    <Spin indicator={<LoadingOutlined />} />
                  ) : (
                    "Upload"
                  )}
                </ButtonOutlined>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </UploadContainer>
  );
};

export default AdminBudgetUpload;
