// overflow-hidden = image stays inside rounded corners
// hover:shadow-md = card lift effect
// line-clamp-2 = truncate description to 2 lines

import { Badge } from './Badge'

export function Card({ title, description, image, badge, badgeVariant = 'blue', footer, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-slate-800
        border border-gray-100 dark:border-slate-700
        rounded-xl shadow-sm hover:shadow-md
        transition-shadow duration-200 overflow-hidden
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}

      <div className="p-5">
        {badge && <div className="mb-2"><Badge variant={badgeVariant}>{badge}</Badge></div>}
        <h3 className="text-base font-semibold text-gray-900 dark:text-slate-100">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {footer && (
        <div className="px-5 py-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
          {footer}
        </div>
      )}
    </div>
  )
}
