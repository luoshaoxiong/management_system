<template>
  <div class="v-richtext" contenteditable="true" :placeholder="placeholder" @input="handleChange" @paste="paste" ref="text" autofocus v-once>{{value}}</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    value: String,
    placeholder: String
  },
  data () {
    return {
      imgData: null,
      selection: null,
      files: []
    }
  },
  mounted () {
    this.selection = window.getSelection();
  },
  methods: {
    getContent () {
      let html = this.$el.innerHTML.replace(/<br>/ig, '\n'); // 替换换行
      return html;
    },
    getFiles () {
      let re = /<img.*?data-name="(.+?)"/ig;
      let files = [];
      let result;
      while ((result = re.exec(this.$el.innerHTML)) !== null) {
        let n = Array.find(this.files, (e) => e.fileName === result[1]);
        if (n) {
          files.push(n);
        }
      }
      return files;
    },
    focus () {
      this.$el.focus();
    },
    setContent (content) {
      this.$el.innerHTML = content;
      this.files = [];
    },
    handleChange (e) {
      this.$emit('change-value', e.target.innerHTML);
    },
    paste (e) {
      e.stopPropagation();
      e.preventDefault();
      let clipboardData = e.clipboardData || e.originalEvent.clipboardData;
      let ieData = window.clipboardData;
      let range = this.selection.getRangeAt(0);
      range.deleteContents();
      if (clipboardData.items && clipboardData.items[0].type.search('image') !== -1) { // 处理粘贴图片
        let file = clipboardData.items[0].getAsFile();
        let fileType = /image\/(.+)$/.exec(clipboardData.items[0].type)[1];
        let fileName = 'event' + Date.now() + '.' + fileType;
        let img = document.createElement('img');
        img.dataset.name = fileName;
        this.files.push({
          file,
          fileName
        });
        let fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          img.src = fileReader.result;
        });
        fileReader.readAsDataURL(file);
        range.insertNode(img);
        range = range.cloneRange();
        range.setStartAfter(img);
        range.collapse(true);
        this.selection.removeAllRanges();
        this.selection.addRange(range);
      } else { // 处理粘贴文本
        let pasteText = '';
        if (clipboardData && clipboardData.getData) {
          // w3c
          pasteText = clipboardData.getData('text/plain');
        } else if (ieData && ieData.getData) {
          // IE
          pasteText = ieData.getData('text');
        }
        let textNode = document.createTextNode(pasteText);
        range.insertNode(textNode);
        range = range.cloneRange();
        range.setStartAfter(textNode);
        range.collapse(true);
        this.selection.removeAllRanges();
        this.selection.addRange(range);
        return false;
      }
    },
    insert (node) {
      if (this.selection.rangeCount === 0) {
        this.$el.focus();
      }
      let range = this.selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(node);
      range = range.cloneRange();
      range.setStartAfter(node);
      range.collapse(true);
      this.selection.removeAllRanges();
      this.selection.addRange(range);
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .v-richtext {
    display: inline-block;
    width: 100%;
    resize: none;
    height: 300px;
    overflow: auto;
    overflow-x: hidden;
    white-space: normal;
    border: 1px solid darkgray;
    border-radius: 4px;
    outline: none;
    padding: 6px;

    &:empty::before {
      color: #C5C5C5;
      content: attr(placeholder);
      display: block;
      cursor: text;
    }

    &:hover, &:active {
      box-shadow: 0 0 4px rgba(177, 177, 177, 0.75)
    }

    &:focus {
      &::before {
        display: none;
      }
      border-color: #2AC282;
    }

    img {
      border: 1px solid #CCCCCC;
      margin: 4px;
      border-radius: 3px;
    }
  }
</style>
