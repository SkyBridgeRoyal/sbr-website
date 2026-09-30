
import { supabase } from '@/lib/supabase'

export default async function ServicesPage() {
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })

  if (error) {
    return <p>Something went wrong loading services.</p>
  }

  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Our Services</h1>
      <p style={{ color: 'var(--color-gray)', marginBottom: '2.5rem' }}>
        Connecting Africa. Connecting You.
      </p>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {services.map((service) => (
          <div
            key={service.id}
            style={{
              border: '1px solid var(--color-gray)',
              borderTop: '4px solid var(--color-gold)',
              borderRadius: '4px',
              padding: '1.75rem',
              backgroundColor: 'var(--color-white)',
            }}
          >
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              {service.name}
            </h2>
            <p style={{ marginBottom: '0.5rem' }}>{service.short_benefit}</p>
            <p style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
              {service.price_note}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}

