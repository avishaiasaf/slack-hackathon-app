module.exports = (username)=>{
    return {
        "blocks": [

            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Hello <@${username}>, \nWhat would you like to do?`
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
                        "action_id": "get_mir_meeting_prep_message"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Sales Pre Meeting",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_sales_meeting_prep_message"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Sales Post Meeting",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_sales_post_meeting_message"
                    }
                ]
            }
        ]
    }
}