import { query } from 'faunadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async function createSubscription(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { user } = await getSession({ req });

    const dbUser = await fauna.query<User>(
      query.Get(
        query.Match(query.Index('user_by_email'), query.Casefold(user.email))
      )
    );

    let customerId = dbUser.data.stripe_customer_id;
    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
      });

      await fauna.query(
        query.Update(query.Ref(query.Collection('users'), dbUser.ref.id), {
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      );

      customerId = stripeCustomer.id;
    }

    const stripeCheckOutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{ price: 'price_1KZ0orKe1r6I6hjI1Uq1HRzw', quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    res.json({ sessionId: stripeCheckOutSession.id });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method not allowed');
  }
}
