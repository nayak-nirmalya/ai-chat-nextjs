import { google } from "@ai-sdk/google";
import { tool as createTool, generateObject } from "ai";
import { z } from "zod";

export const weatherTool = createTool({
  description: "Display the weather for a location",
  parameters: z.object({
    location: z.string().describe("The location to get the weather for"),
  }),
  execute: async function ({ location }) {
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

export const stockPriceTool = createTool({
  description: "Display the stock price for a company",
  parameters: z.object({
    companyName: z
      .string()
      .describe("The name of the company to get the stock price in USD for"),
  }),
  execute: async function ({ companyName }) {
    const { object: stockDetails } = await generateObject({
      model: google("gemini-2.5-flash-preview-04-17", {
        structuredOutputs: true,
      }),
      schema: z.object({
        price: z.number().describe("The stock price in USD"),
        name: z.string().describe("The name of the company"),
        symbol: z.string().describe("The symbol of the company"),
      }),
      prompt: [
        `The model tried to call the tool "stockPriceTool"` +
          ` with the following arguments:`,
        ` Company Name: ${companyName}`,
        `Please provide the stock price in USD, the name of the company, and the symbol of the company.`,
      ].join("\n"),
    });

    return stockDetails;
  },
});

export const tools = {
  displayWeather: weatherTool,
  displayStockPrice: stockPriceTool,
};
