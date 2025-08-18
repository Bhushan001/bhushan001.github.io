# Webhook Troubleshooting Guide

## 🚨 Issue: Webhook Receives Data But Scenario Doesn't Auto-Execute

If your contact form successfully sends data to the webhook, but the Make.com scenario doesn't automatically execute (requiring manual "Run once"), follow this troubleshooting guide.

## 🔍 Quick Diagnosis

### Step 1: Check Scenario Status
1. Go to [Make.com Dashboard](https://www.make.com/en/account)
2. Find your "Portfolio Contact Form" scenario
3. **LOOK FOR**: Green toggle switch showing "ON"
4. **IF OFF**: Click the toggle to turn it ON

### Step 2: Check Webhook Queue
1. Open your scenario
2. Click on the webhook module (first module)
3. Look for "Queue" or "History" tab
4. **VERIFY**: You can see incoming webhook requests
5. **IF QUEUED**: The scenario is OFF or has errors

### Step 3: Test with Debug Buttons
1. Open your portfolio contact form
2. Click "🔍 Check Webhook Status" button
3. Check browser console for detailed logs
4. Click "🧪 Test Webhook" button
5. Monitor Make.com scenario execution

## 🚨 **SPECIFIC ISSUE: Webhook Returns 200 But Scenario Doesn't Execute**

**Symptoms**: 
- Webhook test returns 200 status (success)
- Alert says "webhook is active"
- But data doesn't appear in Google Sheets automatically
- Scenario only works when manually clicking "Run once"

**Root Cause**: The webhook is active and receiving data, but the Make.com scenario is turned OFF.

### 🔧 **Solution Steps**

#### Step 1: Turn ON Your Scenario
1. Go to [Make.com Dashboard](https://www.make.com/en/account)
2. Find your "Portfolio Contact Form" scenario
3. **LOOK FOR**: Toggle switch (should be green when ON)
4. **IF RED/OFF**: Click the toggle to turn it ON
5. **VERIFY**: Toggle shows green/ON status

#### Step 2: Check Scenario Status
1. In your scenario, look for:
   - Green "ON" indicator
   - "Active" status
   - No error messages
2. If you see "OFF" or "Inactive", turn it ON

#### Step 3: Verify Webhook Queue
1. Click on your webhook module
2. Look for "Queue" or "History" tab
3. **CHECK**: Are there pending requests?
4. **IF YES**: The scenario was OFF when requests came in
5. **SOLUTION**: Turn scenario ON and test again

#### Step 4: Test the Complete Flow
1. Ensure scenario is ON (green toggle)
2. Submit a test contact form
3. **VERIFY**: Data appears in Google Sheets automatically
4. **VERIFY**: Email notifications are sent (if configured)

### 🔍 **Why This Happens**

- **Webhook Active ≠ Scenario Active**: The webhook can be active and receive data even when the scenario is OFF
- **Queue Behavior**: When scenario is OFF, webhook requests get queued but not processed
- **Manual Execution**: "Run once" works because it bypasses the ON/OFF status

### 📋 **Verification Checklist**

- [ ] Scenario toggle shows green/ON
- [ ] No error messages in scenario
- [ ] Webhook queue is empty (or processing)
- [ ] Google Sheets connection is active
- [ ] Email module (if used) is configured correctly

## 🛠️ Detailed Troubleshooting

### Problem 1: Scenario is OFF
**Symptoms**: Webhook receives data but nothing happens
**Solution**: 
1. Go to Make.com dashboard
2. Turn ON your scenario
3. Test again

### Problem 2: Wrong Webhook URL
**Symptoms**: 404 or 410 errors in console
**Solution**:
1. In Make.com, copy the correct webhook URL
2. Update `src/app/shared/services/contact.service.ts`
3. Replace the `WEBHOOK_URL` value

### Problem 3: Plan Limit Exceeded
**Symptoms**: 429 errors or scenario stops working
**Solution**:
1. Check your Make.com plan usage
2. Free tier: 1,000 operations/month
3. Upgrade plan or wait for next month

### Problem 4: Module Errors
**Symptoms**: Scenario runs but Google Sheets not updated
**Solution**:
1. Check Google Sheets module for errors
2. Verify Google account connection
3. Check sheet permissions
4. Test "Run once" manually

### Problem 5: CORS Issues
**Symptoms**: Network errors in browser console
**Solution**:
1. Verify webhook URL is correct
2. Check if using HTTPS
3. Ensure proper headers are sent

## 🔧 Manual Testing Steps

### Test 1: Make.com Manual Test
1. Open your scenario in Make.com
2. Click "Run once" on the webhook module
3. **VERIFY**: Data flows through all modules
4. **VERIFY**: Google Sheets gets updated
5. **VERIFY**: Email notifications are sent

### Test 2: Browser Console Test
1. Open browser developer tools (F12)
2. Go to Console tab
3. Submit contact form
4. **LOOK FOR**: Success/error messages
5. **CHECK**: Network tab for webhook request

### Test 3: Postman Test
1. Open Postman
2. Create new POST request
3. URL: Your webhook URL
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "subject": "Test Message",
  "message": "This is a test message",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "referrer": ""
}
```
6. Send request and check Make.com

## 📋 Common Error Codes

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 200 | Success | Check if scenario is ON |
| 404 | URL Not Found | Verify webhook URL |
| 410 | Gone/Inactive | Scenario is OFF |
| 429 | Rate Limited | Check plan limits |
| 500 | Server Error | Check Make.com status |

## 🔄 Scenario Configuration Checklist

### Webhook Module
- [ ] Method: POST
- [ ] Response: JSON
- [ ] URL: Correct and active
- [ ] Scenario: Turned ON

### Google Sheets Module
- [ ] Connection: Active
- [ ] Sheet: Selected correctly
- [ ] Fields: Mapped properly
- [ ] Permissions: Write access

### Email Module (if used)
- [ ] Connection: Active
- [ ] Recipient: Correct email
- [ ] Template: Properly formatted
- [ ] Test: Sends successfully

## 🚀 Production Checklist

Before going live:
- [ ] Remove test buttons from contact form
- [ ] Test complete workflow end-to-end
- [ ] Verify Google Sheets permissions
- [ ] Check email notifications
- [ ] Monitor scenario execution
- [ ] Set up error alerts

## 📞 Support Resources

- **Make.com Documentation**: [https://www.make.com/en/help](https://www.make.com/en/help)
- **Make.com Community**: [https://community.make.com](https://community.make.com)
- **Webhook Testing**: [https://webhook.site](https://webhook.site)

## 🔍 Debug Commands

Add these to your browser console for debugging:

```javascript
// Test webhook directly
fetch('YOUR_WEBHOOK_URL', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test',
    email: 'test@example.com',
    subject: 'Test',
    message: 'Test message',
    timestamp: new Date().toISOString()
  })
}).then(r => r.json()).then(console.log);
```

## 📊 Monitoring

Set up monitoring for:
- Scenario execution frequency
- Error rates
- Response times
- Google Sheets updates
- Email delivery rates
