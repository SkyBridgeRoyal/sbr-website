'use client'

import { useState } from 'react'
import { submitQuoteRequest } from '@/app/actions/bookings'

type Question = {
  id: string
  question_label: string
  field_type: string
  is_required: boolean
}

type Props = {
  serviceId: string
  questions: Question[]
}

type FormResult =
  | { success: true; referenceNumber: string }
  | { success: false; error: string }

export default function QuoteRequestForm({ serviceId, questions }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<FormResult | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const answers = questions.map((q) => ({
      questionId: q.id,
      answerText: (formData.get(`question_${q.id}`) as string) || '',
    }))

    const response = await submitQuoteRequest({
      serviceId,
      guestName: formData.get('guestName') as string,
      guestEmail: formData.get('guestEmail') as string,
      guestPhone: formData.get('guestPhone') as string,
      answers,
    })

    setResult(response)
    setSubmitting(false)
  }

  if (result?.success) {
    return (
      <div
        style={{
          border: '2px solid var(--color-gold)',
          borderRadius: '4px',
          padding: '1.5rem',
        }}
      >
        <h3 style={{ marginBottom: '0.5rem' }}>Request received!</h3>
        <p>
          Your reference number is <strong>{result.referenceNumber}</strong>. Save this
          number — our team will follow up by email or phone with a quote.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px' }}
    >
      <div>
        <label htmlFor="guestName">Full name</label>
        <br />
        <input id="guestName" name="guestName" type="text" required style={{ width: '100%', padding: '0.5rem' }} />
      </div>

      <div>
        <label htmlFor="guestEmail">Email</label>
        <br />
        <input id="guestEmail" name="guestEmail" type="email" required style={{ width: '100%', padding: '0.5rem' }} />
      </div>

      <div>
        <label htmlFor="guestPhone">Phone number</label>
        <br />
        <input id="guestPhone" name="guestPhone" type="tel" required style={{ width: '100%', padding: '0.5rem' }} />
      </div>

      {questions.map((q) => (
        <div key={q.id}>
          <label htmlFor={`question_${q.id}`}>{q.question_label}</label>
          <br />
          <input
            id={`question_${q.id}`}
            name={`question_${q.id}`}
            type="text"
            required={q.is_required}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
      ))}

      {result && !result.success && (
        <p style={{ color: '#B91C1C' }}>{result.error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          backgroundColor: 'var(--color-navy)',
          color: 'var(--color-white)',
          border: 'none',
          padding: '0.875rem 2rem',
          borderRadius: '4px',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: submitting ? 'default' : 'pointer',
        }}
      >
        {submitting ? 'Submitting...' : 'Request a Quote'}
      </button>
    </form>
  )
}

