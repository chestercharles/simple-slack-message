const https = require("https");

function main() {
  const title = process.env.INPUT_TITLE;
  const body = process.env.INPUT_BODY;
  const channel = process.env.INPUT_CHANNEL;
  const token = process.env.INPUT_TOKEN;
  const actor = process.env.GITHUB_ACTOR;
  const options = {
    hostname: "slack.com",
    path: `/api/chat.postMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = JSON.stringify({
    channel,
    text: "title",
    blocks: [
      {
        type: "header",
        text: {
          text: title,
          type: "plain_text",
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `Triggered by *${actor}*`,
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: body,
        },
      },
    ],
  });

  const req = https.request(options, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
    res.on("end", () => {
      process.exit(0);
    });
  });

  req.on("error", (e) => {
    console.error(e);
    process.exit(1);
  });

  req.write(data);

  req.end();
}

main();
