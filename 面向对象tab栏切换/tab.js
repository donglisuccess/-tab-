let that;
class Tab {
  constructor(id) {
    that = this;
    this.main = document.querySelector(id);
    this.ul = this.main.querySelector("ul");
    this.mainCon = this.main.querySelector('.main');
    this.add = this.main.querySelector('.add');
    this.init();
  }
  // init初始化程序,设置点击事件
  init() {
    this.updataNode();
    this.add.onclick = this.addTable;
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTable;
      this.delete[i].onclick = this.deleteTable;
      this.span[i].ondblclick = this.editTable;
    }
  }
  // 更新标签元素
  updataNode() {
    this.lis = this.main.querySelectorAll("nav li");
    this.sections = this.main.querySelectorAll(".main section");
    this.delete = this.ul.querySelectorAll("span:nth-child(2)");
    this.span = this.ul.querySelectorAll("span:nth-child(1)");
  }
  // 切换操作
  toggleTable() {
    that.removeStyle();
    this.className = "liStyle";
    that.sections[this.index].className = "sectionStyle";
  }
  // 删除一个元素上面的所有样式
  removeStyle() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = "";
      this.sections[i].className = ""
    }
  }
  // 增加操作
  addTable() {
    let number = that.lis.length + 1;
    let li = '<li class="liStyle"><span>第' + number + '个</span><span>X</span></li>'
    let section = '<section class="sectionStyle"><span>第' + number + '个</span>section</section>';
    that.ul.insertAdjacentHTML("beforeend", li);
    that.mainCon.insertAdjacentHTML("beforeend", section);
    that.init();
    that.removeStyle();
    that.lis[that.lis.length - 1].click();
  }
  // 删除操作
  deleteTable(e) {
    e.stopPropagation();
    that.ul.removeChild(that.lis[this.parentNode.index]);
    that.mainCon.removeChild(that.sections[this.parentNode.index]);
    if (this.parentNode.className) {
      // console.log(this.parentNode.index);
      that.lis[this.parentNode.index - 1] && that.lis[this.parentNode.index - 1].click();
    }
  }
  // 编辑操作
  editTable() {
    // 阻止选中文字操作
    window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty();
    let _that =this;
    this.innerHTML = "<input type='text' value=" + this.innerHTML + ">";
    let input = this.children[0];
    input.select();
    input.onblur = function () {
      _that.innerHTML = this.value;
    }
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
       this.blur();
      }
    }
  }
}
new Tab(".tab");