export default function (el) {
  var myValue = '\r\n';
  var $t = el;
  if (document.selection) {
    $t.focus();
    var sel = document.selection.createRange();
    sel.text = myValue;
    $t.focus();
    sel.moveStart('character', -1);
  } else if ($t.selectionStart || $t.selectionStart === '0') {
    var startPos = $t.selectionStart;
    var endPos = $t.selectionEnd;
    var scrollTop = $t.scrollTop + 17;
    $t.value = $t.value.substring(0, startPos) + myValue +
      $t.value.substring(endPos, $t.value.length);
    $t.focus();
    $t.selectionStart = startPos + 1;
    $t.selectionEnd = startPos + 1;
    $t.scrollTop = scrollTop;
  } else {
    $t.value += myValue;
    $t.focus();
  }
}
