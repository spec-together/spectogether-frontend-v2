import React, { useEffect } from "react";

const NaverMapPage = () => {
  useEffect(() => {
    const loadMap = () => {
      // Naver Map API script URL
      const script = document.createElement("script");
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            // Create Naver map instance
            const mapOptions = {
              center: new window.naver.maps.LatLng(latitude, longitude),
              zoom: 10,
            };

            const map = new window.naver.maps.Map("map", mapOptions);

            // Add a marker to the map
            const markerPosition = new window.naver.maps.LatLng(
              latitude,
              longitude
            );
            new window.naver.maps.Marker({
              position: markerPosition,
              map: map,
            });
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      };
    };

    loadMap();
  }, []);

  return <div id="map" className="w-2/3 h-screen" />;
};

export default NaverMapPage;
