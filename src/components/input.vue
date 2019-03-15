<!--解决 中文输入法下未确认键入但拼音已计入字数统计 的问题-->
<template>
  <el-input
    v-model="inputValue"
    :type="type === 'textarea' ? 'textarea' : 'text'"
    :placeholder="placeholder"
    resize="none"
    :rows="rows"
    @keydown.native="keydownInput($event)"
    @keyup.native="keyupInput($event)"
    @blur="blurInput($event)"
  >
  </el-input>
</template>

<script type="text/ecmascript-6">
export default{
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    rows: {
      type: Number
    }
  },
  data () {
    return {
      inputValue: this.value
    };
  },
  watch: {
    inputValue (val) {
      this.$emit('input', val);
    }
  },
  methods: {
    keydownInput (e) {
      if (e.code === 'Enter') { // 结合下面keyup的isComposing识别真正的字符输入
        this.inputValue = e.target.value;
      }
    },
    keyupInput (e) {
      if (!e.isComposing) { // 输入完成时才赋值，比如开启中文输入法
        this.inputValue = e.target.value;
      }
    },
    blurInput (e) {
      this.inputValue = e.target.value;
    }
  }
}
</script>
