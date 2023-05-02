module.exports =  (leads)=>{
    const elements = [];
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

    leads.forEach((lead, i )=> {
        elements.push(leadButton(lead.sfdc_id, ids[i], lead.lead_name, lead.url));
    });

    return {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Your current leads"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "actions",
                "elements": elements
            }
        ]
    }
}