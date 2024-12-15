export function detectBias(text: string): string {
  // This is a mock function. In a real application, you would implement
  // a more sophisticated algorithm or make an API call here.
  const lowercaseText = text.toLowerCase()
  const biasIndicators = [
    'always',
    'never',
    'everyone',
    'no one',
    'absolutely',
    'definitely',
    'certainly',
  ]

  const foundIndicators = biasIndicators.filter(indicator => 
    lowercaseText.includes(indicator)
  )

  if (foundIndicators.length > 0) {
    return `Potential confirmation bias detected. Be cautious of absolute terms like: ${foundIndicators.join(', ')}.`
  } else {
    return 'No strong indicators of confirmation bias detected. However, always critically evaluate your assumptions and seek diverse perspectives.'
  }
}

