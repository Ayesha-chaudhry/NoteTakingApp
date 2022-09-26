import React from "react";
import {Text, View, StyleSheet} from 'react-native';
import Navigation from "./src/navigation";
import {AdMobBanner} from 'expo-ads-admob';

export default function App() {  
    return(
        <View style={styles.container}>
            <Navigation/>
            <AdMobBanner
                bannerSize="smartBannerPortrait"
                adUnitID="ca-app-pub-3940256099942544/6300978111" 
                servePersonalizedAds 
            />
                    
        </View>   

  );
      
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})