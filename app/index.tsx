import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import React, { useEffect, useRef } from 'react';

import { markers } from '../assets/marker';
import { useNavigation } from 'expo-router';
import Footer from '@/components/Footer';

const INITIAL_REGION = {
    latitude: -17.8292,
    longitude: 31.0522,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
};

export default function App() {
	const mapRef = useRef<any>(null);
	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity onPress={focusMap}>
					<View style={{ padding: 10 }}>
						<Text>Focus</Text>
					</View>
				</TouchableOpacity>
			)
		});
	}, []);

	const focusMap = () => {

        const Harare = {
            latitude: -17.8292,
            longitude: 31.0522,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }

		mapRef.current?.animateToRegion(Harare);
		mapRef.current?.animateCamera({ center: Harare, zoom: 50 }, { duration: 2000 });
	};

	const onMarkerSelected = (marker: any) => {
		Alert.alert(marker.name);
	};

	const calloutPressed = (ev: any) => {
		console.log(ev);
	};

	const onRegionChange = (region: Region) => {
		console.log(region);
	};

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={StyleSheet.absoluteFillObject}
				initialRegion={INITIAL_REGION}
				showsUserLocation
				showsMyLocationButton
				provider={PROVIDER_GOOGLE}
				ref={mapRef}
				onRegionChangeComplete={onRegionChange}
			>
				{markers.map((marker, index) => (
					<Marker
						key={index}
						title={marker.name}
						coordinate={marker}
						onPress={() => onMarkerSelected(marker)}
                        draggable
                        pinColor='blue'
                        onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
					>
						<Callout onPress={calloutPressed}>
							<View style={{ padding: 10 }}>
								<Text style={{ fontSize: 24 }}>Hello</Text>
							</View>
						</Callout>
					</Marker>
				))}
			</MapView>
                <Footer />
		</View>
	);
}
