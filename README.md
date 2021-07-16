# custom-password-generator-latest

> Custom Password Generator is a library to generate custom password based on user requirements.

## Install

```bash
$ npm install custom-password-generator-latest --save
```

## Usage

#### `generate([options])`

Generate a strong password based on user requirements

```javascript
import getPassword from "custom-password-generator-latest";

const options = {
  length: 12,
  numbers: true,
  symbols: true,
  uppercase: true,
  lowercase: false,
  strict: false,
  excludeSimilarCharacters: true,
  exclude: "(){}[]<>",
};

var password = getPassword(options);

// '1sXuE@3!dwyM'
console.log(password);
```

### Options

following are the default value in options, if your requirement matches with defaults then you don't need to pass options obj

| Name                     | Description                                             | Default Value |
| ------------------------ | ------------------------------------------------------- | ------------- |
| length                   | Integer, length of password.                            | 8             |
| numbers\*                | Boolean, add numbers in password.                       | true          |
| symbols\*                | Boolean, add symbols in password.                       | true          |
| lowercase\*              | Boolean, add lowercase characters in password           | true          |
| uppercase\*              | Boolean, add uppercase characters in password           | false         |
| excludeSimilarCharacters | Boolean, exclude similar chars, like 'o', 'O', '0' etc. | false         |
| exclude                  | String, characters to be excluded from password         | ""            |

\*It is required to set at least one option to true.
