import { successResponse } from './utils';
import { Response } from './utils';

const uploadPdf = async (
  event: AWSLambda.APIGatewayEvent
): Promise<Response> => {
  return successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });
};
export default uploadPdf;
