import React, { useState } from "react";
import {
  OtherContentContainer,
  TableWrapper,
} from "../../../../../styles/layout";
import { Spin } from "antd";
import { Box, Label, Text } from "../../../../../components/Primitives";
import { ButtonOutlined } from "../../../../../components/Button";
import FileInput from "../uploadInput";
import update from "immutability-helper";
import TableTopContent from "../../../../../components/TableTopContent";
import colors from "../../../../../theme/colors";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, DownloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  handleUploadContractDirectorsData,
  handleRequestSuccess,
  fetchContractAnomalByTrackingId,
} from "../../../../../services/contracts/action";
import { fetchProjectTrackingId } from "../../../../../services/global/action";

const ContractsAnomalies = ({ component, handleDownload }) => {
  const [filePayload, setFilePayload] = useState([]);
  const { isDownloading, isUploading } = useSelector((state) => state.contract);
  const { trackingId, trackingStatus } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
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

  const handleUploadDirector = () => {
    let formData = new FormData();
    formData.append("projectTrackingId", trackingId);
    formData.append("File", filePayload.length !== 0 && filePayload[0].data);

    dispatch(handleUploadContractDirectorsData(formData, navigate)).then(() => {
      dispatch(
        fetchContractAnomalByTrackingId(
          { Id: trackingId, CurrentPage: 1, PageSize: 10 },
          navigate
        )
      );
      dispatch(fetchProjectTrackingId({ id: trackingId }, navigate));
    });
  };

  // useEffect(() => {
  //   if (directorsFileUpload !== null) {
  //   }
  // }, [directorsFileUpload]);

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
            Upload List of Contracting Company Directors.
          </Label>

          <Box display="flex" alignItems="center" style={{ gap: "12px" }}>
            <FileInput
              handleChange={(e) => handleFileChange(e)}
              file={
                filePayload && filePayload[0] !== undefined && filePayload[0]
              }
              acceptedType={[
                "application/vnd.ms-excel",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              ]}
              name={"directorsFile"}
            />
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
              onClick={handleUploadDirector}
            >
              {isUploading ? (
                <Spin indicator={<LoadingOutlined />} />
              ) : (
                "Upload"
              )}
            </ButtonOutlined>
          </Box>

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
      </TableTopContent>

      <TableWrapper padding={"17px 16px 0px 16px"}>{component}</TableWrapper>
    </OtherContentContainer>
  );
};

export default ContractsAnomalies;
