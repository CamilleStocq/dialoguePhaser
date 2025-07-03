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

var createDialogueEngine = function (script, displayMessage,displayQuestion) 
{
    var self = {};
    var storyItems=undefined;

    /////////////// Preparation ////////////////
    // transcrire le script en une liste

    var scriptAsList = scriptToList(script);
    function scriptToList(script) 
    {
        return script.split('\n');
    }

    // transposer la liste de textes en objets
    storyItems = toObject(scriptAsList);

    function toObject(scriptAsList) 
    {
        var listOfObjects = [];

        for (let i = 0; i < scriptAsList.length; i++) 
            {
            if (scriptAsList[i][0] == "=") { //if is a scene
                var formatedText = scriptAsList[i].replace("===","").replace("===","");
                listOfObjects.push({s:formatedText});
            }           
            else if (scriptAsList[i][0] == "+")
            {//if question
                var splitedQuestion  = scriptAsList[i].split('->');
                var formatedQuestion = splitedQuestion[0].substring(1).trim();
                listOfObjects.push({q:formatedQuestion, go:splitedQuestion[1]});
            }
            else
            { //un message
                var splitedMessage = scriptAsList[i].split('->');
                listOfObjects.push({m:splitedMessage[0].trim(), go:splitedMessage[1]});    
            }
        }
        return listOfObjects;
    }

    /////////////// Traitement ////////////

    function readStory(storyItems, index) //index = titre chapitre
    {
        if (!index)
        {
            index = 0;
        }
        var i = index;

        // for (let i = index; i < storyItems.length; i++)
        {
            if (storyItems[i].m || storyItems[i].m == "") 
            {
                if (displayMessage) 
                {
                    displayMessage(storyItems[i]);
                }
                if (storyItems[i].go)
                {
                    goTo(storyItems[i].go);
                    return'newChapitre';
                }  
                setTimeout(() =>
                {
                    readStory(storyItems, i+1);
                }, 1000);

            }
            else if (storyItems[i].q) 
            {
                if (displayQuestion) 
                {
                    displayQuestion(storyItems[i], self);
                }

                setTimeout(() =>
                {
                    readStory(storyItems, i+1);
                }, 1000);
                
            }
            else if (storyItems[i].s) 
            {
                return 'waiting for choice';
            }   
        }
    }

    function start() 
    {
        readStory(storyItems);
    }

    function findIndex(chapitre)
    {
        for (let i = 0; i < storyItems.length; i++) 
        {
            if(storyItems[i].s == chapitre)
            {
                return i;
            }           
        }
    }
    function goTo(anchor) //anchor est le nom du chapitre
    {
        //fait passer au chapitre/question suivante, relance lecture du chap suivant
        var index = findIndex(anchor);
        readStory(storyItems, index + 1);
    }
    
    function addText (message)
    {
        //afficher un message
        displayMessage ({m:message});
    }

    self.addText = addText;
    self.start = start;
    self.goTo = goTo;
    return self;
}

function displayMessage(data) 
{
    console.log(data);
    var domElement = document.createElement("div");
    domElement.innerHTML = data.m;
    document.body.appendChild(domElement);
}

function displayGivenReponse(data)
{
    var domElement = document.createElement("div");
    domElement.style.backgroundColor = 'pinkk';
    domElement.innerHTML = data.m;
    console.log(displayGivenReponse);
}

var currentButtons = [];

function displayQuestion(data, currentDialogue) 
{
    console.log(data);
    var domElement = document.createElement("button");
    currentButtons.push(domElement);
    domElement.innerHTML = data.q;
    domElement.style.backgroundColor = 'pink';
    domElement.style.display = 'block';
    domElement.style.margin = '2px';
    domElement.style.borderRadius = '10px';
    document.body.appendChild(domElement);
    
    
    function triggerButton (event)
    {
        console.log(data);
        
        for (let i = 0; i < currentButtons.length; i++) 
            {
                currentButtons[i].style.display = "none";
            }
            // alert("boutton pressed");
            console.log(currentDialogue.goTo);
            currentDialogue.addText("Vous répondu : " + data.q);
            displayGivenReponse(data);
            currentDialogue.goTo(data.go);
        }
        domElement.addEventListener("click", triggerButton);
}

var dialogue = createDialogueEngine(script,displayMessage, displayQuestion );
dialogue.start();