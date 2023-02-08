import { IconContext } from 'react-icons'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

export const Star = ({
  rating,
  className,
  isDisplayRatingNum
}: {
  rating?: number
  className?: string
  isDisplayRatingNum?: boolean
}) => {
  let point = rating ? rating : 1
  return (
    <div className={className}>
      <div className="flex text-yellow-400">
        {Array.from(Array(5), (_v, k) => k).map(num => {
          if (rating) {
            point -= 1
            return point >= 0 ? (
              <BsStarFill key={num} />
            ) : point >= -0.5 ? (
              <BsStarHalf key={num} />
            ) : (
              <BsStar key={num} />
            )
          }
        })}
      </div>
      {isDisplayRatingNum && <div>{rating}</div>}
    </div>
  )
}
