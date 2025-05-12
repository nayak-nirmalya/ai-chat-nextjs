import { google } from "@ai-sdk/google";
import { tool as createTool, generateObject } from "ai";
import { z } from "zod";

export const weatherTool = createTool({
  description: "Display the weather for a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async function ({ location }) {
    // const { object } = await generateObject({
    //   model: google("gemini-2.5-flash-preview-04-17", { structuredOutputs: true }),
    //   schema: ,
    //   prompt: [
    //     `The model tried to call the tool "${toolCall.toolName}"` +
    //       ` with the following arguments:`,
    //     JSON.stringify(toolCall.args),
    //     `The tool accepts the following schema:`,
    //     JSON.stringify(parameterSchema(toolCall)),
    //     'Please fix the arguments.',
    //   ].join('\n'),
    // });

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${location}`
    );
    const weather = await response.json();

    return {
      weather: weather.current.condition.text,
      temperature: weather.current.temp_c,
      location,
    };
  },
});

export const tools = {
  displayWeather: weatherTool,
};
