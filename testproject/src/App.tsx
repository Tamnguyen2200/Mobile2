
import React from 'react';
import {
 
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;


function App(): JSX.Element {
  const [text, onChangeText] = React.useState('0');
  // const [number, onChangeNumber] = React.useState('');

  return (
    <View style={styles.container}>

      <View >
        <Text style={[styles.text,{textAlign:'left'}]}>Weight(KG)</Text>
        <TextInput 
        style={styles.input}
        
        onChangeText={onChangeText}
        value={text}/>
      </View>

      <View>
        <Text style={[styles.text,{textAlign:'left'}]}>Height(CM)</Text>
        <TextInput 
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        // placeholder="useless placeholder"
        
        />
      </View>

      <View>
        <Text style={styles.text}>BMI: 0.00</Text>
      </View>
      

      
      
      <TouchableOpacity style={styles.btn}
       onPress={() => Alert.alert('Kết quả BMI là: ')}
       > 
        <Text style={{fontFamily: 'Times New Roman',fontSize:20}}>Compute</Text>
        </TouchableOpacity> 
     


    </View>

    
  );
}

const styles = StyleSheet.create({

  container:{
    justifyContent:"center",
    flex:1,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  text:{
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'Times',
    fontSize: 20,
  },

  btn:{
    borderWidth: 1,
    alignSelf: 'center',
    padding: 10,
    paddingHorizontal:10,
    backgroundColor: '#2cb9f5',
    width: 150,
    height: 50


  }

  

});

export default App;