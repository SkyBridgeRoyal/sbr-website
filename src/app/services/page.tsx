
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
    <main style={{ padding: '2rem' }}>
      <h1>Our Services</h1>
      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '2rem' }}>
        {services.map((service) => (
          <div key={service.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1.5rem' }}>
            <h2>{service.name}</h2>
            <p>{service.short_benefit}</p>
            <p>{service.price_note}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

