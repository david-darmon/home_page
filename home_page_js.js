function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// הפעלה ראשונית של השעון
setInterval(updateClock, 1000);
updateClock();

// ========================
// צבעי כפתורים משתנים
// ========================

const buttons = document.querySelectorAll('.buttons a');
let hueOffset = 0; // יזוז לאורך הקשת

function updateButtonColors() {
  const count = buttons.length;

  buttons.forEach((btn, index) => {
    // מחלקים את הקשת לפי מספר הכפתורים + מיישמים את ה-offset
    const hue = (hueOffset + (index / count) * 150) % 150;
    btn.style.backgroundColor = `hsl(${hue}, 20%, 50%)`;
  });

  hueOffset += 0.075; // משנה את הצבעים בהדרגה
  requestAnimationFrame(updateButtonColors); // לולאה חלקה
}

// התחלת האנימציה
updateButtonColors();
const bg = document.getElementById('background');
const count = 20; // מספר הצורות ברקע

for (let i = 0; i < count; i++) {
  const shape = document.createElement('div');
  shape.className = 'background-shape';
  
  // גודל התחלה רנדומלי
  let size = 30 + Math.random() * 70;
  shape.style.width = size + 'px';
  shape.style.height = size + 'px';

  // מיקום התחלתי רנדומלי
  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;
  shape.style.left = x + 'px';
  shape.style.top = y + 'px';

  // מהירות סיבוב רנדומלית
  shape.style.animationDuration = (5 + Math.random()*5) + 's';

  // יצירת 6 צדדים של קובייה
  ['front','back','right','left','top','bottom'].forEach(side => {
    const face = document.createElement('div');
    face.style.width = size + 'px';
    face.style.height = size + 'px';
    face.style.background = `hsl(${Math.random()*70},60%,60%)`;
    switch(side){
      case 'front': face.style.transform = `rotateY(0deg) translateZ(${size/2}px)`; break;
      case 'back': face.style.transform = `rotateY(180deg) translateZ(${size/2}px)`; break;
      case 'right': face.style.transform = `rotateY(90deg) translateZ(${size/2}px)`; break;
      case 'left': face.style.transform = `rotateY(-90deg) translateZ(${size/2}px)`; break;
      case 'top': face.style.transform = `rotateX(90deg) translateZ(${size/2}px)`; break;
      case 'bottom': face.style.transform = `rotateX(-90deg) translateZ(${size/2}px)`; break;
    }
    shape.appendChild(face);
  });

  bg.appendChild(shape);

  // תנועה אקראית ושינוי גודל
  let dx = (Math.random()-0.5)*2;
  let dy = (Math.random()-0.5)*2;
  let dSize = (Math.random()-0.5)*0.5;

  function animate(){
    x += dx;
    y += dy;
    size += dSize;

    // גבולות המסך
    if(x<0 || x>window.innerWidth-size) dx=-dx;
    if(y<0 || y>window.innerHeight-size) dy=-dy;
    if(size<20 || size>100) dSize=-dSize;

    shape.style.left = x + 'px';
    shape.style.top = y + 'px';
    shape.style.width = size + 'px';
    shape.style.height = size + 'px';

    shape.querySelectorAll('div').forEach(face => {
      face.style.width = size+'px';
      face.style.height = size+'px';
      const t = face.style.transform;
      face.style.transform = t.replace(/translateZ\(\d+(\.\d+)?px\)/, `translateZ(${size/2}px)`);
    });

    requestAnimationFrame(animate);
  }

  animate();
}
