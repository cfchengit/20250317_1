let seaweeds = [];

function setup() { //初始設定函數，只會執行一次
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0, 0);  //背景顏色，設為透明
  
  // 在 HTML 中嵌入 iframe
  // let iframe = createElement('iframe');
  // iframe.attribute('src', 'https://www.et.tku.edu.tw');
  // iframe.attribute('width', '100%');
  // iframe.attribute('height', '100%');
  // iframe.style('position', 'absolute');
  // iframe.style('top', '0');
  // iframe.style('left', '0');
  // iframe.style('z-index', '-1'); // 將 iframe 放在動畫背後
  // iframe.style('pointer-events', 'auto'); // 允許操作 iframe 內容
  
  // 設定線條顏色和寬度
  let colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
  let numSeaweeds = 60;
  
  for (let j = 0; j < numSeaweeds; j++) {
    let color = colors[j % colors.length] + hex(floor(random(100, 200)), 2); // 加入透明度
    let width = random(30, 60);
    let height = random(40, 80);
    let swayRange = random(2, 25);
    let swayFrequency = random(0.03, 0.07); // 搖晃頻率
    let baseX = (windowWidth / numSeaweeds) * j + (windowWidth / numSeaweeds) / 2;
    seaweeds.push({ color, width, height, swayRange, swayFrequency, baseX });
  }
}

function draw() {  //畫圖函數，會一直執行
  clear();  // 清除畫布，保持透明背景
  blendMode(BLEND); // 設定混合模式
  
  for (let seaweed of seaweeds) {
    stroke(seaweed.color);
    strokeWeight(seaweed.width);
    noFill(); // 不填充
    
    beginShape(); // 開始繪製形狀
    
    // 計算每個枝節的搖晃
    let segments = 10;
    let segmentLength = seaweed.height / segments;
    let baseX = seaweed.baseX;
    let baseY = windowHeight;
    
    for (let i = 0; i < segments; i++) {
      // 靠近底部的段落搖晃幅度較小
      let sway = sin(frameCount * seaweed.swayFrequency + i * 0.5) * (i / segments) * seaweed.swayRange;
      let x = baseX + sway;
      let y = baseY - i * segmentLength;
      vertex(x, y); // 設定頂點
      baseX = x;
      baseY = y;
    }
    
    endShape(); // 結束繪製形狀
  }
}

function windowResized() {  //視窗大小改變時，會執行這個函數
  resizeCanvas(windowWidth, windowHeight);  //調整畫布大小
}
