import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator} from "react-native";
import { ADD_BUTTON_IMG, NOTE_IMG, DELETE_BUTTON_IMG } from '../../../res/drawables';
import ImageButton from '../../components/ImageButton';
import App from '../../../api/firebase'
import { collection, getFirestore, query, onSnapshot} from "firebase/firestore";



const Main = (props) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const {email}=props.route.params 
    const db = getFirestore(App)
    let keys = []
   
    const loadData = async () => {
        setLoading(true)

        //For Real Time Listening
        const q = query(collection(db, email))
        
        try{       
            //const unsubscribe =
             onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.data())
                    keys.push(doc.data());
                });
                
                setData(keys)
                keys=[]
                setLoading(false)                
                //unsubscribe();
                
            });
        } catch(e) {

        }        
    }

    useEffect(() => {
        loadData()
    },[])

    return(
        <View style={styles.container}>
        {loading? <ActivityIndicator/> : null}
            <FlatList
                data={data}
                numColumns={3}
                renderItem={({item}) => {
                    return(
                        <TouchableOpacity onPress={
                            () => {
                                props.navigation.navigate('Create', {title: item.title, 
                                description: item.description, email})
                            }}>
                        <Image
                            style={styles.noteIcon}
                            source={NOTE_IMG}
                        />
                        <Text style={styles.text}>{item.title}</Text>    

                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item}
            />
          

            <ImageButton 
                style={{
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    bottom:0,
                    right:0
                }}
                source={ADD_BUTTON_IMG}                 
                onPress={() => props.navigation.navigate('Create',{ title: null, description: null, email })}
            />        
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'space-between'
    },
    noteIcon: {
        height: 100,
        width: 100
    },
    text: {
        alignSelf: 'center',
        fontWeight: 'bold',
        width: 80,
        textAlign: 'center'
    }
})
export default Main;
