interface TimerCircleProps {
  progress: number;
  formattedTime: string;
}

export const TimerCircle: React.FC<TimerCircleProps> = ({
  progress,
  formattedTime,
}) => {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 220 220">
        <circle
          cx="110"
          cy="110"
          r={radius}
          className="fill-none stroke-gray-200"
          strokeWidth="4"
        />
        <circle
          cx="110"
          cy="110"
          r={radius}
          className="fill-none stroke-blue-500"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
          style={{
            transition: "stroke-dashoffset 1s linear",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-6xl tracking-wider">{formattedTime}</span>
      </div>
    </div>
  );
};
