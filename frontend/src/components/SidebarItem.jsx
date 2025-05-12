import { NavLink } from 'react-router-dom';

export const SidebarItem = ({ name, icon: Icon, path, iconColor }) => {
  // Map the iconColor to Tailwind CSS classes
  const iconColorClass = iconColor === 'green' ? 'text-green-500' : iconColor === 'blue' ? 'text-blue-500' : 'text-gray-500';

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
          isActive ? 'bg-blue-100 text-blue-600 font-semibold' : 'hover:bg-gray-100 text-gray-700'
        }`
      }
    >
      {/* Dynamically pass iconColorClass to the Icon */}
      <Icon className={`w-5 h-5 ${iconColorClass}`} /> {/* Apply the dynamic color here */}
      {name}
    </NavLink>
  );
};
