/*
// exo1
var txt = "hey";

function toObject(text)
{
   var obj = {m: text};

   return obj;
}
var result = toObject(txt);

//----------------------------------------------
//exo2
var txt2 = "+ How are you ? -> watch"

function toQuestion(text)
{
    var splitedText = text.split("->");
    var question = splitedText[0].substring(2);
    var obj2 ={q: question, go: splitedText};

    return obj2;
}
var result2 = toQuestion(txt2);

// ----------------------------------------------
//exo3

var txt3 = "===watch===";

function toScene (text)
{
    var scene = txt.replace("===","").replace("===","");
    console.log(scene);

    return {s : scene};
}
var result3 = toScene(txt3);

// ---------------------------------------------
console.log(result);
console.log(result2);
console.log(result3);
*/
//-----------------------------------------------
//exo 3.1
// var script = `
// "Hey!"
// "It’s a watch."
// + A watch? ->watch
// + What is it for? ->forWhat
// ===watch===
// "Yeah, it’s a watch. It tells the time."
// "My father gave it to me. Went through hell and back with him"
// + What is it for? ->forWhat
// + can I have it? ->give
// + It's not vey usefull? ->angry
// ===forWhat===
// "It tells time."
// "When to eat, sleep, wake up, work." ->end
// ===give===
// "Sure, take it"
// "I cannot tell the time now" ->end
// ===angry===
// "You are very rude"
// "Go Away" ->end
// ===end===
// END
// `
// function textToList (text){
//     console.log(text);
//     var listOfItem = text.split("\n");
//     console.log(listOfItem);
// }

//-----------------------------------------------
/*
//exo 3.2

var listMots = 
[
    `
    "Hello"
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
]

function toObject(monTexte)
{
    var items = [];

    for (let i = 0; i <monTexte.length; i++)
        {
            // items.slice(listMots[0]);
            
            var listOfItem = monTexte[0].substring(2);

            if (monTexte[0] == "+")
            {
                var monTexte = text.split("->");
                console.log(monTexte);
                var txt ={q: listOfItem, go: monTexte};
            }
            else if (monTexte[0] == "===")
            {
                var scene = text.replace("===","").replace("===","");
                console.log(scene);
                return {s : scene}
            }
            else
            {
                var obj = {};
            }           
        }

    var items = monTexte.push;
    var items = txt.push;
    var items = obj.push;

        return items;
    }
    
    var result = toObject(listMots);
    console.log(result)
*/
//----------------------------------------------------
// exo 4

var desMots= 
[
    `
    "Hello"
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
]

function startHere (desMots)
{
     for (let i = 0; i <desMots.length; i++)
        {
           var lettreMots = unTexte[0].substring(2); 

            if (lettreMots.include("==="))
            {
                var chapitre = 

                console.log(scene);
            }
        }
    return {s : scene}
}
