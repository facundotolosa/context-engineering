# From Vibe Coding To Vibe Engineering – Kitze, Sizzy

Summary of the evolution of AI-driven development and the transition from mindless prompting to professional agentic supervision by Kitze.

## 1. The Stagnation of Front-End Development

- **The Innovation Gap:** While industries like gaming and VR (Vision Pro) have achieved complex mesh blending and generative cities, front-end development has spent 10 years struggling to style a basic HTML `select` element.
- **Persistent Pains:** Developers are still fighting the same battles from 2017, including the complexity of creating a simple counter and the inability to fully move past legacy browser behaviors.
- **The Library Monopoly:** Despite the "hype-driven" nature of the industry, React remains the dominant tool, though its implementation remains inconsistent across the community.

## 2. Defining Vibe Coding vs. Vibe Engineering

- **Vibe Coding:** Coined by Andrej Karpathy, this refers to a workflow where developers care less about the code itself, pressing "accept" on LLM suggestions and hoping for a functional result.
- **Vibe Engineering:** A more professional evolution where developers use agents to handle implementation while they act as "Dexter-like" supervisors, architecting the logic and spotting "fishy" patterns.
- **The Manager Comparison:** Kitze notes that managers have been "vibe coding" for decades—requesting features, testing functionality, and never reading the actual code.

## 3. The Power of Agentic Workflows with Cursor

- **Composer Mode:** The introduction of agentic tools like Cursor’s Composer has shifted the workflow from "waiting for results" to "active supervision," allowing for instant feedback loops.
- **Instant Refactoring:** Kitze shares how he migrated complex projects (Sizzy, Benji, Glink) to modern stacks like Next.js 14, TRPC, and Monorepos in less than a week using agentic prompts.
- **Breaking the Abstraction Habit:** LLMs do not care about repetitive code; Vibe Engineering encourages developers to stop over-abstracting too early, a common "human" trap.

## 4. Voice-to-Code: High-Bandwidth Context

- **The Thinking Process:** Kitze advocates for using voice to explain UI bugs and code requirements as if talking to a friend, providing the LLM with a rich "brain dump" of context.
- **Narrating the UI:** By describing exactly what is seen in the browser and then jumping into the code to narrate the logic, developers can bridge the gap between visual intent and implementation.
- **Prompt Efficiency:** High-bandwidth voice prompts (sometimes lasting 5 minutes) yield significantly better results than short, ambiguous text commands like "fix the app."

## 5. The "Pain in the Ass" (PA) Developer Diagnosis

- **Symptoms of Stagnation:** The "PA Dev" is defined by nitpicking 2-line PRs, spending too long on reviews, and being religious about trivialities like tabs vs. spaces or Low Dash vs. native loops.
- **Optimization Obsession:** These developers often prioritize micro-optimizations that don't affect the user, resisting the speed and efficiency offered by AI tools.
- **The AGI Future:** Kitze jokes that even when we are in Matrix-style pods, a PA Dev will emerge to tell the AGI that its code isn't "optimally" written.

## 6. The Developer Skill Spectrum

- **Junior vs. Senior:** Juniors love vibe coding for the quick results, while the "skeptical middle" of developers often reject it. The highest value lies in the "Skeptical Senior" who adopts vibe engineering.
- **New Required Skills:** Success with AI requires mastering new skills: knowing model limits, managing context windows, writing effective `.cursorrules`, and staying "chronically on Twitter" for updates.
- **Judgment as a Skill:** The most important skill is knowing which code is "good enough" for the task and when to step in for niche optimizations.

## 7. The Myth of the Model Plateau

- **Rapid Evolution:** Every time the industry claims LLM capabilities have plateaued, a new model (like GPT-o1 or Claude 3.5 Sonnet) is released that changes the definition of what can be "vibed."
- **Marketing Complexity Pipeline:** Kitze critiques the "MCP" (Model Context Protocol) and other buzzwords as "Marketing Charge Protocols" used to sell courses, while emphasizing the actual API-driven power behind them.
- **Real-Time Shifts:** The "best" model changes constantly, requiring developers to be flexible and ready to update their workflows almost daily.

## 8. The Impact on the Job Market

- **Thinning from the Bottom:** AI is not necessarily replacing seniors yet, but it is "thinning from the bottom" by making interns and juniors less necessary for routine tasks.
- **The Token Leaderboard:** Forward-thinking companies like Shopify are rewarding employees who burn the most tokens, viewing AI adoption as a marker of high-value productivity.
- **The "Last 20%" Problem:** A new market is emerging for "Vibe Code Fixers"—senior engineers hired to finish the complex final 20% of projects that AI-only "vibe coders" cannot complete.

## 9. Legacy Maintenance and "React Cowboys"

- **The Cobol Cowboys:** Kitze draws a parallel to the high-paid "Cobol Cowboys" who maintain ancient financial systems, predicting a future for "React Cowboys" to maintain AI-generated legacy code.
- **The Complexity Debt:** If developers accept "slop" without engineering oversight, they will eventually hit a roadblock where the code becomes unmaintainable.
- **Deep Technical Knowledge:** Despite AI, studying Computer Science is more important than ever to provide the steering and judgment required to handle agentic output.

## 10. Practical Workflow Tips for Vibe Engineering

- **Solid Primitives:** Successful vibe engineering requires a solid starting point of good components, functions, and pattern abstractions for the AI to follow.
- **Context Management:** Use rules, documentation, commands, and "memories" within tools like Cursor to ensure the agent doesn't hallucinate due to a lack of app context.
- **The Driver's Seat:** Stay in the "driver's seat" by watching the agent code in real-time and using "Stop" commands the moment it veers off-track.

## Conclusions

- **Transition to Agentic Tools:** Move from simple chat-based AI to agentic environments like Cursor Composer to increase development speed by 10x.
- **Prioritize Context over Syntax:** Focus on providing high-bandwidth context via voice and documentation rather than manually typing out boilerplate code.
- **Avoid Early Abstraction:** Let the AI write repetitive code; only abstract when a clear, functional pattern has emerged across multiple use cases.
- **Cultivate Technical Judgment:** Use your senior-level knowledge to judge when code is "good enough" and avoid falling into the "PA Dev" trap of micro-nitpicking.
- **Prepare for the "Last 20%":** Position yourself as a high-value engineer who can architect systems and fix the complex edges that blind "vibe coding" cannot solve.
- **Embrace "Good Enough" Slop for One-Offs:** Use pure vibe coding for one-time scripts and personal tools, but maintain strict "vibe engineering" standards for production systems.

---

**Source:** https://www.youtube.com/watch?v=JV-wY5pxXLo