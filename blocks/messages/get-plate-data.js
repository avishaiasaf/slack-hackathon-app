module.exports =  (leads)=>{
    const elements = [];
    const ids = ['lead_button_1', 'lead_button_2', 'lead_button_3', 'lead_button_4', 'lead_button_5'];
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
        // {
        //     "type": "button",
        //     "text": {
        //         "type": "plain_text",
        //         "text": text,
        //         "emoji": true
        //     },
        //     "value": `${url}/${id}`,
        //     "action_id": action_id
        // }
    }

    leads.forEach((lead, i )=> {
        elements.push({
			"type": "divider"
		},{
            "type": "mrkdwn",
            "text": "Your current leads"
        },
		leadButton(lead.sfdc_id, ids[i], lead.lead_name, lead.url));
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