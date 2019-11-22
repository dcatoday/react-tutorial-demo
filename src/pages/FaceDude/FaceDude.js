import React, { Component } from 'react'

export default class FaceDude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false
    }
    this.onSmash = this.onSmash.bind(this);

    this.face = React.createRef();
    this.head = React.createRef();

    this.isDead = true;
    this.canBlink = true;

    this.trackMouse = this.trackMouse.bind(this);
    this.squish = this.squish.bind(this);
    this.onUpdate = this.onUpdate.bind(this);

    document.addEventListener('mousemove',this.trackMouse);

    document.addEventListener('touchend',this.trackMouse);

    window.addEventListener('resize',this.squish);

    //Blink every 5.5 seconds
    this.interval = setInterval(() => {
      
      if(!this.canBlink){ return; }
      
      this.face.current.classList.add('blink');
      
      setTimeout(() => {
        this.face.current.classList.remove('blink');
      },200);
      
    },5500);

  }

  componentWillUnmount() {
    clearInterval(this.interval);
    document.removeEventListener('mousemove',this.trackMouse);
    window.removeEventListener('resize',this.squish);
  }

  onSmash(e) {
    console.log('smashing');
  }

  trackMouse(event){

    if(this.state.running) {
      return;
    }
  
    if(!this.isDead){ return; }

    setTimeout(()=>{
      this.setState({
        running: false
      });
    },300);
    
    //mouse coordinates
    let mX = event.clientX;
    let mY = event.clientY;
    
    //viewport dimentions
    let vpH = window.innerHeight;
    let vpW = window.innerWidth;
    
    //head boundingbox
    let headBox = this.head.current.getBoundingClientRect();
    
    //face boundingbox
    let faceBox = this.face.current.getBoundingClientRect();
    
    //the magic
    let calcX = (headBox.width - faceBox.width)*(mX/vpW);
    let calcY = (headBox.height - faceBox.height + 50)*(mY/vpH);
    
    //add bounding restrictions
    calcX = this.clamp(calcX, 60, 150);
    calcY = this.clamp(calcY, 60, 130);

    this.face.current.setAttribute('style', 'top: '+calcY+'px; left: '+calcX+'px;');
    
  }

clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}


squish() {
  
  //head boundingbox
  let headBox = this.head.current.getBoundingClientRect();
  
  let wP = 1-headBox.width/300;
  let hP = 1-headBox.height/300;
  
  let squishP = Math.max(wP, hP)*2;
  
  this.canBlink = squishP > 1.2 ? false : true;
  this.isDead = squishP > 1.3 ? false : true;
  
  this.head.current.setAttribute('style', 'background: rgba(169,3,41,'+squishP+');');
  
  this.face.current.style.opacity = 1.6-squishP;
  
}

onUpdate(e) {
  console.log(e);
  const gap = (e === 30) ? 30 : (e < 30) ? e : Math.floor(e*1.4)+3;
  this.face.current.style.borderBottomWidth = gap + 'px';
}

  render() {
    return (
      <div className="face-dude-container">
        <div className="face-dude-head" ref={this.head}>
          <span ref={this.face}></span>
        </div>
      </div>
    )
  }
}