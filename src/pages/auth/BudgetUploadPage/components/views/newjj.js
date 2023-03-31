import React, { useEffect, useState } from "react";
import { UploadContainer } from "../../../../../styles/layout";
import { Box, Text, Label } from "../../../../../components/Primitives";
import { AntSelect } from "../../../../../components/AntFormik";
import { ButtonOutlined } from "../../../../../components/Button";
import { Formik, Field, Form } from "formik";
import FileInput from "../uploadInput";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import colors from "../../../../../theme/colors";
import update from "immutability-helper";
import {
  fetchBudgetByTrackingId,
  handleStartProjectTracking,
  fetchProjectsByTrackingId,
  setCurrentView,
  handleErrorRequest,
  handleAddTrackingCycleData,
  fetchAvailableBudget,
  getBudgetStatistics,
  getAnomaliesData,
  getDuplicateData,
  handleAddTrackingCycleForOtherProject,
  fetchBudgetByTrackingIdforOthers,
  setSelectedBudgetType,
} from "../../../../../services/budgetPage/action";

import { LoadingOutlined } from "@ant-design/icons";
import {
  setTrackingId,
  fetchProjectTrackingId,
} from "../../../../../services/global/action";

const FILE_SIZE = 20 * 1048576;
const SUPPORTED_FORMATS = [
  // "application/pdf",
  "image/jpg",
  "image/png",
  "image/jpeg",
  // ".csv",
  // "application/vnd.ms-excel",
  // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const Schema = Yup.object().shape({
  trackingYear: Yup.string()
    .ensure()
    .required("Project tracking year is required"),
  budgetType: Yup.string().required("Budget/Project type is required"),

  budgetYear: Yup.string().when("budgetType", {
    is: (budgetType) => {
      return budgetType !== undefined && budgetType === "Other Projects"
        ? false
        : true;
    },

    then: Yup.string().required("Budget year is required"),
  }),

  otherFile: Yup.mixed().when("budgetType", {
    is: (budgetType) => {
      return budgetType !== undefined && budgetType !== "Other Projects"
        ? false
        : true;
    },

    then: Yup.mixed()
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
  }),
});

const BudgetUpload = ({
  currentPage,
  handlePreviewReport,
  component,
  ...props
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { trackingId, storedTrackingYear, trackingStatus } = useSelector(
    (state) => state.global
  );
  const { trackingYearList, budgetTypesList } = useSelector(
    (state) => state.metaData
  );

  const {
    budgetAdded,
    isAdding,
    isPreviewing,
    budgetYearList,
    addTrackingCycle,
    budgetTrackingList,
    budgetStatitics,
    selectedBudgetType,
  } = useSelector((state) => state.budget);

  const [selectedBudgetYear, setSelectedBudgetYear] = useState([]);
  const [filePayload, setFilePayload] = useState([]);

  const value = {
    trackingYear: storedTrackingYear !== null ? storedTrackingYear : "",
    budgetType: "",
    budgetYear: "",
    otherFile: undefined,
  };

  const showAnalysisPage = () => {
    dispatch(getBudgetStatistics({ TrackingId: "1010" }, navigate));
    dispatch(getAnomaliesData({ trackingId: "1010" }, navigate));
    dispatch(getDuplicateData({ TrackingId: "1010" }, navigate));
    if (budgetStatitics !== null) {
      dispatch(setCurrentView({ currentView: "analysis" }));
    }
  };

  const selectProjectTrackingYear = (e, setFieldValue) => {
    const { Period, Id } = JSON.parse(e);

    setFieldValue("trackingYear", Period);
    let splittedVal = Period.split(" ");

    dispatch(setTrackingId({ trackingId: Id, storedTrackingYear: Period }));
    dispatch(fetchAvailableBudget({ selectedYear: +splittedVal[0] }, navigate));
  };

  const selectBudgetType = (e, setFieldValue) => {
    const { Name } = JSON.parse(e);
    setFieldValue("budgetType", Name);
    dispatch(setSelectedBudgetType({ selectedBudgetType: Name }));
  };

  const selectBudgetYear = (e, setFieldValue) => {
    setFieldValue("budgetYear", e.toString());
    setSelectedBudgetYear(e);
  };

  const handleFileChange = (e, setFieldValue) => {
    const { files } = e.target;

    console.log(files);
    if (files.length > 0) {
      setFieldValue("otherFile", files[0]);
      // let index = filePayload.findIndex((i) => i.filename === name);

      setFilePayload((filePayload) =>
        update(filePayload, {
          $set: files,
        })
      );
    }
  };

  const handleAdd = (values) => {
    if (selectedBudgetType.includes("Other")) {
      if (
        selectedBudgetType !== "" &&
        trackingId !== null &&
        filePayload.length !== 0
      ) {
        let formData = new FormData();
        formData.append("ProjectTrackingId", trackingId);
        formData.append("BudgetType", 3);
        formData.append("BudgetYear", 0);
        formData.append("File", filePayload);
        dispatch(handleAddTrackingCycleForOtherProject(formData, navigate));
      } else {
        dispatch(handleErrorRequest("Input fields must not be empty."));
      }
    } else {
      if (
        selectedBudgetType !== "" &&
        selectedBudgetYear.length !== 0 &&
        trackingId !== null
      ) {
        let newArr = [];

        selectedBudgetYear?.map((item) =>
          newArr.push({
            ProjectTrackingId: trackingId,
            BudgetType:
              values.budgetType === "Executive"
                ? 1
                : values.budgetType === "Constituency"
                ? 2
                : values.budgetType === "Other"
                ? 3
                : null,
            BudgetYear: item,
          })
        );
        const params = newArr;
        sessionStorage.setItem("startPtr3king", JSON.stringify(params));
        dispatch(handleAddTrackingCycleData(params, navigate));
      } else {
        dispatch(handleErrorRequest("Input fields must not be empty."));
      }
    }
  };

  const handlePreviewAndUploadBtn = () => {
    // check if they have click on the add button. then do all this.
    if (
      selectedBudgetType !== "" &&
      selectedBudgetYear.length !== 0 &&
      trackingId !== null &&
      budgetTrackingList.length === 0
    ) {
      let newArr = [];

      selectedBudgetYear?.map((item) =>
        newArr.push({
          ProjectTrackingId: trackingId,
          BudgetType:
            selectedBudgetType === "Executive"
              ? 1
              : selectedBudgetType === "Constituency"
              ? 2
              : selectedBudgetType === "Other"
              ? 3
              : null,
          BudgetYear: item,
        })
      );
      const params = newArr;
      dispatch(handleStartProjectTracking(params, navigate)).then(() => {
        props.setCurrentPage(1);
        dispatch(
          fetchProjectsByTrackingId(
            { Id: trackingId, CurrentPage: 1, PageSize: 10 },
            navigate
          )
        );
      });
    } else if (trackingId !== null && budgetTrackingList.length !== 0) {
      let params = budgetTrackingList;
      dispatch(handleStartProjectTracking(params, navigate)).then(() => {
        props.setCurrentPage(1);
        dispatch(
          fetchProjectsByTrackingId(
            { Id: trackingId, CurrentPage: 1, PageSize: 10 },
            navigate
          )
        );
      });
    } else {
      dispatch(
        handleErrorRequest(
          "Budget has not been added, hence nothing to preview."
        )
      );
    }
  };

  useEffect(() => {
    // fetch the budget table record below.
    if (trackingId !== null) {
      const projectParams = {
        id: trackingId,
      };
      dispatch(fetchProjectTrackingId(projectParams, navigate));

      dispatch(
        fetchBudgetByTrackingId(
          {
            ProjectTrackingId: trackingId,
          },
          navigate
        )
      );
    }
  }, [trackingId]);

  useEffect(() => {
    if (addTrackingCycle !== null) {
      dispatch(
        fetchBudgetByTrackingId(
          {
            ProjectTrackingId: trackingId,
          },
          navigate
        )
      );
    }
  }, [addTrackingCycle]);

  return (
    <UploadContainer>
      <Formik
        initialValues={value}
        validationSchema={Schema}
        onSubmit={handleAdd}
      >
        {({ submitCount, errors, setFieldValue, values, submitForm }) => {
          return (
            <Form style={{ width: "100%" }}>
              <Box
                display="flex"
                justifyContent="space-between"
                style={{ gap: "1rem" }}
              >
                <Box className="field-bg" width="40%">
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
                    selectType="trackingYear"
                    onChange={(e) =>
                      selectProjectTrackingYear(e, setFieldValue)
                    }
                    component={AntSelect}
                    selectOptions={trackingYearList}
                    submitCount={submitCount}
                    hasFeedback
                    showSearch
                    optionFilterProp="children"
                    optionLabelProp="label"
                    filterOption={(input, option) => {
                      return option.value
                        .toString()
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  />
                </Box>
                {selectedBudgetType !== "" &&
                  selectedBudgetType.includes("Other") && (
                    <Box>
                      <Text as="p">Please note the following.</Text>
                      <ul>
                        <li>File must be in Excel, CSV, or PDF format</li>
                        <li>File size should not be more than 20MB</li>
                      </ul>
                    </Box>
                  )}
              </Box>

              <Box display="flex" style={{ gap: "18px" }}>
                <Box className="field-bg" width="50%">
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
                    selectOptions={budgetTypesList}
                    submitCount={submitCount}
                    hasFeedback
                  />
                </Box>

                {(selectedBudgetType === "" ||
                  selectedBudgetType !== "Other Projects") && (
                  <>
                    <Box className="field-multi-bg" width="50%">
                      {/*  */}
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
                        mode="multiple"
                        placeholder="Select budget year"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "4px",
                        }}
                        onChange={(e) => selectBudgetYear(e, setFieldValue)}
                        component={AntSelect}
                        selectOptions={budgetYearList}
                        selectType="ceptgBYear"
                        value={selectedBudgetYear}
                        submitCount={submitCount}
                        hasFeedback
                        showSearch
                        optionFilterProp="children"
                        optionLabelProp="label"
                        filterOption={(input, option) => {
                          return option.value
                            .toString()
                            .toLowerCase()
                            .includes(input.toLowerCase());
                        }}
                      />
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
                        type="submit"
                        // onClick={submitForm}
                      >
                        {isAdding ? (
                          <Spin indicator={<LoadingOutlined />} />
                        ) : (
                          "Add"
                        )}
                      </ButtonOutlined>
                    </Box>
                  </>
                )}

                {selectedBudgetType !== "" &&
                  selectedBudgetType.includes("Other") && (
                    <>
                      <Box className="field-bg" width={"50%"}>
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
                          handleChange={(e) =>
                            handleFileChange(e, setFieldValue)
                          }
                          file={filePayload}
                          supportFormat={SUPPORTED_FORMATS}
                          name={"otherFile"}
                        />

                        {errors.otherFile && (
                          <div className="ant-form-item-explain ant-form-item-explain-error">
                            <div role="alert"> {errors.otherFile}</div>
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
                          type="submit"
                        >
                          {isAdding ? (
                            <Spin indicator={<LoadingOutlined />} />
                          ) : (
                            "Add"
                          )}
                        </ButtonOutlined>
                      </Box>
                    </>
                  )}
              </Box>
            </Form>
          );
        }}
      </Formik>

      {/* table below */}
      {component}

      <Box
        width="100%"
        mt={"32px"}
        display="flex"
        justifyContent="center"
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
            cursor:
              trackingStatus !== null && trackingStatus?.tracking
              .Status !== 1
                ? "not-allowed"
                : "pointer",
          }}
          disabled={
            trackingStatus !== null && trackingStatus?.tracking
            .Status !== 1
              ? true
              : false
          }
          onClick={() => handlePreviewAndUploadBtn()}
        >
          {isPreviewing ? (
            <Spin indicator={<LoadingOutlined />} />
          ) : (
            "Preview & Upload"
          )}
        </ButtonOutlined>
        {/* <ButtonOutlined
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
            cursor:
              trackingStatus !== null && trackingStatus?.tracking
.Status !== 1
                ? "not-allowed"
                : "pointer",
          }}
          disabled={
            trackingStatus !== null && trackingStatus?.tracking
.Status !== 1
              ? true
              : false
          }
          onClick={() => handleUploadBudget()}
        >
          {isUploading ? <Spin indicator={<LoadingOutlined />} /> : "Upload"}
        </ButtonOutlined> */}
        <ButtonOutlined
          width={"210px"}
          p={"0px 19px"}
          height="50px"
          fontWeight={6}
          fontSize={"18px"}
          letterSpacing={"0.01em"}
          borderColor={"#D0D4D7"}
          color={colors.modes.light.primaryColor}
          bg={colors.modes.light.white}
          borderRadius={"5px"}
          hover={colors.modes.light.primaryColor}
          onClick={() => showAnalysisPage()}
          style={{
            cursor: "pointer",
          }}
        >
          View Analysis
        </ButtonOutlined>
      </Box>
    </UploadContainer>
  );
};

// export default BudgetUpload;


import styled from "styled-components";
import { Text, Box } from "../../../../../components/Primitives";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const StyledContainer = styled.div`
  position: relative;
  border: ${(props) =>
    props.selected ? "1px solid #3c751f" : "1px solid #D2D7DB"};
  background-color: ${(props) => props.theme.colors.inputBgColor};
  border-radius: 4px;
  height: 48px;

  .inputfile {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    padding: 9px 0;
    cursor: pointer;
  }

  .inputfile-inner {
    display: flex;
    justify-content: space-between;
    padding: 9px 14px;
  }
`;

const FileInput = ({ handleChange, name, file, supportFormat }) => {
  const { isUploading } = useSelector((state) => state.contract);

  return (
    <StyledContainer selected={file.length !== 0 ? true : false}>
      <input
        type="file"
        accept={supportFormat}
        multiple={true}
        name={"partnerApproval"}
        id={"partnerApproval"}
        className="inputfile"
        onChange={handleChange}
      />
      <div className="inputfile-inner">
        <label htmlFor={name}>
          <Text
            mt={2}
            fontSize="11px"
            color={file ? "#3c751f" : "#838D9D"}
            fontWeight={5}
          >
            {/* "${file.filename}" */}
            {file.length !== 0
              ? `You have selected a file`
              : "No file uploaded yet"}
          </Text>
        </label>
        <Box
          bg="#A4A4A4"
          borderRadius="4px"
          width="auto"
          height="30px"
          px={"14px"}
        >
          <Text color="#ffffff" lineHeight="28px">
            {isUploading ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                <LoadingOutlined style={{ marginRight: "0.65rem" }} />
                Uploading
              </span>
            ) : (
              "Browse"
            )}
          </Text>
        </Box>
      </div>
    </StyledContainer>
  );
};

export default FileInput;

