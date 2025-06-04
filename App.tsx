/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React  from 'react';
import {useState} from 'react'
import CheckBox from '@react-native-community/checkbox';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  
  useColorScheme,
  View,
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
  
  const generatePasswordString = (passwordLength:number) => 
    {
        //
    }

  const createPassword = (characters:string , passwordLength:number) => 
    {

    }
  
  const resetPasswordState = () =>
    {

    }

  const [isSelected,setSelection] = useState(false)

  return (
    <View>  
      <Text style={styles.headingText}>
        Password Generator
      </Text>
      <View style={styles.Container}>
        <View style={[styles.allInputs,styles.inputContainer]}>
          <View>
            <Text style={[styles.textStyle,styles.passLength]}>Password Length</Text>
            <Text style={styles.error}>Error Message</Text>
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
            <Text style={[styles.textStyle,styles.passLength]}>Include Uppercase Letters</Text>
            
          </View>
          <View style={styles.checkBoxContainer}>
              <CheckBox 
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
              />
          </View>
        </View>
        <View style={[styles.allInputs,styles.lowerCase]}>
          <View>
            <Text style={[styles.textStyle,styles.passLength]}>Include Lowercase Letters</Text>
            
          </View>
          <View style={styles.checkBoxContainer}>
              <CheckBox 
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
              />
          </View>
        </View>

        
      </View>

    </View>
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
        // borderWidth:1,
  },
  passLength:{},
  input:{
    borderWidth:1,
    borderRadius:8,
    marginRight:35,
    padding:20,
    paddingRight:40
  },
  error:{
    paddingHorizontal:12,
  },
  allInputs:{
    // borderWidth:1,
    borderColor:'green',
    // flex:,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:10,
  },
  upperCase:{
    
  },
  checkBoxContainer:{
    marginRight:10,
  },
  checkbox:{},
  lowerCase:{},

});

export default App;
