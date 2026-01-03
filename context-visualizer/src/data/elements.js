// Context window elements with approximate token counts
// Based on realistic Cursor/AI agent usage patterns

export const CONTEXT_WINDOW_SIZE = 128000; // 128K tokens

export const ELEMENT_TYPES = {
  // === PERMANENT ELEMENTS (cannot be summarized, included by default) ===
  SYSTEM_INSTRUCTIONS: {
    id: "system-instructions",
    name: "System Instructions",
    tokens: 6000,
    color: "#6366f1", // Indigo (permanent)
    description: "Base system prompt and behavior rules",
    category: "system",
    permanent: true,
  },
  CURSOR_RULES: {
    id: "cursor-rules",
    name: "Cursor Rules",
    tokens: 4000,
    color: "#6366f1", // Indigo (permanent)
    description: "Built-in Cursor IDE rules and capabilities",
    category: "system",
    permanent: true,
  },
  CURSOR_BUILTIN_TOOLS: {
    id: "cursor-builtin-tools",
    name: "Cursor Builtin Tools",
    tokens: 3000,
    color: "#6366f1", // Indigo (permanent)
    description: "Built-in Cursor tools (read, write, grep, terminal, etc.)",
    category: "system",
    permanent: true,
  },
  MCP_TOOL_DEF: {
    id: "mcp-tool-def",
    name: "MCP Tool Definition",
    tokens: 2000,
    color: "#6366f1", // Indigo (permanent)
    description: "MCP server tool schemas",
    category: "mcp",
    permanent: true,
  },

  // === CONVERSATION ELEMENTS ===
  LONG_USER_MESSAGE: {
    id: "long-user-message",
    name: "Long user message",
    tokens: 8000,
    color: "#3b82f6", // Blue
    description: "A message from the user",
    category: "conversation",
  },
  SHORT_USER_MESSAGE: {
    id: "short-user-message",
    name: "Short user message",
    tokens: 300,
    color: "#3b82f6", // Blue
    description: "A short message from the user",
    category: "conversation",
  },
  ASSISTANT_MESSAGE: {
    id: "assistant-message",
    name: "Assistant Message",
    tokens: 4000,
    color: "#a855f7", // Purple
    description: "A response from the AI assistant",
    category: "conversation",
  },

  // === TOOL CALLS ===
  TOOL_READ: {
    id: "tool-read",
    name: "Tool: read()",
    tokens: 1000,
    color: "#f97316", // Orange (tool calls)
    description: "Reading a file into context",
    category: "tools",
  },
  TOOL_WRITE: {
    id: "tool-write",
    name: "Tool: write()",
    tokens: 1000,
    color: "#f97316", // Orange (tool calls)
    description: "Writing/editing a file",
    category: "tools",
  },
  TOOL_GREP: {
    id: "tool-grep",
    name: "Tool: grep()",
    tokens: 1000,
    color: "#f97316", // Orange (tool calls)
    description: "Searching codebase",
    category: "tools",
  },
  TERMINAL_OUTPUT: {
    id: "terminal-output",
    name: "Terminal Output",
    tokens: 500,
    color: "#f97316", // Orange (tool calls)
    description: "Command execution results",
    category: "tools",
  },

  // === MCP ===
  MCP_CALL_RESULT: {
    id: "mcp-call",
    name: "MCP Tool Call",
    tokens: 5000,
    color: "#eab308", // Yellow
    description: "Response from MCP tool execution",
    category: "mcp",
  },

  // === CONTEXT ===
  CODEBASE_CONTEXT: {
    id: "codebase-context",
    name: "Codebase Context",
    tokens: 2000,
    color: "#8b5cf6", // Violet
    description: "Project structure and file summaries",
    category: "context",
  },
};

// Get all elements as an array for rendering
export const getAllElements = () => Object.values(ELEMENT_TYPES);

// Get only draggable (non-permanent) elements
export const getDraggableElements = () =>
  Object.values(ELEMENT_TYPES).filter((el) => !el.permanent);

// Get permanent elements (default in every conversation)
export const getPermanentElements = () =>
  Object.values(ELEMENT_TYPES).filter((el) => el.permanent);

// Group elements by category (only draggable ones for sidebar)
export const getElementsByCategory = () => {
  const elements = getDraggableElements();
  return elements.reduce((acc, element) => {
    if (!acc[element.category]) {
      acc[element.category] = [];
    }
    acc[element.category].push(element);
    return acc;
  }, {});
};

// Category labels for UI
export const CATEGORY_LABELS = {
  system: "System",
  conversation: "Conversation",
  tools: "Tool Calls",
  mcp: "MCP",
  context: "Context",
};
