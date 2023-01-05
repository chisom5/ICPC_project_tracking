import React, { useState } from "react";
import {
  OtherContentContainer,
  TableWrapper,
} from "../../../../../styles/layout";
import { Box, Label } from "../../../../../components/Primitives";
import { ButtonOutlined } from "../../../../../components/Button";
import FileInput from "../uploadInput";
import { convertBase64 } from "../../../../../utils";
import update from "immutability-helper";
import TableTopContent from "../../../../../components/TableTopContent";
import colors from "../../../../../theme/colors";

const ProjectSelectionView = ({ component }) => {
  const [filePayload, setFilePayload] = useState([]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      let index = filePayload.findIndex((i) => i.name === name);
      // let imgSrc = URL.createObjectURL(files[0]);

      // const fileSize = Math.round(files[0].size / 1024);
      convertBase64(files[0]).then((data) => {
        if (index === -1) {
          setFilePayload([
            ...filePayload,
            {
              name: name,
              fileType: files[0].type,
              filename: files[0].name,
              PatnerApprovalFile: data,
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
                  PatnerApprovalFile: data,
                },
              },
            })
          );
        }
      });
    }
  };

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

          <Box display="flex" alignItems="center" style={{ gap: "12px" }}>
            <FileInput
              handleChange={(e) => handleFileChange(e)}
              file={
                filePayload && filePayload[0] !== undefined && filePayload[0]
              }
              name={"partnerApproval"}
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
            >
              Upload
            </ButtonOutlined>
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
          >
            Save Sample Selected 
            {/* Finalise */}
          </ButtonOutlined>
        </Box>
      </TableTopContent>

      <TableWrapper padding={"17px 16px 0px 16px"}>{component}</TableWrapper>
    </OtherContentContainer>
  );
};

export default ProjectSelectionView;
