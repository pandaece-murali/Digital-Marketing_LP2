# Lead form setup

The hero form posts to `/api/leads`. It only displays a success state after the configured CRM or webhook returns a successful HTTP response. With no delivery target configured, the API responds with `503` and the form explains that the enquiry was not submitted.

## GoHighLevel

1. Create a **Private Integration Token** for the sub-account that should receive leads, with the `contacts.write` scope (and optionally `locations/customFields.readonly` so custom field IDs can be auto-resolved).
2. Copy `.env.example` to `.env.local` and set:

   ```dotenv
   GHL_API_TOKEN=your_private_integration_token
   GHL_LOCATION_ID=your_sub_account_location_id

   # Optional: manually specify field IDs if not using customFields.readonly scope
   GHL_CUSTOM_FIELD_PRIMARY_GOAL_ID=
   GHL_CUSTOM_FIELD_SERVICES_INTERESTED_ID=
   GHL_CUSTOM_FIELD_MONTHLY_BUDGET_ID=
   ```

3. Restart `npm run dev` (and set the same server environment variables in production).

### Custom Fields Mapped to GoHighLevel

The form maps the following fields directly to GoHighLevel contact custom fields during upsert:

| Form Field | GoHighLevel Custom Field Key | Value Mapped |
| :--- | :--- | :--- |
| **Primary Business Goal** | `contact.what_is_your_primary_goal_for_the_next_36_months` | Selected goal from form (e.g. `Generate more leads`) |
| **Services Interested** | `contact.which_services_interested` | Selected service or services (array if multi-select, or string) |
| **Monthly Marketing Budget** | `contact.monthly_marketing_budget` | Selected monthly budget (e.g. `₹1 lakh – ₹3 lakh`) |

The server sends a v3 contact upsert to GoHighLevel. Contact name, email, phone, and website are populated into standard fields. Custom fields are mapped to their respective GHL keys. Tags are applied based on selected services, and summary details are retained in the contact's `source` value.

GoHighLevel references: [Upsert Contact](https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/) and [Contacts API](https://marketplace.gohighlevel.com/docs/ghl/contacts/contacts-api-v-3/).

## Other CRM or form endpoint

If GHL is not available, set a server-side HTTPS endpoint that accepts a JSON `POST`:

```dotenv
LEAD_WEBHOOK_URL=https://your-service.example/lead-intake
LEAD_WEBHOOK_BEARER_TOKEN=optional_shared_secret
```

The JSON body contains `name`, `phone`, `email`, `service`, `services`, `budget`, `goal`, `customFields`, `source`, and `submittedAt`. The endpoint should return a 2xx response only after it has accepted the lead. GHL is preferred whenever both GHL variables are configured.

Do not expose credentials in browser variables or commit `.env.local`. The form validates inputs in the browser and again on the server, checks same-origin browser requests, and includes a honeypot field. Add provider-side or hosting-platform rate limits for production traffic.
