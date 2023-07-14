const I = document.getElementById('toggle')
const SB = document.getElementById('sidebar')
const C = document.getElementById('C')
const c = C.getContext('2d')
const H = document.getElementById('heading')
const h = H.getContext('2d')
const P = document.getElementById('Page')
var cX,cY,hX,hY
var currentSection=0
S = document.getElementById('sections')

I.onclick = function(){
    if(SB.style.visibility=='visible'){
        SB.style.visibility='hidden'
        P.style.pointerEvents='all'
        P.style.opacity='100%'
    }
    else {
        SB.style.visibility='visible'
        P.style.pointerEvents='none'
        P.style.opacity='50%'
        rain(100,10,cX/10)
    }
}

var sections = {
    HOME:{
        'ABOUT US':function(){},
        'BROCHURE':function(){},
        'HOW TO REACH':function(){},
        'CONTACT US':function(){},
    },
    EVENTS:{
        "YOU CAN'T WIN":function(){},
        "GIVE UP AND DIE":function(){},
    },
    CNS:{
        ";_;":function(){},
    },
    'TECH EXPO':{
        "LOTS of TECH":function(){},
        "PLAY WITH THE GODDAM THING PLZ":function(){},
    },
    SPONSORS:{
        ";_;":function(){},
    },

}
var links = {
    HOME:'https://pj29072004.github.io/SpaceDust/',
    EVENTS:'https://pj29072004.github.io/Snek/',
    CNS:'https://pj29072004.github.io/Tunnel/',
    'TECH EXPO':'link4',
    SPONSORS:'link5',
}

for(var section in sections){
    var b;
    for(var l in sections[section]){
        b = document.createElement('button')
        b.onclick = sections[section][l]
        b.onpointerdown = function(e){
            var y = (e.target.i*(1/20) + (1/40))*cY
            hole(y,true)
        }
        b.onpointerup = function(e){
            var y = (e.target.i*(1/20) + (1/40))*cY
            hole(y,false)
        }
        b.className = 'sbb'
        b.innerText = l
        sections[section][l] = b
    }
}
var aList = []
var bList = []

function vacateSideBar(){
    for(var i=0;i<aList.length;i++){
        SB.removeChild(aList[i])
    }
    delete aList
    aList = []
}

function vacateTitleBar(){
    for(var i=0;i<bList.length;i++){
        S.removeChild(bList[i])
    }
    delete bList
    bList = []
}

function populateSideBar(section){
    var L = sections[section]
    var i = 0;
    for(var l in L){
        SB.appendChild(L[l])
        aList.push(L[l])
        L[l].style.top = `${5*i + 0.5}%`
        L[l].i = i
        i += 1
    }
    aList[0].click()
}

function populateTitleBar(){
    var b;
    var i=0;
    for(var section in sections){
        b = document.createElement('button')
        b.innerText = section
        b.onclick = function(e){
            vacateSideBar()
            populateSideBar(e.target.innerText)
            P.src = links[e.target.innerText]
            currentSection = e.target.i
        }
        b.className = 'tbb'
        b.i = i
        bList.push(b)
        S.appendChild(b)
        i++
    }
}


function hole(y,active=false){
    c.fillStyle = 'black'
    c.clearRect(0,0,cX,cY)
    c.beginPath()
    c.moveTo(0,0)
    c.lineTo(cX,0)
    var r = cY*(2/100)
    var R = cX*(1/10)
    c.lineTo(cX,y-r-R)
    c.arc(cX-R,y-r-R,R,0,Math.PI/2)
    c.lineTo(cX*0.2,y-r)
    c.arc(cX*0.2,y,r,3*Math.PI/2,Math.PI/2,true)
    c.lineTo(cX*0.2,y+r)
    c.lineTo(cX-r,y+r)
    c.arc(cX-R,y+r+R,R,3*Math.PI/2,0)
    c.lineTo(cX,cY)
    c.lineTo(0,cY)
    c.closePath()    
    c.fill()
    if(active){
        c.fillStyle = 'blue'
    }
    r = cY*(1.5/100)
    c.beginPath()
    c.arc(cX*0.2,y,r,Math.PI/2,3*Math.PI/2)
    c.lineTo(cX*0.8,y-r)
    c.arc(cX*0.8,y,r,3*Math.PI/2,Math.PI/2)
    c.lineTo(cX*0.2,y+r)
    c.closePath()
    c.fill()
}

function drops(n,r){
    var x,y;
    for(var i=0;i<n;i++){
        x = Math.random() * cX
        y = Math.random() * cY
        c.beginPath()
        c.arc(x,y,r,0,2*Math.PI)
        c.fill()
    }
}

var dustX = []
var dustY = []
var dustr = []
function createDust(){
    var x,y,r
    for(var i=0;i<1000;i++){
        x = Math.random()*hX
        y = Math.random()*hY
        r = hY/(10+(x**2+y**2)/100)
        dustX.push(x)
        dustY.push(y)
        dustr.push(r)
    }
}
var colors = ['red','blue','green','yellow','orange','voilet']
function dust(){
    h.clearRect(0,0,hX,hY)
    for(var i=0;i<1000;i++){
        dustX[i] *= (1+0.001*Math.random())
        dustY[i] *= (1+0.0005*Math.random())
        h.fillStyle = colors[i%6]
        h.beginPath()
        h.arc(dustX[i],dustY[i],dustr[i],0,2*Math.PI)
        h.fill()
    }
}
function Heading(){
    dust()
    var s = Math.floor(Math.min(hY*0.8,hX/20))
    h.font = `${s}px times-new-roman`
    h.fillStyle = 'white'
    h.fillText('AMALTHEA',hX/10,(hY/2) + s/2)
}
function rain(n,dT,R){
    c.clearRect(0,0,cX,cY)
    var dr = R/n
    var r = dr
    var inter = setInterval(function(){
        drops(100,r);
        r += dr
        if(r>R){
            clearInterval(inter)
            c.fillRect(0,0,cX,cY)
            bList[currentSection].click()
        }
    },dT)
}

function resize(){
    C.width  = cX = window.innerWidth*0.3
    C.height = cY = window.innerHeight*0.7
    H.width  = hX = window.innerWidth
    H.height = hY = window.innerHeight*0.1
}
window.onresize = resize
resize()
populateTitleBar()
window.onload = function(){
    bList[0].click()
    createDust()
    Heading()
    setInterval(Heading,1)
}
