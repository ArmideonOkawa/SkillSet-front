import { registerDeck } from "./navigator.js"
import { registerControls } from ",/controls.js"
import { registerKeyHandler } from "./keyhandler.js"


const app = async () => {
    registerDeck();
    registerCOntrols();
    registerKeyHandler();
};

document.addEventListener("DOMContentLoaded", app);