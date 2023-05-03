module.exports = {
        "type": "modal",
        "callback_id": "graph_modal",
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
                    "text": "Select your graph parameters",
                    "emoji": true
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
                    "text": "Company Website",
                    "emoji": true
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "datepicker",
                        "initial_date": "2022-01-01",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select a date",
                            "emoji": true
                        },
                        "action_id": "actionId-0"
                    },
                    {
                        "type": "datepicker",
                        "initial_date": "2023-04-01",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select a date",
                            "emoji": true
                        },
                        "action_id": "actionId-1"
                    }
                ]
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Select your X axis"
                },
                "accessory": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Time",
                                "emoji": true
                            },
                            "value": "value-12"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Monthly Visits",
                                "emoji": true
                            },
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Unique Visitors",
                                "emoji": true
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Deduplicated Audience",
                                "emoji": true
                            },
                            "value": "value-2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Visit Duration",
                                "emoji": true
                            },
                            "value": "value-3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Pages Per Visit",
                                "emoji": true
                            },
                            "value": "value-4"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Bounce Rate",
                                "emoji": true
                            },
                            "value": "value-5"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Page Views",
                                "emoji": true
                            },
                            "value": "value-6"
                        }
                    ],
                    "action_id": "static_select-action"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Select your Y axis"
                },
                "accessory": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Time",
                                "emoji": true
                            },
                            "value": "value-12"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Monthly Visits",
                                "emoji": true
                            },
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Unique Visitors",
                                "emoji": true
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Deduplicated Audience",
                                "emoji": true
                            },
                            "value": "value-2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Visit Duration",
                                "emoji": true
                            },
                            "value": "value-3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Pages Per Visit",
                                "emoji": true
                            },
                            "value": "value-4"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Bounce Rate",
                                "emoji": true
                            },
                            "value": "value-5"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Page Views",
                                "emoji": true
                            },
                            "value": "value-6"
                        }
                    ],
                    "action_id": "static_select-action"
                }
            },
            {
                "type": "input",
                "element": {
                    "type": "checkboxes",
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Desktop",
                                "emoji": true
                            },
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Mobile",
                                "emoji": true
                            },
                            "value": "value-1"
                        }
                    ],
                    "action_id": "checkboxes-action"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Engagement Type",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "element": {
                    "type": "multi_static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Wolrdwide",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Argentina",
                                "emoji": true
                            },
                            "value": "value-3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Australia",
                                "emoji": true
                            },
                            "value": "value-4"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Austria",
                                "emoji": true
                            },
                            "value": "value-5"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Belgium",
                                "emoji": true
                            },
                            "value": "value-6"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Brazil",
                                "emoji": true
                            },
                            "value": "value-7"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Bulgaria",
                                "emoji": true
                            },
                            "value": "value-8"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Canada",
                                "emoji": true
                            },
                            "value": "value-9"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Chile",
                                "emoji": true
                            },
                            "value": "value-10"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Colombia",
                                "emoji": true
                            },
                            "value": "value-11"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Croatia",
                                "emoji": true
                            },
                            "value": "value-12"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Czech Republic",
                                "emoji": true
                            },
                            "value": "value-13"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "USA",
                                "emoji": true
                            },
                            "value": "value-0"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Israel",
                                "emoji": true
                            },
                            "value": "value-1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Great Britain",
                                "emoji": true
                            },
                            "value": "value-2"
                        }
                    ],
                    "action_id": "multi_static_select-action"
                },
                "label": {
                    "type": "plain_text",
                    "text": "Country",
                    "emoji": true
                }
            }
        ]
    }
