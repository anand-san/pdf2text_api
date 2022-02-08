import { getFileArrayBuffer } from '../uploadPdf';
import request from 'supertest';

describe('uploadPdf', () => {
  describe('getFileArrayBuffer', () => {
    it('throws an error if data is invalid', () => {
      const event: AWSLambda.APIGatewayEvent = {
        body: 'something interesting',
      } as any;

      expect(() => getFileArrayBuffer(event)).toThrow(
        new TypeError('Cannot convert undefined or null to object')
      );
    });

    it.skip('returns array buffer when passed correct event', async () => {
      const event: AWSLambda.APIGatewayEvent = {
        body:
          'data:application/pdf;base64,JVBERi0xLjIgCjkgMCBvYmoKPDwKPj4Kc3RyZWFtCkJULyA5IFRmKFRlc3QpJyBFVAplbmRzdHJlYW0KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCA1IDAgUgovQ29udGVudHMgOSAwIFIKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0tpZHMgWzQgMCBSIF0KL0NvdW50IDEKL1R5cGUgL1BhZ2VzCi9NZWRpYUJveCBbIDAgMCA5OSA5IF0KPj4KZW5kb2JqCjMgMCBvYmoKPDwKL1BhZ2VzIDUgMCBSCi9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iagp0cmFpbGVyCjw8Ci9Sb290IDMgMCBSCj4+CiUlRU9G',
        isBase64Encoded: true,
        headers: {
          'Content-Type': 'application/pdf',
        },
      } as any;

      const fileBuffer = getFileArrayBuffer(event);
      expect(fileBuffer).toBeInstanceOf(Object);
    });
  });

  describe('uploadPdf', () => {
    const server = request('http://localhost:4000');

    it('gives 500 status code if api is called without a body', async () => {
      await server.post('/uploadPdf').expect(500);
    });

    it.skip('returns text if valid file is passed in the body', async () => {
      await server
        .post('/uploadPdf')
        .set('Content-Type', 'multipart/form-data')
        .attach('file', './test.pdf')
        .expect(500);
    });
  });
});
