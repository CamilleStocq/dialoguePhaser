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

var game = new Phaser.Game(config);

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
    this.load.audio('startSound' ,'/assets/sound/Menu.wav');
    
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

    
    startSound = this.sound.add('startSound');
    startSound.play();

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
        


    var emotionsHappy = this.add.text(410, 40, 'HAPPY', 
        { fontFamily: 'Arial', fontSize: 25, color: '#ffffff',wordWrap: { width: 600 }, });
            
    // var emotionsSad = this.add.text(410, 40, 'SAD', 
    //         { fontFamily: 'Arial', fontSize: 25, color: '#ffffff',wordWrap: { width: 600 }, });
    // var emotionsShoock = this.add.text(410, 40, 'HAPPY', 
    //         { fontFamily: 'Arial', fontSize: 25, color: '#ffffff',wordWrap: { width: 600 }, });
            


     var rep1 = this.add.text(400, 413, 'reponse 1', 
        { fontFamily: 'Arial', fontSize: 20, color: '#ffffff',wordWrap: { width: 600 }, });
                
    var rep2 = this.add.text(400, 450, 'reponse 2', 
        { fontFamily: 'Arial', fontSize: 20, color: '#ffffff',wordWrap: { width: 600 }, });
                    
    var rep3 = this.add.text(400, 488, 'reponse 3', 
        { fontFamily: 'Arial', fontSize: 20, color: '#ffffff',wordWrap: { width: 600 }, });
                        
    var laQuestion = this.add.text(350, 100, 'je vous pose une question super interessante car je suis un pouple super interessant', 
        { fontFamily: 'Arial', fontSize: 15, color: '#40c0c0',wordWrap: { width: 220 }, });   

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

    var TitreJeu = this.add.text(35, 100, 'Welcome to the POULPY TALK', 
        { fontFamily: 'Arial', fontSize: 40, color: '#ffffff',wordWrap: { width: 600 }, });
}
                        
function update()
{
    
}