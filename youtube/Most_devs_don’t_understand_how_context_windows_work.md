# Most devs don’t understand how context windows work

Summary of context windows and AI coding performance by AI Hero (aihero.dev).

## 1. Defining the Context Window

- **Input and Output Totals:** The context window consists of the entire set of input tokens (system prompts, user messages) and output tokens (assistant responses) that the LLM sees.
- **Dynamic Growth:** As a conversation progresses, the number of tokens spent grows until it hits a hard-coded limit set by the provider.
- **Hard-Coded Limits:** Every model has a fixed maximum; for example, Claude 3.5 Sonnet has a 200,000 token limit, while Gemini 1.5 Pro can reach 2 million.
- **Single Message Failures:** You can hit the limit with a single long message, such as uploading large documents or asking for a transcription of an enormous image.

## 2. Why Limits and Constraints Exist

- **Architectural Constraints:** LLM processing is computationally expensive; larger context windows require significantly more memory per process.
- **Performance Degradation:** The more information given to a model, the worse it tends to perform, regardless of the model's total size.
- **Memory Per Process:** Providers impose limits to manage the resource-intensive nature of maintaining a large "active memory" for the model.

## 3. The Needle in a Haystack Problem

- **Retrieval Struggles:** LLMs often struggle to find specific facts hidden within a "bloated" or extremely large context.
- **Information Density:** Models perform better with less, more focused information rather than a massive, unorganized data dump.
- **Emergent Design Flaws:** Difficulty in retrieval is not necessarily an intended feature but an emergent property of how transformer architectures handle attention.

## 4. The "Lost in the Middle" Phenomenon

- **Positional Bias:** Information at the very beginning (primacy) and the very end (recency) of a chat is prioritized by the LLM’s attention mechanism.
- **The Middle Void:** Content in the middle of a long conversation is frequently ignored or deprioritized, leading to errors in complex tasks.
- **Human Parallel:** This mirrors human behavior where we tend to remember the start and end of a video or lecture better than the middle "guff."

## 5. Strategic Context Management: Clearing

- **The Blank Slate:** Regularly clearing your coding agent's chat history is the most effective way to "refresh" the agent's memory.
- **Skill Issue vs. Tool Issue:** Many "bad" results from coding agents are actually caused by a bloated context rather than a lack of model capability.
- **Focus Improvement:** A shorter context window reduces "Lost in the Middle" errors and keeps the agent focused on the immediate task.

## 6. Strategic Context Management: Compacting

- **Summary Generation:** Tools like Claude Code allow you to "compact" a conversation, which uses an LLM to summarize the history into a smaller message.
- **Preserving Intent:** Compacting maintains the "vibes" and general intention of the work while deleting heavy file contents and redundant messages.
- **Token Efficiency:** In the example shown, compacting reduced a 77,000-token conversation down to just 4,000 tokens of summary.

## 7. The Hidden Cost of MCP Servers

- **Tool Bloat:** Model Context Protocol (MCP) servers are attractive but can bloat your system prompt and context window incredibly rapidly.
- **Invisible Tokens:** Each connected tool adds its own definitions and instructions to every single request, eating into your available space.
- **Selective Usage:** Developers should be extremely cautious and selective about which MCP servers they keep active in their setup.

## 8. Avoiding Rule Bloat

- **System Prompt Overhead:** Large `.cursorrules` or Claude rules files act as a constant tax on your context window.
- **System Prompt Priority:** While system prompts are at the "start" (high priority), they leave less room for the actual code and logic you need the LLM to process.
- **Lean Configuration:** Keeping rules files minimal ensures that the "Lost in the Middle" problem doesn't start before you've even sent your first message.

## 9. Transparency and Monitoring

- **Full Visibility:** Using commands like `context` in Claude Code provides a breakdown of token usage (e.g., 8% system prompt, 40% messages).
- **Threshold Awareness:** A developer should start becoming "scared" or cautious once they have less than 50,000 tokens of free space left in a 200k window.
- **Real-Time Tracking:** Understanding how many tokens are being spent on files versus conversation history is key to maintaining performance.

## 10. Retrieval Quality Over Window Size

- **Size is Deceptive:** A massive context window (like Llama 4 Scout's 10 million tokens) is useless if the retrieval performance is poor.
- **Retrieval Benchmarks:** When assessing a new model, you should look at how well it retrieves information from its context rather than just the maximum token count.
- **Practical Utility:** A model with a smaller, more reliable context window often outperforms a larger one with severe "Lost in the Middle" problems.

## Conclusions

- **Clear Chats Frequently:** Make it a habit to clear your agent's history once a specific sub-task is complete to reset the context.
- **Monitor Token Usage:** Use built-in tools (like the `context` command) to see exactly how much of your window is currently "bloat."
- **Use Compacting for Long Sessions:** If you need to keep the project context alive, use the "compact" feature to summarize the history instead of deleting it.
- **Audit your MCP Servers:** Remove any unused MCP tools that are silently consuming your token budget in every message.
- **Minimize System Rules:** Keep your custom instruction files (like `.cursorrules`) lean and focused on the most essential project constraints.
- **Prioritize Quality over Quantity:** Choose models based on their retrieval accuracy (needle-in-a-haystack performance) rather than just the advertised context limit.
- **Identify the "Danger Zone":** Be prepared to clear or reset once you reach 75% of your model's total context capacity to avoid degraded logic.