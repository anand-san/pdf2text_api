import pdf from 'pdf-parse';
import { errorResponse, successResponse } from '../utils';
import { Response } from '../utils';
import * as parser from 'aws-multipart-parser';
import { FileData, MultipartFormData } from 'aws-multipart-parser/dist/models';
import PdfParse from 'pdf-parse';

export const getFileArrayBuffer = (
  event: AWSLambda.APIGatewayEvent
): FileData => {
  try {
    const formData: MultipartFormData = parser.parse(event, true);
    return formData.file as FileData;
  } catch (error) {
    throw error;
  }
};

export const handler = async (
  event: AWSLambda.APIGatewayEvent
): Promise<Response> => {
  try {
    const fileBuffer = getFileArrayBuffer(event);

    if (typeof fileBuffer.content === 'string')
      throw new Error('Cannot parse file');

    const pdfData: PdfParse.Result = await pdf(fileBuffer.content);

    return successResponse({
      pdfData,
    });
  } catch (error) {
    return errorResponse({
      error: error.message,
    });
  }
};
