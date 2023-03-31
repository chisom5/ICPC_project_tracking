import React, { useState, useId, useEffect } from "react";
import { Modal, Button, Spin } from "antd";
import { ModalContainer } from "../../../../../../styles/layout";
import { Label, Box, Img, Text } from "../../../../../../components/Primitives";
import { ButtonOutlined } from "../../../../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import {
  openModal,
  handleRequestErrorr,
  handleAdjustmentOfSelectionCriteria,
} from "../../../../../../services/projectSelection/action";
import { fetchProjectTrackingId } from "../../../../../../services/global/action";
import { Formik, Field, Form } from "formik";
import {
  AntInput,
  AntInputNumber,
  AntSelect,
} from "../../../../../../components/AntFormik";
import update from "immutability-helper";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import colors from "../../../../../../theme/colors";

const ProjectSelectionCriteriaModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectionCriteria, isAdjusting, otherProjectsAvailable } =
    useSelector((state) => state.projectSelection);
  const { DefaultCriteria, DefaultMetaData, gettingMetaData } = useSelector(
    (state) => state.metaData
  );
  const { trackingId } = useSelector((state) => state.global);

  const id = useId();
  const [projectTitle, setProjectTitle] = useState("");
  //
  const [budgetAmountList, setBudgetAmountList] = useState([]);
  const [titleKeywords, setTitleKeywords] = useState([]);
  const [targetSampleSize, setTargetSampleSize] = useState(null);
  // state
  const [selectedStatesName, setSelectedStatesName] = useState([]);
  const [selectedStatesId, setSelectedStatesId] = useState([]);
  // sectors
  const [selectedSectorsName, setSelectedSectorsName] = useState([]);
  const [selectedSectorsId, setSelectedSectorsId] = useState([]);
  // executing
  const [selectedExecutingName, setSelectedExecutingName] = useState([]);
  const [selectedExecutingId, setSelectedExecutingId] = useState([]);
  // constituency
  const [selectedConstituencyName, setSelectedConstituencyName] = useState([]);
  const [selectedConstituencyId, setSelectedConstituencyId] = useState([]);

  const initial_value = {};

  useEffect(() => {
    if (DefaultCriteria !== null) {
      if (
        DefaultCriteria !== null &&
        DefaultCriteria.budgetAmount["greaterThan"] !== null
      ) {
        const ind = budgetAmountList.findIndex((i) => i.labelId === 1);

        if (ind === -1) {
          setBudgetAmountList((budgetAmountList) =>
            update(budgetAmountList, {
              $unshift: [
                {
                  labelId: 1,
                  name: "Greater than",
                  title: "greaterThan",
                  amount: DefaultCriteria.budgetAmount["greaterThan"],
                },
              ],
            })
          );
        } else if (ind !== -1) {
          return;
        }
      }
      if (
        DefaultCriteria !== null &&
        DefaultCriteria.budgetAmount["lesserThan"] !== null
      ) {
        const ind = budgetAmountList.findIndex((i) => i.labelId === 2);

        if (ind === -1) {
          setBudgetAmountList((budgetAmountList) =>
            update(budgetAmountList, {
              $unshift: [
                {
                  labelId: 2,
                  name: "Lesser than",
                  title: "lesserThan",
                  amount: DefaultCriteria.budgetAmount["lesserThan"],
                },
              ],
            })
          );
        } else if (ind !== -1) {
          return;
        }
      }

      if (
        DefaultCriteria !== null &&
        DefaultCriteria.budgetAmount["equalTo"] !== null
      ) {
        const ind = budgetAmountList.findIndex((i) => i.labelId === 3);

        if (ind === -1) {
          setBudgetAmountList((budgetAmountList) =>
            update(budgetAmountList, {
              $unshift: [
                {
                  labelId: 2,
                  name: "Equal to",
                  title: "equalTo",
                  amount: DefaultCriteria.budgetAmount["equalTo"],
                },
              ],
            })
          );
        } else if (ind !== -1) {
          return;
        }
      }

      if (DefaultCriteria.titleKeywords !== undefined) {
        setTitleKeywords(DefaultCriteria.titleKeywords);
      }
      if (DefaultCriteria.targetSampleSize !== undefined) {
        setTargetSampleSize(+DefaultCriteria.targetSampleSize);
      }
    }
  }, [DefaultCriteria]);

  useEffect(() => {
    if (DefaultMetaData !== null) {
      // extract state.
      extractStateFromStateId();
      extractSectorFromSectorId();
      extractExecutingAgencyFromId();
      extractConstituenciesFromId();
    }
  }, [DefaultMetaData]);

  const extractStateFromStateId = () => {
    if (
      DefaultCriteria !== null &&
      DefaultCriteria.stateIds !== undefined &&
      DefaultMetaData !== null
    ) {
      let stateIds = DefaultCriteria?.stateIds.split(",");
      let newArr = [],
        a,
        i;

      for (a = 0; a < DefaultMetaData?.States.length; a++) {
        for (i = 0; i < stateIds.length; i++) {
          if (DefaultMetaData.States[a].Id === +stateIds[i]) {
            newArr.push(DefaultMetaData.States[a].Name);
          }
        }
      }

      setSelectedStatesName(newArr);
      setSelectedStatesId(stateIds);
    }
  };

  const extractSectorFromSectorId = () => {
    if (
      DefaultCriteria !== null &&
      DefaultCriteria.sectorIds !== undefined &&
      DefaultMetaData !== null
    ) {
      let sectorIds = DefaultCriteria.sectorIds.split(",");
      let newArr = [],
        a,
        i;

      for (a = 0; a < DefaultMetaData.Sectors.length; a++) {
        for (i = 0; i < sectorIds.length; i++) {
          if (DefaultMetaData.Sectors[a].Id === +sectorIds[i]) {
            newArr.push(DefaultMetaData.Sectors[a].Name);
          }
        }
      }

      setSelectedSectorsName(newArr);
      setSelectedSectorsId(sectorIds);
    }
  };

  const extractExecutingAgencyFromId = () => {
    if (
      DefaultCriteria !== null &&
      DefaultCriteria.executingAgencyIds !== undefined &&
      DefaultMetaData !== null
    ) {
      let executingAgencyIds = DefaultCriteria.executingAgencyIds.split(",");
      let newArr = [],
        a,
        i;

      for (a = 0; a < DefaultMetaData.ExecutingAgencies.length; a++) {
        for (i = 0; i < executingAgencyIds.length; i++) {
          if (
            DefaultMetaData.ExecutingAgencies[a].Id === +executingAgencyIds[i]
          ) {
            newArr.push(DefaultMetaData.ExecutingAgencies[a].Name);
          }
        }
      }

      setSelectedExecutingName(newArr);
      setSelectedExecutingId(executingAgencyIds);
    }
  };

  const extractConstituenciesFromId = () => {
    if (
      DefaultCriteria !== null &&
      DefaultCriteria.constituencyIds !== undefined &&
      DefaultMetaData !== null
    ) {
      let constituencyIds = DefaultCriteria.constituencyIds.split(",");
      let newArr = [],
        a,
        i;

      for (a = 0; a < DefaultMetaData.Constituencies.length; a++) {
        for (i = 0; i < constituencyIds.length; i++) {
          if (DefaultMetaData.Constituencies[a].Id === +constituencyIds[i]) {
            newArr.push(DefaultMetaData.Constituencies[a].Name);
          }
        }
      }

      setSelectedConstituencyName(newArr);
      setSelectedConstituencyId(constituencyIds);
    }
  };

  const onMultiSelectChange = (selectedName, typeName) => {
    switch (typeName) {
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

        console.log(newArrExId);
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

  const handleCancel = () => {
    // reset state here.
    setBudgetAmountList([]);

    setSelectedStatesName([]);
    setSelectedStatesId([]);

    setSelectedSectorsId([]);
    setSelectedSectorsName([]);

    setSelectedConstituencyId([]);
    setSelectedConstituencyName([]);

    setSelectedExecutingId([]);
    setSelectedExecutingName([]);

    dispatch(openModal({ selectionCriteria: false }));
  };

  const handleSubmit = () => {
    const params = {
      projectTrackingId: trackingId !== null && trackingId,
      budgetAmount: {
        greaterThan:
          budgetAmountList.filter((i) => i.title === "greaterThan").length !== 0
            ? budgetAmountList.filter((i) => i.title === "greaterThan")[0]
                .amount
            : null,
        lesserThan:
          budgetAmountList.filter((i) => i.title === "lesserThan").length !== 0
            ? budgetAmountList.filter((i) => i.title === "lesserThan")[0].amount
            : null,
        equalTo:
          budgetAmountList.filter((i) => i.title === "equalTo").length !== 0
            ? budgetAmountList.filter((i) => i.title === "equalTo")[0].amount
            : null,
      },
      targetSampleSize: targetSampleSize,
      titleKeywords: titleKeywords,
      stateIds: selectedStatesId.toString(),
      sectorIds: selectedSectorsId.toString(),
      executingAgencyIds: selectedExecutingId.toString(),
      constituencyIds: selectedConstituencyId.toString(),
    };

    dispatch(handleAdjustmentOfSelectionCriteria(params, navigate)).then(() => {
      dispatch(fetchProjectTrackingId({ id: trackingId }, navigate));
    });
  };

  const OnTargetSampleSizeChange = (e) => {
    setTargetSampleSize(e);
  };

  const handleTextChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setProjectTitle(value);
  };

  const removeProjectKeyword = (keyword) => {
    const ind = titleKeywords.findIndex(
      (i) => i.toLowerCase() === keyword.toLowerCase()
    );
    setTitleKeywords((titleKeywords) =>
      update(titleKeywords, {
        $splice: [[ind, 1]],
      })
    );
  };

  const addProjectKeyword = () => {
    const ind = titleKeywords.findIndex(
      (i) => i.toLowerCase() === projectTitle.toLowerCase()
    );
    if (ind === -1) {
      setTitleKeywords((prev) => [...prev, projectTitle.toLowerCase()]);
    }
    // reset form
    setProjectTitle("");
  };

  const addBudgetAmountList = () => {
    if (budgetAmountList.length !== 3) {
      setBudgetAmountList((budgetAmountList) =>
        update(budgetAmountList, {
          $unshift: [
            {
              labelId: budgetAmountList[0].labelId + 1,
              name: "",
              title: "",
              amount: "",
            },
          ],
        })
      );
    }
  };

  const removeBudgetAmountList = (id) => {
    const ind = budgetAmountList.findIndex((i) => i.labelId === id);
    setBudgetAmountList((budgetAmountList) =>
      update(budgetAmountList, {
        $splice: [[ind, 1]],
      })
    );
  };

  const handleBudgetCondition = (item, id) => {
    const { value, Period } = JSON.parse(item);
    const ind = budgetAmountList.findIndex((i) => i.labelId === id);
    const dualName = budgetAmountList.findIndex((i) => i.name === Period);

    if (dualName !== -1) {
      // dont update show error.
      dispatch(
        handleRequestErrorr(`The Condition ${Period} is already added.`)
      );
    } else if (dualName === -1) {
      setBudgetAmountList((budgetAmountList) =>
        update(budgetAmountList, {
          [ind]: {
            $merge: {
              title: value,
              name: Period,
            },
          },
        })
      );
    }
  };
  const handleBudgetAmount = (val, item) => {
    const ind = budgetAmountList.findIndex((i) => i.labelId === item.labelId);

    setBudgetAmountList((budgetAmountList) =>
      update(budgetAmountList, {
        [ind]: {
          $merge: {
            amount: val,
          },
        },
      })
    );
  };

  return (
    <Modal
      title={null}
      open={selectionCriteria}
      footer={null}
      closable={false}
      onCancel={handleCancel}
      width={500}
    >
      <ModalContainer>
        <header>
          <span className="modal-title">Project Selection Criteria</span>
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
                }) => {
                  return (
                    <Form style={{ width: "100%" }}>
                      <Box display="flex">
                        <Label mr={"10px"}>Enter Target Sample Size</Label>
                        <Field
                          name="targetSampleSize"
                          width="100%"
                          placeholder="Enter sample size"
                          style={{ height: "40px", borderRadius: "4px" }}
                          component={AntInputNumber}
                          onChange={OnTargetSampleSizeChange}
                          value={targetSampleSize}
                          submitCount={submitCount}
                        />
                      </Box>

                      <Box>
                        <Label mb={1}>Project Title must contain</Label>
                        <Box display="flex" style={{ gap: "10px" }}>
                          <Box style={{ flex: 1 }}>
                            <Field
                              width="100%"
                              type="text"
                              style={{ height: "40px", borderRadius: "4px" }}
                              name="projectTitle"
                              onChange={(e) => handleTextChange(e)}
                              component={AntInput}
                              placeholder="Enter Project Keyword"
                              submitCount={submitCount}
                              value={projectTitle}
                            />
                          </Box>

                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            width="38px"
                            height="40px"
                            borderRadius="4px"
                            border="1px solid #D3D5D7"
                            style={{ cursor: "pointer" }}
                            onClick={() => addProjectKeyword()}
                          >
                            <Img
                              src={
                                require("../../../../../../assets/images/plus.svg")
                                  .default
                              }
                            />
                          </Box>
                        </Box>
                      </Box>
                      {/* show keywords */}
                      <Box
                        style={{ gap: "8px" }}
                        display="flex"
                        flexWrap="wrap"
                        mb={3}
                      >
                        {titleKeywords?.map((item) => (
                          <Box
                            key={`${id}-${item}`}
                            display="inline-flex"
                            p={"3px 12px"}
                            bg={"#F2F2F2"}
                            borderRadius="12px"
                            style={{ gap: "18px" }}
                          >
                            {item}
                            <Img
                              style={{ cursor: "pointer" }}
                              onClick={() => removeProjectKeyword(item)}
                              src={
                                require("../../../../../../assets/images/close.svg")
                                  .default
                              }
                            />
                          </Box>
                        ))}
                      </Box>
                      {otherProjectsAvailable.length !== 0 && (
                        <Box display="flex" mb={"12px"}>
                          <Text fontSize={"13px"} as="p" fontStyle="italic" color={colors.modes.light.danger}>
                            Other Projects e.g Petitions etc.
                            <Text>
                              have been included in the project samples being
                              selected
                            </Text>
                          </Text>
                        </Box>
                      )}
                      <Box>
                        <Label mb={1}>Budget Amount must be</Label>
                        <Box display="flex" flexWrap="wrap">
                          {budgetAmountList?.map((item) => {
                            if (
                              budgetAmountList[budgetAmountList.length - 1]
                                .labelId === item.labelId
                            ) {
                              return (
                                <Box
                                  key={item.labelId}
                                  display="flex"
                                  style={{ gap: "10px" }}
                                >
                                  <Box className="budgetAmt_Select">
                                    <Field
                                      name={item.labelId}
                                      component={AntSelect}
                                      placeholder="Select condition"
                                      selectOptions={[
                                        {
                                          id: "Greater-1",
                                          Period: "Greater than",
                                          value: "greaterThan",
                                        },
                                        {
                                          id: "Lesser-2",
                                          Period: "Less than",
                                          value: "lesserThan",
                                        },
                                        {
                                          id: "Equal-3",
                                          Period: "Equal to",
                                          value: "equalTo",
                                        },
                                      ]}
                                      submitCount={submitCount}
                                      showSearch
                                      value={item.name}
                                      optionFilterProp="children"
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .includes(input.toLowerCase())
                                      }
                                      onChange={(e) =>
                                        handleBudgetCondition(e, item.labelId)
                                      }
                                    />
                                  </Box>
                                  <Box className="">
                                    <Field
                                      name={item.labelId}
                                      placeholder="Enter Amonunt"
                                      style={{
                                        height: "40px",
                                        width: "140px",
                                        borderRadius: "4px",
                                      }}
                                      component={AntInputNumber}
                                      value={item.amount}
                                      submitCount={submitCount}
                                      onChange={(e) =>
                                        handleBudgetAmount(e, item)
                                      }
                                    />
                                  </Box>
                                </Box>
                              );
                            } else {
                              return (
                                <Box
                                  key={item.labelId}
                                  display="flex"
                                  style={{ gap: "10px" }}
                                >
                                  <Box className="budgetAmt_Select">
                                    <Field
                                      name={item.labelId}
                                      component={AntSelect}
                                      placeholder="Select condition"
                                      selectOptions={[
                                        {
                                          id: "Greater-1",
                                          Period: "Greater than",
                                          value: "greaterThan",
                                        },
                                        {
                                          id: "Lesser-2",
                                          Period: "Less than",
                                          value: "lesserThan",
                                        },
                                        {
                                          id: "Equal-3",
                                          Period: "Equal to",
                                          value: "equalTo",
                                        },
                                      ]}
                                      submitCount={submitCount}
                                      showSearch
                                      value={item.name}
                                      optionFilterProp="children"
                                      filterOption={(input, option) =>
                                        option.children
                                          .toLowerCase()
                                          .includes(input.toLowerCase())
                                      }
                                      onChange={(e) =>
                                        handleBudgetCondition(e, item.labelId)
                                      }
                                    />
                                  </Box>
                                  <Box className="">
                                    <Field
                                      name={item.labelId}
                                      placeholder="Enter Amonunt"
                                      style={{
                                        height: "40px",
                                        width: "140px",
                                        borderRadius: "4px",
                                      }}
                                      component={AntInputNumber}
                                      value={item.amount}
                                      submitCount={submitCount}
                                      onChange={(e) =>
                                        handleBudgetAmount(e, item)
                                      }
                                    />
                                  </Box>

                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    height="40px"
                                    style={{
                                      cursor:
                                        budgetAmountList.length !== 3
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                    onClick={() =>
                                      removeBudgetAmountList(item.labelId)
                                    }
                                    marginLeft="16px"
                                  >
                                    <Img
                                      src={
                                        require("../../../../../../assets/images/close.svg")
                                          .default
                                      }
                                    />
                                  </Box>
                                </Box>
                              );
                            }
                          })}

                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="40px"
                            style={{
                              cursor:
                                budgetAmountList.length !== 3
                                  ? "pointer"
                                  : "not-allowed",
                            }}
                            onClick={addBudgetAmountList}
                            marginLeft="16px"
                          >
                            <Img
                              src={
                                require("../../../../../../assets/images/plus.svg")
                                  .default
                              }
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box>
                        <Label mb={1}>States selected are</Label>
                        <Field
                          mode="multiple"
                          name="stateIds"
                          style={{ borderRadius: "4px" }}
                          component={AntSelect}
                          placeholder="Select state name"
                          selectOptions={
                            DefaultMetaData !== null && DefaultMetaData.States
                          }
                          submitCount={submitCount}
                          value={selectedStatesName}
                          onChange={(e) => onMultiSelectChange(e, "stateIds")}
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

                      <Box>
                        <Label mb={1}>Sectors selected are</Label>
                        <Field
                          mode="multiple"
                          name="sectorsId"
                          style={{ borderRadius: "4px" }}
                          component={AntSelect}
                          placeholder="Select sectors"
                          selectOptions={
                            DefaultMetaData !== null && DefaultMetaData.Sectors
                          }
                          onChange={(e) => onMultiSelectChange(e, "sectorsId")}
                          submitCount={submitCount}
                          value={selectedSectorsName}
                          // hasFeedback
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

                      <Box>
                        <Label mb={1}>Executing Agencies selected are</Label>
                        <Field
                          mode="multiple"
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
                            onMultiSelectChange(e, "executingId")
                          }
                          selectType="selectionCriteria"
                          // hasFeedback
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        />
                      </Box>

                      <Box>
                        <Label mb={1}>Constituencies selected are</Label>
                        <Field
                          mode="multiple"
                          name="constituencyId"
                          style={{ borderRadius: "4px" }}
                          component={AntSelect}
                          placeholder="Select client name"
                          selectOptions={
                            DefaultMetaData !== null &&
                            DefaultMetaData.Constituencies
                          }
                          onChange={(e) =>
                            onMultiSelectChange(e, "constituencyId")
                          }
                          selectType="selectionCriteria"
                          submitCount={submitCount}
                          value={selectedConstituencyName}
                          // hasFeedback
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        />
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
                          onClick={submitForm}
                        >
                          {isAdjusting ? (
                            <Spin indicator={<LoadingOutlined />} />
                          ) : (
                            "Select Project Samples"
                          )}
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

export default ProjectSelectionCriteriaModal;
