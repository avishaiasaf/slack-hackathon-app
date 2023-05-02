module.exports = ()=>{
    return {
        "blocks": [

            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Please type the employee email`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "plain_text_input-action"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Employee Email",
                    "emoji": true
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Get Profile",
                            "emoji": true
                        },
                        "value": "click_me_123",
                        "action_id": "get_employee_profile_workato"
                    }
                ]
            }
        ]
    }
}