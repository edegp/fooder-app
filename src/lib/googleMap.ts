export const myCustomLoadFunction = async () => {
  try {
    const { Loader } = await import('@googlemaps/js-api-loader');
    const apikey = process.env.GOOGLE_MAP_APIKEY;
    console.log(process.env.GOOGLE_MAP_APIKEY);
    console.log(process.env);
    if (apikey) {
      const loader = new Loader({
        apiKey: apikey,
        version: 'weekly',
      });
      await loader.load();
    }
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 4,
    };
    new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions,
    );
  } catch (e) {
    // do something
  }
};
