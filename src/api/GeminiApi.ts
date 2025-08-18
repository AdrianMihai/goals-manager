import axios from 'axios';
import { RoadmapData } from './Types';
import { GoalsStore } from '../stores/GoalsStore';

const getRoadmapPrompt = (data: RoadmapData) => {
  return `I have the goal of ${
    data.goal.text
  }. Is the following roadmap suitable for achieving this goal: ${data.subGoals.map((x) => x.text).join(', ')}?`;
};

const extractBasicTextResponse = (responseData) => responseData.candidates[0].content.parts[0].text;

export const analyzeRoadmap = async (data: RoadmapData) => {
  let result = { id: data.goal.id, roadmapAnalysis: '' };

  try {
    GoalsStore.dispatchAction(GoalsStore.events.startRoadmapAnalysis, { goalId: data.goal.id });

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${localStorage.getItem(
        'GeminiKey'
      )}`,
      {
        contents: [
          {
            parts: [
              {
                text: getRoadmapPrompt(data),
              },
            ],
          },
        ],
      }
    );

    result.roadmapAnalysis = extractBasicTextResponse(response.data);
  } catch (e) {
    console.log(e.message);

    return null;
  }

  return result;
};
