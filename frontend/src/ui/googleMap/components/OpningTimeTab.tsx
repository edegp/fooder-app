import { memo } from 'react'

export const OpeningTimeTab = memo(function OpeningTimeTab({
  openingOpen,
  detail
}: {
  openingOpen: boolean
  detail: google.maps.places.PlaceResult
}) {
  const opening2Part = detail.opening_hours?.weekday_text?.some(day => day.split(' ').length > 2)
  const OpeningPart = () => {
    if (!opening2Part) {
      return (
        <div>
          {parseInt(detail.opening_hours?.weekday_text?.[0]?.slice(0, 2) || '12', 10) < 15 ? '昼の営業' : '夜の営業'}
        </div>
      )
    } else {
      return (
        <>
          <div>昼の営業</div>
          <div>夜の営業</div>
        </>
      )
    }
  }
  return openingOpen ? (
    <>
      <div className="ml-20 flex space-x-16">
        <OpeningPart />
      </div>
      {detail.opening_hours?.weekday_text?.map((day: string, i: number) => (
        <div key={i} className="m-3">
          {day.replace(/,/g, '，　').replace(/:/g, ':　').replace(/時/g, ':').replace(/分/g, '')}
        </div>
      ))}
    </>
  ) : (
    <></>
  )
})
