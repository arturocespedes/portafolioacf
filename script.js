function revealToSpan(){
    document.querySelectorAll(".reveal")
.forEach(function(elem){
    // create two spans
    var parent = document.createElement("span");
    var child = document.createElement("span");

   //parent and child both sets their respectiva classes
   parent.classList.add("parent");
   child.classList.add("child");

   // span parent gets child and child gets elem details
   child.innerHTML = elem.innerHTML;
   parent.appendChild(child);

    //elem replaces its value with parent span
    elem.innerHTML = "" ;
    elem.appendChild(parent);
});
}

function valueSetters(){ 
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home .parent .child", {y: "100%"});
    gsap.set("#home .row img", { opacity: 0}) 
    
    const strokes = document.querySelectorAll("#Visual .stroke"); 
    const fills = document.querySelectorAll("#Visual .fill"); 
    
    // 1) ocultar relleno al inicio 
    gsap.set(fills, { opacity: 0 }); 
    // 2) preparar stroke para "dibujado" 
    strokes.forEach(path => { 
    const length = path.getTotalLength(); 
    path.style.strokeDasharray = length; 
    path.style.strokeDashoffset = length; 
}); 
}

function loaderAnimation(){
var tl = gsap.timeline();

tl
.from("#loader .child span", {
    x: 100,
    stagger: .2,
    duration: 1.4,
    ease: Power3.easeInOut
})
.to("#loader .parent .child", {
    y: "-100%",
    duration: 1,
    ease: Circ.easeInOut
})
.to("#loader", {
    height: 0,
    duration: 1,
    ease: Circ.easeInOut
})
.to("#green", {
    height: "100%",
    top: 0,
    duration: 1,
    delay: -.7,
    ease: Circ.easeInOut
})
.to("#green", {
    height: "0%",
    top: 0,
    duration: 0.8,
    delay: -.2,
    ease: Circ.easeInOut,
    onComplete: function(){
       animateHomepage();
    }
})
}

function animateHomepage() {
    var tl = gsap.timeline();

    tl
    .to("#nav a", {
        y: 0,
        opacity: 1,
        stagger: .05,
        ease: Expo.easeInOut
    })
    .to("#home .parent .child", {
        y: 0,
        stagger: .1,
        duration: 1.5,
        ease: Expo.easeInOut
    })
     .to("#home .row img", {
        opacity: 1,
        delay: -.5,
        ease: Expo.easeInOut,
        onComplete: function (){
            animateSvg();
        }
    })
}


function animateSvg() {
  const strokes = document.querySelectorAll("#Visual .stroke");
  const fills = document.querySelectorAll("#Visual .fill");


  // 3) animar: primero el trazo, luego aparece el relleno
  const tl = gsap.timeline();

  tl.to(strokes, {
    strokeDashoffset: 0,
    duration: 3,
    ease: Expo.easeInOut,
  })
  .to(fills, {
    opacity: 1,
    duration: 0.5,
    ease: Expo.easeInOut,
  }, "-=0.3"); // aparece casi al final del trazo
}


function locoInitialize () {
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

}

function cardShow(){
    document.querySelectorAll(".cnt")
    .forEach(function (cnt){
        cnt.addEventListener("mousemove", function(dets) {
            document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
            document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`; 
            
        })
    })
    
}

revealToSpan();
valueSetters();
loaderAnimation();
locoInitialize();
cardShow();