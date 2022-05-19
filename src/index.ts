import '$utils/functions';
import {
  arrowIndex,
  arrowSelectCountry,
  div_flag,
  div_prefix,
  div_wait_options,
  processCountryArray,
  setCountryOptionsArray,
  setInitialstate,
  state,
  testAndGoLetter,
  toggleList,
  wait_prefix,
} from '$utils/functions';
import { styles } from '$utils/styles';

// Starter example. Check the comments!
document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(styles);

  const container_hi = document.createElement('div');
  container_hi.style.textAlign = 'center';

  const div_hi = document.createElement('div');
  div_hi.style.textAlign = 'center';
  div_hi.innerHTML = 'Hi! ';
  div_hi.style.color = '#FFF';
  div_hi.style.fontSize = '3.6rem';
  div_hi.style.textShadow = '-3px 3px 5px #000000';

  const img_fin = document.createElement('img');
  img_fin.src =
    'https://assets.website-files.com/5cc19611198b8d7bdfc5fcfb/5d0fb9656003e441075e8fab_UPDATED%20finsweet%20header%20logo.svg';

  div_hi.appendChild(img_fin);
  container_hi.appendChild(div_hi);
  document.body.appendChild(container_hi);

  const phoneForm = document.createElement('form');
  phoneForm.method = 'POST';
  phoneForm.id = 'phone_form';
  phoneForm.name = 'phone_form';
  phoneForm.action = '';

  const countryPrefix = document.createElement('input');
  countryPrefix.type = 'hidden';
  countryPrefix.id = 'country_prefix';
  countryPrefix.name = 'country_prefix';
  countryPrefix.value = '';

  const countryCode = document.createElement('input');
  countryCode.type = 'hidden';
  countryCode.id = 'country_code';
  countryCode.name = 'country_code';
  countryCode.value = '';

  const container = document.createElement('div');
  container.id = 'container';
  container.style.maxWidth = '30rem';
  container.style.border = 'solid 0.1rem #DDD';
  container.style.margin = '0.8rem auto';
  container.style.display = 'flex';
  container.style.flexDirection = 'row';
  container.style.background = '#FFF';

  phoneForm.appendChild(countryPrefix);
  phoneForm.appendChild(countryCode);
  phoneForm.appendChild(container);

  document.body.appendChild(phoneForm);
  document.body.style.color = '#333';
  document.body.style.fontFamily = 'system-ui, "Segoe UI", Roboto, sans-serif';
  document.body.style.fontSize = '1.3rem';

  const div_selector = document.createElement('div');
  div_selector.id = 'div_selector';
  div_selector.style.cursor = 'pointer';
  div_selector.style.display = 'flex';
  div_selector.style.flexDirection = 'row';
  div_selector.setAttribute('aria-controls', 'container_options');
  div_selector.ariaHasPopup = 'listbox';
  div_selector.ariaExpanded = 'false';
  div_selector.tabIndex = 1;

  div_prefix.appendChild(wait_prefix);

  const div_dropdown = document.createElement('div');
  div_dropdown.id = 'div_dropdown';
  div_dropdown.style.paddingTop = '0.5rem';
  div_dropdown.style.fontSize = '1rem';

  const chevron_down = document.createElement('img');
  chevron_down.id = 'chevron_down';
  chevron_down.src = 'https://cdn.iconscout.com/icon/free/png-256/down-chevron-1767466-1502536.png';
  chevron_down.style.maxWidth = '2rem';

  div_dropdown.appendChild(chevron_down);

  const container_options = document.createElement('nav');
  container_options.id = 'container_options';
  container_options.style.border = 'solid 0.0625rem #EEE';
  container_options.style.width = '7rem';
  container_options.style.maxHeight = '16rem';
  container_options.style.position = 'absolute';
  container_options.style.top = '9.3rem';
  container_options.style.overflowY = 'scroll';
  container_options.style.display = 'none';
  container_options.style.background = '#FFF';
  container_options.style.zIndex = '42';
  container_options.style.fontSize = '1.3rem';

  const wait_options = document.createElement('img');
  wait_options.id = 'wait_options';
  wait_options.src = '_img/wait.svg';
  wait_options.style.maxWidth = '2rem';

  div_wait_options.appendChild(wait_options);
  container_options.appendChild(div_wait_options);

  div_selector.appendChild(div_flag);
  div_selector.appendChild(div_prefix);
  div_selector.appendChild(div_dropdown);
  div_selector.appendChild(container_options);

  const div_number = document.createElement('div');
  div_number.id = 'div_number';
  div_number.style.fontSize = '1rem';
  div_number.style.flexShrink = '0';
  div_number.style.flexGrow = '1';
  div_number.style.width = '10rem';

  const input_number = document.createElement('input');
  input_number.name = 'phone_number';
  input_number.className = 'phone_number';
  input_number.id = 'phone_number';
  input_number.placeholder = 'Your phone';
  input_number.required = true;
  input_number.style.padding = '0.8rem 0.4rem';
  input_number.style.fontSize = '1.1rem';
  input_number.style.border = 'none';
  input_number.tabIndex = 2;

  div_number.appendChild(input_number);

  const div_button = document.createElement('div');
  div_button.id = 'div_button';
  div_button.style.fontSize = '1rem';

  const input_button = document.createElement('button');
  input_button.id = 'input_button';
  input_button.name = 'submit';
  input_button.type = 'submit';
  input_button.style.padding = '0.8rem 0.4rem';
  input_button.style.color = '#FFF';
  input_button.style.border = 'none';
  input_button.style.width = '100%';
  input_button.style.background = '#F7BA5F';
  input_button.style.fontWeight = 'bold';
  input_button.style.cursor = 'pointer';
  input_button.innerHTML = 'Submit';
  input_button.style.fontSize = '1.1rem';
  input_button.tabIndex = 3;

  div_button.appendChild(input_button);

  container.appendChild(div_selector);
  container.appendChild(div_number);
  container.appendChild(div_button);

  const container_dev = document.createElement('div');
  container_dev.style.textAlign = 'center';
  container_dev.style.paddingTop = '.7rem';
  container_dev.style.textShadow = '-3px 3px 5px #000000';
  container_dev.style.fontSize = '2rem';

  const div_by = document.createElement('div');
  div_by.innerHTML = 'Created by:';
  div_by.style.textAlign = 'center';
  div_by.style.color = '#FFF';
  div_by.style.marginBottom = '.3rem';
  div_by.style.fontSize = '2rem';

  container_dev.appendChild(div_by);

  const img_i = document.createElement('img');
  img_i.src = 'https://imagemviva.com.br/_img/fabiano.png';
  img_i.style.width = '12rem';
  img_i.style.filter = 'drop-shadow(-3px 3px 5px #000000)';

  container_dev.appendChild(img_i);

  const div_name = document.createElement('div');
  div_name.innerHTML = '<span style="color:#F7BA5F;">Fabiano</span> Alves';
  div_name.style.textAlign = 'center';
  div_name.style.color = '#FFF';
  div_name.style.marginBottom = '.3rem';
  div_name.style.fontSize = '2.5rem';

  container_dev.appendChild(div_name);

  document.body.appendChild(container_dev);

  const arrayCoutriesFull = setCountryOptionsArray('https://restcountries.com/v3.1/all');
  arrayCoutriesFull.then(() => {
    return processCountryArray(container_options);
  });

  // It does Retun to initial state
  window.addEventListener('click', function (event) {
    setInitialstate(event);
  });
  // -----------------------------

  // It changes the button label
  const phone_form = document.getElementById('phone_form');
  if (phone_form === null) {
    throw new Error('phone form do not exists');
  }
  if (input_button === null) {
    throw new Error('phone form do not exists');
  }
  phone_form.addEventListener('submit', function (event) {
    event.preventDefault();
    input_button.innerHTML = 'Sending...';
    setTimeout(function () {
      const http = new XMLHttpRequest();
      http.onreadystatechange = function () {
        if (this.readyState === 4) {
          const div = document.getElementById('container');
          if (div === null) {
            throw new Error('element do not exists');
          }
          div.innerHTML = 'Thank you for your submission!';
          div.style.textAlign = 'center';
          div.style.background = '#EEE';
          div.style.display = 'block';
          div.style.padding = '.7rem 0 1rem';
        }
      };
      http.open('POST', '/index.html', true);
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      const phone_number = document.getElementById('phone_number') as HTMLInputElement;
      if (phone_number === null) {
        throw new Error('phone number is empty');
      }
      const country_prefix = document.getElementById('country_prefix') as HTMLInputElement;
      if (country_prefix === null) {
        throw new Error('country prefix number is empty');
      }
      const country_code = document.getElementById('country_code') as HTMLInputElement;
      if (country_code === null) {
        throw new Error('phone number is empty');
      }
      http.send(
        'phone_number=' +
          phone_number.value +
          '&country_prefix=' +
          country_prefix.value +
          '&country_code=' +
          country_code.value
      );
    }, 600);
  });
  // -----------------------------

  // Action that opens/closes the Country Options
  div_selector.addEventListener('click', function () {
    toggleList();
  });
  // ------------------------------

  // Action that closes the Country Options
  div_selector.addEventListener('blur', function (event) {
    setInitialstate(event);
  });
  // ------------------------------

  // Action that closes the Country Options
  div_selector.addEventListener('focusout', function (event) {
    setInitialstate(event);
  });
  // ------------------------------

  // Action that opens/closes the Country Options
  div_selector.addEventListener('keypress', function (event) {
    const KeyID = event.keyCode;
    switch (KeyID) {
      case 13:
        if (state === 1) {
          const option = document.getElementById('div_container_option_' + arrowIndex);
          if (option === null) {
            throw new Error('no option found');
          }
          option.click();
          toggleList();
        }
        toggleList();
        break;
      case 32:
        if (state === 1) {
          const option = document.getElementById('div_container_option_' + arrowIndex);
          if (option === null) {
            throw new Error('no option found');
          }
          option.click();
          toggleList();
        }
        toggleList();
        break;
      default:
        if (state === 1) {
          testAndGoLetter(KeyID);
        }
        break;
    }
  });
  // ------------------------------

  // Action that opens/closes the Country Options
  document.addEventListener('keydown', function (event) {
    if (state === 1) {
      switch (event.keyCode) {
        case 38:
          arrowSelectCountry('up');
          break;
        case 40:
          arrowSelectCountry('down');
          break;
      }
    }
  });
  // ------------------------------
});
