import { getFileArrayBuffer, handler } from '../uploadPdf';
import { sampleEvent } from '../../../fixtures/samplePayload';

describe('uploadPdf', () => {
  describe('#getFileArrayBuffer', () => {
    it('throws an error if data is invalid', () => {
      const event: AWSLambda.APIGatewayEvent = {
        body: 'something interesting',
      } as any;

      expect(() => getFileArrayBuffer(event)).toThrow(
        new TypeError('Cannot convert undefined or null to object')
      );
    });
  });

  describe('#uploadPdf handler', () => {
    it('gives 500 status code if api is called without a body', async () => {
      await expect(handler({} as any)).resolves.toMatchObject({
        statusCode: 500,
      });
    });

    it.skip('returns text if valid file is passed in the body', async () => {
      await expect(handler(sampleEvent as any)).resolves.toMatchObject({
        statusCode: 200,
        pdfData: {},
      });
    });
  });
});
