var script = 
`
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

var creatDialogueEngine = function (script,displayMessage,displayQuestion)
{
    var self = {};
    var storyItems;

    // transcrire le script en list
    var scriptAsList = scriptList(script);

    function scriptList(script)
    {
        return script.split('\n');
    }

    // console.log(script);

    storyItems = toObject(scriptAsList);

    // list to object
    function toObject(scriptAsList)
    {
        var listOfObject = [];
        for (let i = 0; i< script.length; i++) // faut changer script avec le bon truc
        {
            if (scriptAsList[i][0] == "=")
            {
                var formatedTexte = scriptAsList[i].replace("===","").scriptAsList[i].replace("===","");
                listOfObject.push({s: formatedTexte});
            }
            else if (scriptAsList[i][0] == "+")
            {
                var splitedQuestion = scriptAsList[i].split('->');
                var formatedQuestion = splitedQuestion[0].substring(1).trim();
                listOfObject.push({q:formatedQuestion, go:splitedQuestion[1]});
            }
            else
            {
                var splitedMessage = scriptAsList[1].split('->');
                listOfObject.push({m:splitedMessage[0].trim(), go :splitedMessage[1]})
            }
        }
        return listOfObject;
        
    }

    function readStory(storyItems)
    {
        for (let i = 0; i < storyItems.length; i++) 
        {
            if (storyItems[i].m)
            {
                if (displayMessage)
                {
                    displayMessage(storyItems[i]);
                }
            }
            else if (storyItems[i].q)
            {
                displayQuestion(storyItems[i]);
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

    self.start = start;
    return self;
}

function displayMessage(data)
{
    console.log(data);
    var domElement = document.createElement("div");
    domElement.innerHTML = data.m;
    document.body.appendChild(domElement);
}

function displayQuestion(data)
{
    console.log(data);
    var domElement = document.createElement("button");
    domElement.innerHTML = data.q;
    domElement.style.backgroundColor = 'red';
    domElement.style.display = 'block';
    domElement.style.margin = '2px';
    domElement.style.borderRadius = '5px';
    document.body.appendChild(domElement);
}

var dialogue = creatDialogueEngine(script, displayMessage,displayQuestion);
dialogue.start();