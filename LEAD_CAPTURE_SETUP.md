# Lead form setup

The hero form posts to `/api/leads`. It only displays a success state after the configured CRM or webhook returns a successful HTTP response. With no delivery target configured, the API responds with `503` and the form explains that the enquiry was not submitted.

## GoHighLevel

1. Create a **Private Integration Token** for the sub-account that should receive leads, with the `contacts.write` scope.
2. Copy `.env.example` to `.env.local` and set:

   ```dotenv
   GHL_API_TOKEN=your_private_integration_token
   GHL_LOCATION_ID=your_sub_account_location_id
   ```

3. Restart `npm run dev` (and set the same server environment variables in production).

The server sends a v3 contact upsert to GoHighLevel. Name, email, and phone are contact fields; service, monthly budget, and primary goal are included in the contact source value so they are retained without replacing any existing contact tags. The token is only read by the server and must not use a `NEXT_PUBLIC_` prefix.

GoHighLevel references: [Upsert Contact](https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/) and [Contacts API](https://marketplace.gohighlevel.com/docs/ghl/contacts/contacts-api-v-3/).

## Other CRM or form endpoint

If GHL is not available, set a server-side HTTPS endpoint that accepts a JSON `POST`:

```dotenv
LEAD_WEBHOOK_URL=https://your-service.example/lead-intake
LEAD_WEBHOOK_BEARER_TOKEN=optional_shared_secret
```

The JSON body contains `name`, `phone`, `email`, `service`, `budget`, `goal`, `source`, and `submittedAt`. The endpoint should return a 2xx response only after it has accepted the lead. GHL is preferred whenever both GHL variables are configured.

Do not expose credentials in browser variables or commit `.env.local`. The form validates inputs in the browser and again on the server, checks same-origin browser requests, and includes a honeypot field. Add provider-side or hosting-platform rate limits for production traffic.
