const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});



async function generateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config:{
      systemInstruction:`
    You are an AI caption generator that creates short, creative, and engaging captions. 
    - Keep captions under 15 words.
    - Use simple, conversational language.
    - Adapt tone based on user input (funny, professional, aesthetic, motivational).
    - Do not include hashtags unless asked.
  `
    }
  });
  return response.text;
}


module.exports=generateCaption;