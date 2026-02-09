/**
 * Auth Gate — Google Sign-In wall for prototype pages
 *
 * Include this script in any page to require Google sign-in.
 * Only whitelisted emails can access the content.
 */

(function() {
  const CLIENT_ID = '959598407350-vi4eejkgjts14sq7evurlokdoolg6q6e.apps.googleusercontent.com';

  // Add your allowed emails here
  const ALLOWED_EMAILS = [
    // Add emails that should have access, e.g.:
    // 'you@gmail.com',
    // 'teammate@gmail.com',
  ];

  // If empty, allow ANY Google sign-in (useful during setup)
  const ALLOW_ANY = ALLOWED_EMAILS.length === 0;

  const SESSION_KEY = 'proto_auth_session';
  const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  // Check for existing valid session
  function hasValidSession() {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (session && session.email && session.expires > Date.now()) {
        if (ALLOW_ANY || ALLOWED_EMAILS.includes(session.email)) {
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function saveSession(email, name, picture) {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      email,
      name,
      picture,
      expires: Date.now() + SESSION_DURATION
    }));
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    location.reload();
  }

  // If already authenticated, show the page and add a small logout button
  if (hasValidSession()) {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    addLogoutButton(session);
    return;
  }

  // Hide page content
  document.documentElement.style.visibility = 'hidden';
  document.documentElement.style.overflow = 'hidden';

  // Create login overlay
  const overlay = document.createElement('div');
  overlay.id = 'auth-gate-overlay';
  overlay.innerHTML = `
    <style>
      #auth-gate-overlay {
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: #0b0f14;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      #auth-gate-overlay .auth-box {
        text-align: center;
        padding: 3rem 2rem;
        max-width: 360px;
        width: 100%;
      }
      #auth-gate-overlay .auth-lock {
        width: 64px;
        height: 64px;
        margin: 0 auto 1.5rem;
        background: rgba(92, 158, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #auth-gate-overlay .auth-lock svg {
        width: 28px;
        height: 28px;
        stroke: #5c9eff;
      }
      #auth-gate-overlay h1 {
        color: #fff;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 0.5rem;
        letter-spacing: -0.02em;
      }
      #auth-gate-overlay p {
        color: rgba(255,255,255,0.5);
        font-size: 0.9375rem;
        margin: 0 0 2rem;
        line-height: 1.4;
      }
      #auth-gate-overlay .g-btn {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        background: #fff;
        color: #1d1d1f;
        border: none;
        border-radius: 12px;
        padding: 14px 28px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      #auth-gate-overlay .g-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 20px rgba(92, 158, 255, 0.3);
      }
      #auth-gate-overlay .g-btn:active {
        transform: scale(0.98);
      }
      #auth-gate-overlay .g-btn svg {
        width: 20px;
        height: 20px;
      }
      #auth-gate-overlay .auth-denied {
        color: #ff5c5c;
        font-size: 0.875rem;
        margin-top: 1rem;
        display: none;
      }
    </style>
    <div class="auth-box">
      <div class="auth-lock">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
        </svg>
      </div>
      <h1>Prototype Lab</h1>
      <p>Sign in with Google to access prototypes</p>
      <div id="g_id_onload"
        data-client_id="${CLIENT_ID}"
        data-callback="handleAuthCallback"
        data-auto_prompt="false">
      </div>
      <button class="g-btn" id="auth-google-btn" onclick="triggerGoogleSignIn()">
        <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Sign in with Google
      </button>
      <div class="auth-denied" id="auth-denied-msg">Access denied. Your email is not on the approved list.</div>
    </div>
  `;

  // Add Google Identity Services script
  const gsiScript = document.createElement('script');
  gsiScript.src = 'https://accounts.google.com/gsi/client';
  gsiScript.async = true;
  gsiScript.defer = true;

  // Google Sign-In callback
  window.handleAuthCallback = function(response) {
    // Decode the JWT to get user info
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture;

    if (ALLOW_ANY || ALLOWED_EMAILS.includes(email)) {
      saveSession(email, name, picture);
      overlay.remove();
      document.documentElement.style.visibility = '';
      document.documentElement.style.overflow = '';
      addLogoutButton({ email, name, picture });
    } else {
      document.getElementById('auth-denied-msg').style.display = 'block';
    }
  };

  // Trigger Google One Tap / popup sign-in
  window.triggerGoogleSignIn = function() {
    if (window.google && window.google.accounts) {
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleAuthCallback,
      });
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: use popup flow
          google.accounts.id.renderButton(
            document.getElementById('auth-google-btn'),
            { theme: 'outline', size: 'large', text: 'signin_with', shape: 'pill' }
          );
          // Click the rendered button
          setTimeout(() => {
            const rendered = document.querySelector('#auth-google-btn div[role="button"]');
            if (rendered) rendered.click();
          }, 100);
        }
      });
    }
  };

  gsiScript.onload = function() {
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleAuthCallback,
    });
  };

  function addLogoutButton(session) {
    const btn = document.createElement('div');
    btn.innerHTML = `
      <style>
        #auth-logout-btn {
          position: fixed;
          bottom: 16px;
          right: 16px;
          z-index: 99999;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(26, 30, 37, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 8px 14px;
          cursor: pointer;
          transition: opacity 0.2s;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        #auth-logout-btn:hover { opacity: 0.8; }
        #auth-logout-btn img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
        #auth-logout-btn span {
          color: rgba(255,255,255,0.6);
          font-size: 0.75rem;
        }
      </style>
      <div id="auth-logout-btn" onclick="(${clearSession.toString()})()">
        ${session.picture ? `<img src="${session.picture}" alt="">` : ''}
        <span>Sign out</span>
      </div>
    `;
    document.body.appendChild(btn);
  }

  // Insert overlay and script
  if (document.body) {
    document.body.appendChild(overlay);
  } else {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(overlay));
  }
  document.head.appendChild(gsiScript);
})();
