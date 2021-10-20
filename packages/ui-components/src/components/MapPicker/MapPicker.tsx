import React, { useEffect, useState } from 'react';
import { Text, VStack, Center, Input, Button } from '@chakra-ui/react';
import useScript from '../../hooks/utility/useScript';
import 'google-maps';
import { v4 } from 'uuid';

export interface Coords {
  lat: number;
  lng: number;
}

export interface MapPickerProps {
  gMapsApiKey: string;
  defaultCenter: Coords;
  defaultZoom: number;
  onPositionSelect?: (pos: Coords) => void | Promise<void>;
}

const MapPicker = ({
  gMapsApiKey,
  defaultCenter,
  defaultZoom,
  onPositionSelect
}: MapPickerProps) => {
  const [polyfillLoading, polyfillLoaded, polyfillLoadError] = useScript(
    'https://polyfill.io/v3/polyfill.min.js?features=default'
  );
  const [mapsLoading, mapsLoaded, mapsLoadError] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&libraries=places&v=weekly`
  );

  const [markerPos, setMarkerPos] = useState<Coords>(defaultCenter);

  const [marker, setMarker] = useState<google.maps.Marker | undefined>();
  const [map, setMap] = useState<google.maps.Map<HTMLElement> | undefined>();

  const [divId] = useState(v4());
  const [inputId] = useState(v4());

  const handleOnPositionSelect = () => {
    if (onPositionSelect) {
      onPositionSelect(markerPos);
    }
  };

  useEffect(() => {
    if (mapsLoaded && polyfillLoaded) {
      const mapInstance = new google.maps.Map(
        document.getElementById(divId) as HTMLElement,
        {
          center: defaultCenter,
          zoom: defaultZoom,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false
        }
      );
      setMap(mapInstance);

      mapInstance.addListener('click', function (event) {
        const pos = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };
        setMarkerPos(pos);
        // setCenter(pos);
        // map.panTo(pos);
      });

      const markerIntance = new google.maps.Marker({
        // The below line is equivalent to writing:
        // position: new google.maps.LatLng(-34.397, 150.644)
        position: defaultCenter,
        map: mapInstance
      });

      const input = document.getElementById(inputId) as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);
      mapInstance.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
      mapInstance.addListener('bounds_changed', () => {
        searchBox.setBounds(
          mapInstance.getBounds() as google.maps.LatLngBounds
        );
      });

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }

        if (places.length > 0 && places[0].geometry) {
          const pos = {
            lat: places[0].geometry.location.lat(),
            lng: places[0].geometry.location.lng()
          };
          setMarkerPos(pos);
          mapInstance.panTo(pos);
        }
      });

      setMarker(markerIntance);
    }
  }, [mapsLoaded, polyfillLoaded]);

  useEffect(() => {
    if (marker) {
      marker.setPosition(markerPos);
    }
  }, [markerPos]);

  useEffect(() => {
    if (map) {
      setMarkerPos(defaultCenter);
      const inputElem = document.getElementById(inputId) as HTMLInputElement;
      inputElem.value = '';
      map.panTo(defaultCenter);
    }
  }, [defaultCenter]);

  return (
    <VStack height="100%" width="100%">
      <Input id={inputId} width="70%" bg="white" placeholder="Search"></Input>
      <div id={divId} style={{ height: '100%', width: '100%' }}></div>

      <Center width="100%">
        <Button onClick={handleOnPositionSelect} colorScheme="purple">
          Send
        </Button>
      </Center>
    </VStack>
  );
};

export default MapPicker;
