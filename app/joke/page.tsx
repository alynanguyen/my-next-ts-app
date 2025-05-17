'use client'

import { useEffect, useState } from 'react'

type Joke = {
  setup: string
  punchline: string
}

export default function JokePage() {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchJoke = async () => {
    setLoading(true)
    try {
      const res = await fetch('https://official-joke-api.appspot.com/random_joke')
      if (!res.ok) throw new Error('Failed to fetch')
      const data: Joke = await res.json()
      setJoke(data)
    } catch (_e) {
      setJoke(null)
      alert('Could not load joke.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Random Joke</h1>
      {loading && <p>Loading...</p>}
      {joke && (
        <div className="bg-white shadow rounded p-6 mb-4">
          <p className="text-xl font-semibold">{joke.setup}</p>
          <p className="mt-2 text-gray-700 italic">{joke.punchline}</p>
        </div>
      )}

    <button
      onClick={fetchJoke}
      className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 active:scale-95 transition-all duration-200"
    >
      Fetch New Joke
    </button>

    </div>
  )
}
