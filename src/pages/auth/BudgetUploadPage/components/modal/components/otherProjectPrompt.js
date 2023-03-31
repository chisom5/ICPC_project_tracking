import React, { useState, useId, useEffect } from "react";
import { Modal, Button, Spin } from "antd";
import { ModalContainer } from "../../../../../../styles/layout";
import { Label, Box, Img, Text } from "../../../../../../components/Primitives";
import { ButtonOutlined } from "../../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import {
  openModal,
  handleErrorRequest,
  setSelectedBudgetType,
  handleAddTrackingCycleForOtherProject,
} from "../../../../../../services/budgetPage/action";

import { convertBase64 } from "../../../../../../utils";
import { Formik, Field, Form } from "formik";
import {
  AntInput,
  AntInputNumber,
  AntSelect,
} from "../../../../../../components/AntFormik";
import update from "immutability-helper";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FileInput from "../../uploadInput";

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/png",
  "image/jpeg",
  "application/pdf",
];

const OtherProjectsModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isOtherProject,
    selectedBudgetType,
    budgetYearList,
    addTrackingCycle,
  } = useSelector((state) => state.budget);

  const { DefaultMetaData, gettingMetaData } = useSelector(
    (state) => state.metaData
  );
  const { trackingId, trackingStatus } = useSelector((state) => state.global);

  const id = useId();

  const [projectTitle, setProjectTitle] = useState("");
  // project Type
  const [selectedProjectTypeId, setSelectedProjectTypeId] = useState(null);
  const [selectedProjectTypeName, setSelectedProjectTypeName] = useState("");
  const [Pcode, setPcode] = useState("");

  //budget
  const [budgetAmountAns, setBudgetAmountAns] = useState("");
  const [budgetYear, setBudgetYear] = useState(null);
  // result.
  const [resultArr, setResultArr] = useState([]);
  // state
  const [selectedStatesName, setSelectedStatesName] = useState("");
  const [selectedStatesId, setSelectedStatesId] = useState(null);
  // sectors
  const [selectedSectorsName, setSelectedSectorsName] = useState("");
  const [selectedSectorsId, setSelectedSectorsId] = useState(null);
  // executing
  const [selectedExecutingName, setSelectedExecutingName] = useState("");
  const [selectedExecutingId, setSelectedExecutingId] = useState(null);
  // constituency
  const [selectedConstituencyName, setSelectedConstituencyName] = useState("");
  const [selectedConstituencyId, setSelectedConstituencyId] = useState(null);

  const [filePayload, setFilePayload] = useState([]);

  const initial_value = {};

  useEffect(() => {
    if (addTrackingCycle !== null) {
      handleCancel();
    }
  }, [addTrackingCycle]);

  const handleCancel = () => {
    // reset state here.
    setBudgetAmountAns("");
    setSelectedProjectTypeName("");
    setSelectedProjectTypeId(null);
    setBudgetYear(null);
    setPcode("");
    setProjectTitle("");

    setSelectedStatesName("");
    setSelectedStatesId(null);

    setSelectedSectorsId(null);
    setSelectedSectorsName("");

    setSelectedConstituencyId(null);
    setSelectedConstituencyName("");

    setSelectedExecutingId(null);
    setSelectedExecutingName("");

    dispatch(openModal({ isOtherProject: false }));
    dispatch(setSelectedBudgetType({ selectedBudgetType: "" }));
    setResultArr([]);
  };

  const handleSubmit = () => {
    if (trackingStatus !== null && trackingStatus?.tracking.Status === 1) {
      if (selectedBudgetType !== "" && trackingId !== null) {
        let a = resultArr.map(({ filename, ...item }) => ({
          ...item,
          base64: item.base64.split(",")[1],
        }));
        dispatch(handleAddTrackingCycleForOtherProject(a, navigate));
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
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      // setFieldValue("otherFile", files[0]);
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

  const onMultiSelectChange = (selectedName, typeName) => {
    switch (typeName) {
      case "projectType":
        setSelectedProjectTypeName(selectedName);
        setSelectedProjectTypeId(selectedName === "Soft" ? 0 : 1);
        break;

      case "stateIds":
        let newArrIds = [],
          a,
          i;

        for (a = 0; a < DefaultMetaData?.States.length; a++) {
          for (i = 0; i < selectedName.length; i++) {
            if (DefaultMetaData.States[a].Name === selectedName[i]) {
              newArrIds.push(DefaultMetaData.States[a].Id);
            }
          }
        }

        setSelectedStatesName(selectedName);
        setSelectedStatesId(newArrIds);
        break;

      case "sectorsId":
        let sectorsIdsArr = [],
          x,
          y;

        for (x = 0; x < DefaultMetaData.Sectors.length; x++) {
          for (y = 0; y < selectedName.length; y++) {
            if (DefaultMetaData.Sectors[x].Name === selectedName[y]) {
              sectorsIdsArr.push(DefaultMetaData.Sectors[x].Id);
            }
          }
        }

        setSelectedSectorsName(selectedName);
        setSelectedSectorsId(sectorsIdsArr);
        break;

      case "executingId":
        let newArrExId = [],
          b,
          c;

        for (b = 0; b < DefaultMetaData.ExecutingAgencies.length; b++) {
          for (c = 0; c < selectedName.length; c++) {
            if (DefaultMetaData.ExecutingAgencies[b].Name === selectedName[c]) {
              newArrExId.push(DefaultMetaData.ExecutingAgencies[b].Id);
            }
          }
        }

        setSelectedExecutingName(selectedName);
        setSelectedExecutingId(newArrExId);

        break;

      case "constituencyId":
        let newArrConstituency = [],
          j,
          k;

        for (j = 0; j < DefaultMetaData.Constituencies.length; j++) {
          for (k = 0; k < selectedName.length; k++) {
            if (DefaultMetaData.Constituencies[j].Name === selectedName[k]) {
              newArrConstituency.push(DefaultMetaData.Constituencies[j].Id);
            }
          }
        }

        setSelectedConstituencyName(selectedName);
        setSelectedConstituencyId(newArrConstituency);

        break;
      default:
        return;
    }
  };

  const onSingleSelectChange = (selectedName, typeName) => {
    switch (typeName) {
      case "projectType":
        setSelectedProjectTypeName(selectedName);
        setSelectedProjectTypeId(selectedName === "Soft" ? 0 : 1);
        break;

      case "stateIds":
        let newId, a;

        for (a = 0; a < DefaultMetaData?.States.length; a++) {
          if (DefaultMetaData.States[a].Name === selectedName) {
            newId = DefaultMetaData.States[a].Id;
          }
        }

        setSelectedStatesName(selectedName);
        setSelectedStatesId(newId);
        break;

      case "sectorsId":
        let sectorsId, x;

        for (x = 0; x < DefaultMetaData.Sectors.length; x++) {
          if (DefaultMetaData.Sectors[x].Name === selectedName) {
            sectorsId = DefaultMetaData.Sectors[x].Id;
          }
        }

        setSelectedSectorsName(selectedName);
        setSelectedSectorsId(sectorsId);
        break;

      case "executingId":
        let newExId, b;

        for (b = 0; b < DefaultMetaData.ExecutingAgencies.length; b++) {
          if (DefaultMetaData.ExecutingAgencies[b].Name === selectedName) {
            newExId = DefaultMetaData.ExecutingAgencies[b].Id;
          }
        }

        setSelectedExecutingName(selectedName);
        setSelectedExecutingId(newExId);

        break;

      case "constituencyId":
        let newConstituency, j;

        for (j = 0; j < DefaultMetaData.Constituencies.length; j++) {
          if (DefaultMetaData.Constituencies[j].Name === selectedName) {
            newConstituency = DefaultMetaData.Constituencies[j].Id;
          }
        }

        setSelectedConstituencyName(selectedName);
        setSelectedConstituencyId(newConstituency);

        break;
      default:
        return;
    }
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    if (name === "Pcode") {
      setPcode(value);
    } else {
      setProjectTitle(value);
    }
  };

  const selectBudgetYear = (e) => {
    setBudgetYear(e);
  };

  const addMultipleProject = () => {
    const ind = resultArr.findIndex(
      (i) =>
        i.filename === (filePayload.length !== 0 && filePayload[0].filename)
    );
    if (ind === -1) {
      // new add to the list.
      const params = {
        trackingId: trackingId,
        budgetType: 3,
        budgetYear: budgetYear,
        base64: filePayload.length !== 0 && filePayload[0].base64,
        documentExtension:
          filePayload.length !== 0 && filePayload[0].fileType.split("/")[1],
        projectType: selectedProjectTypeId,
        projectName: projectTitle,
        projectCode: Pcode,
        stateId: selectedStatesId,
        sectorId: selectedSectorsId,
        agencyId: selectedExecutingId,
        constituencyId: selectedConstituencyId,
        amount: budgetAmountAns,
        filename: filePayload.length !== 0 && filePayload[0].filename,
      };

      setResultArr((prev) => [...prev, params]);
    }
    // reset state here.
    setBudgetAmountAns("");
    setBudgetYear(null);
    setPcode("");
    setProjectTitle("");

    setSelectedProjectTypeId(null);

    setSelectedStatesName("");
    setSelectedStatesId(null);

    setSelectedSectorsId("");
    setSelectedSectorsName(null);

    setSelectedConstituencyId(null);
    setSelectedConstituencyName("");

    setSelectedExecutingId(null);
    setSelectedExecutingName("");
    setFilePayload([]);
  };

  const removeAProjectAdded = (filename) => {
    const ind = resultArr.findIndex((i) => i.filename === filename);
    setResultArr((resultArr) =>
      update(resultArr, {
        $splice: [[ind, 1]],
      })
    );
  };

  const handleBudgetAmount = (val, item) => {
    setBudgetAmountAns(val);
  };

  return (
    <Modal
      title={null}
      open={isOtherProject}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      width={600}
    >
      <ModalContainer>
        <header>
          <span className="modal-title">
            Enter Details of Other Project(s).
          </span>
          {/* icon delete */}
          <span onClick={handleCancel} className="close-modal-icon">
            <SVG
              src={
                require("../../../../../../assets/images/close-square.svg")
                  .default
              }
            />
          </span>
        </header>
        <section className="modal-mainContent">
          {gettingMetaData ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              {" "}
              <Spin indicator={<LoadingOutlined />} />
            </Box>
          ) : (
            <div>
              <Formik
                initialValues={initial_value}
                // validationSchema={Schema}
                onSubmit={handleSubmit}
              >
                {({
                  touched,
                  isValid,
                  isSubmitting,
                  submitCount,
                  submitForm,
                  // setFieldValue,
                }) => {
                  return (
                    <Form style={{ width: "100%" }}>
                      <Box>
                        <Label mb={1}>Project Title</Label>
                        <Box display="flex" style={{ gap: "10px" }}>
                          <Box style={{ flex: 1 }}>
                            <Field
                              width="100%"
                              type="text"
                              style={{ height: "40px", borderRadius: "4px" }}
                              name="projectTitle"
                              onChange={(e) => handleTextChange(e)}
                              component={AntInput}
                              placeholder="Enter Project Title"
                              submitCount={submitCount}
                              value={projectTitle}
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box display="flex" style={{ gap: "12px" }}>
                        <Box width="50%">
                          <Label mb={1}>Project Type</Label>
                          <Field
                            name="projectType"
                            style={{ borderRadius: "4px" }}
                            component={AntSelect}
                            placeholder="Select Project type"
                            selectOptions={[
                              {
                                id: "soft-0",
                                Name: "Soft",
                                value: 0,
                              },
                              {
                                id: "hard-1",
                                Name: "Hard",
                                value: 1,
                              },
                            ]}
                            submitCount={submitCount}
                            value={selectedProjectTypeName}
                            onChange={(e) =>
                              onSingleSelectChange(e, "projectType")
                            }
                            selectType="selectionCriteria"
                          />
                        </Box>

                        <Box width="50%">
                          <Label mb={1}>Project Code</Label>
                          <Field
                            width="100%"
                            type="text"
                            style={{ height: "40px", borderRadius: "4px" }}
                            name="Pcode"
                            onChange={(e) => handleTextChange(e)}
                            component={AntInput}
                            placeholder="Enter Project Title"
                            submitCount={submitCount}
                            value={Pcode}
                          />
                        </Box>
                      </Box>

                      <Box display="flex" style={{ gap: "12px" }}>
                        {/* budget year */}
                        <Box width="50%">
                          <Label mb={1}>Budget Year</Label>
                          <Field
                            name="budgetYear"
                            // mode="multiple"
                            placeholder="Select budget year"
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "4px",
                            }}
                            onChange={(e) => selectBudgetYear(e)}
                            component={AntSelect}
                            selectOptions={budgetYearList}
                            selectType="ceptgBYear"
                            value={budgetYear}
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

                        <Box width="50%">
                          <Label mb={1}>Budget Amount</Label>

                          <Field
                            // name={item.labelId}
                            placeholder="Enter Amount"
                            style={{
                              height: "40px",
                              width: "100%",
                              borderRadius: "4px",
                            }}
                            component={AntInputNumber}
                            value={budgetAmountAns}
                            submitCount={submitCount}
                            onChange={(e) =>
                              handleBudgetAmount(e, "budgetAmount")
                            }
                          />
                        </Box>
                      </Box>

                      <Box display="flex" style={{ gap: "12px" }}>
                        <Box width="50%">
                          <Label mb={1}>States</Label>
                          <Field
                            // mode="multiple"
                            name="stateIds"
                            style={{ borderRadius: "4px" }}
                            component={AntSelect}
                            placeholder="Select state name"
                            selectOptions={
                              DefaultMetaData !== null && DefaultMetaData.States
                            }
                            submitCount={submitCount}
                            value={selectedStatesName}
                            onChange={(e) =>
                              onSingleSelectChange(e, "stateIds")
                            }
                            selectType="selectionCriteria"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Box>

                        <Box width="50%">
                          <Label mb={1}>Sectors</Label>
                          <Field
                            // mode="multiple"
                            name="sectorsId"
                            style={{ borderRadius: "4px" }}
                            component={AntSelect}
                            placeholder="Select sectors"
                            selectOptions={
                              DefaultMetaData !== null &&
                              DefaultMetaData.Sectors
                            }
                            onChange={(e) =>
                              onSingleSelectChange(e, "sectorsId")
                            }
                            submitCount={submitCount}
                            value={selectedSectorsName}
                            selectType="selectionCriteria"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Box>
                      </Box>

                      <Box display="flex" style={{ gap: "12px" }}>
                        <Box width="50%">
                          <Label mb={1}>Executing Agencies</Label>
                          <Field
                            name="executingId"
                            style={{ borderRadius: "4px" }}
                            component={AntSelect}
                            placeholder="Select Executing agency"
                            selectOptions={
                              DefaultMetaData !== null &&
                              DefaultMetaData.ExecutingAgencies
                            }
                            submitCount={submitCount}
                            value={selectedExecutingName}
                            onChange={(e) =>
                              onSingleSelectChange(e, "executingId")
                            }
                            selectType="selectionCriteria"
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Box>

                        <Box width="50%">
                          <Label mb={1}>Constituencies</Label>
                          <Field
                            name="constituencyId"
                            style={{ borderRadius: "4px" }}
                            component={AntSelect}
                            placeholder="Select constituency name"
                            selectOptions={
                              DefaultMetaData !== null &&
                              DefaultMetaData.Constituencies
                            }
                            onChange={(e) =>
                              onSingleSelectChange(e, "constituencyId")
                            }
                            selectType="selectionCriteria"
                            submitCount={submitCount}
                            value={selectedConstituencyName}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        </Box>
                      </Box>

                      <Box className="field-bg" width={"100%"} mb={"16px"}>
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
                          handleChange={(e) => handleFileChange(e)}
                          file={
                            filePayload &&
                            filePayload[0] !== undefined &&
                            filePayload[0]
                          }
                          supportFormat={SUPPORTED_FORMATS}
                          name={"otherFile"}
                        />
                      </Box>

                      <Box display="flex" justifyContent="flex-end">
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          width="38px"
                          height="40px"
                          borderRadius="4px"
                          border="1px solid #D3D5D7"
                          style={{ cursor: "pointer" }}
                          onClick={() => addMultipleProject()}
                        >
                          <Img
                            src={
                              require("../../../../../../assets/images/plus.svg")
                                .default
                            }
                          />
                        </Box>
                      </Box>

                      <Box
                        style={{ gap: "8px" }}
                        display="flex"
                        flexWrap="wrap"
                        mb={2}
                        mt={3}
                      >
                        {resultArr?.map((item) => (
                          <Box
                            key={`${id}-${item.filename}`}
                            display="inline-flex"
                            p={"3px 9px"}
                            bg={"#F2F2F2"}
                            borderRadius="12px"
                            style={{ gap: "18px" }}
                          >
                            {item.filename}
                            <Img
                              style={{ cursor: "pointer" }}
                              onClick={() => removeAProjectAdded(item.filename)}
                              src={
                                require("../../../../../../assets/images/close.svg")
                                  .default
                              }
                            />
                          </Box>
                        ))}
                      </Box>

                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mt={4}
                      >
                        <Button
                          key="confirm"
                          className="confirmButton"
                          type="submit"
                          disabled={resultArr.length !== 0 ? false : true}
                          onClick={submitForm}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          )}
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default OtherProjectsModal;
