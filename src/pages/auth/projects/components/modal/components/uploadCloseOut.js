import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ModalContainer } from "../../../../../../styles/layout";
import { useDispatch, useSelector } from "react-redux";
import SVG from "react-inlinesvg";
import {
  openModal,
  handleUploadCloseOutReport,
} from "../../../../../../services/projects/action";
import { Box, Label } from "../../../../../../components/Primitives";
import { Formik, Form } from "formik";
import FileInput from "../../uploadInput";
import * as Yup from "yup";
import update from "immutability-helper";

const UploadCloseOutReport = () => {
  const [filePayload, setFilePayload] = useState([]);

  const initial_value = {};

  const dispatch = useDispatch();
  const { showUploadCloseOut, isUploadingCloseOut } = useSelector(
    (state) => state.projects
  );

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      // setFieldValue("budgetFile", files[0]);
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


  const handleCancel = () => {
    setFilePayload([]);
    dispatch(openModal({ showUploadCloseOut: false }));
  };

  const handleSubmit = () => {
    // dispatch(handleUploadCloseOutReport({}))
  };
  return (
    <Modal
      title={null}
      open={showUploadCloseOut}
      footer={null}
      closable={false}
      width={480}
    >
      <ModalContainer>
        <header>
          <span className="modal-title">Upload Close Out Report</span>
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
              //   validationSchema={Schema}
              onSubmit={handleSubmit}
            >
              {({
                touched,
                isValid,
                isSubmitting,
                submitCount,
                submitForm,
              }) => (
                <Form style={{ width: "100%" }}>
                  <Box mb={4}>
                    <Label>Select File</Label>
                    <FileInput
                      handleChange={(e) => handleFileChange(e)}
                      file={
                        filePayload &&
                        filePayload[0] !== undefined &&
                        filePayload[0]
                      }
                      name={"executingAgvData"}
                      acceptedType={[
                        "application/vnd.ms-excel",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                      ]}
                    />
                  </Box>

                  <div className="buttonContainer">
                    <Button
                      key="confirm"
                      className="confirmButton"
                      type="submit"
                      onClick={submitForm}
                      loading={isUploadingCloseOut}
                    >
                      Upload
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

export default UploadCloseOutReport;
