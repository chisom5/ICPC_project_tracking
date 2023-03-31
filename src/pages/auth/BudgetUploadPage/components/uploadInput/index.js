import styled from "styled-components";
import { Text, Box } from "../../../../../components/Primitives";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const StyledContainer = styled.div`
  position: relative;
  border: ${(props) =>
    props.selected ? "1px solid #3c751f" : "1px solid #D2D7DB"};
  background-color: ${(props) => props.theme.colors.inputBgColor};
  border-radius: 4px;
  height: 48px;

  .inputfile {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    padding: 9px 0;
    cursor: pointer;
  }

  .inputfile-inner {
    display: flex;
    justify-content: space-between;
    padding: 9px 14px;
  }
`;

const FileInput = ({ handleChange, name, file, supportFormat }) => {
  const { isUploading } = useSelector((state) => state.contract);

  return (
    <StyledContainer selected={file ? true : false}>
      <input
        type="file"
        accept={supportFormat}
        name={"partnerApproval"}
        id={"partnerApproval"}
        className="inputfile"
        onChange={handleChange}
      />
      <div className="inputfile-inner">
        <label htmlFor={name}>
          <Text
            mt={2}
            fontSize="11px"
            color={file ? "#3c751f" : "#838D9D"}
            fontWeight={5}
          >
            {/* "${file.filename}" */}
            {file
              ? `You have selected a file`
              : "No file uploaded yet"}
          </Text>
        </label>
        <Box
          bg="#A4A4A4"
          borderRadius="4px"
          width="auto"
          height="30px"
          px={"14px"}
        >
          <Text color="#ffffff" lineHeight="28px">
            {isUploading ? (
              <span style={{ display: "flex", alignItems: "center" }}>
                <LoadingOutlined style={{ marginRight: "0.65rem" }} />
                Uploading
              </span>
            ) : (
              "Browse"
            )}
          </Text>
        </Box>
      </div>
    </StyledContainer>
  );
};

export default FileInput;
