import React, { useState } from "react";
import { Modal, Button, Radio } from "antd";
import { ModalContainer } from "../../../../../../styles/layout";
import { Label } from "../../../../../../components/Primitives";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import { openModal } from "../../../../../../services/projectSelection/action";
import { Formik, Field, Form } from "formik";
import {
  AntDatePicker,
  AntInput,
  AntSelect,
} from "../../../../../../components/AntFormik";
import * as Yup from "yup";

const Schema = Yup.object().shape({});

const ProjectSelectionCriteriaModal = () => {
  const dispatch = useDispatch();

  const initial_value = {
    surveyName: "",
    clientName: "",
    manager: "",
  };
  const [radioValue, setRadioValue] = useState("");
  const { selectionCriteria, durationList } = useSelector(
    (state) => state.projectSelection
  );

  const handleCancel = () => {
    dispatch(openModal({ selectionCriteria: false }));
  };

  const handleSubmit = () => {};

  const onRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
  };
  return (
    <Modal
      title={null}
      open={selectionCriteria}
      footer={null}
      closable={false}
      width={480}
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
          <div>
            <Formik
              initialValues={initial_value}
              validationSchema={Schema}
              onSubmit={handleSubmit}
            >
              {({ touched, isValid, isSubmitting, submitCount }) => (
                <Form style={{ width: "100%" }}>
                  <div>
                    <Label>Survey Name</Label>
                    <Field
                      type="text"
                      name="surveyName"
                      width="100%"
                      placeholder="Enter name of survey"
                      style={{ height: "36px", borderRadius: "4px" }}
                      component={AntInput}
                      submitCount={submitCount}
                      hasFeedback
                    />
                  </div>

                  <div>
                    <Label>Client Name</Label>
                    <Field
                      name="clientName"
                      style={{ height: "36px", borderRadius: "4px" }}
                      component={AntSelect}
                      placeholder="Select client name"
                      selectOptions={durationList}
                      submitCount={submitCount}
                      value={initial_value.clientName || undefined}
                      hasFeedback
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </div>

                  <div>
                    <Label>Engagement Manager</Label>
                    <Field
                      name="manager"
                      style={{ height: "36px", borderRadius: "4px" }}
                      component={AntSelect}
                      placeholder="Select engagement manager"
                      selectOptions={durationList}
                      submitCount={submitCount}
                      hasFeedback
                      showSearch
                      value={initial_value.manager || undefined}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    />
                  </div>

                  {radioValue !== "scratch" ? (
                    <div className="divider">
                      <p id="sub_title">SURVEY QUESTIONS</p>

                      <Radio.Group
                        onChange={onRadioChange}
                        value={radioValue}
                        className="d-flex flex-column"
                      >
                        <Radio value={"template"} className="mb-2 radio-item">
                          Copy from existing template
                        </Radio>
                        {radioValue === "template" && (
                          <Field
                            name="manager"
                            style={{
                              height: "36px",
                              borderRadius: "4px",
                            }}
                            component={AntSelect}
                            placeholder="Select survey template"
                            selectOptions={durationList}
                            submitCount={submitCount}
                            hasFeedback
                            showSearch
                            value={initial_value.manager || undefined}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          />
                        )}
                        <Radio value={"scratch"} className="radio-item">
                          Start from scratch
                        </Radio>
                      </Radio.Group>
                    </div>
                  ) : null}

                  <div className="buttonContainer">
                    <Button
                      key="confirm"
                      className="confirmButton"
                      type="submit"
                    >
                      Save & Continue
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default ProjectSelectionCriteriaModal;
