import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import QuoteRequestForm from './QuoteRequestForm'

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: service, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !service) {
    notFound()
  }

  const { data: questions } = await supabase
    .from('service_questions')
    .select('id, question_label, field_type, is_required')
    .eq('service_id', service.id)
    .order('display_order', { ascending: true })

  return (
    <main style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 2rem' }}>
      <Link href="/services" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
        ← All Services
      </Link>

      <h1 style={{ marginTop: '1rem', marginBottom: '1rem' }}>{service.name}</h1>

      <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
        {service.description}
      </p>

      <div
        style={{
          border: '1px solid var(--color-gray)',
          borderTop: '4px solid var(--color-gold)',
          borderRadius: '4px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <p style={{ color: 'var(--color-gold)', fontWeight: 600, fontSize: '1.1rem' }}>
          {service.price_note}
        </p>
      </div>

      {service.booking_type === 'quote_request' ? (
        <QuoteRequestForm serviceId={service.id} questions={questions ?? []} />
      ) : (
        <button
          style={{
            backgroundColor: 'var(--color-navy)',
            color: 'var(--color-white)',
            border: 'none',
            padding: '0.875rem 2rem',
            borderRadius: '4px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
          }}
          disabled
        >
          Book Now (coming soon)
        </button>
      )}
    </main>
  )
}

