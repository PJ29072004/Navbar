const I = document.getElementById('toggle')
const SB = document.getElementById('sidebar')
const C = document.getElementById('C')
const c = C.getContext('2d')
var cX,cY
S = document.getElementById('sections')
I.onclick = function(){
    if(SB.style.visibility=='visible'){
        SB.style.visibility='hidden'
        vacateTitleBar()
    }
    else {
        SB.style.visibility='visible'
        populateTitleBar()
    }
}

var sections = {
    HOME:{
        home1:function(){},
    },
    EVENTS:{
        event1:function(){},
        event2:function(){},
    },

}
for(var section in sections){
    var b;
    for(var l in sections[section]){
        b = document.createElement('button')
        b.onclick = sections[section][l]
        b.onmousedown = function(e){
            var y = (e.target.i*(1/20) + (1/40))*cY
            hole(y,true)
        }
        b.onmouseup = function(e){
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
    c.fillStyle = 'black'
    c.fillRect(0,0,cX,cY)
}

function vacateTitleBar(){
    for(var i=0;i<bList.length;i++){
        S.removeChild(bList[i])
    }
    delete bList
    bList = []
}

function populateTitleBar(){
    var b;
    for(var section in sections){
        b = document.createElement('button')
        b.innerText = section
        b.onclick = function(e){
            vacateSideBar()
            var L = sections[e.target.innerText]
            var i = 0;
            for(var l in L){
                SB.appendChild(L[l])
                aList.push(L[l])
                L[l].style.top = `${5*i + 0.5}%`
                L[l].i = i
                i += 1
            }
        }
        b.className = 'tbb'
        bList.push(b)
        S.appendChild(b)
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

function resize(){
    C.width  = cX = window.innerWidth*0.3
    C.height = cY = window.innerHeight*0.7
}
window.onresize = resize
resize()
vacateSideBar()
