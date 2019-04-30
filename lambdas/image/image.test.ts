import FormData from 'form-data';
import fs from 'fs';
import MockReq from 'mock-req';
import { createImageHash } from '../../server/models/image';

describe(`Image Upload`, () => {
  // let form: any = new FormData()
  // let stringifiedForm = ''
  // beforeAll(async(done) => {
  //   form.append('image', fs.createReadStream('./dummy_test_image.png'))
  //   let data = '';
  //   const boundary = form.getBoundary();
  //   for( let i = 0, len = form._streams.length; i < len; i++ ) {
  //     if( typeof form._streams[i] !== 'function' ) {
  //       data += form._streams[i];
  //       if( typeof form._streams[i] !== 'string' || form._streams[i].substring( 0, boundary.length ) === boundary ) {
  //         data += '\r\n';
  //       }
  //     }
  //   }
  //   stringifiedForm = data
  //   console.log(stringifiedForm)
  //   done()
  // })
  // it(`Handle an image upload when`, async () => {
  //   var request = new MockReq();

  //   // const response = await promiseParser()
  //   // console.log(response)
  // })
  it(`Creates an image hash`, async () => {
    const hash = await createImageHash();
    console.log({ hash });
  });
});
