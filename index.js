const { App, AwsLambdaReceiver, LogLevel, subtype } = require('@slack/bolt');
const axios = require('axios');
const ENV = require('./env.js');
const testModal = require('./blocks/modals/test-modal.js');
const homeTab = require('./blocks/home/app-home.js');
const helloMessage = require('./blocks/messages/hello-message.js');
const getEmployeeProfileMsg = require('./blocks/messages/get-employee-profile.js');
const { BlockCollection, Blocks } = require('slack-block-builder');

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

const getUserLeads = async () =>{
    const url = 'https://apim.workato.com/smwb/simi-slack-bot-v1/data';
    const response = await postWorkatoResponse(url, {});
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
 * Triggered on the "Simi Sales" button on the App Home
 */
app.action('simi_sales', async ({ ack, client, payload, body }) => {
	console.log('simi_sales  clicked', payload, body);
	ack();
    const url = 'https://apim.workato.com/smwb/simi-slack-bot-v1/slack/';
    const response = await getWorkatoResponse(url);
    await client.views.open({
        // Use the user ID associated with the event
        trigger_id: body.trigger_id,
        // Pass the view_id
        view_id: body.view.id,
        // Pass the current hash to avoid race conditions
        hash: body.view.hash,
        view: testModal(JSON.stringify(response))
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

// ------------------------------- App Events ------------------------------- //

/**
 * Open App Home
 */
app.event('app_home_opened', async ({ event, client, logger }) => {
  console.log('home on app');
  try {
    const userLeads = await getUserLeads();
    // Call views.publish with the built-in client
    const result = await client.views.publish({
      user_id: event.user,
      view: homeTab("Welcome to MIS Slack App.\n Pleaese select your prefered action")
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
