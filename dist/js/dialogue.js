var script = `
"Hey!"
"It’s a watch."
+ A watch? ->watch
+ What is it for? ->forWhat
===watch===
"Yeah, it’s a watch. It tells the time."
"My father gave it to me. Went through hell and back with him"
+ What is it for? ->forWhat
+ can I have it? ->give
+ It's not vey usefull? ->angry
===forWhat===
"It tells time."
"When to eat, sleep, wake up, work." ->end
===give===
"Sure, take it"
"I cannot tell the time now" ->end
===angry===
"You are very rude"
"Go Away" ->end
===end===
END
`

// Création d'une factory fonction
// export permet de signaler que cette varaiables est a exporter
export var createDialogueEngine = function (script, displayMessage, displayQuestion ){
    // crée un objet vide, interface dialogue, moteur
    var self = {};
    // variable global qui va etre rempie par la liste de dialogue (objets)
    var storyItems;

    ///===== Préparation =====
    // transcrir le script en liste
    var scriptAsList = scriptToList(script);
    function scriptToList(script){
        return script.split("\n")
    }
    
    // Transcrir la liste en une liste d'objets
    storyItems = toObject(scriptAsList)
    function toObject(scriptAsList){
        var listOfObjects = [];
        for (let i = 0; i < scriptAsList.length; i++) {
            if(scriptAsList[i][0] == "="){ //si c'est une scene
                var formatedText = scriptAsList[i].replace("===", "").replace("===","")
                listOfObjects.push({s:formatedText})
            }
            else if (scriptAsList[i][0] == "+") { // si c'est une question
                var splitedQuestion = scriptAsList[i].split("->")
                var formatedQuestion = splitedQuestion[0].substring(1).trim();
                listOfObjects.push({q: formatedQuestion, go: splitedQuestion[1]})                
            }
            else{ // un message
                var splitedMessage = scriptAsList[i].split("->");
                listOfObjects.push({m: splitedMessage[0].trim(), go: splitedMessage[1]})
            }
        }
        return listOfObjects;
    }
    console.log(storyItems);
    
    
    /// ===== Traitement =====

    // Fonction de lecture du dialogue
    function readStory(storyItems, index=0){
        // si on ne donne pas de valeur pas defaut.
        // if (!index){
        //     index = 0
        // }

        var i = index;
        //for (let i = index; i < storyItems.length; i++) {
            if (storyItems[i].m || storyItems[i].m === ""){
                if (displayMessage) {
                    displayMessage(storyItems[i])
                    if(storyItems[i].go){
                        goTo(storyItems[i].go)
                        return 'New Chapter'
                    }
                }
                setTimeout(() => {
                    readStory(storyItems, i+1)
                }, 1000);
            }
            else if (storyItems[i].q) {
                if (displayQuestion){
                    displayQuestion(storyItems[i], self)
                }
                setTimeout(() => {
                    readStory(storyItems, i+1)
                }, 1000);
            }
            else if (storyItems[i].s){
                return 'Waiting for choice'
            }
        //}
    }

    
    //Fonction qui va démarrer la lecture du dialogue
    function start(){
        readStory(storyItems);
    }

    // transpose le nom d'un chapitre en index
    function findIndexFormChapterName(chapter) {
        for (let i = 0; i < storyItems.length; i++) {
            if (storyItems[i].s == chapter) {
                return i
            }
        }
        alert("CHAPTER NOT FOUND")
    }

    // Fonction qui va permetre d'aller a un chapitre particulier
    function goTo(anchor) {
        // Anchor est le nom du chapitre
        // Ajouter un moyen de relancer la lecture au chapitre definit par l'anchor
        var index =findIndexFormChapterName(anchor)
        readStory(storyItems, index + 1)
    }

    function addCustomMessage(message) {
        displayMessage({m: message})
    }

    // Ajouter sur l'objet self la fonction start
    self.start = start;
    self.goTo = goTo;
    self.addCustomMessage = addCustomMessage;
    return self
}



function displayAnswer(data) {
    var domElement = document.createElement("div");
    domElement.innerHTML = data.m;
    domElement.style.color = 'orange';
    document.body.appendChild(domElement);
}

// Fonciton d'affichage des messages
function displayMessage(data){
    console.log(data);
    var domElement = document.createElement("div");
    domElement.innerHTML = data.m;
    document.body.appendChild(domElement);
}

//liste de bouttons qui ont ete créé
var currentButtons = [];

// Fonciton d'affichage des questions
function displayQuestion(data, currentDialogue){
    console.log(data);
    var domElement = document.createElement("button");

    //Ajoute le bouton au moment ou on le crée
    currentButtons.push(domElement);

    domElement.innerHTML = data.q;
    domElement.style.backgroundColor = 'lightblue';
    domElement.style.display = 'block';
    domElement.style.margin = '2px';
    domElement.style.borderRadius = '5px';
    document.body.appendChild(domElement);
    // domElement.addEventListener("click", function (event){
    //     currentDialogue.goTo()
    // })
    domElement.addEventListener("click", triggerButton);
    function triggerButton(event){
        for (let i = 0; i < currentButtons.length; i++) {
            currentButtons[i].style.display = 'none'
        }
        // En passant par un focntion intermédiere dans le moteur
        //currentDialogue.addCustomMessage(data.q);
        displayAnswer({m: data.q})
        currentDialogue.goTo(data.go);
    }
    //dialogue.goTo(chapitre)
}

// Varibale qui va acceuillir le moteur de dialogue avec les parametre qui sont le script du dialogue et le focntions responsables de l'affichage des messages et questions
//var dialogue = createDialogueEngine(script, displayMessage, displayQuestion)
// Démarrage du dialogue
//dialogue.start()

 