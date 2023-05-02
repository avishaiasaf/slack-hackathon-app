// import { Surfaces, Blocks, Md } from 'slack-block-builder';
// import { Elements, Bits, Utilities } from 'slack-block-builder';
// import { Modal, Section, Actions, Button } from 'slack-block-builder';

const interactiveHome = async (leads)=>{
    const ids = ['lead_button_1', 'lead_button_2', 'lead_button_3', 'lead_button_4', 'lead_button_5'];
    const leadButton = (id, action_id, text, url) =>{
        return {
            "type": "button",
            "text": {
                "type": "plain_text",
                "text": text,
                "emoji": true
            },
            "value": `${url}/${id}`,
            "action_id": action_id
        }
    }

    leads.forEach(lead => {
        
    });
}

module.exports = (text)=>{
    return {
        "type": "home",
        "blocks": [
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "plain_text",
                    "text": text,
                    "emoji": true
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Simi Sales",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "simi_sales"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Prepare for Sales Meeting",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_workato_response"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Test",
                            "emoji": true
                        },
                        "value": "test",
                        "action_id": "test"
                    }
                ]
            }
        ]
    }
}