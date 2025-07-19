import { CohereClient } from 'cohere-ai'
import dotenv from 'dotenv'
dotenv.config()

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
})

export const parseExpense = async (req, res) => {
  const { text } = req.body
  if (!text) {
    return res.status(400).json({ message: 'Text is required' })
  }

  try {
    const prompt = `
You are an assistant that extracts structured data from expense descriptions.

For each input, extract the following:
- amount: total amount (in numbers) no currency symbols
- description: brief description of the expense

Respond ONLY in JSON format like:
{
  "amount": 1200,
  "description": "hotel/meals like snacks dinner etc",
}

Input: ${text}
`

    const response = await cohere.generate({
      model: 'command', // or 'command' if free
      prompt,
      max_tokens: 300,
      temperature: 0.3,
    })

    const output = response.generations[0].text.trim()

    // Parse the JSON from the response
    const jsonStart = output.indexOf('{')
    const jsonEnd = output.lastIndexOf('}')
    const jsonString = output.substring(jsonStart, jsonEnd + 1)
    const parsed = JSON.parse(jsonString)

    res.json({ expense: parsed })
  } catch (error) {
    console.error('❌ Error parsing expense:', error.message)
    res.status(500).json({ message: 'Parsing failed', error: error.message })
  }
}
