module.exports = (url) =>{
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
                "type": "image",
                "title": {
                    "type": "plain_text",
                    "text": "I Need a Marg",
                    "emoji": true
                },
                "image_url": url,
                "alt_text": "marg"
            }
        ]
    }
}