export function customHash(input, length = 10) {
    let hash = 0;
  
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
  
    hash = Math.abs(hash);
    const hashString = hash.toString(16);
    console.log(hashString.substring(0, length))
    return hashString.substring(0, length);
  }
  
  // Usage
//   console.log(customHash("Your input string", 10)); // Custom hash of 10 c
