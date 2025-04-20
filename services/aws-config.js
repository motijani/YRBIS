import AWS from "aws-sdk";
import { DYNAMO_ACCESS_KEY, DYNAMO_SERCRET_ACCESS_KEY } from "./keys";

const awsConfig = {
  region: "us-east-1",
  accessKeyId: DYNAMO_ACCESS_KEY,
  secretAccessKey: DYNAMO_SERCRET_ACCESS_KEY,
};

AWS.config.update(awsConfig);

export default AWS;
