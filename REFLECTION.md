# Reflection

### 1. Which AI tools did you use and for what tasks?

I used ChatGPT and GitHub Copilot during the implementation of this project.  
ChatGPT helped me clarify requirements, plan the structure of the application, fix errors, and improve UI/UX design.  
Copilot assisted mostly with generating repetitive code snippets such as component scaffolding, TypeScript types, and basic handlers.

### 2. Where did AI-generated code need correction or adjustments?

Several areas required manual review and corrections:

- JSX structure: sometimes Copilot inserted duplicated fragments or unclosed tags.
- State management: I had to adjust some effects and handlers to ensure correct behavior (e.g., urgent status logic).
- TypeScript types: some suggestions were incomplete or needed stricter definitions.
- Styling: CSS classes and structure were refined manually after initial suggestions.

Overall, AI results were helpful but often needed cleanup and integration into the final architecture.

### 3. What did you learn about effective prompting or AI limitations?

I learned that:

- Clear and specific prompts produce the best results.
- Breaking tasks into smaller steps helps AI generate more accurate code.
- AI sometimes “hallucinates” missing components or duplicates code, so reviewing generated JSX is important.
- AI is great for ideas and boilerplate but cannot replace understanding how React state and effects work.

### 4. Which parts of the code can you explain best, and which parts least?

I can confidently explain:

- State structure and data flow between components  
- The urgent-task logic using `useEffect` and time-based updates  
- The editing workflow and local state in `TodoItem`  
- Component composition and TypeScript interfaces  

The parts I can explain least are:

- Some layout and CSS design decisions that came from iterative styling suggestions  
- Minor details in the badge styling that were refined with AI assistance  

Still, I fully understand the project structure and the overall logic of the application.
