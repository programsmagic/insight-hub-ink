import { AdSenseDisplay } from "@/components/ads";

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1>Cookie Policy</h1>
        <p className="lead">
          This Cookie Policy explains how InsightHub.ink uses cookies and similar tracking technologies on our website and services. As a platform committed to supporting students, educators, and knowledge sharing, we use cookies to enhance your learning experience and improve our educational resources. By using our services, you consent to the use of cookies as described in this policy.
        </p>

        {/* Ad after header */}
        <AdSenseDisplay format="horizontal" minHeight={100} className="my-8" />

        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. Cookies are widely used to make websites work more efficiently and provide information to website owners.
        </p>
        <p>
          Cookies allow a website to recognize your device and store some information about your preferences or past actions. This helps improve your browsing experience and allows websites to provide personalized content.
        </p>

        <h2>2. Types of Cookies We Use</h2>
        <p>
          We use several types of cookies on our website:
        </p>

        <h3>2.1 Essential Cookies</h3>
        <p>
          These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as they are essential for the website to work.
        </p>
        <ul>
          <li><strong>Session Management:</strong> Cookies that maintain your session and keep you logged in</li>
          <li><strong>Security:</strong> Cookies that help prevent fraud and ensure secure transactions</li>
          <li><strong>Load Balancing:</strong> Cookies that help distribute website traffic across servers</li>
        </ul>

        <h3>2.2 Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
        </p>
        <ul>
          <li><strong>Google Analytics:</strong> We use Google Analytics to track website usage, page views, and user behavior patterns</li>
          <li><strong>Performance Monitoring:</strong> Cookies that help us identify and fix technical issues</li>
          <li><strong>User Flow Analysis:</strong> Cookies that track how users navigate through our website</li>
        </ul>

        <h3>2.3 Marketing Cookies</h3>
        <p>
          These cookies are used to deliver advertisements that are relevant to you and your interests. They also help measure the effectiveness of advertising campaigns.
        </p>
        <ul>
          <li><strong>Google AdSense:</strong> Cookies used to serve personalized advertisements based on your browsing history</li>
          <li><strong>Advertising Networks:</strong> Cookies from third-party advertising networks that help deliver relevant ads</li>
          <li><strong>Conversion Tracking:</strong> Cookies that track whether you complete certain actions after clicking an ad</li>
        </ul>

        <h3>2.4 Functional Cookies</h3>
        <p>
          These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
        </p>
        <ul>
          <li><strong>Preferences:</strong> Cookies that remember your language, region, or other preferences</li>
          <li><strong>Theme Settings:</strong> Cookies that remember your dark/light mode preference</li>
          <li><strong>Tool Settings:</strong> Cookies that save your settings for our online tools</li>
        </ul>

        <h2>3. Third-Party Cookies</h2>
        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and provide enhanced functionality:
        </p>
        <ul>
          <li><strong>Google Analytics:</strong> Web analytics service provided by Google</li>
          <li><strong>Google AdSense:</strong> Advertising service provided by Google</li>
          <li><strong>Vercel Analytics:</strong> Analytics service for performance monitoring</li>
          <li><strong>Social Media Platforms:</strong> Cookies from social media platforms when you interact with social sharing features</li>
        </ul>
        <p>
          These third-party cookies are subject to the respective privacy policies of these third parties. We do not control these cookies, and you should review the privacy policies of these third parties for more information.
        </p>

        {/* Ad after section 3 */}
        <AdSenseDisplay format="auto" minHeight={250} className="my-8" />

        <h2>4. How Long Do Cookies Last?</h2>
        <p>
          Cookies can be either "session" or "persistent" cookies:
        </p>
        <ul>
          <li><strong>Session Cookies:</strong> These are temporary cookies that expire when you close your browser. They are used to maintain your session while you navigate our website.</li>
          <li><strong>Persistent Cookies:</strong> These cookies remain on your device for a set period or until you delete them. They help us recognize you when you return to our website and remember your preferences.</li>
        </ul>

        <h2>5. Managing Cookies</h2>
        <p>
          You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
        </p>

        <h3>5.1 Browser Settings</h3>
        <p>
          You can control and manage cookies in various ways:
        </p>
        <ul>
          <li><strong>Browser Controls:</strong> Most browsers allow you to refuse or accept cookies, delete existing cookies, or set preferences for cookies</li>
          <li><strong>Browser Extensions:</strong> You can install browser extensions that block cookies</li>
          <li><strong>Private Browsing:</strong> Use private/incognito mode to limit cookie storage</li>
        </ul>

        <h3>5.2 Opt-Out Options</h3>
        <p>
          You can opt-out of certain cookies:
        </p>
        <ul>
          <li><strong>Google Analytics:</strong> You can opt-out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
          <li><strong>Advertising Cookies:</strong> You can opt-out of personalized advertising through the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or the <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">Your Online Choices</a> website</li>
        </ul>

        <h3>5.3 Impact of Disabling Cookies</h3>
        <p>
          Please note that disabling cookies may impact your experience on our website:
        </p>
        <ul>
          <li>Some features may not function properly</li>
          <li>You may need to re-enter information more frequently</li>
          <li>Personalized content and recommendations may not be available</li>
          <li>Some services may be unavailable</li>
        </ul>

        {/* Ad after section 5 */}
        <AdSenseDisplay format="auto" minHeight={250} className="my-8" />

        <h2>6. Do Not Track Signals</h2>
        <p>
          Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no standard for how DNT signals should be interpreted. We do not currently respond to DNT browser signals.
        </p>

        <h2>7. Updates to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of any material changes by:
        </p>
        <ul>
          <li>Posting the updated Cookie Policy on this page</li>
          <li>Updating the "Last updated" date</li>
          <li>Sending you an email notification (for significant changes)</li>
        </ul>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies or this Cookie Policy, please contact us:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:privacy@insighthub.ink">privacy@insighthub.ink</a></li>
          <li><strong>General Contact:</strong> <a href="mailto:contact@insighthub.ink">contact@insighthub.ink</a></li>
        </ul>

        <h2>9. Related Policies</h2>
        <p>
          For more information about how we collect, use, and protect your personal information, please review our:
        </p>
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>

        <p className="text-sm text-muted-foreground mt-8">
          Last updated: January 15, 2025
        </p>
      </div>
    </div>
  );
}

