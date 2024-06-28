import React, { useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import styles from "./styles";
import { MAP_STYLE } from "./map-style";
import HoleSvg from "../../../assets/hole_svg";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface InitialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Props {
  coordinate: Coordinate;
  initialRegion: InitialRegion;
  hole?: boolean;
}

const MapComponent: React.FC<Props> = ({
  coordinate,
  initialRegion,
  hole = false,
}) => {
  const mapRef = useRef<MapView>(null);
  return (
    <MapView
      zoomEnabled={false}
      scrollEnabled={false}
      toolbarEnabled={false}
      pitchEnabled={false}
      ref={mapRef}
      style={styles.map}
      initialRegion={initialRegion}
      customMapStyle={MAP_STYLE}
    >
      <Marker tracksViewChanges={false} coordinate={coordinate}>
        {hole ? (
          <Ionicons name="flag" color="#fff" size={30} />
        ) : (
          <View
            style={{
              height: 15,
              width: 15,
              borderRadius: 10,
              backgroundColor: "#f5f5f5",
            }}
          />
        )}
      </Marker>
    </MapView>
  );
};

export default MapComponent;