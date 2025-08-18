# Make.com Contact Form Integration Setup

This guide will help you set up a Make.com workflow to handle contact form submissions and save them to Google Sheets.

## Prerequisites

1. **Make.com Account**: Sign up at [make.com](https://make.com) (free tier available)
2. **Google Sheets**: Create a new Google Sheet to store contact form data
3. **Google Account**: For Google Sheets integration

## Step 1: Create the Make.com Workflow

### 1.1 Create New Scenario
1. Log in to Make.com
2. Click "Create a new scenario"
3. Name it "Portfolio Contact Form"

### 1.2 Add Webhook Trigger
1. Click the "+" button to add the first module
2. Search for "Webhooks"
3. Select "Custom webhook"
4. Click "Add"
5. Configure the webhook:
   - **Name**: Portfolio Contact Form
   - **URL**: Copy the generated webhook URL
   - **Method**: POST
   - **Response**: JSON

### 1.3 Add Google Sheets Module
1. Click the "+" button after the webhook
2. Search for "Google Sheets"
3. Select "Add a row"
4. Click "Add"
5. Connect your Google account
6. Select your Google Sheet
7. Map the fields:
   - **Name**: `{{1.name}}`
   - **Email**: `{{1.email}}`
   - **Subject**: `{{1.subject}}`
   - **Message**: `{{1.message}}`
   - **Timestamp**: `{{1.timestamp}}`
   - **User Agent**: `{{1.userAgent}}`
   - **Referrer**: `{{1.referrer}}`

### 1.4 Add Email Notification (Optional)
1. Click the "+" button after Google Sheets
2. Search for "Email"
3. Select "Send an email"
4. Configure:
   - **To**: Your email address
   - **Subject**: New Contact Form Submission: {{1.subject}}
   - **Content**: 
     ```
     New contact form submission:
     
     Name: {{1.name}}
     Email: {{1.email}}
     Subject: {{1.subject}}
     Message: {{1.message}}
     Timestamp: {{1.timestamp}}
     ```

### 1.5 Save and Activate
1. Click "Save" in the top right
2. Click "Run once" to test
3. If successful, click "Turn on" to activate

## Step 2: Update Your Angular Code

### 2.1 Update Webhook URL
Replace the webhook URL in `src/app/shared/services/contact.service.ts`:

```typescript
private readonly WEBHOOK_URL = 'https://hook.eu1.make.com/YOUR_ACTUAL_WEBHOOK_ID';
```

### 2.2 Test the Integration
1. Start your Angular app: `npm start`
2. Go to the contact form
3. Click the "🧪 Test Webhook" button
4. Check the console for success/error messages
5. Check your Google Sheet for the test entry

## Step 3: Google Sheets Setup

### 3.1 Create the Sheet
Create a new Google Sheet with these columns:
- A: Name
- B: Email
- C: Subject
- D: Message
- E: Timestamp
- F: User Agent
- G: Referrer

### 3.2 Format the Sheet
1. Make the first row bold (headers)
2. Freeze the first row
3. Set column widths appropriately
4. Add filters to the header row

## Step 4: Advanced Features (Optional)

### 4.1 Add Auto-Reply
Add another email module to send auto-reply to the contact:

1. Add "Send an email" module
2. Configure:
   - **To**: `{{1.email}}`
   - **Subject**: Thank you for contacting me
   - **Content**: 
     ```
     Hi {{1.name}},
     
     Thank you for reaching out! I've received your message and will get back to you soon.
     
     Best regards,
     Bhushan Gadekar
     ```

### 4.2 Add Slack/Discord Notification
1. Add "Slack" or "Discord" module
2. Configure webhook URL
3. Send formatted message with contact details

### 4.3 Add CRM Integration
1. Add "HubSpot", "Pipedrive", or other CRM module
2. Create contact/lead automatically
3. Add notes with the message

## Troubleshooting

### Common Issues:
1. **CORS Error**: Make sure your webhook URL is correct
2. **Google Sheets Error**: Check Google account permissions
3. **Email Not Sending**: Verify email configuration

### Testing:
1. Use the test button in the contact form
2. Check Make.com execution history
3. Monitor Google Sheets for new entries
4. Check browser console for errors

## 🚨 **CRITICAL: Scenario Not Auto-Executing**

If your webhook receives data but the scenario doesn't automatically execute, follow these steps:

### 4.1 Check Scenario Status
1. Go to your Make.com dashboard
2. Find your "Portfolio Contact Form" scenario
3. **VERIFY**: The scenario shows "ON" status (green toggle)
4. If it shows "OFF", click the toggle to turn it ON

### 4.2 Check Webhook Configuration
1. Open your scenario
2. Click on the webhook module
3. **VERIFY**: The webhook URL matches exactly with your Angular service
4. **VERIFY**: The webhook method is set to "POST"
5. **VERIFY**: The response format is set to "JSON"

### 4.3 Check Webhook Queue
1. In your scenario, click on the webhook module
2. Look for "Queue" or "History" tab
3. **VERIFY**: You can see incoming webhook requests
4. If requests are in queue but not processing, the scenario is OFF

### 4.4 Test Webhook Manually
1. In Make.com, go to your webhook module
2. Click "Run once" to test the webhook
3. **VERIFY**: The test data flows through all modules
4. **VERIFY**: Google Sheets gets updated
5. **VERIFY**: Email notifications are sent

### 4.5 Check Make.com Plan Limits
1. Go to your Make.com account settings
2. Check your current plan
3. **VERIFY**: You haven't exceeded your monthly operations limit
4. Free tier: 1,000 operations/month

### 4.6 Common Solutions
1. **Scenario OFF**: Turn the scenario ON
2. **Wrong Webhook URL**: Update the URL in your Angular service
3. **Plan Limit Exceeded**: Upgrade plan or wait for next month
4. **Webhook Configuration**: Reconfigure the webhook module
5. **Module Errors**: Check for errors in Google Sheets or Email modules

### 4.7 Debug Steps
1. **Check Console**: Look for webhook response in browser console
2. **Check Make.com Logs**: Look at scenario execution history
3. **Test with Postman**: Send a test POST request to your webhook URL
4. **Verify Data Format**: Ensure JSON data matches expected format

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **Validation**: Add server-side validation in Make.com
3. **Data Privacy**: Ensure GDPR compliance for data collection
4. **Backup**: Regularly backup your Google Sheet data

## Cost Considerations

- **Make.com Free Tier**: 1,000 operations/month
- **Google Sheets**: Free
- **Email**: Free (Gmail) or paid service
- **Total Cost**: $0 for basic setup

## Next Steps

1. Test the complete workflow
2. Remove the test button from production
3. Add analytics tracking
4. Consider adding more automation features
