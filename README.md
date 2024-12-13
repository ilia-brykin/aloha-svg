![npm (scoped)](https://img.shields.io/npm/v/aloha-svg?label=NPM)
![NPM](https://img.shields.io/npm/l/aloha-svg?label=License)
![npm](https://img.shields.io/npm/dt/aloha-svg?label=Downloads)

# Aloha-SVG

Aloha-SVG is a collection of SVG icons and their JavaScript equivalents, designed to simplify integration into JavaScript projects. It provides both raw SVG files and pre-converted JavaScript modules for easy usage.

## Features

- A comprehensive collection of SVG icons from popular libraries.
- Pre-converted JavaScript modules for effortless use in JS projects.
- Support for multiple open-source icon libraries with more to be added.
- Distributed under the MIT license for wide compatibility.

## Installation

To install the Aloha-SVG package via npm, run the following command:

```bash
npm install aloha-svg
```

## Included Icon Libraries

Currently, Aloha-SVG includes icons from the following libraries:

1. **Bootstrap Icons**

    - [Bootstrap Icons](https://icons.getbootstrap.com/)
    - License: MIT

2. **Flag Icons**

    - [Flag Icons](https://github.com/lipis/flag-icons)
    - License: MIT

3. **Bootstrap 3 Glyphicons** (available as SVGs)

    - [Bootstrap 3 Icons](https://getbootstrap.com/docs/3.4/components/#glyphicons)
    - License: MIT

4. **Tabler Icons**

    - [Tabler Icons](https://tabler.io/icons)
    - License: MIT

This list will expand in the future as more libraries are added.

## Usage

Aloha-SVG provides both raw SVG files and their JavaScript equivalents. Simply import the icons or SVGs you need into your project:

```javascript
import AlphabetUppercase from 'aloha-svg/js/bootstrap/AlphabetUppercase.js';
import ArrowDown from 'aloha-svg/js/bootstrap3/ArrowDown.js';
import De from 'aloha-svg/js/flags/1x1/De.js';
import Bg from 'aloha-svg/js/flags/4x3/Bg.js';
import Alarm from 'aloha-svg/js/tabler/filled/Alarm.js';
import Activity from 'aloha-svg/js/tabler/outline/Activity.js';

document.body.innerHTML = AlphabetUppercase;
```

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/ilia-brykin/aloha-svg/blob/main/LICENSE) file for details.

