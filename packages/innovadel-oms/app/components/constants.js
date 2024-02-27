/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { innovadel, app } from "../../config/default";

/* 
    Hello there! This is a demonstration of how to override a file from the base template.
    
    It's necessary that the module export interface remain consistent, 
    as other files in the base template rely on constants.js, thus we
    import the underlying constants.js, modifies it and re-export it.
*/

export const GetURL = (endpoint) => {
    var url = `${innovadel.host}/on/demandware.store/Sites-${app.commerceAPI.parameters.siteId}-Site/default/${endpoint}?`;
    return url;
}

