import React, { useEffect } from "react";
import {Text, View, StyleSheet} from 'react-native';
import Navigation from "./src/navigation";
import {AdMobBanner} from 'expo-ads-admob';
import * as Notifications from 'expo-notifications';

export default function App() {  

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

        useEffect(() => {
            //registerForPushNotificationsAsync();
        }, []);
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
  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
}
      
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})