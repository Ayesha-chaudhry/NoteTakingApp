import React, { useEffect, useState } from "react";
import {TextInput, View, Button, Image, StyleSheet} from "react-native";
//import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {BACKGROUND_COLOR, COLOR_WHITE, COLOR_BLACK} from "../../../res/drawables";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc, getFirestore} from 'firebase/firestore';
import App from "../../../api/firebase";

const Signup = (props) => {
    const db = getFirestore(App);
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
    }, [])


    const OnSignupPressed = async () => {
        const auth = getAuth();
        if(email.includes('@') && password) {
        try {
            await addDoc(collection(db, email),{
                
            })
            let res = await createUserWithEmailAndPassword(auth,email,password)
            alert('User Created Successfully')
            props.navigation.goBack()
        }catch (e) {
            alert(e.message)

        }
    } else {
        alert('Kindly enter email & password')
        }
    }

    const OnAlreadyAccountPressed = () => {
        props.navigation.goBack()        
    }

    
    return(
        <View style={styles.container}>

        <Image style={styles.logo}
            source={require('../../../assets/logo.png')}
        />  

            <View style={{ ...styles.card, height: '8%'}}>
                <TextInput
                    style={{margin: 5}}
                    placeholder={'Enter Email here'}
                    multiline={true}
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                /> 
            </View>

            <View style={{ ...styles.card, height: '8%'}}>
                <TextInput
                    style={{margin: 5}}
                    placeholder={'Enter Password here'}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(t) => setPassword(t)}
                /> 
                    


            </View>
            <View style={{margin: 5}}>
            <Button 
                title={"Signup"}
                onPress={() => OnSignupPressed()}                
            />
            </View>

            <View style={{margin: 5}}>
            <Button 
                title={"Already Have an account?"}
                onPress={() => OnAlreadyAccountPressed()}
            />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'center'
    },card: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 20,
        margin: 10,
        shadowColor:COLOR_BLACK,
        borderColor:COLOR_BLACK,
        borderWidth:0.5

    },
    logo: {
        height: 150,
        width: 200,
        alignSelf: 'center'
    }
})
export default Signup;