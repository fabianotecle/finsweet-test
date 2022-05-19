export const styles = document.createElement('style');
let style_code =
  'body { background:url(_img/lion.jpg), #230A2C; background-size: cover; background-position: center center; background-repeat: no-repeat; background-attachment: fixed; }';
style_code += '.phone_number:focus, #div_selector:focus {outline: none !important;}';
style_code +=
  '#div_prefix, #chevron_down {-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}';
style_code += '#div_selector:hover, #div_selector:focus {background-color: #EEE;}';
style_code += '#input_button:hover {background: #F7C75F !important;}';
style_code += '.div_container_option:hover {background: #EEE !important;}';
style_code += '.div_container_option.selected {background: #E7E7E7 !important;}';
style_code += '.div_container_option.arrow-selected {background: #EEE !important;}';
style_code +=
  '#div_selector, #input_button, #chevron_down, #container_options {-moz-transition: ease-in-out .2s;-webkit-transition: ease-in-out .2s;-ms-transition: ease-in-out .2s;-o-transition: ease-in-out .2s;transition: ease-in-out .2s}';
style_code += '.div_img {-webkit-border-radius: 1.6rem;-moz-border-radius: 1.6rem;border-radius: 1.6rem;}';
style_code += '::placeholder {color: #CCC;opacity: 1;}';
style_code += '::-ms-input-placeholder {color: #CCC;}';
style_code += '::-ms-input-placeholder {color: #CCC;}';
styles.innerHTML = style_code;
