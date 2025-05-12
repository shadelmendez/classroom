export const CourseBadge = ({ initial, color = "blue" }) => {
  const colorClass = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    red: "bg-red-600",
    purple: "bg-purple-600",
  }[color] || "bg-gray-600";

  return (
    <div className={`w-8 h-8 rounded-full ${colorClass} text-white flex items-center justify-center font-bold text-sm`}>
      {initial}
    </div>
  );
};
