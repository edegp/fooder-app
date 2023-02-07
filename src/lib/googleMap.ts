let map: google.maps.Map
let infowindow: google.maps.InfoWindow

/**
 *
 *  googleマップにmakerを刺す
 */
export const createMarker = (place: google.maps.places.PlaceResult) => {
  if (!place.geometry || !place.geometry.location) return

  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location
  })

  google.maps.event.addListener(marker, 'click', () => {
    infowindow.setContent(place.name || '')
    infowindow.open(map)
  })
}

/**
 *  検索結果のcallback
 */
export const callback = (results: google.maps.places.PlaceResult[] | null, status: google.maps.places.PlacesServiceStatus) => {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    if (results) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i])
      }
    }
  }
}

/**
 *  https://developers.google.com/maps/documentation/javascript/places?hl=ja#place_search_requests
 *  マップ作成関数
 */
export const myCustomLoadFunction = async () => {
  try {
    const { Loader } = await import('@googlemaps/js-api-loader')
    const tokyo = new google.maps.LatLng(36, 140)
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_APIKEY || ''
    })
    await loader.load()
    const mapOptions = {
      center: tokyo,
      zoom: 14
    }
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions)
    const service = new google.maps.places.PlacesService(map)
    return service
  } catch (e) {
    // do something
  }
}
