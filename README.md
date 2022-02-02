# simple-slack-message

Github action that sends a simple slack message with a title and body

## Usage

```
steps:
- uses: synapsestudios/simple-slack-message@v1
  with:
    channel: <slack channel>
    token: <slack token>
    title: Greetings
    body: I hope you are doing well today
```
