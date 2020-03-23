var body, num, array, width, context, logo, myElements, analyser, src, height;

num = 120;
width = 12;
array = new Uint8Array(512);
body = document.querySelector('body');
audio = document.getElementById("audio");

window.onclick = function() {
    if(!context) {
        body.querySelector('h1').remove();
        myElements = document.getElementsByClassName('logo');
        context = new AudioContext();
        analyser = context.createAnalyser();
        src = context.createMediaElementSource(audio);
        src.connect(analyser);
        analyser.connect(context.destination);

        for(var i = 0 ; i < num ; i++){
            logo = document.createElement('div');
            logo.className = 'logo';
            logo.style.background = 'purple';
            logo.style.minWidth = width+'px';
            body.appendChild(logo);
        }
    }

    if(audio.paused) audio.play();
    else audio.pause();

    loop();
}

function loop() {
    window.requestAnimationFrame(loop);
    analyser.getByteFrequencyData(array);
    for(var i = 0 ; i < num ; i++){
        height = array[i+num]*2;
        if(height < num*2) 
            myElements[i].style.background = 'purple';
        else if (height < num*2.2) 
            myElements[i].style.background = 'mediumvioletred';
        else if (height < num*2.4)  
            myElements[i].style.background = 'magenta';
        else 
            myElements[i].style.background = 'Crimson';
        myElements[i].style.minHeight = height+'px';
        myElements[i].style.opacity = 0.005*height;
    }
}