// const { Modal, Section, Actions, Button, Blocks, Accordion } = require('slack-block-builder');

// module.exports = ({ faqs, expandedItems }) => Modal({ title: 'FAQ' })
//   .blocks(
//     Blocks.Section({ text: 'Hi! :wave: And welcome to the FAQ section! Take a look around and if you don\'t find what you need, feel free to open an issue on GitHub.'}),
//     Blocks.Divider(),
//     Accordion({
//       items: faqs,
//       expandedItems: expandedItems || [], // In this case, the value is [1]
//       collapseOnExpand: true,
//       titleText: ({ item }) => `*${item.question}*`,
//       actionId: ({ expandedItems }) => JSON.stringify({ action: 'render-faqs', expandedItems }),
//       blocksForExpanded: ({ item }) => [
//        Blocks.Section({ text: `${item.answer}` }),
//       ],
//     }).getBlocks())
//   .close('Done')
//   .buildToJSON();

module.exports = (username)=>{
    
    return {
            "type": "modal",
            "title": {
                "type": "plain_text",
                "text": "My App",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "plain_text",
                        "text": `Hello ${username.charAt(0).toUpperCase() + username.slice(1)}, \nSelect the required action below`,
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
                            "type": "static_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select Action",
                                "emoji": true
                            },
                            "options": [
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Get call summary",
                                        "emoji": true
                                    },
                                    "value": "value-0"
                                },
                                {
                                    "text": {
                                        "type": "plain_text",
                                        "text": "Get Customer KPIs",
                                        "emoji": true
                                    },
                                    "value": "value-1"
                                }
                            ],
                            "action_id": "actionId-3"
                        }
                    ]
                }
            ]
        }
}