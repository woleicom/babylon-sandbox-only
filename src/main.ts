// @ts-nocheck
// @ts-ignore
import {Sandbox}  from "./sandbox";
// import '@babylonjs/inspector/babylon.inspector.bundle.max.js'
import "@babylonjs/core/Legacy/legacy";
window.addEventListener('DOMContentLoaded', ()=>{

  let hostElement = document.getElementById("host-element");

  Sandbox.Show(hostElement);
  console.log(Sandbox.Show)
})