module.exports = {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Please type the lead email address below:"
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "input",
			"element": {
				"type": "plain_text_input",
				"action_id": "mir_prerp_email"
			},
			"label": {
				"type": "plain_text",
				"text": "Email Address",
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
						"text": "Send",
						"emoji": true
					},
					"value": "click_me_123",
					"action_id": "mir_prep_email_action"
				}
			]
		}
	]
}