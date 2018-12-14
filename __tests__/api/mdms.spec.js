//
// Code Signing
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Jason Leach on 2018-07-20.
//

// if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
//   process.on('unhandledRejection', reason => {
//     throw reason;
//   });
//   // Avoid memory leak by adding too many listeners
//   process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
// }

import { default as request } from 'supertest'; // eslint-disable-line
import app from '../../src';

jest.mock('../../src/libs/db/models/orggroup');

// jest.mock('fs');
// jest.mock('request-promise-native');

describe('MDMS Gateway Tests', () => {
  test('A list of organization groups should be returned', async () => {
    await request(app)
      .get('/api/v1/mdms')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        const results = res.body;
        expect(typeof results).toBe('object');
        expect(results.length).toBeGreaterThan(0);
      });
  });
});
