const T = document.getElementById('toggle')
const Tuck = document.getElementById('Tuck')
const tk = Tuck.getContext('2d')
const t = T.getContext('2d')
const SB = document.getElementById('sidebar')
const C = document.getElementById('C')
const c = C.getContext('2d')
const H = document.getElementById('heading')
const h = H.getContext('2d')
const P = document.getElementById('Page')
const ham = document.getElementById('ham')
var Color = 'black'//'rgb(37, 34, 44)'
var cX,cY,hX,hY
var currentSection=0
var dusting = false
var ready = false
S = document.getElementById('sections')

Tuck.onpointerdown = function(){
    if(SB.style.visibility=='visible'){
        SB.style.visibility='hidden'
        P.style.pointerEvents='all'
        P.style.opacity='100%'
    }
    else {
        SB.style.visibility='visible'
        P.style.pointerEvents='none'
        P.style.opacity='50%'
        rain(100,1,cX/10)
        //if(ready){dusting = true}
        createDust()
    }
}

T.onclick = function(){
    if(ham.style.visibility=='visible'){
        var width=20
        var inter = setInterval(function(){
            ham.style.width=`${width}%`
            width -= 1
            if(width<=0){
                clearInterval(inter)
            }
        },10)
        setTimeout(function(){
            ham.style.visibility='hidden'
        },300)
        ham.style.pointerEvents='none'
        P.style.pointerEvents='all'
        P.style.opacity='100%'
        dissolveCross()
        setTimeout(threelines,100)
    }
    else {
        var width=0
        ham.style.visibility='visible'
        var inter = setInterval(function(){
            ham.style.width=`${width}%`
            width += 1
            if(width>=20){
                clearInterval(inter)
            }
        },10)
        ham.style.pointerEvents='all'
        P.style.pointerEvents='none'
        P.style.opacity='50%'
        dissolveThreelines()
        setTimeout(cross,100)
    }
}
const hlinks = {
    'ABOUT US'    :'link',
    'BROCHURE'    :'link',
    'HOW TO REACH':'link',
    'CONTACT US'  :'link',
}

function populateHMenu(){
    var top = 1
    var a;
    for(var l in hlinks){
        a = document.createElement('a')
        a.href = hlinks[l]
        a.innerText = l
        a.className = 'HMenu'
        a.style.top = `${top}vh`
        top += 3
        ham.appendChild(a)
    }
    ham.style.height=`${top+2}vh`
}
function threelines(){
    t.lineCap='round'
    t.lineWidth=tY/10
    t.strokeStyle='white'
    var y = tY/2
    var inter = setInterval(function(){
        t.clearRect(0,0,tX,tY)
        t.beginPath()
        t.moveTo(tX/5,  y)
        t.lineTo(4*tX/5,y)
        t.moveTo(tX/5,  tY/2)
        t.lineTo(4*tX/5,tY/2)
        t.moveTo(tX/5,  tY-y)
        t.lineTo(4*tX/5,tY-y)
        t.stroke()
        y -= 0.1*tY
        if(y<tY/5){
            clearInterval(inter)
        }
    },10)
    
}
function cross(){
    t.lineCap='round'
    t.lineWidth=tY/10
    t.strokeStyle='white'
    var y = tY/2
    var inter = setInterval(function(){
        t.clearRect(0,0,tX,tY)
        t.beginPath()
        t.moveTo(tX/5,  y)
        t.lineTo(4*tX/5,tY-y)
        t.moveTo(tX/5,  tY-y)
        t.lineTo(4*tX/5,y)
        t.stroke()   
        y -= 0.1*tY
        if(y<tY/5){
            clearInterval(inter)
        }
    },10)
}
function dissolveCross(){
    t.lineCap='round'
    t.lineWidth=tY/10
    t.strokeStyle='white'
    var y = tY/5
    var inter = setInterval(function(){
        t.clearRect(0,0,tX,tY)
        t.beginPath()
        t.moveTo(tX/5,  y)
        t.lineTo(4*tX/5,tY-y)
        t.moveTo(tX/5,  tY-y)
        t.lineTo(4*tX/5,y)
        t.stroke()   
        y += 0.1*tY
        if(y>tY/2){
            clearInterval(inter)
        }
    },10)
}
function dissolveThreelines(){
    t.lineCap='round'
    t.lineWidth=tY/10
    t.strokeStyle='white'
    var y = tY/5
    var inter = setInterval(function(){
        t.clearRect(0,0,tX,tY)
        t.beginPath()
        t.moveTo(tX/5,  y)
        t.lineTo(4*tX/5,tY-y)
        t.moveTo(tX/5,  tY-y)
        t.lineTo(4*tX/5,y)
        t.stroke()   
        y += 0.1*tY
        if(y>tY/2){
            clearInterval(inter)
        }
    },10)
}
var sections = {
    HOME:{
        'ABOUT US'    :function(){},
        'BROCHURE'    :function(){},
        'HOW TO REACH':function(){},
        'CONTACT US'  :function(){},
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
const links = {
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
            var y = (e.target.i*(1/20) + (3/40))*cY
            hole(y,true)
        }
        b.onpointerup = function(e){
            var y = (e.target.i*(1/20) + (3/40))*cY
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
        L[l].style.top = `${5*i + 5.5}%`
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
    c.fillStyle = Color
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
    c.fillStyle = Color
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
var dustC = []
function createparticle(i){
    var R = Math.random()*hY/2
    var theta = Math.random()*Math.PI/2
    var x = R*Math.cos(theta)
    var y = R*Math.sin(theta)
    var r = Math.random()*hY/10
    dustX.push(x)
    dustY.push(y)
    dustr.push(r)
    dustC.push(i%colors.length)
    //h.fillStyle = colors[dustC[i]]
    //h.beginPath()
    //h.arc(x,y,r,0,2*Math.PI)
    //h.fill()
    //Heading()
    
}
function createDust(){
    /*
    ready = false
    var x,y,r,R,theta,i
    i=0
    var inter = setInterval(function(){
        createparticle(i)
        i+=1
        if(i>=1000){
            clearInterval(inter);
            ready=true
        }
    },10)
    */
   for(var i=0;i<200;i++){
    createparticle(i)
   }
}
var colors = ['purple','black','blue','pink','red','voilet']
function dust(){
    var NewdustX = []
    var NewdustY = []
    var Newdustr = []
    var NewdustC = []
    var R
    h.clearRect(0,0,hX,hY)
    for(var i=0;i<dustX.length;i++){
        if((dustX[i]<hX)&&(dustY[i]<hY)){
            R = (dustX[i]**2 + dustY[i]**2)**(1/2)
            NewdustX.push(dustX[i] + Math.random()*(dustX[i]/R)*(hY*(0.1/100+1/(R+0.1)))*dustr[i])
            NewdustY.push(dustY[i] + Math.random()*(dustY[i]/R)*(hY*(0.1/100+1/(R+0.1)))*dustr[i])
            Newdustr.push(dustr[i])
            NewdustC.push(dustC[i])
            h.fillStyle = colors[dustC[i]]
            h.beginPath()
            h.arc(dustX[i],dustY[i],dustr[i],0,2*Math.PI)
            h.fill()
        }
    }
    //if(dustX.length<30){
    //    dusting=false;
    //    createDust();
    //    }
    delete dustX
    delete dustY
    delete dustr
    delete dustC
    dustX = NewdustX
    dustY = NewdustY
    dustr = Newdustr
    dustC = NewdustC
}
function Heading(){
    //if(dusting){
        dust()
    //}
    var s = Math.floor(Math.min(hY*0.8,hX/20))
    h.font = `${s}px times-new-roman`
    h.fillStyle = 'white'
    h.fillText('AMALTHEA',hY,(hY/2) + s/2)
}
function rain(n,dT,R){
    SB.style.opacity = `0`
    bList[currentSection].click()
    c.clearRect(0,0,cX,cY)
    var dr = R/n
    var r = dr
    var inter = setInterval(function(){
        drops(10,r);
        SB.style.opacity = `${100*r/R}%`
        r += dr
        if(r>R){
            clearInterval(inter)
            c.fillRect(0,0,cX,cY)
        }
    },dT)
}
function resize(){
    C.width  = cX = window.innerWidth*0.3
    C.height = cY = window.innerHeight*0.7
    H.width  = hX = window.innerWidth
    H.height = hY = window.innerHeight*0.1
    T.width  = tX = window.innerHeight*0.05
    T.height = tY = window.innerHeight*0.05
    Tuck.width  = tkX = window.innerHeight*0.05
    Tuck.height = tkY = window.innerHeight*0.05
    S.style.right = `${T.width*1.5}px`
}
window.onresize = resize
resize()
populateTitleBar()
createDust()
window.onload = function(){
    bList[0].click()
    setInterval(Heading,1)
    threelines()
    c.fillStyle = Color
    populateHMenu()
    im = new Image()
    im.onload=function(){
        tk.drawImage(im,0,0,tkX,tkY)
    }
    im.src = 'mascot_homepage.png'
}
