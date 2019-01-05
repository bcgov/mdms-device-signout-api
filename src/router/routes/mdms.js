//
// MDMS Generic Device Project
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
// Created by Jason Leach on 2018-12-13.
//

'use strict';

import { getAllOrgGroups } from '@bcgov/mdms-nodejs-client';
import { asyncMiddleware, errorWithCode, logger } from '@bcgov/nodejs-common-utils';
import { Router } from 'express';
import config from '../../config';

const router = new Router();

router.get(
  '/',
  asyncMiddleware(async (req, res) => {
    const rootOrgID = Number(config.get('mdms:rootOrgID'));
    const credentials = {
      host: config.get('mdms:host'),
      token: config.get('mdms:tenantCode'),
      username: config.get('mdms:username').replace('\\\\', '\\'),
      password: config.get('mdms:password'),
    };

    try {
      const results = await getAllOrgGroups(credentials, rootOrgID);
      const og = results.map(r => Object.assign({}, { name: r.name, id: r.id }));

      res.status(200).json(og);
    } catch (err) {
      const message = `Unable to fetch groups for root ${rootOrgID}, error = ${err.message}`;
      logger.error(message);

      throw errorWithCode(message, 500);
    }
  })
);

module.exports = router;
