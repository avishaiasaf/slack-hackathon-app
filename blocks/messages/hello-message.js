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
                            "text": "Prepare for Sales meeting",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "message_prepare_meeting_button"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "What's to eat today",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_workato_response_1"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Get Employee Profile",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_employee_profile"
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Other",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "other_action"
                    }
                ]
            }
        ]
    }
}