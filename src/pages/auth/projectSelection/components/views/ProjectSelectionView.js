import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import {
  OtherContentContainer,
  TableWrapper,
} from "../../../../../styles/layout";
import { Box, Label, Text } from "../../../../../components/Primitives";
import { ButtonOutlined } from "../../../../../components/Button";
import FileInput from "../uploadInput";
import update from "immutability-helper";
import TableTopContent from "../../../../../components/TableTopContent";
import colors from "../../../../../theme/colors";
import {
  openModal,
  handleRequestErrorr,
  fetchProjectSelectionByTrackingId,
  handleDownloadExcutingAgTemplate,
  handleUploadExcutingAgData,
  handleFinaliseProjectSelection,
  handleRequestSuccess,
} from "../../../../../services/projectSelection/action";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";
import { DownloadOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  fetchDefaultProjectSelectionCriteria,
  fetchDefaultMetaData,
} from "../../../../../services/metaData/action";
import { fetchProjectTrackingId } from "../../../../../services/global/action";

const ProjectSelectionView = ({ component, currentPage }) => {
  const dispatch = useDispatch();
  const [filePayload, setFilePayload] = useState([]);
  const {
    sampleSelectedText,
    isDownloading,
    isUploading,
    uploadedFile,
    isSending,
  } = useSelector((state) => state.projectSelection);
  const { trackingId, trackingStatus } = useSelector((state) => state.global);

  const navigate = useNavigate();

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

  const handleUploadAction = () => {
    
    if (filePayload.length !== 0) {
      let formData = new FormData();
      formData.append("projectTrackingId", trackingId);
      formData.append("File", filePayload.length !== 0 && filePayload[0].data);

      dispatch(handleUploadExcutingAgData(formData, navigate)).then(() => {
        dispatch(fetchProjectTrackingId({ id: trackingId }, navigate));
      });
    } else {
      dispatch(handleRequestErrorr("No file was selected to be upload."));
    }
   
  };

  const openModalForSelectionCriteria = () => {
    if (
      trackingStatus !== null &&
      (trackingStatus?.tracking.Status >=2 ||
        trackingStatus?.tracking.Status >= 3 ||
        trackingStatus?.tracking.Status >= 4)
    ) {
      dispatch(fetchDefaultProjectSelectionCriteria(navigate));
      dispatch(fetchDefaultMetaData(navigate));
      dispatch(openModal({ selectionCriteria: true }));
    }
    
    else if (trackingStatus !== null && trackingStatus?.tracking.Status > 5) {
      dispatch(
        handleRequestSuccess(
          "Project selection is completed, proceed to contract & tender upload."
        )
      );
    }
  };

  const openModalForSampleSelected = () => {
    if (sampleSelectedText === "Save") {
      if (
        trackingStatus !== null &&
        (trackingStatus?.tracking.Status === 2 ||
          trackingStatus?.tracking.Status === 3 ||
          trackingStatus?.tracking.Status === 4)
      ) {
        dispatch(openModal({ sampleSelected: true }));
      }
   
      else if (trackingStatus !== null && trackingStatus?.tracking.Status > 5) {
        dispatch(
          handleRequestSuccess(
            "Project selection is completed, proceed to contract & tender upload."
          )
        );
      }
    }

    if (sampleSelectedText === "Finalise") {
      if (trackingStatus !== null && trackingStatus?.tracking.Status === 5) {
        dispatch(
          handleFinaliseProjectSelection(
            { projectTrackingId: trackingId },
            navigate
          )
        ).then(() => {
          dispatch(fetchProjectTrackingId({ id: trackingId }, navigate));
        });
      } 
    
       else if (
        trackingStatus !== null &&
        trackingStatus?.tracking.Status > 5
      ) {
        dispatch(
          handleRequestSuccess(
            "Project selection is completed, proceed to contract & tender upload."
          )
        );
      }
    }
  };

  const handleDownload = () => {
    dispatch(
      handleDownloadExcutingAgTemplate(
        {
          projectTrackingId: trackingId,
        },
        navigate
      )
    );
  };

  useEffect(() => {
    if (uploadedFile !== null) {
      setFilePayload([]);
      dispatch(
        fetchProjectSelectionByTrackingId(
          { Id: trackingId, CurrentPage: currentPage, PageSize: 10 },
          navigate
        )
      );
    }
  }, [uploadedFile]);

  return (
    <OtherContentContainer>
      <TableTopContent>
        <Box className="field-bg" width="40%">
          <Label
            color="labelColor"
            fontSize={1}
            fontWeight={600}
            lineHeight="16px"
            mb={"14px"}
          >
            Upload Executing Agencies and Constituency Data
          </Label>

          <Box display="flex" style={{ gap: "12px" }}>
            <Box className="field-bg" width={"75%"}>
              <FileInput
                handleChange={(e) => handleFileChange(e)}
                file={
                  filePayload && filePayload[0] !== undefined && filePayload[0]
                }
                name={"executingAgvData"}
                acceptedType={[
                  "application/vnd.ms-excel",
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ]}
              />

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
            <Box display="flex" alignItems="baseline" p={"10px 0px"}>
              <ButtonOutlined
                width={"auto"}
                p={"0px 12px"}
                height="32px"
                fontWeight={6}
                fontSize={"12px"}
                letterSpacing={"0.01em"}
                borderColor={colors.modes.light.danger}
                color={colors.modes.light.danger}
                bg={colors.modes.light.white}
                borderRadius={"5px"}
                hover={colors.modes.light.danger}
                onClick={() => handleUploadAction()}
              >
                {isUploading ? (
                  <Spin indicator={<LoadingOutlined />} />
                ) : (
                  "Upload"
                )}
              </ButtonOutlined>
            </Box>
          </Box>
        </Box>

        <Box display="flex" style={{ gap: "12px" }}>
          <ButtonOutlined
            width={"auto"}
            p={"0px 12px"}
            height="32px"
            fontWeight={6}
            fontSize={"12px"}
            letterSpacing={"0.01em"}
            borderColor={colors.modes.light.danger}
            color={colors.modes.light.danger}
            bg={colors.modes.light.white}
            borderRadius={"5px"}
            hover={colors.modes.light.danger}
            onClick={openModalForSelectionCriteria}
          >
            Adjust Project Selection Criteria
          </ButtonOutlined>
          <ButtonOutlined
            width={"auto"}
            p={"0px 12px"}
            height="32px"
            fontWeight={6}
            fontSize={"12px"}
            letterSpacing={"0.01em"}
            borderColor={colors.modes.light.danger}
            color={colors.modes.light.danger}
            bg={colors.modes.light.white}
            borderRadius={"5px"}
            hover={colors.modes.light.danger}
            onClick={openModalForSampleSelected}
          >
            {isSending ? (
              <Spin indicator={<LoadingOutlined />} />
            ) : (
              `${sampleSelectedText} Sample Selected`
            )}
          </ButtonOutlined>
        </Box>
      </TableTopContent>

      <TableWrapper padding={"17px 16px 0px 16px"}>{component}</TableWrapper>
    </OtherContentContainer>
  );
};

export default ProjectSelectionView;
