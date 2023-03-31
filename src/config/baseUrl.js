const getBaseUrl = () => {
  const url = window.location.href;
  const base = url.split("#")[0];
  const baseWithoutHttp = base.split("/")[2];
  switch (baseWithoutHttp) {
    case "192.168.0.4":
      return "http://nglosapp07/NewLetterApi";
    default:
      // return "http://ec2-18-216-108-190.us-east-2.compute.amazonaws.com/icpc_project_tracking_api/api/v1"
      return "http://icpcstaging.uksouth.cloudapp.azure.com/icpc_project_tracking_api/api/v1";
  }
};

const baseUrl = getBaseUrl();
export default baseUrl;
