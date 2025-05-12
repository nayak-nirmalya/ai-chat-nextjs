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

export const bookDetailsTool = createTool({
  description: "Display details of a book",
  parameters: z.object({
    bookName: z.string().describe("The name of the book to get details for"),
  }),
  execute: async function ({ bookName }) {
    const { object: bookDetails } = await generateObject({
      model: google("gemini-2.5-flash-preview-04-17", {
        structuredOutputs: true,
      }),
      schema: z.object({
        name: z.string().describe("The name of the book"),
        author: z.string().describe("The name of the book author"),
        genre: z.string().describe("The genre of the book"),
        publicationYear: z
          .string()
          .describe("The Publication Year of the book"),
      }),
      prompt: [
        `The model tried to call the tool "bookDetailsTool"` +
          ` with the following arguments:`,
        ` Book Name: ${bookName}`,
        `Please provide the name, author, genre & Publication Year of the book.`,
      ].join("\n"),
    });

    return bookDetails;
  },
});

export const movieDetailsTool = createTool({
  description: "Display details of a movie",
  parameters: z.object({
    movieName: z.string().describe("The name of the movie to get details for"),
  }),
  execute: async function ({ movieName }) {
    const { object: movieDetails } = await generateObject({
      model: google("gemini-2.5-flash-preview-04-17", {
        structuredOutputs: true,
      }),
      schema: z.object({
        name: z.string().describe("The name of the movie"),
        director: z.string().describe("The name of the movie director"),
        genre: z.string().describe("The genre of the movie"),
        releaseYear: z.string().describe("The release Year of the movie"),
      }),
      prompt: [
        `The model tried to call the tool "movieDetailsTool"` +
          ` with the following arguments:`,
        ` Movie Name: ${movieName}`,
        `Please provide the name, director, genre & release Year of the movie.`,
      ].join("\n"),
    });

    return movieDetails;
  },
});

export const generateDummyTool = createTool({
  description: "Generate dummy blog/post data for UI mockup with DummyJSON",
  parameters: z.object({
    blogAbout: z.string().describe("Generate dummy data for a blog about"),
  }),
  execute: async function ({ blogAbout }) {
    const generateRandomNumber =
      Math.floor(Math.random() * 14) + blogAbout.length;

    const response = await fetch(
      `https://dummyjson.com/posts/${generateRandomNumber}`
    );
    const blog = await response.json();
    console.log(blog);

    return {
      title: blog.title,
      body: blog.body,
    };
  },
});

export const generateDummyToolWithAI = createTool({
  description: "Generate dummy blog/post/article data for UI mockup",
  parameters: z.object({
    blogAbout: z.string().describe("Generate dummy data for a blog about"),
  }),
  execute: async function ({ blogAbout }) {
    const { object: blogDetails } = await generateObject({
      model: google("gemini-2.5-flash-preview-04-17", {
        structuredOutputs: true,
      }),
      schema: z.object({
        title: z
          .string()
          .describe("The title of the blog in less than 40 characters"),
        body: z
          .string()
          .describe(
            "The body/description of the blog in less than 200 characters"
          ),
      }),
      prompt: [
        `The model tried to call the tool "generateDummyTool"` +
          ` with the following arguments:`,
        ` Blog Name: ${blogAbout}`,
        `Please generate short concise dummy details.`,
      ].join("\n"),
    });

    return blogDetails;
  },
});

export const tools = {
  displayWeather: weatherTool,
  displayStockPrice: stockPriceTool,
  displayBookDetails: bookDetailsTool,
  displayMovieDetails: movieDetailsTool,
  displayBlog: generateDummyToolWithAI,
};
