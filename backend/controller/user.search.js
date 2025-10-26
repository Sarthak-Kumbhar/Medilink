import asyncHandler from "express-async-handler";
import SendError from "../utility/Error.handlers.js";
import { ChatOpenAI } from "@langchain/openai";
import fs from "fs";
import { spawn } from "child_process";

const model = new ChatOpenAI({
  apiKey: process.env.OPEN_AI,
  model: "gpt-3.5-turbo",
});

const searchModel = (input) => {
  if (!input) throw new SendError(404, "input not found");

  // TODO: implement model search logic
};

const formatter = (content) => {
  if (!content) throw new SendError(404, "Content not found");

  // TODO: implement docx creation
};

const tools = [
    searchModel,
    formatter,
];

const Search = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) throw new SendError(401, "Prompt required");

  let file;
  try {
    file = fs.readFileSync("utility/systemPrompt.txt", { encoding: "utf-8" });
  } catch (err) {
    throw new SendError(501, "System prompt file not found");
  }

  const message = [
    {
      role: "system",
      content: file,
    },
  ];

  const userMessage = {
    type: "user",
    user: prompt,
  };
  message.push({
    role: "user",
    content: JSON.stringify(userMessage),
  });

  while (true) {
    const response = await model.invoke(message);
    if (response.content.type === "output") {
      res.status(200).json({
        message: response.content,
      });
      break;
    } else if (response.content.type === "action") {
      const func = tools[response.content.function];
      if (!func) throw new SendError(404, "function not found");
      const ob = await func(response.concat.action.input);
      const obMessage = {
        type: "observation",
        observation: ob,
      };
      message.push({
        role: "developer",
        content: obMessage,
      });
    }
  }
});

const geminiSearch = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  
  if (!prompt) throw new SendError(404, "Prompt required");

  const cmd = spawn("npx", ["gemini", "-p", `"${prompt}"`], { shell: true });

  let outputData = "";
  let errorData = "";

  cmd.stdout.on("data", (chunk) => {
    outputData += chunk.toString();
  });

  cmd.stderr.on("data", (chunk) => {
    errorData += chunk.toString(); 
  });

  cmd.on("error", (err) => {
    res.status(500).json({ error: "Failed to execute command", err: err });
  });

  cmd.on("close", (code) => {

    if (code !== 0) {
      return res.status(500).json({ error: errorData || "Unknown error" });
    }

    let cleanData = outputData.split("\n").filter((l) => !l.includes("Loaded cached credentials.")).join("\n").trim();

    res.status(200).json({ message: cleanData });
  });
});
export { Search, geminiSearch };
