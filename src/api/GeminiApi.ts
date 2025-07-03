import axios from 'axios';

const GeminiKey = 'AIzaSyBwG1L7-2RyXLrS0MOShNLxOUEa-wM6-8o';
// I have the goal of proficiency in developing front-end application. Is the following road-map suitable for achieving this goal: learn rxjs, learn docker, learn desgin

export const analyzeRoadMap = async () => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GeminiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: 'I have the goal of proficiency in developing front-end application. Is the following road-map suitable for achieving this goal: learn rxjs, learn docker, learn desgin',
              },
            ],
          },
        ],
      }
    );

    console.log(response.data);
  } catch (e) {
    console.log(e.message);
  }
};
