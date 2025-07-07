import{createDialogueEngine} from "./dialogue.js"

console.log(Phaser);

var config = 
{
    type: Phaser.AUTO,
    width:625,
    height:520,
    scene: 
    {
        preload:preload,
        create:create,
        update:update,
    }
};
var currentTarget = 0;
var game = new Phaser.Game(config);

var script = `
Heyyy ! Welcome to the reef !!!!
How are you, beautiful land creature?
+ Meh… not really well -> Chapitre 3
+ I’m good! -> Chapitre 2
+ I’m here for the tentacles  -> Chapitre 4

=== Chapitre 2 ===
Yayyy! Happy float -> Chapitre 5

=== Chapitre 3 ===
Oh no… wanna talk or ink someone? -> Chapitre 5

=== Chapitre 4 ===
A tentacle admirer? We might just get along… -> Chapitre 5

=== Chapitre 5 ===
Can I tell you something deep? 
Like… deeeep like the Titanic?"
+ Yes, go ahead  -> Chapitre 6
+ No thanks -> Chapitre 7
+ Only if it’s funny -> Chapitre 8

=== Chapitre 6 ===
I once saw a jellyfish write poetry with its stings… It was electric. -> Chapitre 9

=== Chapitre 7 ===
I get it. Not everyone’s ready for deep sea confessions. -> Chapitre 9

=== Chapitre 8 ===
I have 8 legs, but no sense of humour. Please laugh anyway -> Chapitre 9

=== Chapitre 9 ===
+ Haha you’re actually funny -> Chapitre 10
+ that wasn’t funny  -> Chapitre 11
+ You’re so weird, I like you  -> Chapitre 12

=== Chapitre 10 ===
Yesss! I made a human smile -> Chapitre 13

=== Chapitre 11 ===
Ouch… That stings more than a sea urchin. -> Chapitre 13

=== Chapitre 12 ===
Weird loves weird. You’re my favourite air-breather -> Chapitre 13
⸻
=== Chapitre 13 ===
Time to float away… but I’ll ink about you 
Be kind, be weird, be you.

+ Bye friend  -> End
+ Bye… my friend  -> End
+ Can I keep you? -> Chapitre 14
⸻
=== Chapitre 14 ===
I’m always just a ripple away. -> End
===end===
END
` 
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

function preload()
{
    this.load.image('background', '/assets/Sprites/ocean.jpg');
    this.load.image('dialogueBox', '/assets/Sprites/diaBox.png');
    this.load.image('mood','/assets/Sprites/Label.png' );
    this.load.image('conv','/assets/Sprites/Label1.png' );
    this.load.image('play','/assets/Sprites/PlaySea.png' )
    this.load.spritesheet("poulpe", '/assets/Sprites/HappyOctopuss.png', {frameWidth: 100, frameHeight: 100});
    this.load.spritesheet("poulpeSad", '/assets/Sprites/SADoctopuss.png', {frameWidth: 100, frameHeight: 100});
    this.load.spritesheet("poulpeShoocked", '/assets/Sprites/SHOOCKoctopuss.png', {frameWidth: 100, frameHeight: 100});
    // this.load.audio('startSound' ,'/assets/sound/Menu.wav');
    
    // this.load.video('intro', '/assets/video/intro.mp4' )
}

function create()
{
    var monBG = this.add.image(225,225, 'background');
    var maDiaBox = this.add.image(450,250, 'dialogueBox');
    maDiaBox.setScale(1.8);

    var maMoodBoard = this.add.image(450, 55, 'mood');
    maMoodBoard.setScale(0.4);

    var boutonClick = this.add.image(450,425, 'conv');
    boutonClick.setScale(0.2);

    var boutonClick2 = this.add.image(450,463, 'conv');
    boutonClick2.setScale(0.2);

    var boutonClick3 = this.add.image(450,500, 'conv');
    boutonClick3.setScale(0.2);

    var boutonQuestion = this.add.image(300,250, 'play');
    
    
    var monAnim = this.anims.create({
        key:"octopus",
        frameRate: 4,
        frames : this.anims.generateFrameNumbers("poulpe", { start:0, end:3 }),
        repeat :-1 // pour une boucle infinie 

    });

    var monAnimSad = this.anims.create({
        key:"Sadoctopus",
        frameRate: 4,
        frames : this.anims.generateFrameNumbers("poulpeSad", { start:0, end:3 }),
        repeat :-1 // pour une boucle infinie 

    });

    var monAnimShoocked = this.anims.create({
        key:"ShoockOctopus",
        frameRate: 4,
        frames : this.anims.generateFrameNumbers("poulpeShoocked", { start:0, end:3 }),
        repeat :-1 // pour une boucle infinie 

    });
      
      
    var poulpe = this.add.sprite(150,140, "poulpe");
    poulpe.play("octopus");
    poulpe.setScale(2.8);

    
    // var startSound = this.sound.add('startSound');
    // startSound.play();

    boutonClick.setInteractive();
    boutonClick.on('pointerdown', function(pointer) 
    {
        console.log("clicked1");
        poulpe.play("Sadoctopus");
    });

    boutonClick2.setInteractive();
    boutonClick2.on('pointerdown', function(pointer) 
    {
        console.log("clicked2");
        poulpe.play("octopus");
    });

    boutonClick3.setInteractive();
    boutonClick3.on('pointerdown', function(pointer) 
    {
        console.log("clicked3");
        poulpe.play("ShoockOctopus");
    });
        


    var emotionsHappy = this.add.text(395, 28, 'HAPPY', 
        { fontFamily: 'Impact', fontSize: 45, color: '#168d8d',wordWrap: { width: 600 }, });
            
    // var emotionsSad = this.add.text(410, 40, 'SAD', 
    //         { fontFamily: 'Impact', fontSize: 25, color: '#ffffff',wordWrap: { width: 600 }, });
    // var emotionsShoock = this.add.text(410, 40, 'HAPPY', 
    //         { fontFamily: 'Impact', fontSize: 25, color: '#ffffff',wordWrap: { width: 600 }, });
            


    var rep1 = this.add.text(385, 416, '', 
        { fontFamily: 'Impact', fontSize: 13, color: '#ffffff',wordWrap: { width: 600 }, });
                
    var rep2 = this.add.text(385, 454, '', 
        { fontFamily: 'Impact', fontSize: 13, color: '#ffffff',wordWrap: { width: 600 }, });
                    
    var rep3 = this.add.text(385, 492, '', 
        { fontFamily: 'Impact', fontSize: 13, color: '#ffffff',wordWrap: { width: 600 }, });
                        
    var laQuestion = this.add.text(345, 100, '', 
        { fontFamily: 'Impact', fontSize: 17, color: '#168d8d',wordWrap: { width: 220 }, });   

   
    var playGame = this.add.image(225,225, 'background');
    boutonQuestion.setDepth(8);
                            
    boutonQuestion.setInteractive();
    boutonQuestion.setDepth(8);
    boutonQuestion.setScale(0.5);
    boutonQuestion.on('pointerdown', function(pointer) 
        {
        console.log("clicked play");
        playAnim.play();
        boutonQuestion.destroy();
        TitreJeu.destroy();
        });
                        
    var playAnim = this.tweens.add({
        targets: playGame,
        alpha:0,
        duration: 2000,
        ease: 'Power2',
        // yoyo : true,
        loop: 0,
        paused: true
        });
        
        // playAnim.play();

    var TitreJeu = this.add.text(80, 100, 'Welcome to the POULPY TALK', 
        { fontFamily: 'Impact', fontSize: 40, color: '#ffffff',wordWrap: { width: 600 }, });

    var resetButton = function ()
    {
        laQuestion.setVisible = false;
        rep1.setVisible = false;
        rep2.setVisible = false;
        rep3.setVisible = false;
    }

    var displayMessage = function (data)
    {
        console.log(data);
        laQuestion.text += data.m +" \n";

    }

    var displayQuestion = function (data)
    {
        console.log(data);

        if(currentTarget == 0)
        {
            rep1.text += data.q;
        }
        else if(currentTarget == 1)
        {
            rep2.text += data.q;
        }
        else if(currentTarget == 2)
        {
            rep3.text += data.q;
        }

        laQuestion.setVisible = true;
        rep1.setVisible = true;
        rep2.setVisible = true;
        rep3.setVisible = true;

        currentTarget++;

    }

    var dialogueEngine = createDialogueEngine(script, displayMessage,displayQuestion )
    dialogueEngine.start();
}
                        
function update()
{
    
}