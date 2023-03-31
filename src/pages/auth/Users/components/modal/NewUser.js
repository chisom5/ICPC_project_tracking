import React, { useEffect } from "react";
import { Modal, Button } from "antd";
import { ModalContainer } from "../../../../../styles/layout";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import {
  handleAddNewuser,
  openAddModal,
} from "../../../../../services/users/action";
import { Formik, Field, Form } from "formik";
import { AntInput, AntSelect } from "../../../../../components/AntFormik";
import { Box, Label, Text } from "../../../../../components/Primitives";
import * as Yup from "yup";
import colors from "../../../../../theme/colors";
import { useNavigate } from "react-router-dom";

const Schema = Yup.object().shape({});

const AddNewUserModal = () => {
  const navigate = useNavigate();

  const initial_value = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roleName: "",
    mdaName: "",
  };

  const dispatch = useDispatch();
  const { DefaultMetaData } = useSelector((state) => state.metaData);
  const { showAddUser, roleList } = useSelector((state) => state.users);

  const handleTextChange = (e, setFieldValue) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const handleSelectChange = (name, e, setFieldValue) => {
    const { Name, Id } = JSON.parse(e);
    if (name === "roleName") {
      setFieldValue(name, Name);
    } else {
      setFieldValue(name, Name);
      setFieldValue(name === "mdaName" ? "mdaIds" : "", Id);
    }
  };

  const handleCancel = () => {
    dispatch(openAddModal({ showAddUser: false }));
  };

  const handleSubmit = (values, {resetForm}) => {
    const params = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      roleName: values.roleName,
      userType: values.roleName === "MDA" ? 2 : 1,
      mdaId: values.roleName === "MDA" ? values.mdaIds : 0,
    };
    resetForm({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      roleName: "",
      mdaName: "",
    });
    dispatch(handleAddNewuser(params, navigate));
  };

  return (
    <Modal
      title={null}
      open={showAddUser}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <Box>
            <p className="modal-title">Create New User</p>
            <Text
              color={colors.modes.light.danger}
              fontSize="10px"
              fontWeight="400"
            >
              * N/B: All fields are required
            </Text>
          </Box>
          {/* icon delete */}
          <span onClick={handleCancel} className="close-modal-icon">
            <SVG
              src={
                require("../../../../../assets/images/close-square.svg").default
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
              {({
                touched,
                isValid,
                isSubmitting,
                submitCount,
                setFieldValue,
                submitForm,
                values,
              }) => {
                return (
                  <Form style={{ width: "100%" }}>
                    <Box display="flex" style={{ gap: "10px" }}>
                      <Box flex={1}>
                        <Label
                          fontSize="10px"
                          fontWeight={"400"}
                          color={colors.modes.light.gray2}
                        >
                          First Name
                        </Label>
                        <Field
                          type="text"
                          name="firstName"
                          width="100%"
                          style={{ height: "36px", borderRadius: "4px" }}
                          component={AntInput}
                          value={values.firstName}
                          submitCount={submitCount}
                          onChange={(e) => handleTextChange(e, setFieldValue)}
                          hasFeedback
                        />
                      </Box>

                      <Box flex={1}>
                        <Label
                          fontSize="10px"
                          fontWeight={"400"}
                          color={colors.modes.light.gray2}
                        >
                          Last Name
                        </Label>
                        <Field
                          type="text"
                          name="lastName"
                          width="100%"
                          style={{ height: "36px", borderRadius: "4px" }}
                          component={AntInput}
                          submitCount={submitCount}
                          // value={values.lastName}
                          hasFeedback
                          onChange={(e) => handleTextChange(e, setFieldValue)}
                        />
                      </Box>
                    </Box>

                    <Box>
                      <Label
                        fontSize="10px"
                        fontWeight={"400"}
                        color={colors.modes.light.gray2}
                      >
                        Email
                      </Label>
                      <Field
                        type="text"
                        name="email"
                        width="100%"
                        style={{ height: "36px", borderRadius: "4px" }}
                        component={AntInput}
                        submitCount={submitCount}
                        value={values.email}
                        hasFeedback
                        onChange={(e) => handleTextChange(e, setFieldValue)}
                      />
                    </Box>

                    <Box>
                      <Label
                        fontSize="10px"
                        fontWeight={"400"}
                        color={colors.modes.light.gray2}
                      >
                        Phone Number
                      </Label>
                      <Field
                        type="number"
                        name="phoneNumber"
                        width="100%"
                        style={{ height: "36px", borderRadius: "4px" }}
                        component={AntInput}
                        submitCount={submitCount}
                        value={values.phoneNumber}
                        hasFeedback
                        onChange={(e) => handleTextChange(e, setFieldValue)}
                      />
                    </Box>

                    <Box>
                      <Label
                        fontSize="10px"
                        fontWeight={"400"}
                        color={colors.modes.light.gray2}
                      >
                        Role
                      </Label>
                      <Field
                        name="roleName"
                        width="100%"
                        style={{ height: "36px", borderRadius: "4px" }}
                        component={AntSelect}
                        placeholder="Select Role"
                        selectOptions={roleList}
                        submitCount={submitCount}
                        value={values.roleName}
                        hasFeedback
                        showSearch
                        onChange={(e) =>
                          handleSelectChange("roleName", e, setFieldValue)
                        }
                        selectType="budgetType"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    </Box>

                    {values.roleName === "MDA" && (
                      <Box>
                        <Label
                          fontSize="10px"
                          fontWeight={"400"}
                          color={colors.modes.light.gray2}
                        >
                          MDAs
                        </Label>
                        <Field
                          name="mdaName"
                          width="100%"
                          style={{ height: "36px", borderRadius: "4px" }}
                          component={AntSelect}
                          placeholder="Select Role"
                          selectOptions={
                            DefaultMetaData !== null &&
                            DefaultMetaData.ExecutingAgencies
                          }
                          value={values.mdaName}
                          submitCount={submitCount}
                          hasFeedback
                          showSearch
                          selectType="budgetType"
                          onChange={(e) =>
                            handleSelectChange("mdaName", e, setFieldValue)
                          }
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        />
                      </Box>
                    )}

                    <div className="buttonContainer">
                      <Button
                        key="confirm"
                        className="confirmButton"
                        type="submit"
                        onClick={submitForm}
                      >
                        Create User
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </section>
      </ModalContainer>
    </Modal>
  );
};

export default AddNewUserModal;
