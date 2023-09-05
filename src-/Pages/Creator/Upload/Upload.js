import React from 'react';
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseconfig = {
    apiKey: "AIzaSyDIWxpC1sAvIEilc1o0sis0oB8IZXvOtys",
    authDomain: "pronftgen.firebaseapp.com",
    projectId: "pronftgen",
    storageBucket: "pronftgen.appspot.com",
    messagingSenderId: "495146250070",
    appId: "1:495146250070:web:64fff42db6773ddedd70f7",
    measurementId: "G-S40RCX7LBT"

}
const app = initializeApp(firebaseconfig);
let defaultStorage = getStorage (app);

export {defaultStorage as storage};
