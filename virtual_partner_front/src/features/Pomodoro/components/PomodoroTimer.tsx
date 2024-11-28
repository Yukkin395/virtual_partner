import { TaskItem } from "./TaskItem";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer";
import { TimerCircle } from "./TimerCicle";

const PomodoroTimer: React.FC = () => {
  const {
    isWork,
    isActive,
    progress,
    formattedTime,
    tasks,
    newTask,
    startTimer,
    pauseTimer,
    resetTimer,
    setNewTask,
    addTask,
    toggleTask,
    deleteTask,
  } = usePomodoroTimer();

  return (
    <div className="flex flex-col items-center h-screen bg-slate-100 bg-opacity-50 shadow-xl justify-center p-4">
      <div className="rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">
          {isWork ? "作業時間" : "休憩時間"}
        </h1>

        <div className="flex items-center justify-center mb-6">
          <TimerCircle progress={progress} formattedTime={formattedTime} />
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={isActive ? pauseTimer : startTimer}
            className={`relative px-4 py-2 bg-transparent ${
              isWork
                ? "text-black border-2 border-black"
                : "text-gray-400 border-2 border-gray-400 cursor-not-allowed"
            } rounded-none transition-all duration-300 before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-black before:transition-all before:duration-300 after:absolute after:right-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:before:w-0 hover:after:w-0`}
            disabled={!isWork}
          >
            {isActive ? "一時停止" : "スタート"}
          </button>
          <button
            onClick={() => resetTimer(25 * 60)}
            className={`relative px-4 py-2 bg-transparent ${
              isWork
                ? "text-black border-2 border-black"
                : "text-gray-400 border-2 border-gray-400 cursor-not-allowed"
            } rounded-none transition-all duration-300 before:absolute before:top-0 before:left-0 before:w-full before:h-0.5 before:bg-black before:transition-all before:duration-300 after:absolute after:right-0 after:bottom-0 after:w-full after:h-0.5 after:bg-black after:transition-all after:duration-300 hover:before:w-0 hover:after:w-0`}
            disabled={!isWork}
          >
            リセット
          </button>
        </div>

        <div className="w-full mb-4">
          <form onSubmit={addTask} className="flex items-center space-x-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="新しいタスクを入力"
              className="flex-1 p-2 border rounded outline-none transition-colors duration-200 focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:scale-95"
            >
              追加
            </button>
          </form>
        </div>

        <ul
          className="
            list-disc list-inside
            min-h-[240px] max-h-[240px] overflow-y-auto
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
            pr-2"
        >
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PomodoroTimer;
