//画线的方法
export function draw(coordinates, context) {
  if (coordinates.length === 0) {
      return false
  }
  var length = coordinates.length;
  // 节点小于三绘制线 反之绘制块
  if (length < 3) {
      // 获取初始坐标
      context.beginPath();
      context.strokeStyle = "red";
      if (!coordinates[0][0]) {
          context.moveTo(coordinates[0], coordinates[1]);
      } else {
          context.moveTo(coordinates[0][0], coordinates[0][1]);
          for (let i = 1; i < length; i++) {
              var coordinate = coordinates[i];
              context.lineTo(coordinate[0], coordinate[1])
          }
      }
      context.closePath();
      context.stroke();
  }
}
//画圆的方法
export function circle(context, x, y) {
  context.beginPath();
  context.fillStyle = "#84FF82"
  context.arc(x, y, 5, 0, 2 * Math.PI, true);
  context.fill()
  context.stroke();
}

// 画箭头的方法
// 用原生的衍生方法
export function Line(x1, y1, x2, y2, color) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.color = color
}
Line.prototype.drawWithArrowheads = function (ctx) {
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(this.x1, this.y1);
  ctx.lineTo(this.x2, this.y2);
  ctx.stroke();
  // draw the starting arrowhead
  // var startRadians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
  // startRadians += ((this.x2 > this.x1) ? -90 : 90) * Math.PI / 180;
  // this.drawArrowhead(ctx, this.x1, this.y1, startRadians);
  // draw the ending arrowhead
  var endRadians
  endRadians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
  endRadians += ((this.x2 > this.x1) ? 90 : -90) * Math.PI / 180;
  if (this.x1 == this.x2) {
      if (endRadians == -3.141592653589793) {
          endRadians = -0.01
      } else if (endRadians == 0) {
          endRadians = 3.14
      }
      //   if((endRadians >0 && endRadians < 1)  || (endRadians < 0 && endRadians > -1) || endRadians == -3.141592653589793){
      //     console.log(11111)
      //     endRadians = - 0.01
      //   }else if((endRadians > 1 && endRadians < 3.15) || (endRadians > -3.14 && endRadians < -1) || endRadians == 0){
      //     console.log(222222)
      //     endRadians = 3.14
      //   }
  }
  this.drawArrowhead(ctx, this.x2, this.y2, endRadians);

}
Line.prototype.drawArrowhead = function (ctx, x, y, radians) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(radians);
  ctx.moveTo(0, 0);
  ctx.lineTo(5, 20);
  ctx.lineTo(-5, 20);
  ctx.closePath();
  ctx.restore();
  ctx.fill();
}





//多边形
export function drawPolygon(context, coordinates) {
  // context.clearRect(0, 0, e.target.clientWidth, e.target.clientHeight);
  var length = coordinates.length;
  context.beginPath();
  context.moveTo(coordinates[0][0], coordinates[0][1]);
  for (let i = 1; i < length; i++) {
      var coordinate = coordinates[i];
      context.lineTo(coordinate[0], coordinate[1])
  }

  context.strokeStyle = '#409eff';
  context.fillStyle = "rgba(0,255,0,0.3)";
  context.fill();
  context.closePath();
  context.stroke();
}

//清空画布
export function clearRect(context, x, y) {
  context.clearRect(0, 0, x, y);
}


//获取坐标 图片的实际宽高
export function coorValue(imgs, coordinates, actualcoord) {
  var imgw = imgs.naturalWidth
  var imgh = imgs.naturalHeight
  var retw = imgs.clientWidth
  var reth = imgs.clientHeight
  for (let i = 0; i < coordinates.length; i++) {
      var arr = coordinates[i]
      var thearr = []
      thearr[0] = parseInt(imgw * arr[0] / retw);
      thearr[1] = parseInt(imgh * arr[1] / reth)
      actualcoord.push(thearr)
  }
}

//获取判断图片的宽度和高度
export function imgwh(imgs, reterimg) {
  var imgw = imgs.naturalWidth
  var imgh = imgs.naturalHeight
  var retw = reterimg.clientWidth
  var reth = reterimg.clientHeight
  console.log(imgw, imgh, retw, reth);
  if (retw / reth < imgw / imgh) {
      imgs.style.width = "100%"
      imgs.style.height = 'auto'
  } else {
      imgs.style.height = "100%"
      imgs.style.width = 'auto'
  }
}

export function windowToCanvas(canvas, x, y) {
  let rect = canvas.getBoundingClientRect()
  return {
      x: x - rect.left * (canvas.width / rect.width),
      y: y - rect.top * (canvas.height / rect.height)
  }
}
