# React + TypeScript + Vite

# React To-Do Application

A small React + TypeScript application built as a practical exercise for state management, UI/UX, and clean component architecture.  
This project follows the specifications of a typical "React Coding Assignment" used in interviews.

---

## 🚀 Features (Teil 1)

### ✔ Core Functionality
- Add new tasks
- Edit tasks (only when status is "open")
- Mark tasks as done or reopen them
- Delete tasks
- Automatic "urgent" status:  
  A task becomes urgent if it stays open longer than 1 minute
- Task summary: open, done, total
- Display creation date and time for each task

### ✔ State Management
- `useState` for managing todos and UI interactions  
- `useEffect` for time-based urgent detection  
- Clean separation of components and strict TypeScript types

### ✔ UI/UX
- Clean and minimal interface  
- Color-coded status badges (Open / Done / Urgent)  
- Fully keyboard-accessible form (Enter to submit)  
- Responsive layout and readable typography  
- Clear button labels and functional structure

### ✔ Accessibility
- ARIA labels  
- Keyboard-friendly interactions  
- Announcements via `aria-live` in the todo list

### ✔ Code Quality
- TypeScript interfaces for all data structures  
- Functional components  
- Small, testable components  
- Avoids unnecessary re-renders  
- Readable and commented code

---

## 📁 Folder Structure

src/
components/
TodoItem.tsx
TodoList.tsx
types/
todo.ts
App.tsx
App.css
main.tsx

---

## 🛠 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **CSS (custom styles)**
- Optional: GitHub Copilot / ChatGPT for assistance

---

## 🧪 How to Run

```bash
npm install
npm run dev

App will be available at:

http://localhost:5173

## 📄 Reflection

See REFLECTION.md for a short write-up on AI usage during development.

##  📝 Part 2 (Stretch Goal)

The next step (optional) includes:

Task categories (Work, Personal, Shopping, etc.)

Assigning categories during creation

Moving tasks between categories

Grouped category lists in UI


