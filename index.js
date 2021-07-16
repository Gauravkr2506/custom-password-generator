// Possible combinations
const lowercase = "abcdefghijklmnopqrstuvwxyz",
  uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers = "0123456789",
  symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~',
  similarCharacters = /[ilLI|`oO0]/g,
  strictRules = [
    { name: "lowercase", rule: /[a-z]/ },
    { name: "uppercase", rule: /[A-Z]/ },
    { name: "numbers", rule: /[0-9]/ },
    { name: "symbols", rule: /[!@#$%^&*()+_\-=}{[\]|:;"/?.><,`~]/ },
  ];

// Generates a random number
function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate password logic and validation
function generate(options, pool) {
  var password = "",
    optionsLength = options.length,
    poolLength = pool.length;

  for (var i = 0; i < optionsLength; i++) {
    password += pool[getRandomInt(poolLength - 1)];
  }

  if (options.strict) {
    const isValid = strictRules.every(
      (rule) => options[rule.name] == false || rule.rule.test(password)
    );

    if (!isValid) return generate(options, pool);
  }
  return password;
}

// Default Options
const defaultOptions = {
  length: 8,
  numbers: true,
  symbols: true,
  uppercase: true,
  lowercase: true,
  strict: false,
  excludeSimilarCharacters: false,
  exclude: "",
};

// Generate password build pool and get password from pool
function generatePassword(options = {}) {
  if (typeof options !== "object") {
    throw new TypeError("pass valid option or no option");
  }

  options = { ...defaultOptions, ...options };

  if (typeof options.exclude !== "string") {
    throw new TypeError("exclude property in options must be string");
  }

  if (options.strict) {
    var minStrictLength =
      (options.numbers ? 1 : 0) +
      (options.symbols ? 1 : 0) +
      (options.uppercase ? 1 : 0) +
      (options.lowercase ? 1 : 0);

    if (minStrictLength > options.length) {
      throw new TypeError("short length for strict case");
    }
  }

  // Generate character pool
  var pool = "";

  if (options.lowercase) {
    pool += lowercase;
  }
  if (options.uppercase) {
    pool += uppercase;
  }
  if (options.numbers) {
    pool += numbers;
  }
  if (options.symbols) {
    pool += symbols;
  }

  if (!pool) {
    return "";
  }

  // Exclude similar characters
  if (options.excludeSimilarCharacters) {
    pool = pool.replace(similarCharacters, "");
  }
  // Excludes characters from the pool
  var i = options.exclude.length;
  while (i--) {
    pool = pool.replace(options.exclude[i], "");
  }
  var password = generate(options, pool);
  return password;
}
module.exports = generatePassword;
