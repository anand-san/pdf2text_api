import { successResponse } from './utils';
import { Response } from './utils';

const hello = async (event: AWSLambda.APIGatewayEvent): Promise<Response> => {
  return successResponse({
    message: 'Go Serverless! Your function executed successfully!',
    input: event,
  });
};
export default hello;
