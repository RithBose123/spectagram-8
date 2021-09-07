    import React, { Component } from 'react';
    import {
      Text,
      View,
      StyleSheet,
      SafeAreaView,
      StatusBar,
      Platform,
      Image,
      Switch,
    } from 'react-native';

    import { RFValue } from 'react-native-responsive-fontsize';

    import firebase from 'firebase';

    import AppLoading from 'expo-app-loading';
    import * as Font from 'expo-font';

    let customFonts = {
      'Bubblegum-Sans': require('../assets/BubblegumSans-Regular.ttf'),
    };

    export default class Profile extends Component{
        constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false,
          isEnabled: false,
          light_Theme: true,
          profile_Image: '',
          name: '',
        };
      }
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }

      componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
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
      toggleSwitch(){
        const previousState=this.state.isEnabled
        const theme= !this.state.isEnabled ?"dark":"light"
        var updates={}
        updates[
          "/users/"+ firebase.auth().currentUser.uid +"/current_theme"
        
        ]= theme
        firebase.database().ref().update(updates)
        this.setState({
          isEnabled:!previousState,
          light_Theme:previousState
        })
          }
      render(){
        if (!this.state.fontsLoaded) {
          return <AppLoading />;
        } else {
          return (
          <View style={this.state.light_Theme?styles.containerLight:styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />
            <View style={styles.appTitle}>
                <View style={styles.appIcon}>
                  <Image
                    source={require('../assets/logo.png')}
                    style={styles.iconImage}
                  />
                </View>

                <View style={styles.appTitleTextContainer}>
                  <Text style={this.state.light_Theme?styles.appTitleTextLight:styles.appTitleText}>Spectagram</Text>
                </View>
              </View>
              <View style={styles.screenContainer}>
            <View style={styles.screenContainer}>
              <Image source={{uri:this.state.profile_Image}} />
              <Text style={this.state.light_Theme?styles.nameTextLight:styles.nameText}>{this.state.name}</Text>
            </View>
    <View style={styles.themeContainer}>
    <Text style={styles.themeText}>Dark theme</Text>
    <Switch
                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                    trackColor={{ false: '"gray', true: this.state.light_Theme?'#eee':"white" }}
                    thumbColor={this.state.isEnabled ? '#eea8249' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                      this.toggleSwitch();
                    }}
                    value={this.state.isEnabled}
                    />
    </View>
              </View>
          </View>
            )
        }
      }
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "black"
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
      screenContainer: {
        flex: 0.85
      },
      profileImageContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
      },
      profileImage: {
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70)
      },

      nameText: {
        color: "white",
        fontSize: RFValue(40),
        fontFamily: "Bubblegum-Sans",
        marginTop: RFValue(10)
      },
      nameTextLight: {
        color: "black",
        fontSize: RFValue(40),
        fontFamily: "Bubblegum-Sans",
        marginTop: RFValue(10)
      },
      themeContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: RFValue(20)
      },
      themeText: {
        color: "white",
        fontSize: RFValue(30),
        fontFamily: "Bubblegum-Sans",
        marginRight: RFValue(15)
      },
      themeTextLight: {
        color: "black",
        fontSize: RFValue(30),
        fontFamily: "Bubblegum-Sans",
        marginRight: RFValue(15)
      }
    });