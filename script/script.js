var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var tratamento = 0;
//foguete
var foguete_x = 313;
var foguete_y = 300;
var foguete_r = 40;
var speedfoguete = 5;
parseFloat(speedfoguete);
var tecla = 0;
var score = 0;
var scoreMax = 0;

//bn
var speedBuraco = 5;
parseInt(speedBuraco);
var bn_x = -109;
var bn_y = 0;
var bn_r = 75;
var contadorV = 0;

function desenhar()
{
    //l1
    ctx.beginPath();
    ctx.moveTo(0,3);
    ctx.lineTo(100,3);
    ctx.strokeStyle = "rebeccapurple";
    ctx.lineWidth= 3;
    ctx.stroke();

    //l2
    ctx.beginPath();
    ctx.moveTo(200,3);
    ctx.lineTo(300,3);
    ctx.strokeStyle = "rebeccapurple";
    ctx.lineWidth= 3;
    ctx.stroke();

    //l3
    ctx.beginPath();
    ctx.moveTo(400,3);
    ctx.lineTo(500,3);
    ctx.strokeStyle = "rebeccapurple";
    ctx.lineWidth= 3;
    ctx.stroke();

    //l4
    ctx.moveTo(600,3);
    ctx.lineTo(700,3);
    ctx.strokeStyle = "rebeccapurple";
    ctx.lineWidth= 3;
    ctx.stroke();

    //foguete
    var foguete = new Image();
    foguete.src = 'script/Foguete.png';
    ctx.drawImage(foguete, foguete_x, foguete_y, foguete_r*2, foguete_r*2);

    //bn
    var bn = new Image();
    bn.src = 'script/buraco_negro.png';
    ctx.drawImage(bn, bn_x, bn_y, bn_r*2, bn_r*2);

    //texto1
    ctx.fillStyle = "rebeccapurple";
    ctx.font = "20px Arial";
    ctx.fillText("Caminho 1",101,20);

    //texto2
    ctx.fillStyle = "rebeccapurple";
    ctx.font = "20px Arial";
    ctx.fillText("Caminho 2",301,20);

    //texto3
    ctx.fillStyle = "rebeccapurple";
    ctx.font = "20px Arial";
    ctx.fillText("Caminho 3",501,20);

    //texto4
    ctx.fillStyle = "rebeccapurple";
    ctx.font = "20px Arial";
    ctx.fillText("Sua pontuação: " + score,10,480);

    //texto5
    ctx.fillStyle = "rebeccapurple";
    ctx.font = "20px Arial";
    ctx.fillText("Pontuação maxima: " + scoreMax,10,500);
}

function atualizacao()
{
    desenhar();
    requestAnimationFrame(atualizacao);
}
function reseta()
{
    tecla = 0;
    foguete_x = 313;
    foguete_y = 300;
    speedfoguete = 5;
    speedBuraco = 5;
    score = 0;
    bn_x = -159;
}
function ponto()
{
    tecla = 0;
    foguete_x = 313;
    foguete_y = 300;
    score = score + 1;
    speedBuraco = speedBuraco + 1;
    speedfoguete = speedfoguete + 0.5;

    if(score > scoreMax)
    {
        scoreMax = score;
    }
}

function batida() {

    var colisao_horizontal_1 = (foguete_x + 50 >= bn_x) && (bn_x + 100 >= foguete_x);
    var colisao_vertical_1 = (foguete_y + 50 >=bn_y) && (bn_y + 100 >= foguete_y);

   if (colisao_vertical_1 && colisao_horizontal_1)
   {    
        gameover();
        window.setTimeout(reseta,1000); 
   }
}
function gameover()
{   
    tecla = 0;
    ctx.fillStyle = "rebeccapurple";
    ctx.font = "30px Impact";
    ctx.fillText("VOCÊ PERDEU!",265,250);
}
function control() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(contadorV < 1)
    {
        bn_x = bn_x + speedBuraco;
    }
    else
    {
        bn_x = bn_x - speedBuraco;
    }

    if(bn_x > 700)
    {
        contadorV++;
    }
    else if(bn_x < -160)
    {
        contadorV--;
    }


    if (tecla == 0)
    {
        document.addEventListener("keydown", function (control) 
        {
            tecla = control.keyCode;
        });
    }
    // a e seta esquerda
    if (tecla===65 || tecla===37)
    {
        foguete_x -= speedfoguete;

        if(foguete_x < -100){
            foguete_x = 670;
        }
    }
    // w e seta cima
    else if (tecla===87 || tecla===38)
    {
        foguete_y -= speedfoguete;
    }
    // s e seta baixo
    else if (tecla===83 || tecla===40)
    {
        foguete_y += speedfoguete;
        if(foguete_y > 420)
        {
            tecla = 0;
            foguete_y = 420;
        }
    }
    // d e seta direita
    else if (tecla===68 || tecla===39)
    {
        foguete_x += speedfoguete;
        if(foguete_x > 680)
        {
            foguete_x = -100;
        }
    }
    //colisão do foguete com as linhas
    if(foguete_x > 528 && foguete_y < 0)
    {
        gameover();
        window.setTimeout(reseta,1000); 
    }
    else if(foguete_x > 330 && foguete_x < 490 && foguete_y < 0)
    {   
        gameover();
        window.setTimeout(reseta,1000);  
    }
    else if(foguete_x > 130 && foguete_x < 285 && foguete_y < 0)
    {
        gameover();
        window.setTimeout(reseta,1000);  
    }
    else if(foguete_x > -100 && foguete_x < 90 && foguete_y < 0)
    {
        gameover();
        window.setTimeout(reseta,1000);   
    }

    //pontuação
    if(foguete_y < -100 && foguete_x < 560 && foguete_x > 480)
    {
        ponto();
    }
    else if(foguete_y < -100 && foguete_x < 340 && foguete_x > 285)
    {
        ponto();
    }
    else if(foguete_y < -100 && foguete_x < 140 && foguete_x > 80)
    {
        ponto();
    }

    //colisão com buraco negro
    batida();
    requestAnimationFrame(control);
}


function main()
{
    if(tratamento == 0)
    {
        tratamento++;
        atualizacao();
        control();
        requestAnimationFrame(atualizacao);
    }
    else
    {
        window.alert("Espere o jogo carregar!");
    }
}