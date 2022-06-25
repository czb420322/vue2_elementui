const mixins = {
  data: function () {
    return {

    }
  },
  computed: {
    imgListWH() {
      let arr = [];
      let dList = this.commLabeList;
      if (dList.length) {
        for (let i = 0; i < dList.length; i++) {
          // setTimeout(() => {
             if (document.getElementById('marker_0')) {
               console.log(dList[i]);
               let imgw = document.getElementById('marker_' + i).naturalWidth;
               let imgh = document.getElementById('marker_' + i).naturalHeight;
               let rate = this.$store.state.screenWidth / 1920;
               let retw = document.getElementById('markLi' + i).clientWidth * rate;
               let reth = document.getElementById('markLi' + i).clientHeight * rate;
               console.log(imgw, retw);
               console.log(imgh, reth);
               let unit = 1;
               let unitTop = 0
               let unitLeft = 0
               if (retw / reth < imgw / imgh) {
                 arr.push("width");
                 unit = imgw / retw;
                 unitTop = (reth - imgh / unit) / 2;
               } else {
                 arr.push("height");
                 unit = imgh / reth;
                 unitLeft = (retw - imgw / unit) / 2;
               }
               // for (let j = 0; j < dList[i].attrList.length; j++) {
               // }
               // let top = unitTop + dList[i].leftTopY / unit;
               // let left = unitLeft + dList[i].leftTopX / unit;
               // let width = (dList[i].rightBtmX - dList[i].leftTopX) / unit;
               // let height = (dList[i].rightBtmY - dList[i].leftTopY) / unit;
               // setTimeout(() => {
               //   let bbb = document.getElementById('img_' + i)
               //   bbb.style.width = width + 'px'
               //   bbb.style.height = height + 'px'
               //   bbb.style.border = '1px solid red'
               //   bbb.style.top = top + 'px'
               //   bbb.style.left = left + 'px'

               // }, 100);

             }
          // }, 10);

        }
      }
      return arr;
    },

    computed: {
      imgListWH() {
        let dList = this.commLabeList;
        let arr = [];
        if (dList.length) {
          for (let i = 0; i < dList.length; i++) {
            if (document.getElementById('marker_0')) {
              console.log(dList[i]);
              //  let imgw = document.getElementById('marker_' + i).naturalWidth;
              //  let imgh = document.getElementById('marker_' + i).naturalHeight;
              let imgw = 1920;
              let imgh = 1080;
              let rate = this.$store.state.screenWidth / 1920;
              let retw = document.getElementById('markLi' + i).clientWidth * rate;
              let reth = document.getElementById('markLi' + i).clientHeight * rate;
              let unit = 1;
              let unitTop = 0
              let unitLeft = 0
              if (retw / reth < imgw / imgh) {
                arr.push("width");
                unit = imgw / retw;
                unitTop = (reth - imgh / unit) / 2;
              } else {
                arr.push("height");
                unit = imgh / reth;
                unitLeft = (retw - imgw / unit) / 2;
              }
              let leftTopY
              let leftTopX
              let rightBtmX
              let rightBtmY
              for (let j = 0; j < dList[i].attrList.length; j++) {
                for (let key in dList[i].attrList[j]) {
                  if (dList[i].attrList[j][key] == 'leftTopY') {
                    leftTopY = dList[i].attrList[j]['valueName']
                    // console.log(dList[i].attrList[j]['valueName'], 333);
                  } else if (dList[i].attrList[j][key] == 'leftTopX') {
                    leftTopX = dList[i].attrList[j]['valueName']
                  } else if (dList[i].attrList[j][key] == 'rightBtmX') {
                    rightBtmX = dList[i].attrList[j]['valueName']
                  } else if (dList[i].attrList[j][key] == 'rightBtmY') {
                    rightBtmY = dList[i].attrList[j]['valueName']
                  }
                }
              }
              let top = unitTop + leftTopY / unit;
              let left = unitLeft + leftTopX / unit;
              let width = (rightBtmX - leftTopX) / unit;
              let height = (rightBtmY - leftTopY) / unit;
              setTimeout(() => {
                let bbb = document.getElementById('img_' + i)
                bbb.style.width = width + 'px'
                bbb.style.height = height + 'px'
                bbb.style.border = '1px solid red'
                bbb.style.top = top + 'px'
                bbb.style.left = left + 'px'

              }, 100);
            }


          }
        }
        return arr;
      },
    },
  }
};
export default mixins
