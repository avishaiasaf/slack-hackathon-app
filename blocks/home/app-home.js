// import { Surfaces, Blocks, Md } from 'slack-block-builder';
// import { Elements, Bits, Utilities } from 'slack-block-builder';
// import { Modal, Section, Actions, Button } from 'slack-block-builder';

// module.exports =  (leads)=>{
//     const elements = [];
//     const ids = ['lead_button_1', 'lead_button_2', 'lead_button_3', 'lead_button_4', 'lead_button_5'];
//     const leadButton = (id, action_id, text, url) =>{
//         return {
//             "type": "button",
//             "text": {
//                 "type": "plain_text",
//                 "text": text,
//                 "emoji": true
//             },
//             "value": `${url}/${id}`,
//             "action_id": action_id
//         }
//     }

//     leads.forEach((lead, i )=> {
//         elements.push(leadButton(lead.sfdc_id, ids[i], lead.lead_name, lead.url));
//     });

//     return {
//         "type": "home",
//         "blocks": [
//             {
//                 "type": "divider"
//             },
//             {
//                 "type": "section",
//                 "text": {
//                     "type": "plain_text",
//                     "text": "Your current leads",
//                     "emoji": true
//                 }
//             },
//             {
//                 "type": "divider"
//             },
//             {
//                 "type": "actions",
//                 "elements": elements
//             }
//         ]
//     }
// }

module.exports = (name)=>{
    return {
        "type": "home",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hi ${name},\nHow can I help you?\nThese are the processes I can help you with today :smile:`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "elements":  [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "What's on my plate",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_plate_data"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "MIR Pre Meeting",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_mir_meeting_prep"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Sales Pre Meeting",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_sales_meeting_prep"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Sales Post Meeting",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_sales_post_meeting"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "SimilarPro",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "similar_pro_meeting"
                    }
                ]
            }
        ]
    }
}