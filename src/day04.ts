import * as fs from "fs";

// TIL you can explicitly state index types
// And index signatures...
type Passport = { [index: string]: string };
const isValidPassport = (passport: Passport): boolean => {
  if (
    !passport.byr ||
    !passport.iyr ||
    !passport.eyr ||
    !passport.hgt ||
    !passport.hcl ||
    !passport.ecl ||
    !passport.pid
  ) {
    return false;
  }
  return isValidValue(passport);
};

// Probs should filter this out
const isValidValue = (passport: Passport): boolean => {
  const birthYear = Number(passport.byr) 
  if (birthYear > 2002 || birthYear < 1920 || passport.byr.length !== 4) return false;
  const issueYear = Number(passport.iyr);
  if (issueYear < 2010 || issueYear > 2020 || passport.iyr.length !== 4) return false;
  const expirationYear = Number(passport.eyr)
  if (expirationYear < 2020 || expirationYear > 2030 || passport.eyr.length !== 4) return false;
  const unit = passport.hgt.slice(-2);
  const measurement = Number(passport.hgt.slice(0,-2));
  const hairColor = passport.hcl;
  if (hairColor[0] !== "#" || hairColor.length !== 7) return false;
  const validHairColorSet = new Set(["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"])
  for (let i = 1; i < hairColor.length; i++) {
    if (!validHairColorSet.has(hairColor[i])) {
      return false;
    }
  }
  if (unit === "cm") {
    if (measurement < 150 || measurement > 193) return false;
  } 
  else if (unit === "in") {
    if (measurement < 59 || measurement > 76) return false;
  }
  else {
    return false;
  }
  const eyeColors = new Set(["amb","blu","brn","gry","grn","hzl","oth"])
  if (!eyeColors.has(passport.ecl)) return false;
  if (passport.pid.length !== 9 && passport.pid[0] !== "0") return false;
  return true;
}

const day04 = () => {
  try {
    const data = fs.readFileSync("./src/day04_input.txt", "utf-8");
    const lines = data.split(/\r?\n/);
    const passportMap = new Map<number, Passport>();
    let currentPassport = 1;
    let totalValid = 0;
    for (let i = 0; i < lines.length; i++) {
      const currentLine = lines[i];
      let passport: Passport | undefined = passportMap.get(currentPassport);
      if (currentLine === "") {
        if (passport && isValidPassport(passport)) {
          if (passport.eyr > "2030") {
          console.log(passport.eyr)
          }
          totalValid++;
        }
        currentPassport++;
      } else {
        const fields = currentLine.split(" ");
        fields.map((field) => {
          const [key, value] = field.split(":");
          if (!passport) {
            passport = {} as Passport;
          }
          passport[key] = value;
        });
        if (passport) {
          passportMap.set(currentPassport, passport);
        }
      }
    }
    return totalValid;
  } catch (error) {
    console.log(error);
  }
};

console.log(day04());
