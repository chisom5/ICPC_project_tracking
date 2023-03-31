import React, { useEffect, useRef } from "react";
import { Modal, Button } from "antd";
import { ModalContainer } from "../../../../../styles/layout";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import {
  handleUpdateuser,
  openEditModal,
} from "../../../../../services/users/action";
import { Formik, Field, Form } from "formik";
import { AntInput, AntSelect } from "../../../../../components/AntFormik";
import { Box, Label, Text } from "../../../../../components/Primitives";
import * as Yup from "yup";
import colors from "../../../../../theme/colors";
import { useNavigate } from "react-router-dom";

const Schema = Yup.object().shape({});

const EditUserModal = ({ userObj, ...props }) => {
  const navigate = useNavigate();

  let initial_value = {
    firstName:
      userObj !== null && userObj.Firstname !== undefined
        ? userObj.Firstname
        : "",
    lastName:
      userObj !== null && userObj.Lastname !== undefined
        ? userObj.Lastname
        : "",
    email: userObj !== null && userObj.Email !== undefined ? userObj.Email : "",
    phoneNumber:
      userObj !== null && userObj.PhoneNumber !== undefined
        ? userObj.PhoneNumber
        : "",
    roleName:
      userObj !== null && userObj.RoleName !== undefined
        ? userObj.RoleName
        : "",
    mdaName:
      userObj !== null && userObj.MdaName !== undefined ? userObj.MdaName : "",
    status:
      userObj !== null &&
      userObj.StatusId !== undefined &&
      userObj.StatusId === 0
        ? "Active"
        : userObj !== null &&
          userObj.StatusId !== undefined &&
          userObj.StatusId === 1
        ? "In-Active"
        : "",
  };

  const dispatch = useDispatch();
  const { DefaultMetaData } = useSelector((state) => state.metaData);
  const { showEditUser, roleList, userStatusList } = useSelector(
    (state) => state.users
  );

  const handleTextChange = (e, setFieldValue) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFieldValue(name, value);
  };

  const handleSelectChange = (name, e, setFieldValue) => {
    const { Name, Id } = JSON.parse(e);
    if (name === "roleName") {
      setFieldValue(name, Name);
    } else {
      setFieldValue(name, Name);
      setFieldValue(
        name === "status" ? "statusId" : name === "mdaName" ? "mdaIds" : "",
        Id
      );
    }
  };

  const handleCancel = () => {
    dispatch(openEditModal({ showEditUser: false }));
    props.handleSetCurrentUserObj(null);
  };

  const handleSubmit = (values) => {
    const params = {
      Id: userObj.Id,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: parseInt(values.phoneNumber),
      roleName: values.roleName,
      userType: values.roleName === "MDA" ? 2 : 1,
      mdaId: values.mdaIds,
      statusId: values.statusId,
    };
    console.log(params, userObj);
    dispatch(handleUpdateuser(params, navigate));
  };

  return (
    <Modal
      title={null}
      open={showEditUser}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <Box>
            <p className="modal-title">Edit User</p>
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
              enableReinitialize={true}
            >
              {({
                touched,
                isValid,
                isSubmitting,
                submitCount,
                setFieldValue,
                submitForm,
                values
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
                          defaultValue={values.firstName}
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
                          defaultValue={values.lastName}
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
                        defaultValue={values.email}
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
                        defaultValue={values.phoneNumber}
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
                        defaultValue={values.roleName}
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
                          defaultValue={values.mdaName}
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

                    <Box>
                      <Label
                        fontSize="10px"
                        fontWeight={"400"}
                        color={colors.modes.light.gray2}
                      >
                        Status
                      </Label>
                      <Field
                        name="status"
                        width="100%"
                        style={{ height: "36px", borderRadius: "4px" }}
                        component={AntSelect}
                        placeholder="Select Status"
                        selectOptions={userStatusList}
                        submitCount={submitCount}
                        defaultValue={values.status}
                        hasFeedback
                        onChange={(e) =>
                          handleSelectChange("status", e, setFieldValue)
                        }
                        selectType="budgetType"
                      />
                    </Box>

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

export default EditUserModal;
