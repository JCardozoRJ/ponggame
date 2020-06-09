//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variaveis raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

let chanceDeErrar = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if ((xBolinha+(diametro/2)) > width || (xBolinha-(diametro/2)) < 0) {
      velocidadeXBolinha *= -1;
  }
  if ((yBolinha+(diametro/2)) > height || (yBolinha-(diametro/2)) < 0) {
      velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, larguraRaquete, alturaRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if ((xBolinha-(diametro/2)) < xRaquete+larguraRaquete && (yBolinha-(diametro/2)) < yRaquete+alturaRaquete && (yBolinha+(diametro/2)) > yRaquete){
      velocidadeXBolinha *= -1;
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - larguraRaquete/2-30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function verificaColisaoRaqueteOponente(){
  if ((xBolinha+(diametro/2)) > xRaqueteOponente && (yBolinha-(diametro/2)) < yRaqueteOponente+alturaRaquete && (yBolinha+(diametro/2)) > yRaqueteOponente){
      velocidadeXBolinha *= -1;
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(19);
  
  fill(color(255,140,0));
  rect(150,10,40,20);
  
  fill(255);
  text(meusPontos,170,26);
  
  fill(color(255,140,0));
  rect(380,10,40,20);
  
  fill(255);
  text(pontosDoOponente,400,26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
  }
  if (xBolinha < 10){
    pontosDoOponente += 1;
  }
}

function calculaChanceDeErrar(){
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}