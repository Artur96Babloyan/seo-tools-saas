# Content Decay Detection - Google OAuth Flow

This document describes the complete Google OAuth flow implementation for the Content Decay Detection feature.

## Overview

The Content Decay Detection feature requires Google Search Console access to analyze website traffic patterns. This is implemented using Google OAuth 2.0 flow.

## Architecture

### Frontend Components

1. **Content Decay Page** (`/dashboard/content-decay`)

   - Main page that handles connection status and OAuth flow
   - Shows different views based on connection status
   - Initiates OAuth flow when user clicks "Connect Google Search Console"

2. **OAuth Callback Page** (`/oauth/callback`)

   - Handles the OAuth callback from Google
   - Processes authorization code and state
   - Shows success/error messages and redirects back to main page

3. **Content Decay Service** (`/lib/contentDecayService.ts`)
   - Handles all API calls to the backend
   - Manages OAuth URL generation, callback processing, and status checking

### Backend API Endpoints

1. **GET** `/api/content-decay/status`

   - Returns current connection status
   - Includes Google Search Console connection state

2. **GET** `/api/content-decay/auth-url`

   - Generates Google OAuth URL
   - Returns auth URL, state token, and expiration

3. **POST** `/api/content-decay/callback`

   - Processes OAuth callback
   - Exchanges authorization code for access tokens
   - Returns connection status

4. **DELETE** `/api/content-decay/disconnect`
   - Disconnects Google Search Console
   - Revokes access tokens

## OAuth Flow Steps

### Step 1: Check Connection Status

```typescript
// Frontend calls backend to check current status
const status = await contentDecayService.getStatus();

// Backend response:
{
  "service": "Content Decay Detection Service",
  "status": "healthy",
  "googleSearchConsole": {
    "connected": false,
    "expired": null,
    "configured": true
  }
}
```

### Step 2: Initiate OAuth Flow

```typescript
// User clicks "Connect Google Search Console"
const authData = await contentDecayService.getAuthUrl();

// Backend response:
{
  "authUrl": "https://accounts.google.com/o/oauth2/auth?...",
  "state": "state_token",
  "expiresIn": 3600
}

// Frontend redirects to Google OAuth
window.location.href = authData.authUrl;
```

### Step 3: Handle OAuth Callback

```typescript
// Google redirects to: /oauth/callback?code=AUTH_CODE&state=STATE
// Frontend processes callback
const result = await contentDecayService.handleCallback(code, state);

// Backend response:
{
  "connected": true,
  "expiresAt": "2025-01-01T00:00:00Z"
}
```

### Step 4: Disconnect (Optional)

```typescript
// User clicks "Disconnect"
await contentDecayService.disconnect();

// Backend response:
{
  "connected": false
}
```

## Frontend Views

### 1. Connect View

- Shows when Google Search Console is not connected
- Displays "Connect Google Search Console" button
- Includes "Check Connection Status" button for manual refresh

### 2. Status View

- Shows when Google Search Console is connected
- Displays connection status with green checkmark
- Shows service status information
- Includes disconnect button
- Provides access to content decay analysis features

### 3. Error View

- Shows when there are connection or API errors
- Displays error message with dismiss button
- Allows user to retry or go back

### 4. Loading View

- Shows during API calls and OAuth processing
- Displays spinner with loading message

## Security Features

1. **State Parameter**: OAuth state token prevents CSRF attacks
2. **JWT Authentication**: All API calls require valid JWT token
3. **Token Storage**: OAuth tokens stored securely on backend
4. **Error Handling**: Comprehensive error handling for all OAuth scenarios

## Error Handling

### Common Error Scenarios

1. **Missing Authorization Code**

   - User visits callback page without proper OAuth flow
   - Shows error message and redirect option

2. **Invalid State Token**

   - OAuth state mismatch (potential CSRF)
   - Shows security error message

3. **API Errors**

   - Backend service unavailable
   - Network connectivity issues
   - Shows appropriate error messages

4. **Token Expiration**
   - OAuth tokens expired
   - Automatically triggers re-authentication flow

## Usage Instructions

### For Users

1. Navigate to `/dashboard/content-decay`
2. Click "Connect Google Search Console"
3. Complete Google OAuth flow
4. Grant necessary permissions
5. Return to application
6. Start content decay analysis

### For Developers

1. Ensure backend OAuth endpoints are implemented
2. Configure Google OAuth credentials in backend
3. Set up proper redirect URIs
4. Test OAuth flow in development environment
5. Deploy with production OAuth credentials

## Environment Variables

### Frontend

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:5001/api)

### Backend (Required)

- Google OAuth Client ID
- Google OAuth Client Secret
- Redirect URI configuration
- JWT secret for authentication

## Testing

### Manual Testing

1. Test connection status check
2. Test OAuth URL generation
3. Test OAuth callback processing
4. Test disconnect functionality
5. Test error scenarios

### Automated Testing

- Unit tests for service methods
- Integration tests for OAuth flow
- E2E tests for complete user journey

## Troubleshooting

### Common Issues

1. **"Missing authorization code"**

   - User accessed callback page directly
   - Solution: Redirect to main page

2. **"Invalid state parameter"**

   - OAuth state mismatch
   - Solution: Clear browser cache and retry

3. **"Connection failed"**

   - Backend OAuth configuration issue
   - Solution: Check backend logs and OAuth setup

4. **"Service not available"**
   - Backend service down
   - Solution: Check backend status and restart if needed

## Future Enhancements

1. **Token Refresh**: Automatic OAuth token refresh
2. **Multiple Accounts**: Support for multiple Google accounts
3. **Scoped Permissions**: Granular permission requests
4. **Analytics**: OAuth flow analytics and monitoring
5. **Rate Limiting**: API rate limiting for OAuth endpoints
