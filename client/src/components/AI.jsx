import { useState } from "react";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import useTaskStore from "../store/taskStore";

/**
 * Yes, you need to prefix your environment variables with VITE_ 
 * if you want to expose them to your client-side React code when using Vite.
 */

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

async function generateAIResponse(prompt) {
  const response = await model.invoke(prompt);
  return response.content;
}

const AI = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const [aiAdvice, setAiAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAdvice = async () => {
    if (tasks.length === 0) {
      alert("Please add some tasks first to get advice.");
      return;
    }

    setIsLoading(true);
    setAiAdvice("");

    try {
      const taskList = tasks
        .map(
          (task) =>
            `- ${task.name} (Due: ${new Date(task.dueDate).toLocaleDateString()})`
        )
        .join("\n");

      const prompt = `I have the following tasks to do:\n${taskList}\n\nPlease provide some advice on how to approach and complete these tasks efficiently.`;

      const advice = await generateAIResponse(prompt);
      setAiAdvice(advice);
    } catch (error) {
      console.error("Failed to get AI advice:", error);
      alert("Sorry, I couldn't generate advice at the moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow w-full max-w-sm">
      <button
        onClick={handleGenerateAdvice}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
            focus:outline-none focus:shadow-outline duration-300 transition-colors w-full disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {isLoading ? "Generating..." : "Get AI Advice on Your Tasks"}
      </button>
      {aiAdvice && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <h3 className="font-semibold text-lg mb-2 text-gray-800">
            AI Advice:
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{aiAdvice}</p>
        </div>
      )}
    </div>
  );
};

export default AI;
