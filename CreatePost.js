      import React, { Component } from 'react';
      import {
        Text,
        View,
        StyleSheet,
        SafeAreaView,
        Platform,
        StatusBar,
        Image,
        ScrollView,
        TextInput,
        Dimensions,
        Button
      } from 'react-native';
      import { RFValue } from 'react-native-responsive-fontsize';
      import AppLoading from 'expo-app-loading';
      import * as Font from 'expo-font';
      import DropDownPicker from 'react-native-dropdown-picker';
      let customFonts = {
        BubblegumSans: require('../assets/BubblegumSans-Regular.ttf'),
      };
      import firebase from "firebase"
      export default class CreateStory extends Component {
        constructor() {
          super();
          this.state = {
            fontLoaded: false,
            previewImage: 'image_1',
            dropDownHeight: 40,
            light_theme:true,
            profile_Image
          };
        }
        async fetchUser() {
          var theme, name, image;
          await firebase
            .database()
            .ref('/users/' + firebase.auth().currentUser.uid)
            .on('value', function (data) {
              theme = data.val().current_theme;
              name = `${data.val().first_name} ${data.val().last_name}`;
              image = data.val().profile_picture;
            });
          this.setState({
            light_Theme: theme === 'light' ? true : false,
            isEnabled: theme === 'light' ? false : true,
            name: name,
            profile_Image: image,
          });
        }
        async loadFontAsync() {
          await Font.loadAsync(customFonts);
          this.setState({
            fontLoaded: true,
          });
        }
        componentDidMount() {
          this.loadFontAsync();
          this.fetchUser()
        }
        async addStory(){
          if(this.state.caption){
            let postData={
              preview_image:this.state.previewImage,
              caption:this.state.caption,
              author:firebase.auth().currentUser.displayName,
              author_uid:firebase.auth().currentUser.uid,
              created_on: new Date(),
              likes:0
            }
            await firebase.database.ref("/posts/"+ Math.random().toString(36).slice(2))
            .set(postData)
            .then(function(data){})
            this.props.setUpdateToTrue()
            this.props.navigation.navigate("Feed")
          }else{
            alert("fill all the sections")
          }

        }
        render() {
          if (!this.state.fontLoaded) {
            return <AppLoading />;
          } else {
            let preview_image = {
              image_1: require('../assets/image_1.jpg'),
              image_2: require('../assets/image_2.jpg'),
              image_3: require('../assets/image_3.jpg'),
              image_4: require('../assets/image_4.jpg'),
              image_5: require('../assets/image_5.jpg'),
            };
            return (
              <View style={this.state.light_theme?styles.containerLight:styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                  <View style={styles.appIcon}>
                    <Image
                      source={require('../assets/logo.png')}
                      style={styles.iconImage}
                    />
                  </View>

                  <View style={this.state.light_theme?styles.appTitleTextLight:styles.appTitleTextContainer}>
                  <Text style={styles.appTitleText}>New Post</Text>
                  </View>
                </View>
                <View style={styles.fieldsContainer}>
                  <ScrollView>
                    <Image
                      style={styles.previewImage}
                      source={preview_image[this.state.previewImage]}
                    />
                    <View style={{ height: RFValue(this.state.dropDownHeight) }}>
                      <DropDownPicker
                        items={[
                          { label: 'image_1', value: 'image_1' },
                          { label: 'image_2', value: 'image_2' },
                          { label: 'image_3', value: 'image_3' },
                          { label: 'image_4', value: 'image_4' },
                          { label: 'image_5', value: 'image_5' },
                        ]}
                        defaultValue={this.state.previewImage}
                        containerStyle={{
                          height: 40,
                          borderRadius: 20,
                          marginBottom: 10,
                        }}
                        onOpen={() => {
                          this.setState({
                            dropDownHeight: 170,
                          });
                        }}
                        onClose={() => {
                          this.setState({
                            dropDownHeight: 40,
                          });
                        }}
                        style={{ backgroundColor: 'transparent' }}
                        itemStyle={{ justifyContent: 'flex-start' }}
                        dropDownStyle={{ backgroundColor: '#2f345d' }}
                        labelStyle={this.state.light_theme?styles.dropdownLabelLight:styles.dropdownLabel}
                        arrowStyle={this.state.light_theme?styles.dropdownLabelLight:styles.dropdownLabel}
                        onChangeItem={(a) => {
                          this.setState({
                            previewImage: a.value,
                          });
                        }}
                      />
                      </View>
                    
                      <TextInput
                        placeholder="Caption"
                        style={[
                          styles.inputFont,
                          styles.inputFontExtra,
                          styles.inputTextBig,
                        ]}
                        onChangeText={(caption) => {
                          this.setState({
                            caption
                          });
                        }}
                        multiline={true}
                        numberOfLines={20}
                        placeholderTextColor="white"
                      />
                    <Button title="Submit"
                    onPress={()=>{
                      this.addStory()
                    }}
                    />
                  
                  </ScrollView>
                </View>
              </View>
            );
          }
        }
      }
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#15193c"
        },
        containerLight: {
          flex: 1,
          backgroundColor: "white"
        },
        droidSafeArea: {
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
        },
        appTitle: {
          flex: 0.07,
          flexDirection: "row"
        },
        appIcon: {
          flex: 0.3,
          justifyContent: "center",
          alignItems: "center"
        },
        iconImage: {
          width: "100%",
          height: "100%",
          resizeMode: "contain"
        },
        appTitleTextContainer: {
          flex: 0.7,
          justifyContent: "center"
        },
        appTitleText: {
          color: "white",
          fontSize: RFValue(28),
          fontFamily: "Bubblegum-Sans"
        },
        appTitleTextLight: {
          color: "black",
          fontSize: RFValue(28),
          fontFamily: "Bubblegum-Sans"
        },
        fieldsContainer: {
          flex: 0.85
        },
        previewImage: {
          width: "93%",
          height: RFValue(250),
          alignSelf: "center",
          borderRadius: RFValue(10),
          marginVertical: RFValue(10),
          resizeMode: "contain"
        },
        inputFont: {
          height: RFValue(40),
          borderColor: "white",
          borderWidth: RFValue(1),
          borderRadius: RFValue(10),
          paddingLeft: RFValue(10),
          color: "white",
          fontFamily: "Bubblegum-Sans"
        },
        inputFontLight: {
          height: RFValue(40),
          borderColor: "black",
          borderWidth: RFValue(1),
          borderRadius: RFValue(10),
          paddingLeft: RFValue(10),
          color: "black",
          fontFamily: "Bubblegum-Sans"
        },
        dropdownLabel: {
          color: "white",
          fontFamily: "Bubblegum-Sans"
        },
        dropdownLabelLight: {
          color: "black",
          fontFamily: "Bubblegum-Sans"
        },
        inputFontExtra: {
          marginTop: RFValue(15)
        },
        inputTextBig: {
          textAlignVertical:  "top",
          padding: RFValue(5)
        }
      });

