import { AdSenseDisplay } from "@/components/ads";

export default function TermsPage() {
    return (
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <h1>Terms of Service</h1>
          <p className="lead">
          By accessing and using InsightHub.ink and its services, including our SMM services platform, FinTrack application, educational tools, and knowledge-sharing resources, you agree to be bound by these Terms of Service. As a platform dedicated to supporting students, educators, and lifelong learners, we're committed to providing valuable resources while maintaining clear guidelines. Please read these terms carefully before using our services.
          </p>

          {/* Ad after header */}
          <AdSenseDisplay format="horizontal" minHeight={100} className="my-8" />
  
          <h2>1. Acceptance of Terms</h2>
          <p>
          By accessing our website, creating an account, or using any of our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you must not use our services.
        </p>
        <p>
          These terms apply to all users of our services, including visitors, registered users, and customers. By using our services, you represent that you are at least 18 years old and have the legal capacity to enter into these terms.
        </p>

        <h2>2. Account Registration and Security</h2>
        <h3>2.1 Account Creation</h3>
        <p>
          To access certain features of our services, you may be required to create an account. When creating an account, you must:
        </p>
        <ul>
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and promptly update your account information</li>
          <li>Maintain the security of your password and account credentials</li>
          <li>Accept responsibility for all activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>

        <h3>2.2 Account Security</h3>
        <p>
          You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. We are not liable for any loss or damage arising from your failure to protect your account information.
        </p>

        <h2>3. Description of Services</h2>
        <p>
          InsightHub.ink provides the following services:
        </p>
        <ul>
          <li><strong>SMM Services:</strong> Social media marketing services including views, subscribers, likes, comments, and watch hours for various platforms (YouTube, Instagram, TikTok, etc.)</li>
          <li><strong>FinTrack:</strong> Personal finance management application for tracking expenses, setting goals, and managing finances - particularly useful for students managing their budgets</li>
          <li><strong>Online Tools:</strong> A collection of free online utilities and educational tools designed to help students, developers, and learners accomplish their goals</li>
          <li><strong>Content and Resources:</strong> Educational blog posts, articles, and knowledge-sharing content to support learning and growth</li>
        </ul>
        <p>
          We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
        </p>

        <h2>4. Payment Terms</h2>
        <h3>4.1 Payment Processing</h3>
        <p>
          All payments for our services are processed through secure third-party payment processors. By making a purchase, you agree to:
        </p>
        <ul>
          <li>Provide accurate payment information</li>
          <li>Authorize us to charge your payment method for the services you purchase</li>
          <li>Pay all fees and charges associated with your purchases</li>
        </ul>

        <h3>4.2 Pricing</h3>
        <p>
          All prices are displayed in the currency specified on our platform and are subject to change without notice. We reserve the right to modify pricing at any time, but price changes will not affect orders already placed.
        </p>

        <h3>4.3 Refunds</h3>
        <p>
          Refund requests are handled according to our <a href="/refund-policy">Refund Policy</a>. Please review the refund policy for eligibility criteria, processing timeframes, and procedures.
        </p>

        <h2>5. User Obligations and Prohibited Activities</h2>
        <h3>5.1 Acceptable Use</h3>
        <p>
          You agree to use our services only for lawful purposes and in accordance with these Terms of Service. You agree not to:
        </p>
        <ul>
          <li>Violate any applicable laws, regulations, or third-party rights</li>
          <li>Infringe upon intellectual property rights</li>
          <li>Transmit any harmful, offensive, or illegal content</li>
          <li>Interfere with or disrupt our services, servers, or networks</li>
          <li>Attempt to gain unauthorized access to our systems or accounts</li>
          <li>Impersonate any person or entity or misrepresent your affiliation</li>
          <li>Use automated systems (bots, scrapers) to access our services without permission</li>
          <li>Distribute malware, viruses, or other harmful code</li>
          <li>Engage in any activity that could damage, disable, or impair our services</li>
          <li>Use our services to violate platform policies (e.g., YouTube, Instagram, TikTok terms of service)</li>
        </ul>

        <h3>5.2 SMM Services Specific Terms</h3>
        <p>
          When using our SMM services, you acknowledge and agree that:
        </p>
        <ul>
          <li>You are responsible for ensuring your use of our services complies with platform policies</li>
          <li>We are not responsible for any account suspensions, bans, or penalties imposed by social media platforms</li>
          <li>Results may vary and are not guaranteed</li>
          <li>You will not use our services for illegal or fraudulent purposes</li>
        </ul>

        {/* Ad after section 5 */}
        <AdSenseDisplay format="auto" minHeight={250} className="my-8" />

        <h2>6. Intellectual Property Rights</h2>
        <h3>6.1 Our Content</h3>
        <p>
          All content on InsightHub.ink, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, software, and data compilations, is the property of InsightHub.ink or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
        </p>

        <h3>6.2 Limited License</h3>
        <p>
          We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our services for personal or commercial purposes in accordance with these terms. This license does not include:
        </p>
        <ul>
          <li>Any resale or commercial use of our services or content</li>
          <li>Collection and use of product listings or descriptions</li>
          <li>Derivative use of our services or content</li>
          <li>Use of data mining, robots, or similar data gathering tools</li>
        </ul>

        <h2>7. User-Generated Content</h2>
        <p>
          If you submit, post, or transmit any content through our services (including reviews, comments, or feedback), you grant us a worldwide, non-exclusive, royalty-free, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in any media.
        </p>
        <p>
          You represent and warrant that you own or have the necessary rights to grant this license and that your content does not violate any third-party rights or applicable laws.
        </p>

        <h2>8. Service Modifications and Availability</h2>
        <p>
          We reserve the right to:
        </p>
        <ul>
          <li>Modify, suspend, or discontinue any service at any time</li>
          <li>Change service features, functionality, or availability</li>
          <li>Impose limits on certain features or restrict access to parts of our services</li>
          <li>Perform maintenance that may temporarily interrupt service availability</li>
        </ul>
        <p>
          We are not liable for any loss or damage resulting from service modifications, interruptions, or discontinuations.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL INSIGHTHUB.INK, ITS AFFILIATES, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
        </p>
        <ul>
          <li>Loss of profits, revenue, data, or use</li>
          <li>Business interruption</li>
          <li>Account suspensions or bans on social media platforms</li>
          <li>Loss of goodwill or reputation</li>
        </ul>
        <p>
          Our total liability for any claims arising from or related to our services shall not exceed the amount you paid to us in the twelve (12) months preceding the claim.
        </p>

        {/* Ad after section 9 */}
        <AdSenseDisplay format="auto" minHeight={250} className="my-8" />

        <h2>10. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless InsightHub.ink, its affiliates, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or relating to:
        </p>
        <ul>
          <li>Your use of our services</li>
          <li>Your violation of these Terms of Service</li>
          <li>Your violation of any third-party rights</li>
          <li>Your violation of any applicable laws or regulations</li>
          </ul>
  
        <h2>11. Dispute Resolution</h2>
        <h3>11.1 Informal Resolution</h3>
        <p>
          Before initiating any formal dispute resolution process, you agree to contact us at <a href="mailto:legal@insighthub.ink">legal@insighthub.ink</a> to attempt to resolve any disputes informally.
        </p>

        <h3>11.2 Governing Law</h3>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which InsightHub.ink operates, without regard to its conflict of law provisions.
        </p>

        <h3>11.3 Jurisdiction</h3>
        <p>
          Any disputes arising out of or relating to these terms or our services shall be subject to the exclusive jurisdiction of the courts in the jurisdiction where InsightHub.ink is located.
        </p>

        <h2>12. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including but not limited to:
        </p>
        <ul>
          <li>Violation of these Terms of Service</li>
          <li>Fraudulent, illegal, or harmful activity</li>
          <li>Non-payment of fees</li>
          <li>Extended periods of account inactivity</li>
        </ul>
        <p>
          Upon termination, your right to use our services will immediately cease, and we may delete your account and data.
        </p>

        <h2>13. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. We will notify you of any material changes by:
        </p>
        <ul>
          <li>Posting the updated terms on this page</li>
          <li>Updating the "Last updated" date</li>
          <li>Sending you an email notification (for significant changes)</li>
        </ul>
        <p>
          Your continued use of our services after any changes constitutes your acceptance of the updated terms. If you do not agree to the changes, you must stop using our services.
        </p>

        <h2>14. Severability</h2>
        <p>
          If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
        </p>

        <h2>15. Entire Agreement</h2>
        <p>
          These Terms of Service, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and InsightHub.ink regarding your use of our services and supersede all prior agreements and understandings.
        </p>

        <h2>16. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:legal@insighthub.ink">legal@insighthub.ink</a></li>
          <li><strong>General Contact:</strong> <a href="mailto:contact@insighthub.ink">contact@insighthub.ink</a></li>
        </ul>
  
          <p className="text-sm text-muted-foreground mt-8">
          Last updated: January 15, 2025
          </p>
        </div>
      </div>
    );
  }