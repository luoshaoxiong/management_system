const clickOutside = {
  inserted: (el, binding, vnode) => {
    this.documentHandler = (e) => {
      if (!el.contains(e.target)) {
        if (binding.expression) {
          vnode.context[binding.expression]();
        }
      }
    };
    document.addEventListener('click', this.documentHandler);
  },
  unbind: () => {
    document.removeEventListener('click', this.documentHandler);
  }
};

export default clickOutside;
