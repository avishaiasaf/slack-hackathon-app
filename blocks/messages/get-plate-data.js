module.exports =  (leads)=>{
    const elements = [];
    const leadButton = (id, action_id, text, url) =>{
        return {
			"type": "actions",
			"elements": [
				{
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": String(text),
                        "emoji": true
                    },
                    "value": `${url}/${id}`,
                    "action_id": action_id
                }
			]
		}
    }

    leads.forEach((lead, i )=> {
        elements.push({
			"type": "divider"
		},{
			"type": "section",
			"text": {
				"type": "mrkdwn",
				"text": "Your current leads"
			}
		},
		leadButton(lead.sfdc_id, 'lead_button_' + i, lead.lead_name, lead.url));
    });

    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Your current leads:"
                }
            },
            {
                "type": "divider"
            },
            ...elements
            // {
            //     "type": "actions",
            //     "elements": elements
            // }
        ]
    }
}