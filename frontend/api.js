// const axios = require('axios');

// // Create an async function to use await
// async function callOpenRouterAPI() {
//   try {
//     const response = await axios({
//       method: 'post',
//       url: 'https://openrouter.ai/api/v1/chat/completions',
//       headers: {
//         'Authorization': 'Bearer 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',
//         'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
//         'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
//         'Content-Type': 'application/json'
//       },
//       data: {
//         model: 'deepseek/deepseek-r1:free',
//         messages: [
//           {
//             role: 'user',
//             content: 'What is the meaning of life?'
//           }
//         ]
//       }
//     });

//     // Handle the response
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error calling OpenRouter API:', error.message);
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error('Response data:', error.response.data);
//       console.error('Response status:', error.response.status);
//     }
//   }
// }

// // Call the async function
// callOpenRouterAPI();

const axios = require('axios');

// Create an async function to use await
async function callOpenRouterAPI() {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://openrouter.ai/api/v1/chat/completions',
      headers: {
        'Authorization': 'Bearer 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',
        'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
        'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
        'Content-Type': 'application/json'
      },
      data: {
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'user',
            content: 'What is the meaning of life?'
          }
        ]
      }
    });

    // Log full response with proper formatting for nested objects
    console.log('Full API response:', JSON.stringify(response.data, null, 2));
    
    // Extract and display just the AI's response content
    const aiResponse = response.data.choices[0].message.content;
    console.log('\n--- AI Response to "What is the meaning of life?" ---');
    console.log(aiResponse);
    
    return response.data;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Call the async function
callOpenRouterAPI();