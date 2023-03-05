export const blockWidth = 30 //100
export const blockHeight = 10 //20

export class Block {
    constructor(xAxis, yAxis){
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}
let blocks = []
export let p = 0

for (let x = 10; x<=100; x+=30){  // individually wrote out each element and noticed a pattern; condensed into a nested loop 
  for(let y = 380; y <= 500; y+=15){ //wouldn't work if block position was more complex/ less singular
    blocks[p] = new Block(x, y)
    p++
  }
}

for (let x = 430; x<=520; x+=30){
    for(let y = 380; y <= 500; y+=15){
      blocks[p] = new Block(x, y)
      p++
    }
  }

  for (let x = 230; x<=320; x+=30){
    for(let y = 380; y <= 500; y+=15){
      blocks[p] = new Block(x, y)
      p++
    }
  }


export default blocks


/*new Block(10,380),
new Block(40,380),
new Block(70,380),
new Block(100,380),
new Block(10,395),
new Block(40,395),
new Block(70,395),
new Block(100,395),
new Block(10,410),
new Block(40,410),
new Block(70,410),
new Block(100,410),
new Block(10,425),
new Block(40,425),
new Block(70,425),
new Block(100,425),
new Block(10,440),
new Block(40,440),
new Block(70,440),
new Block(100,440),
new Block(10,455),
new Block(40,455),
new Block(70,455),
new Block(100,455),
new Block(10,470),
new Block(40,470),
new Block(70,470),
new Block(100,470),
new Block(10,485),
new Block(40,485),
new Block(70,485),
new Block(100,485),
new Block(10,500),
new Block(40,500),
new Block(70,500),
new Block(100,500),

new Block(230,380),
new Block(260,380),
new Block(290,380),
new Block(320,380),
new Block(230,395),
new Block(260,395),
new Block(290,395),
new Block(320,395),
new Block(230,410),
new Block(260,410),
new Block(290,410),
new Block(320,410),
new Block(230,425),
new Block(260,425),
new Block(290,425),
new Block(320,425),
new Block(230,440),
new Block(260,440),
new Block(290,440),
new Block(320,440),
new Block(230,455),
new Block(260,455),
new Block(290,455),
new Block(320,455),
new Block(230,470),
new Block(260,470),
new Block(290,470),
new Block(320,470),
new Block(230,485),
new Block(260,485),
new Block(290,485),
new Block(320,485),
new Block(230,500),
new Block(260,500),
new Block(290,500),
new Block(320,500),

new Block(430,380),
new Block(460,380),
new Block(490,380),
new Block(520,380),
new Block(430,395),
new Block(460,395),
new Block(490,395),
new Block(520,395),
new Block(430,410),
new Block(460,410),
new Block(490,410),
new Block(520,410),
new Block(430,425),
new Block(460,425),
new Block(490,425),
new Block(520,425),
new Block(430,440),
new Block(460,440),
new Block(490,440),
new Block(520,440),
new Block(430,455),
new Block(460,455),
new Block(490,455),
new Block(520,455),
new Block(430,470),
new Block(460,470),
new Block(490,470),
new Block(520,470),
new Block(430,485),
new Block(460,485),
new Block(490,485),
new Block(520,485),
new Block(430,500),
new Block(460,500),
new Block(490,500),
new Block(520,500),*/ 



   