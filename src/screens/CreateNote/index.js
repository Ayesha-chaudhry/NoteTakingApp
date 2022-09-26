import React, { useEffect, useState } from "react";
import {TextInput, View, Button, StyleSheet} from "react-native";
import {BACKGROUND_COLOR, COLOR_WHITE, COLOR_BLACK} from "../../../res/drawables";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import App from '../../../api/firebase';
import { getAuth } from "firebase/auth";


const CreateNote = (props) => {
    // let {noteTitle} = props.route.params
    // alert(noteTitle)
    const db = getFirestore(App);
    const auth = getAuth()
    const { email, title: noteTitle, description: noteDescription } = props.route.params 
    //console.log(email)

    const [title, setTitle] = useState(noteTitle)
    const [descripion, setDescription] = useState(noteDescription)

    useEffect(() => {
    }, [])
    // const loadData = async () => {
    //     if(noteTitle) {
    //         let descripion = await AsyncStorage.getItem(noteTitle)
    //         setTitle(noteTitle)
    //         setDescription(descripion)
    //     }
    // }

    const OnAddPressed = async() => {
        if(title != '' & descripion != ''){
            try{
                // add doc, it creates a random document id
                const docRef = await setDoc(doc(db, email,title), {
                    title: title,
                    description: descripion,
                  });
                  props.navigation.goBack()

                  
                // await setDoc(doc(db, "Notes", title), {
                //     title,
                //     descripion
                // });
                //   console.log("Document written with ID: ", docRef.id);

                  
                // let value = await AsyncStorage.getItem(title)
                // if(value && !noteTitle){
                //     alert('Title is already exist')
                // }else{
                //     await AsyncStorage.setItem(title, descripion)
                     alert('Note Saved')
                //     props.navigation.goBack()
                // }
            }catch(e){
                console.log(e)
            }

        }else{
            alert('Kindly add title & description')
        }
    }
  
    const OndeletePressed = async () => {
        await deleteDoc(doc(db, email, title));
        // try {
        //     let value = await AsyncStorage.removeItem(noteTitle)
        //     setTitle(value)
        //     setDescription(value)
             alert('Deleted')
        //     props.navigation.nevigate('Main')
        // } catch (e) {
        //     console.log(e)
        // }
    }

 
   
    
    return(
        <View style={styles.container}>
            <View style={{ ...styles.card, height: '8%'}}>
                <TextInput
                    style={{margin: 4}}
                    placeholder={'Enter Title here'}
                    multiline={true}
                    value={title}
                    editable={noteTitle ? false : true}
                    onChangeText={(t) => setTitle(t)}
                /> 
            </View>

            <View style={{ ...styles.card, height: '70%'}}>
                <TextInput
                    style={{margin: 5}}
                    placeholder={'Enter Description here'}
                    multiline={true}
                    value={descripion}
                   onChangeText={(t) => setDescription(t)}
                /> 


            </View>
            <View style={{margin: 5}}>
            <Button 
                title={noteTitle?"Update Note":"Add Note"}
                onPress={() => OnAddPressed()}
                
            />
            </View>
            <Button 
                title={noteTitle?"Delete Note":"Update Note"}
                onPress={() => OndeletePressed()}
            />

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },card: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 20,
        margin: 10,
        shadowColor:COLOR_BLACK,
        borderColor:COLOR_BLACK,
        borderWidth:0.5

    }
})
export default CreateNote;