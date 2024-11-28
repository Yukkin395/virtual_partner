import React from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = React.memo(
  ({ task, toggleTask }) => (
    <li
      onClick={() => toggleTask(task.id)}
      className={`
        group flex items-center gap-3 p-3 mb-2
        border border-gray-200 rounded-lg
        transition-all duration-200 ease-in-out
        hover:border-gray-400 hover:shadow-sm
        cursor-pointer
        ${task.completed ? "bg-gray-50" : "bg-white"}
      `}
    >
      <div
        className={`
          w-5 h-5 rounded-full border-2
          flex items-center justify-center
          transition-all duration-200 ease-in-out
          ${
            task.completed
              ? "border-green-500 bg-green-500"
              : "border-gray-300 group-hover:border-green-500"
          }
        `}
      >
        {task.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span
        className={`
          flex-1 text-gray-700
          transition-all duration-200 ease-in-out
          ${task.completed ? "line-through text-gray-400" : ""}
          group-hover:text-gray-900
        `}
      >
        {task.text}
      </span>
    </li>
  )
);
