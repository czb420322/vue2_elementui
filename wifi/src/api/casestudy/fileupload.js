//地图操作
const mixins = {
  data: function () {
    return {

    }
  },
  methods: {
    fileClick() {
        document.getElementById("upload_file").click();
      },
      fileChange(el) {
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = "";
      },
      fileList(fileList) {
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != "") {
            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
          }
        }
      },
      //文件夹处理
      folders(files) {
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
              _this.folders(file[i]);
            }
          }
        });
      },
      foldersAdd(entry) {
        let _this = this;
        entry.file(function (file) {
          _this.fileAdd(file);
        });
      },
      fileAdd(file) {
        if (this.limit !== undefined) this.limit--;
        if (this.limit !== undefined && this.limit < 0) return;
        //判断是否为图片文件
        if (file.type.indexOf("image") == -1) {
          file.src = "../../assets/case/wenjian.png";
          this.imglist.push({
            file
          });
        } else {
          let reader = new FileReader();
          let image = new Image();
          let _this = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            image.onload = function () {
              let width = image.width;
              let height = image.height;
              file.width = width;
              file.height = height;
              _this.imglist.push({
                file
              });
            };
            image.src = file.src;
          };
        }
      },
      bytesToSize(bytes) {
        if (bytes === 0) return "0 B";
        let k = 1000, // or 1024
          sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
      },
      dragenter(el) {
        el.stopPropagation();
        el.preventDefault();
      },
      dragover(el) {
        el.stopPropagation();
        el.preventDefault();
      },
      drop(el) {
        el.stopPropagation();
        el.preventDefault();
        this.fileList(el.dataTransfer);
      },
      fileDel(index) {
        this.imglist.splice(index, 1);
        if (this.limit !== undefined) this.limit = this.imglist.length;
      },
  }

};
export default mixins
