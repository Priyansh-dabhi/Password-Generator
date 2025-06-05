/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React  from 'react';
import {useState} from 'react'
import { Formik } from 'formik';
import CheckBox from '@react-native-community/checkbox';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

// Form Validation
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4,"Min of 4 characters")
  .min(16,"Max of 16 characters")
  .required("Length is required")
})


function App(): React.JSX.Element {
  
  const [password,setPassword] = useState('');
  const [isPassGenrated,setIsPassGenerated] = useState(false);
  const [upperCase,setUpperCase] = useState(false);
  const [lowerCase,setLowerCase] = useState(false);
  const [number,setNumber] = useState(false);
  const [symbol,setSymbol] = useState(false);

  const [errorMSG,setErrorMSG] = useState('')
  
  const generatePasswordString = (passwordLength:number) => 
    {
      let characterList = '';
      const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const digitChars = '0123456789';
      const specialChars = '!@#$%^&*()_+';

      if(upperCase){
        characterList += upperCase;
      }
      if(lowerCase){
        characterList += lowerCase;
      }
      if(number){
        characterList += number;
      }
      if(symbol){
        characterList += symbol;
      }

      const passwordResult = createPassword(characterList,passwordLength);
      
      setPassword(passwordResult);
      setIsPassGenerated(true);
    }

  const createPassword = (characters:string , passwordLength:number) => 
    {
        let result = '';
        for (let i = 0; i < passwordLength; i++) {
          const characterIndex = Math.round(Math.random() * characters.length)
          result += characters.charAt(characterIndex);
        }
        return result;
    }

  const resetPasswordState = () =>
    {
      setPassword('');
      setIsPassGenerated(false);
      setUpperCase(false);
      setLowerCase(false);
      setNumber(false);
      setSymbol(false);
    }



  return (
    
  <ScrollView keyboardShouldPersistTaps='never'>
    <SafeAreaView>  
        <Text style={styles.headingText}>
        Password Generator
      </Text>
      {/* <View style={styles.Container}>
        <View style={[styles.allInputs,styles.inputContainer]}>
          <View>
            <Text style={[styles.textStyle,styles.passLength]}>Password Length</Text>
            <Text style={styles.error}>{setErrorMSG()}</Text>
          </View>
          <View>
              <TextInput 
              placeholder='Ex=8'
              style={styles.input}
              />
          </View>
        </View>
        <View style={[styles.allInputs,styles.upperCase]}>
          <View>
            <Text style={[styles.textStyle]}>Include Uppercase Letters</Text>
            
          </View>
          <View style={styles.checkBoxContainer}>
              <CheckBox 
              value={upperCase}
              onValueChange={setUpperCase}
              style={styles.checkbox}
              />
          </View>
        </View>
        <View style={[styles.allInputs,styles.lowerCase]}>
          <View>
            <Text style={[styles.textStyle]}>Include Lowercase Letters</Text>
            
          </View>
          <View style={styles.checkBoxContainer}>
              <CheckBox 
              value={lowerCase}
              onValueChange={setLowerCase}
              style={styles.checkbox}
              />
          </View>
        </View>
        <View style={[styles.allInputs,styles.number]}>
          <View>
            <Text style={[styles.textStyle]}>Include Numbers</Text>
            
          </View>
          <View style={styles.checkBoxContainer}>
              <CheckBox 
              value={number}
              onValueChange={setNumber}
              style={styles.checkbox}
              />
          </View>
        </View>
        <View style={[styles.allInputs,styles.symbols]}>
          <View>
            <Text style={[styles.textStyle]}>Include Symbols</Text>
            
          </View>
          <View style={styles.checkBoxContainer}>
              <CheckBox 
              value={symbol}
              onValueChange={setSymbol}
              style={styles.checkbox}
              />
          </View>
        </View>

        <View style={styles.btnContainer}>
          <Button title='Generate' />
          <Button title='Reset'/>
        </View>
      </View> */}
      <Formik
        initialValues={{ passwordLength:'' }}
        validationSchema={passwordSchema} 
        onSubmit={values=> {
          console.log(values);
          generatePasswordString(+values.passwordLength) //+ from type Script(convert it to number) 
        }}
      > 
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleSubmit,
          handleReset,
          isSubmitting,
          /* and other goodies */
        }) => (
          <>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <TextInput
                placeholder='Ex=8'
                style={styles.input}
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                keyboardType='numeric'
                />
              </View>
            </View>
            <View style={styles.inputWrapper}></View>
            <View style={styles.inputWrapper}></View>
            <View style={styles.inputWrapper}></View>
            <View style={styles.inputWrapper}></View>
            
            <View style={styles.formActions}>
              <TouchableOpacity>
                <Text>Generate</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Reset</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  headingText:{
    fontSize: 32,
    fontWeight:'bold',
    // fontFamily: 'Poppins',
    // color:'#ffffff',
    marginTop:35,
    paddingHorizontal:12
  },
  inputWrapper:{

  },
  formActions:{},
  inputColumn:{},
  input:{
    fontSize:16,
    width:120,
    borderWidth:1,
    borderRadius:8,
    marginRight:35,
    padding:20,
    paddingRight:40
  },
  // Container:{
  //   // flex:1,
  //   // flexDirection:'row'
  //   marginTop:15,
  //       // borderWidth:1,
  //       borderColor:'red'

  // },
  // inputContainer:{
  //   // borderWidth:1,
  //   borderColor:'green',
  //   // flex:,
  //   flexDirection:'row',
  //   justifyContent:'space-between'

  // },
  // textStyle:{
  //   fontSize: 20,
  //   paddingHorizontal:12,
  //       // borderWidth:1,
  // },
  // passLength:{},
  // error:{
  //   paddingHorizontal:12,
  //   color:'red'
  // },
  // allInputs:{
  //   // borderWidth:1,
  //   borderColor:'green',
  //   // flex:,
  //   flexDirection:'row',
  //   justifyContent:'space-between',
  //   marginTop:15,
  // },
  // upperCase:{
    
  // },
  // checkBoxContainer:{
  //   marginRight:20,
    
  // },
  // checkbox:{
  //   borderRadius:60,
  // },
  // lowerCase:{},
  // number:{},
  // symbols:{},

  // btnContainer:{
  //   flexDirection:'row',
  //   justifyContent:'space-evenly',
  //   marginTop: 50
  // }

});

export default App;
