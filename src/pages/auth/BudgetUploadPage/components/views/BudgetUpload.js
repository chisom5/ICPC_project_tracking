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
  setSelectedBudgetType,
  handleRequestSuccess,
  openModal,
} from "../../../../../services/budgetPage/action";

import { LoadingOutlined } from "@ant-design/icons";
import {
  setTrackingId,
  fetchProjectTrackingId,
} from "../../../../../services/global/action";
import { fetchDefaultMetaData } from "../../../../../services/metaData/action";


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

  // otherFile: Yup.mixed().when("budgetType", {
  //   is: (budgetType) => {
  //     return budgetType !== undefined && budgetType !== "Other Projects"
  //       ? false
  //       : true;
  //   },

  //   then: Yup.mixed()
  //     .required("Petition file is required")
  //     .test(
  //       "fileSize",
  //       "File too large",
  //       (value) => !value || (value && FILE_SIZE > value.size)
  //     )
  //     .test(
  //       "fileFormat",
  //       "Unsupported Format",
  //       (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  //     ),
  // }),
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

  const value = {
    trackingYear: storedTrackingYear !== null ? storedTrackingYear : "",
    budgetType: "",
    budgetYear: "",
  };

  const showAnalysisPage = () => {
    if (trackingStatus !== null && trackingStatus.tracking.Status > 1) {
      dispatch(getBudgetStatistics({ TrackingId: trackingId }, navigate));
      dispatch(getAnomaliesData({ trackingId: trackingId }, navigate));
      dispatch(getDuplicateData({ TrackingId: trackingId }, navigate));
      if (budgetStatitics !== null) {
        dispatch(setCurrentView({ currentView: "analysis" }));
      }
    } else {
      handleErrorRequest(
        "Budget hasn't been uploaded yet, hence analysis can't be view."
      );
    }
  };

  const selectProjectTrackingYear = (e, setFieldValue) => {
    const { Period, Id } = JSON.parse(e);

    setFieldValue("trackingYear", Period);
    let splittedVal = Period.split(" ");

    dispatch(setTrackingId({ trackingId: Id, storedTrackingYear: Period }));
    dispatch(fetchAvailableBudget({ selectedYear: +splittedVal[0] }, navigate));

    dispatch(fetchProjectTrackingId({ id: Id }, navigate));
  };

  const selectBudgetType = (e, setFieldValue) => {
    const { Name } = JSON.parse(e);
    setFieldValue("budgetType", Name);
    dispatch(setSelectedBudgetType({ selectedBudgetType: Name }));

    if (Name === "Other Projects") {
      dispatch(openModal({ isOtherProject: true }));
      dispatch(fetchDefaultMetaData(navigate));
    }
  };

  const selectBudgetYear = (e, setFieldValue) => {
    setFieldValue("budgetYear", e.toString());
    setSelectedBudgetYear(e);
  };

  const handleAdd = (values) => {
    if (trackingStatus !== null && trackingStatus?.tracking.Status === 1) {
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
    } else {
      dispatch(
        handleErrorRequest(
          "Budget has already been uploaded for this tracking year."
        )
      );
    }
  };

  const handlePreviewAndUploadBtn = () => {
    if (trackingStatus !== null && trackingStatus?.tracking.Status === 1) {
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
    } else if(trackingStatus !== null && trackingStatus?.tracking.Status > 2) {
      // inform them that they have uploaded budget.
      dispatch(
        handleRequestSuccess(
          `Budget has been uploaded for this tracking year, proceed to Project selection.`
        )
      );
    }
  };

  useEffect(() => {
    // fetch the budget table record below.
    if (trackingId !== null) {
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
              </Box>
            </Form>
          );
        }}
      </Formik>

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
          onClick={() => handlePreviewAndUploadBtn()}
        >
          {isPreviewing ? (
            <Spin indicator={<LoadingOutlined />} />
          ) : (
            "Preview & Upload"
          )}
        </ButtonOutlined>

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

export default BudgetUpload;
