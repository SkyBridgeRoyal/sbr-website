'use server'

import { supabaseServer } from '@/lib/supabase-server'

type QuoteRequestInput = {
  serviceId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  answers: { questionId: string; answerText: string }[]
}

type QuoteRequestResult =
  | { success: true; referenceNumber: string }
  | { success: false; error: string }

export async function submitQuoteRequest(
  input: QuoteRequestInput
): Promise<QuoteRequestResult> {
  const { serviceId, guestName, guestEmail, guestPhone, answers } = input

  if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
    return { success: false, error: 'Please fill in your name, email, and phone number.' }
  }

  // 1. Create the booking record itself
  const { data: booking, error: bookingError } = await supabaseServer
    .from('bookings')
    .insert({
      service_id: serviceId,
      booking_type: 'quote_request',
      status: 'submitted',
      guest_name: guestName,
      guest_email: guestEmail,
      guest_phone: guestPhone,
    })
    .select('id, reference_number')
    .single()

  if (bookingError || !booking) {
    console.error('Failed to create booking:', bookingError)
    return { success: false, error: 'Something went wrong submitting your request. Please try again.' }
  }

  // 2. Save each answer, linked to the booking we just created
  if (answers.length > 0) {
    const { error: answersError } = await supabaseServer
      .from('booking_answers')
      .insert(
        answers.map((a) => ({
          booking_id: booking.id,
          question_id: a.questionId,
          answer_text: a.answerText,
        }))
      )

    if (answersError) {
      console.error('Failed to save booking answers:', answersError)
      // The booking record already exists, so staff can still follow up
      // even if saving an answer failed — we don't undo the booking.
    }
  }

  return { success: true, referenceNumber: booking.reference_number }
}

