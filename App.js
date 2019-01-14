/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Alert} from 'react-native';
import SwipeOut from 'react-native-swipeout';
// import FlatListData from './FlatListData';
const FlatListData = [
  { key: 1, "name": 'Label 1', leftLabel: 'Left 1', rightLabel: 'Right 1' },
  { key: 2, name: 'Label 2', leftLabel: 'Left 2', rightLabel: 'Right 2' },
  { key: 3, name: 'Label 3', leftLabel: 'Left 3', rightLabel: 'Right 3' },
  { key: 4, name: 'Label 4', leftLabel: 'Left 4', rightLabel: 'Right 4' },
  { key: 5, label: 'Label 5', leftLabel: 'Left 5', rightLabel: 'Right 5' },
  { key: 6, label: 'Label 5', leftLabel: 'Left 5', rightLabel: 'Right 5' },
]
class FlatListItem extends Component{
  constructor(props){
      super(props);
      this.state={
        activeRowKey:null,
        
      };
  }
  render(){
    const swipeSettings ={
      autoClose:true,
      onClose:(secId,rowId,direction) =>{
        if(this.state.activeRowKey!=null){
          this.setState({activeRowKey:null});
        }
      },
      onOpen:(secId,rowId,direction) =>{
          this.setState({activeRowKey:this.props.item.key}); 
      },
      right:[{
        onPress: ()=>{
          const deletingRow=this.state.activeRowKey;
          Alert.alert('alert','Are you sure you deleted ?',[
            {text:'No',onPress:()=>console.log('cancel'),style:'cancel'},
            {text:'Yes',onPress:()=>{ FlatListData.splice(this.props.index,1)
            this.props.parentFlatList.refreshFlatList(deletingRow)}
          },
            { cancelable:true}
          ])
        },
        text:'Delete',type:'delete'

      }

      ],
      rowId:this.props.index,
      sectionId:1,
    }
    return(
      <SwipeOut {...swipeSettings}>
        <View style={{flex:1,height:"100%",backgroundColor:"green",opacity:0.6,justifyContent:'center',}}>
            <Text style={{height:100,justifyContent:'center'}}>data</Text>
          </View>
      </SwipeOut>
    )
  }
}




export default class App extends Component {
  constructor(props){
    super(props);

    this.state=({
      deletingRowKey:null,
    });
  }
  refreshFlatList=(deletedKey)=>{
    this.setState((prevState) =>{
      return{
        deletingRowKey:deletedKey
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
          <FlatList
          data={FlatListData}
      
          renderItem={ (item,index) =>{
            return(
              <FlatListItem item={item} index={index} parentFlatList={this}>

              </FlatListItem>
            )
          }
        }
          keyExactor={(item,index)=>item.key}

         

          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
