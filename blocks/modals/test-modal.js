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
//${username.charAt(0).toUpperCase() + username.slice(1)}
module.exports = (username)=>{
    
    return {
        "type": "modal",
        "callback_id": "mir_pre_meeting_modal",
        "title": {
            "type": "plain_text",
            "text": "MIR Pre Meeting",
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
                    "type": "email_text_input",
                    "action_id": "email_text_input-action"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Label",
                    "emoji": true
                }
            }
        ]
    }
}