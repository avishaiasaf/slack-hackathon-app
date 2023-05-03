const { App, AwsLambdaReceiver, LogLevel, subtype } = require('@slack/bolt');
const axios = require('axios');
const ENV = require('./env.js');
const testModal = require('./blocks/modals/test-modal.js');
const homeTab = require('./blocks/home/app-home.js');
const helloMessage = require('./blocks/messages/hello-message.js');
const getEmployeeProfileMsg = require('./blocks/messages/get-employee-profile.js');
const getPlateDataMsg = require('./blocks/messages/get-plate-data.js');
const mirPrepTypeEmailMsg = require('./blocks/messages/mir-prep-type-email.js');
const { BlockCollection, Blocks } = require('slack-block-builder');

const graphModal = require('./blocks/modals/graph-modal.js');
const presentGraphModal = require('./blocks/modals/present-graph-modal.js');
const { WebClient } = require('@slack/web-api');
const Chart = require('chart.js');
const QuickChart = require('quickchart-js');
const slackClient = new WebClient(ENV.TOKEN);

const USER_EMAIL = 'oren.israel@similarweb.com'

let logLevel;
logLevel = LogLevel.DEBUG;

const app = new App({
    token: ENV.TOKEN,
    signingSecret: ENV.SIGNING_SECRET,
    logLevel
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
  })();
  
// ------------------------------- App Methods ------------------------------- //

const getUserLeads = async (userEmail) =>{
    const url = 'https://apim.workato.com/smwb/simi-slack-bot-v1/data';
    const response = await postWorkatoResponse(url, {"email":userEmail});
    return response;
}

const getViewFirstValue = (view)=>{
  const path = view.state.values;
  const values = path[Object.keys(path)]
  return values[Object.keys(values)]
}

const postAppMessage = async (obj) =>{
    obj.token = ENV.TOKEN;
    // obj.channel = ENV.BOT_CHANNEL;
    await app.client.chat.postMessage(obj);
}

const postWorkatoResponse = async (url, body) =>{
    try{
        const response = await axios.post(url, body, {
            headers: {
                Authorization: ENV.WORKATO_AUTH_HEADER,
                accept: 'application/json',
            }
        });
        return response.data;
    }catch (error) {
        return error;
    }
}

const getWorkatoResponse = async (url) =>{
    try {
        const response = await axios.get(url, {
          headers: {
            Authorization: ENV.WORKATO_AUTH_HEADER,
            accept: 'application/json',
          },
        });
        return response.data;
    
      }catch (error) {
            return error;
      }
}

// ------------------------------- App Actions ------------------------------- //

/**
 * Triggered on the "Prepare for Sales Meeting" button on the app Hello Message
 */
app.action('message_prepare_meeting_button', async ({ ack, payload, body }) => {
    console.log('message_prepare_meeting_button  clicked', payload, body);
    ack();

    const channelId = body.container.channel_id;
    console.log('cannnel id', channelId);
    await postAppMessage({
        channel: body.container.channel_id, 
        text: `This is the summary you need on customer X `,
    });
});

/**
 * Triggered on the "What's on my plate" button on the App Home
 */
app.action('get_plate_data', async ({ ack, client, payload, body, event }) => {
    console.log('get_plate_data  clicked', payload, body, event);
    const leads =  [
      {
        sfdc_id: '00Q67000013UFIa',
        lead_name: 'Vasco Nuno Cortes',
        company: 'google.com',
        email: 'test@gmail.com',
        url: 'https://apim.workato.com/smwb/simi-slack-bot-v1/lead/'
      },
      {
        sfdc_id: '00Q67000013UFIa',
        lead_name: 'Another Lead',
        company: 'faceboook',
        email: 'test@gmail.com',
        url: 'https://apim.workato.com/smwb/simi-slack-bot-v1/lead/'
      },
      {
        sfdc_id: '00Q67000013UFIa',
        lead_name: 'Yet another one',
        company: 'dokka',
        email: 'test@gmail.com',
        url: 'https://apim.workato.com/smwb/simi-slack-bot-v1/lead/'
      }
    ]
    ack();
    const userData = await client.users.info({
      user: body.user.id
    });
    // const userEmail = userData.user.email;
    const userEmail = 'oren.israel@similarweb.com'
    const userLeads = await getUserLeads(userEmail);
    const plateData = getPlateDataMsg(userLeads.leads)['blocks'];
    console.log(userLeads.leads);
    console.log('blocks', JSON.stringify(plateData));
    await postAppMessage({
        channel: ENV.BOT_CHANNEL,
        blocks: plateData
    });
});

/**
 * Triggered on the "Prepare for Sales Meeting" button on the Home App
 */
app.action('get_workato_response', async ({ event, context, ack, client, payload, body }) => {
    console.log('user_select action', payload, context, event, body );
    ack();
    const url = 'https://apim.workato.com/smwb/simi-slack-bot-v1/slack/';
    const dataBody = await getWorkatoResponse(url);
    const result = await client.views.publish({
        user_id: body.user.id,
        view: homeTab(JSON.stringify(dataBody))
      });
});

/**
 * Triggered on the "MIR Pre Meeting" button on the Home App
 */
app.action('get_mir_meeting_prep', async ({ event, context, ack, client, payload, body, logger }) => {
  console.log('get_mir_meeting_prep button clicked', 'payload: ', payload, 'context: ', context, 'event: ', event, 'body: ', body , body.trigger_id);
  ack();
  // const url = 'https://apim.workato.com/smwb/simi-slack-bot-v1/slack/';
  // const dataBody = await getWorkatoResponse(url);
  try{
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: testModal(JSON.stringify('dataBody'))
    });
    logger.info(result);
  }catch(e){
    console.error(e);
  }
});

/**
 * Triggered on the SimilarPro on the Home App
 */
app.action('similar_pro_meeting', async ({ event, context, ack, client, payload, body, logger }) => {
  console.log('similar_pro_meeting button clicked', 'payload: ', payload, 'context: ', context, 'event: ', event, 'body: ', body , body.trigger_id);
  ack();
  // console.log(body.trigger_id, graphModal())
  try{
    const result = await client.views.open({
      trigger_id: body.trigger_id,
      view: graphModal
    });
    logger.info(result);
  }catch(e){
    console.error(e);
  }
});

/**
 * Triggered on the "MIR Pre Meeting" button on the app Hello Message
 */
app.action('get_mir_meeting_prep_message', async ({ event, context, ack, client, payload, body, logger }) => {
  console.log('get_mir_meeting_prep_message button clicked', 'payload: ', payload, 'context: ', context, 'event: ', event, 'body: ', body , body.trigger_id);
  ack();
  await postAppMessage({
      channel: body.container.channel_id,
      blocks: mirPrepTypeEmailMsg['blocks'],
  });
});

/**
 * Triggered on the "Send" button on the MIR Pre Meeting message
 */
app.action('mir_prep_email_action', async ({ event, context, ack, client, payload, body, logger }) => {
  console.log('mir_prep_email_action button clicked', 'payload: ', payload, 'context: ', context, 'event: ', event, 'body: ', body , body.trigger_id);
  ack();
  await postAppMessage({
      channel: body.container.channel_id,
      text: 'Everything you need',
  });
});

/**
 * Triggered on the first lead button
 */
app.action(/lead_button_+/, async ({ event, context, ack, client, payload, body }) => {
    console.log('lead_button_1 action', payload, body );
    ack();
    const url = 'https://apim.workato.com/smwb/simi-slack-bot-v1/presale';
    const dataBody = await postWorkatoResponse(url, {email: USER_EMAIL});
   
    await postAppMessage({
        channel: body.container.channel_id,
        //text: `This is all the data you need for the call\n <${JSON.stringify(dataBody.doc_link)}| Go to Salesforce> `,
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `All the preparation you need for this call is waiting for you.\n 👉 <${dataBody.doc_link}| Go to Salesforce>`
            }
          }
        ]
    });
});

// ------------------------------- App Events ------------------------------- //

/**
 * Open App Home
 */
app.event('app_home_opened', async ({ event, client, logger }) => {
    
  console.log('home on app');
  try {
    const userData = await client.users.info({
      user: event.user
    });
    const userEmail = userData.user.email;
    const userName = userData.user.real_name;
    console.log('userEmail', userName);
    // const userLeads = await getUserLeads(userEmail);
    // console.log(userLeads.leads);

    // Call views.publish with the built-in client
    const result = await client.views.publish({
      user_id: event.user,
    //   view: homeTab("Welcome to MIS Slack App.\n Pleaese select your prefered action")
        view: homeTab(userName)
    });
    logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }
});

// ------------------------------- App Messages ------------------------------- //

/**
 * Initiate the App Hello Message
 */
app.message(/(hi|hello) simi/i, async ({  body, payload, message, say }) => {
    const user  = payload.user;
    await say(helloMessage(message.user));
    console.log('simi message', payload, body);
  });

/**
 * Initiate the get graph  
 */
app.message(/get my graph/i, async ({  body, payload }) => {
    console.log('simi message', payload, body);
    await postAppMessage({
        channel: payload.channel,
        text: `What do you need: `,
    });
});

// ------------------------------- App Views ------------------------------- //

/**
 * Handle MIR Pre Meeting Modal
 */
app.view('mir_pre_meeting_modal', async ({ payload, body, client, ack, context, view }) => {
  console.log('mir_pre_meeting_modal submited', 'payload: ', payload, 'body: ', body, 'context: ', context, 'view', view.state.values);
  await ack();
  const email = getViewFirstValue(view).value;
  console.log(email);

  await postAppMessage({
    channel: ENV.BOT_CHANNEL,
    text: `this is what you need ${email}`
});
  //"view_id": body.view.id
  // try{
  //   client.views.update({
  //       view_id: body.view.id
  //   });
  // }catch(e){
  //   console.error(e)
  // }
  
});


// Handle the view_submission event
app.view('graph_modal', async ({ ack, body, view, payload, say, client }) => {
  // Acknowledge the event
  
  await ack();
  console.log('mir_pre_meeting_modal submited', 'payload: ', payload, 'body: ', body, 'view', view.state.values);
  console.log("--------------");
  const valueList = Object.values(view.state.values);
  parameters = {};
  valueList.forEach(val =>{
    const key = Object.keys(val)[0];
    const param = Object.values(val)[0];
    const value = param['value'] ? param['value'] : (param['selected_option'] ? param['selected_option'] : param['selected_date']);
    console.log(key, value);
    parameters[key] = value;
  });
  console.log(parameters['website'])
  console.log(Object.values(view.state.values));
  // Get the form data from the payload
  // console.log('view: ', view, 'payload: ', payload);
  // console.log(view.state.values['website_input_block'])
  // const website = '';                       //view.state.values['website_input_block']['plain_text_input-action'].value;
  // const startDate = view.state.values['datepickers_block']['actionId-0'].selected_date;
  // const endDate = view.state.values['datepickers_block']['actionId-1'].selected_date;
  // const xAxis = view.state.values['x_axis_block']['static_select-action'].selected_option.value;
  // const yAxis = view.state.values['y_axis_block']['static_select-action'].selected_option.value;
  // const engagementType = view.state.values['engagement_type_block']['checkboxes-action'].selected_options.map(option => option.value);
  // const countries = view.state.values['country_block']['multi_static_select-action'].selected_options.map(option => option.value);

  // Process the form data as needed
  // console.log('Website:', website);
  // console.log('Start date:', startDate);
  // console.log('End date:', endDate);
  // console.log('X axis:', xAxis);
  // console.log('Y axis:', yAxis);
  // console.log('Engagement type:', engagementType);
  // console.log('Countries:', countries);

  // Define the API endpoint and request parameters
  const apiParams = {
    api_key: ENV.SIMILARWEB_API_KEY,
    start_date: '2022-01-01',
    end_date: '2023-03-31',
    main_domain_only: false,
    country: 'world',
    granularity: 'monthly',
    website: parameters['website'],
    x_axis: 'visits'
};

  // const apiEndpoint = `https://api.similarweb.com/v1/website/venusconcept.com/visits`;
  const apiEndpoint = `https://api.similarweb.com/v1/website/${apiParams.website}/total-traffic-and-engagement/${apiParams.x_axis}?api_key=${apiParams.api_key}&start_date=${apiParams.start_date}&end_date=${apiParams.end_date}&granularity=${apiParams.granularity}`;
  

// Call the Similarweb API and retrieve the response JSON
  const response = await axios.get(apiEndpoint).then(res => res.data);

// Extract the "visits" data from the response JSON
  const data = response.visits;

// Extract the "date" and "visits" values into separate arrays
  const dates = data.map(item => item.date);
  const visits = data.map(item => item.visits);

// Create a new chart object
    const chart = new QuickChart();
    chart.setConfig({
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Monthly Visits',
          data: visits,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

chart.setWidth(600);
chart.setHeight(400);

// Convert the chart object to a base64-encoded PNG image
const imageUrl = await chart.getShortUrl();

// Send a message with the attachment to the Slack app
// try{
//   client.views.update({
//     "response_action": "update",
//     "view_id": body.view.id,
//     view: presentGraphModal(imageUrl)
//   });
// }catch(e){
//   console.error(e)
// }
  await postAppMessage({
        channel: ENV.BOT_CHANNEL,
        blocks: [
          {
            type: 'image',
            title: {
              type: 'plain_text',
              text: 'Monthly Visits Chart'
            },
            image_url: imageUrl,
            alt_text: 'Monthly Visits Chart'
          }
        ]
  });
});