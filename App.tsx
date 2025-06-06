/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React  from 'react';
import {useState} from 'react'
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CheckBox from '@react-native-community/checkbox';
import { Provider as PaperProvider,DefaultTheme,MD3DarkTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ScrollView,
  StyleSheet,
  // Text,
  // TextInput,
  Button,
  useColorScheme,
  View,

  TouchableOpacity,
} from 'react-native';
import { Text,TextInput} from 'react-native-paper';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

// Form Validation
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4,"Min of 4 characters")
  .max(16,"Max of 16 characters")
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
        characterList += upperCaseChars;
      }
      if(lowerCase){
        characterList += lowerCaseChars;
      }
      if(number){
        characterList += digitChars;
      }
      if(symbol){
        characterList += specialChars;
      }

      const passwordResult = createPassword(characterList,passwordLength);
      
      setPassword(passwordResult);
      setIsPassGenerated(true);
    }

  const createPassword = (characters:string , passwordLength:number) => 
    {
        let result = '';
        for (let i = 0; i < passwordLength; i++) {
          const characterIndex = Math.floor(Math.random() * characters.length)
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
    
    
    const theme = useColorScheme() === 'dark' ? MD3DarkTheme : DefaultTheme 
    
    return (

    <PaperProvider theme={theme}>
      <SafeAreaView>  
        <ScrollView keyboardShouldPersistTaps='never'>
          <View>
              <Text style={styles.headingText}>
              Password Generator
            </Text>
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
                <View style={styles.inputWrapper }>
                  <View style={styles.inputColumn}>
                  <Text style={styles.textStyle}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.error}> 
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                    <TextInput
                    placeholder='Ex=8'
                    style={styles.input}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    keyboardType='numeric'
                    />
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.textStyle}>Include Lowercase</Text>
                  <BouncyCheckbox 
                  style={styles.checkBoxContainer}
                  isChecked={lowerCase}
                  onPress={()=> setLowerCase(!lowerCase)}
                  fillColor='#fbc531'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.textStyle}>Include Uppercase</Text>
                  <BouncyCheckbox 
                  style={styles.checkBoxContainer}
                  isChecked={upperCase}
                  onPress={()=> setUpperCase(!upperCase)}
                  fillColor='#4a69bd'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.textStyle}>Include Numbers</Text>
                  <BouncyCheckbox 
                  style={styles.checkBoxContainer}
                  isChecked={number}
                  onPress={()=> setNumber(!number)}
                  fillColor='#4cd137'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.textStyle}>Include Symbols</Text>
                  <BouncyCheckbox 
                  style={styles.checkBoxContainer}
                  isChecked={symbol}
                  onPress={()=> setSymbol(!symbol)}
                  fillColor='#9c88ff'
                  />
                </View>
                
                <View style={styles.btnContainer}>
                  <TouchableOpacity style={styles.btn} disabled={!isValid} onPress={()=>handleSubmit()}>
                    <Text>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn} onPress={() => 
                    {handleReset();
                    resetPasswordState();
                    }}>
                    <Text>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          </View>
          {isPassGenrated? (
            <View style={[styles.card,styles.cardElevated]}>
              <Text style={styles.title}> Result: </Text>
              {/* <Text style={styles.description}> Long Press for Copy </Text> */}
              <Text selectable={true} style={styles.Generatedtext}> {password} </Text>
            </View>): null
          // ) : (
          //   <View><Text>nooo</Text></View>
          // )
          }
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  headingText:{
    fontSize: 32,
    fontWeight:'bold',
    // fontFamily: 'Poppins',
    // color:'#ffffff',
    marginTop:35,
    marginBottom:20,
    paddingHorizontal:12
  },
  inputWrapper:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  formActions:{},
  inputColumn:{
    // flexDirection:'row'
  },
  input:{
    fontSize:16,
    width:120,
    borderWidth:1,
    borderRadius:8,
    // marginRight:25,
    marginRight:30,
    padding:10,

  },
  Container:{
    // flex:1,
    // flexDirection:'row'
    marginTop:15,
        // borderWidth:1,
        borderColor:'red'

  },
  inputContainer:{
    // borderWidth:1,
    borderColor:'green',
    // flex:,
    flexDirection:'row',
    justifyContent:'space-between'

  },
  textStyle:{
    fontSize: 20,
    paddingHorizontal:12,
    paddingTop:20,
        // borderWidth:1,
  },
  passLength:{},
  error:{
    paddingHorizontal:12,
    color:'red',
  },
  allInputs:{
    // borderWidth:1,
    borderColor:'green',
    // flex:,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:15,
  },
  upperCase:{
    
  },
  checkBoxContainer:{
    marginRight:20,
    paddingTop:20,
    
  },
  checkbox:{
    borderRadius:60,
  },
  lowerCase:{},
  number:{},
  symbols:{},

  btnContainer:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop: 50
  },
  btn:{
    justifyContent:'center',
    alignItems:'center',
    width:100,
    backgroundColor:'#82ccdd',
    padding:12,
    borderRadius:4,

  },
  card:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    margin:23,
    paddingTop:50,
    paddingBottom:50,
    paddingLeft:20,
    
  },
  cardElevated:{
    elevation:4,
    shadowOpacity:10,
    shadowColor:'red'
  },
  Generatedtext:{
    fontSize:18
  },
  description:{},
  title:{},

  isdarkMode:{}
});

export default App;
