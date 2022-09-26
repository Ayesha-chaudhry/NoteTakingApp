import React, { useEffect, useState } from "react";
import {TextInput, View, Button, Image, StyleSheet} from "react-native";
import {BACKGROUND_COLOR, COLOR_WHITE, COLOR_BLACK} from "../../../res/drawables";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

const Login = (props) => {
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
    }, [])

    const OnLoginPressed = async() => {
        const auth = getAuth();
        if(email.includes('@') && password){
        try{
            let res = await signInWithEmailAndPassword(auth, email, password)
            alert('Successfully Signed In')
            props.navigation.navigate('Main', {email: email})
           
        } catch(e){
            alert(e.message)
        }
        
        }else{
            alert("Kindly enter your email & password")
        }

    }

    const OnForgetPasswordPressed = async () => {
        const auth = getAuth()
        if(email.includes('@')){
            try{
                await sendPasswordResetEmail(auth,email)
                alert('Check your email to restore password')
            }catch(e){}

        }else{
            alert('Kindly enter email to recover your password')
        }
        
    }

    const OnSignupPressed = () => {
        props.navigation.navigate('Signup')
        
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
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                /> 


            </View>
            <View style={{margin: 5}}>
            <Button 
                title={"Login"}
                onPress={() => OnLoginPressed()}                
            />
            </View>

            <View style={{margin: 5}}>
            <Button 
                title={"ForgetPassword"}
                onPress={() => OnForgetPasswordPressed()}
            />
            </View>

            <View style={{margin: 5}}>
             <Button 
                title={"Does not have an account"}
                onPress={() => OnSignupPressed()}
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
export default Login;