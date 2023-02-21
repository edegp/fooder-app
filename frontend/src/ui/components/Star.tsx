import { memo } from 'react'

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

export const Star = memo(function Star({
  rating,
  className,
  isDisplayRatingNum,
  size = 14
}: {
  rating?: number
  className?: string
  isDisplayRatingNum?: boolean
  size?: number
}) {
  let point = rating ? rating : 1
  return (
    <div className={className}>
      <div className="flex text-yellow-400">
        {Array.from(Array(5), (_v, k) => k).map(num => {
          if (rating) {
            point -= 1
            return point >= 0 ? (
              <BsStarFill key={num} size={size} />
            ) : point >= -0.5 ? (
              <BsStarHalf key={num} size={size} />
            ) : (
              <BsStar key={num} size={size} />
            )
          }
        })}
      </div>
      {isDisplayRatingNum && <p style={{ fontSize: `${size}px` }}>{rating}</p>}
    </div>
  )
})
