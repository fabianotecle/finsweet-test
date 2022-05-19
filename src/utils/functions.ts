import type { ArrowDirection, Country, JsonCountry } from '$utils/interfaces';

// It starts closed
export let state = 0;

// It identifies if the click sets an action
let doingAction = 0;

// It identifies the selected option index
let selectedOptionIndex = 0;

// It identifies the arrows position option index
export let arrowIndex = 0;

// It identifies the option max index
let optionMaxIndex = 0;

// Gets the user contry
const language = navigator.language.split('-');
const mycountry = language[1];

// It sets the div options height
let options_height = 44;

// It sets the container options mid position
const options_mid_position = 103;

// It will be setted with country entries
const countryEntries: Country[] = [];

export const div_flag = document.createElement('div');
div_flag.id = 'div_flag';
div_flag.style.padding = '0.7rem 0.4rem 0';
div_flag.innerHTML = '&nbsp;';
div_flag.style.textAlign = 'center';

export const div_prefix = document.createElement('div');
div_prefix.id = 'div_prefix';
div_prefix.style.paddingTop = '0.5rem';
div_prefix.style.textAlign = 'center';
div_prefix.style.fontSize = '1.4rem';

export const wait_prefix = document.createElement('img');
wait_prefix.id = 'wait_prefix';
wait_prefix.src = '_img/wait.svg';
wait_prefix.style.maxWidth = '2rem';

export const div_wait_options = document.createElement('div');
div_wait_options.style.textAlign = 'center';
div_wait_options.id = 'div_wait_options';
div_wait_options.style.padding = '.3rem 0 .1rem';

export function setInitialstate(event: Event) {
  let id = '';
  const target = event.target as HTMLDivElement;
  if (target) {
    id = target.id;
  }

  if (state === 1 && doingAction === 0 && id !== 'container_options') {
    state = 0;
    const chevron_down = document.getElementById('chevron_down');
    if (chevron_down) {
      chevron_down.style.transform = 'rotate(0deg)';
    }
    const container_options = document.getElementById('container_options');
    if (container_options) {
      container_options.style.display = 'none';
    }
  }
  doingAction = 0;
}

export function toggleList() {
  doingAction = 1;
  arrowIndex = selectedOptionIndex;
  if (state === 0) {
    state = 1;
    const chevron_down = document.getElementById('chevron_down');
    if (chevron_down) {
      chevron_down.style.transform = 'rotate(180deg)';
    }
    const container_options = document.getElementById('container_options');
    if (container_options) {
      container_options.style.display = 'block';
    }
    // It sets the scroll position over the selected contry
    const containerOptions = document.getElementById('container_options');
    if (containerOptions) {
      containerOptions.scrollTop = options_height * selectedOptionIndex - options_mid_position;
    }
  } else {
    state = 0;
    const chevron_down = document.getElementById('chevron_down');
    if (chevron_down) {
      chevron_down.style.transform = 'rotate(0deg)';
    }
    const container_options = document.getElementById('container_options');
    if (container_options) {
      container_options.style.display = 'none';
    }
  }
}

export function setCountryEvent(event: Event) {
  if (event.target === null) {
    throw new Error('Target not found');
  }
  const target = event.target as HTMLDivElement;
  const flag = target.getAttribute('data-flag');
  const prefix = target.getAttribute('data-prefix');

  // Sets the hidden input
  const country_code = document.getElementById('country_code') as HTMLInputElement;
  const c_code = target.getAttribute('data-cca2');
  if (country_code && c_code) {
    country_code.value = c_code;
  }

  const country_prefix = document.getElementById('country_prefix') as HTMLInputElement;
  if (country_prefix && prefix) {
    country_prefix.value = prefix;
  }

  const data_index = target.getAttribute('data-index');
  if (data_index !== null) {
    selectedOptionIndex = parseInt(data_index);
  }

  if (flag !== null && prefix !== null) {
    setCountry(flag, prefix);
  }

  const options = document.getElementsByClassName('div_container_option');
  for (let i = 0; i < options.length; i++) {
    options[i].ariaSelected = 'false';
    options[i].classList.remove('selected');
  }
  target.ariaSelected = 'true';
  target.classList.add('selected');
  // It updates the options_height
  const div_height = target.scrollHeight;
  if (div_height > 0) {
    options_height = div_height;
  }
}

export function setArrowSelectedCountry(index: number) {
  const options = document.getElementsByClassName('div_container_option');
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove('arrow-selected');
  }
  const option = document.getElementById(`div_container_option_${index}`);
  if (option === null) {
    throw new Error('index not found');
  }
  option.classList.add('arrow-selected');
  // It updates the options_height
  const div_height = option.scrollHeight;
  if (div_height > 0) {
    options_height = div_height;
  }
  // It sets the scroll position over the selected contry
  const containerOptions = document.getElementById('container_options');
  if (containerOptions === null) {
    throw new Error('there is no country options');
  }
  containerOptions.scrollTop = options_height * index - options_mid_position;
}

export function arrowSelectCountry(direction: ArrowDirection) {
  if (direction === 'up') {
    if (arrowIndex > 0) {
      arrowIndex = arrowIndex - 1;
      setArrowSelectedCountry(arrowIndex);
    }
  } else {
    if (arrowIndex < optionMaxIndex - 1) {
      arrowIndex = arrowIndex + 1;
      setArrowSelectedCountry(arrowIndex);
    }
  }
}

export function testAndGoLetter(key: number) {
  if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) {
    const letter_search = String.fromCharCode(key).toUpperCase();
    const options = document.getElementsByClassName('div_container_option');
    for (let i = 0; i < options.length; i++) {
      const cca2 = options[i].getAttribute('data-cca2');
      let letter_found = '';
      if (cca2 !== null) {
        letter_found = cca2.charAt(0).toUpperCase();
      }
      if (letter_search === letter_found) {
        const index = options[i].getAttribute('data-index');
        if (index === null) {
          throw new Error('No index passed');
        }
        arrowIndex = parseInt(index);
        setArrowSelectedCountry(arrowIndex);
        break;
      }
    }
  }
}

export function processCountryArray(container_options: HTMLElement) {
  let ordened = false;

  while (!ordened) {
    ordened = true;
    let i = 0;
    countryEntries.forEach(function () {
      if (i > 0) {
        if (countryEntries[i - 1].cca2 > countryEntries[i].cca2) {
          const aux = countryEntries[i];
          countryEntries[i] = countryEntries[i - 1];
          countryEntries[i - 1] = aux;
          ordened = false;
        }
      }
      i = i + 1;
    });
  }

  countryEntries.forEach(function (country) {
    addCountryOption(country.cca2, country.flag, country.prefix, country.name, container_options);
  });
}

export async function setCountryOptionsArray(file: string) {
  const x = await fetch(file);
  const json = (await x.json()) as JsonCountry[];
  const ignore = ['US', 'PR', 'RU', 'EH', 'KZ', 'VA', 'DO', 'SH'];
  for (const value of Object.values(json)) {
    let prefix = '';
    if (value.idd.root) {
      prefix += value.idd.root;
      if (value.idd.suffixes[0] && !ignore.includes(value.cca2)) {
        prefix += value.idd.suffixes[0];
      }
    }
    const country_entry = {
      cca2: value.cca2,
      flag: value.flags.svg,
      prefix: prefix,
      name: value.name.common,
    };
    countryEntries.push(country_entry);
  }
  return true;
}

function addCountryOption(cca2: string, flag: string, prefix: string, name: string, container_options: HTMLElement) {
  const div_img = document.createElement('div');
  div_img.className = 'div_img';
  div_img.style.background = 'url(' + flag + ') center center no-repeat';
  div_img.style.backgroundSize = 'cover';
  div_img.style.height = '1.5rem';
  div_img.style.width = '1.5rem';
  div_img.style.margin = '0 auto';

  const div_container_option = document.createElement('div');
  div_container_option.id = 'div_container_option_' + optionMaxIndex;
  div_container_option.className = 'div_container_option';
  div_container_option.style.display = 'flex';
  div_container_option.style.flexDirection = 'row';
  div_container_option.style.padding = '.5rem 0';
  div_container_option.style.cursor = 'pointer';
  div_container_option.setAttribute('data-cca2', cca2);
  div_container_option.setAttribute('data-prefix', prefix);
  div_container_option.setAttribute('data-flag', flag);
  div_container_option.setAttribute('data-index', optionMaxIndex.toString());
  div_container_option.addEventListener('click', setCountryEvent, false);
  div_container_option.ariaSelected = 'false';
  div_container_option.ariaLabel = name;
  div_container_option.title = name;

  if (optionMaxIndex === 0 || cca2 === mycountry) {
    div_container_option.click();
  }
  optionMaxIndex = optionMaxIndex + 1;

  const div_option_flag = document.createElement('div');
  div_option_flag.id = 'div_option_flag_' + cca2;
  div_option_flag.style.flex = '50%';
  div_option_flag.innerHTML = div_img.outerHTML;
  div_option_flag.style.pointerEvents = 'none';

  const div_option_cca2 = document.createElement('div');
  div_option_cca2.id = 'div_option_cca2_' + cca2;
  div_option_cca2.style.flex = '50%';
  div_option_cca2.style.textAlign = 'center';
  div_option_cca2.innerHTML = cca2;
  div_option_cca2.style.pointerEvents = 'none';

  div_container_option.appendChild(div_option_flag);
  div_container_option.appendChild(div_option_cca2);
  container_options.appendChild(div_container_option);
}

function setCountry(flag: string, prefix: string) {
  const div_img = document.createElement('div');
  div_img.className = 'div_img';
  div_img.style.background = 'url(' + flag + ') center center no-repeat';
  div_img.style.backgroundSize = 'cover';
  div_img.style.height = '1.5rem';
  div_img.style.width = '1.5rem';
  div_img.style.margin = '0 auto';

  div_flag.innerHTML = div_img.outerHTML;
  div_prefix.innerHTML = prefix;
  div_wait_options.style.display = 'none';
}
