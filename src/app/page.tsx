import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })

  return (
    <main>
      {/* Hero section */}
      <section
        style={{
          backgroundColor: 'var(--color-navy)',
          color: 'var(--color-white)',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: 'var(--color-white)', fontSize: '2.5rem', marginBottom: '1rem' }}>
          SkyBridge Royal Passage
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '2rem' }}>
          Connecting Africa. Connecting You.
        </p>
        <p style={{ maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          One accountable partner for cargo shipping and homecoming travel between the US and Guinea —
          from pickup to delivery, from booking to arrival.
        </p>
        <Link
          href="/services"
          style={{
            display: 'inline-block',
            backgroundColor: 'var(--color-gold)',
            color: 'var(--color-navy)',
            padding: '0.875rem 2rem',
            borderRadius: '4px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          View Our Services
        </Link>
      </section>

      {/* Services preview */}
      <section style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>What We Offer</h2>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {services?.map((service) => (
            <div
              key={service.id}
              style={{
                border: '1px solid var(--color-gray)',
                borderTop: '4px solid var(--color-gold)',
                borderRadius: '4px',
                padding: '1.75rem',
              }}
            >
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{service.name}</h3>
              <p style={{ marginBottom: '0.5rem' }}>{service.short_benefit}</p>
<Link href={`/services/${service.slug}`} style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
  Learn more →
</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Contact strip */}
      <section
        style={{
          backgroundColor: 'var(--color-navy)',
          color: 'var(--color-white)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        <p style={{ marginBottom: '0.5rem' }}>Questions? Reach us the fastest way:</p>
        <p style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
          WhatsApp Business · operations@skybridgeroyal.com
        </p>
      </section>
    </main>
  )
}

