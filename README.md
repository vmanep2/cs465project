# ConnectUs

## Running the app

### Installing dependencies
```
$ cd <path to workspace>/connect-us
$ npm install
```

### [OPTION 1] Running the app on Expo Go on your phone
To run ConnectUs on the Expo Go app on your phone, execute the following from the terminal
```
$ npx expo start
```

### [OPTION 2] Running the app on Android Studio
To run the app on Android Studio:
1) Launch Android Studio
2) Open Virtual Device Manager -> Select your device emulator -> Launch
3) From the terminal, execute the following
```
$ npx expo start --android
```

### Generating APK

1) Install EAS CLI & set it up
```
$ cd <PATH>/connect-us
$ npm install --save eas-cli
$ npx eas login
```

2) Create eas.json file
```
$ touch eas.json
```

Copy the following into the file
```
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "preview2": {
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "preview3": {
      "developmentClient": true
    },
    "preview4": {
      "distribution": "internal"
    }
  }
}

``` 

3) Build APK

```
$ npx eas build:configure
$ npx eas build -p android --profile preview
```

You can download the APK file from the build URL!