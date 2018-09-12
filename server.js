var prompt = require('prompt-sync')();
var AssistantV1 = require('watson-developer-cloud/assistant/v1');

var service = new AssistantV1({
  username: 'd66aabf9-fd1d-460c-b827-4d5dfbfa87d6', // replace with service username
  password: 'M32F5Ocn4GFf', // replace with service password
  version: '2018-02-16'
});

var workspace_id = '834e8f0f-b69f-445c-a124-6323e38c6ad9'; // replace with workspace ID

service.message({
    workspace_id: workspace_id
    }, processResponse);
  
  function processResponse(err, response) {
    if (err) {
      console.error(err); // something went wrong
      return;
    }
  
    var endConversation = false;
  
      // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
        app.get('/', (req, res)=>{
            res.send(response.output.text[0]);
        });
      console.log(response.output.text[0]);
     }

    // If we're not done, prompt for the next round of input.
    if (!endConversation) {
      var newMessageFromUser = prompt('>> ');
      service.message({
        workspace_id: workspace_id,
        input: { text: newMessageFromUser },
        // Send back the context to maintain state.
        context : response.context,
      }, processResponse)
    }
}
