export const hasUpperCase = (word: string) => {
  for (let i = 0; i < word.length; i++) {
    if (/^[A-Z]*$/.test(word.charAt(i))) return true;
  }
  return false
}

export const hasLowerCase = (word: string) => {
  for (let i = 0; i < word.length; i++) {
    if (/^[a-z]*$/.test(word.charAt(i))) return true;
  }
  return false
}

export const hasNumber = (word:string)=>{
  for (let i=0; i<word.length; i++) {
    if(/\d/.test(word)) return true
  }
  return false
}

export const hasSpecialChar = (word:string)=>{
  for (let i=0; i<word.length; i++) {
    if(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(word)) return true
  }
  return false
}