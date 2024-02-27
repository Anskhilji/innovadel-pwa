/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useState} from 'react'
import fetch from 'cross-fetch'
import {getAppOrigin} from '@salesforce/pwa-kit-react-sdk/utils/url'
import {AccordionPanel} from '@salesforce/retail-react-app/app/components/shared/ui'
import {innovadel, app} from '../../../../config/default'

const getsizechart = async (setChart, cid) => {
    var response = null;
    var host = innovadel.host;
    var site = app.defaultSite;
    var sizeChartEndpoint = innovadel.sizeChartEndpoint; 
    await fetch(`${host}/on/demandware.store/Sites-${site}-Site/default/${sizeChartEndpoint}?cid=${cid}`)
        .then((res)=>{
            return res.json().then((result)=>{
                response = result})
        })
        .catch((err)=>{console.log(err)})
        setChart(response);

};

const SizeChartPanel = (props) =>{

    const [Chart,setChart] = useState();

    getsizechart(setChart, props.cid);
    

    return(
        <AccordionPanel mb={6} mt={4}>
            {Chart && <div dangerouslySetInnerHTML={{ __html: Chart.content }} />}
        </AccordionPanel>
    )
}

export {SizeChartPanel}