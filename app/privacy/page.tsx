"use client";

import { AdSenseDisplay } from "@/components/ads";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="lead">
          At InsightHub.ink, we take your privacy seriously. As a platform committed to supporting students, educators, and knowledge sharing, we understand the importance of protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services, including our SMM services platform, FinTrack application, educational tools, and knowledge resources.
        </p>

        {/* Ad after header */}
        <AdSenseDisplay format="horizontal" minHeight={100} className="my-8" />

        <h2>1. Information We Collect</h2>
        
        <h3>1.1 Personal Information</h3>
        <p>
          We collect information that you provide directly to us, including:
        </p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, username, password, and profile information</li>
          <li><strong>Contact Information:</strong> Email address, phone number, and mailing address (when provided)</li>
          <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely through third-party payment processors), and transaction history</li>
          <li><strong>Communication Data:</strong> Messages, inquiries, support tickets, and feedback you send to us</li>
        </ul>

        <h3>1.2 Usage Data</h3>
        <p>
          We automatically collect certain information when you use our services:
        </p>
        <ul>
          <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
          <li><strong>Usage Information:</strong> Pages visited, features used, time spent on pages, click patterns, and navigation paths</li>
          <li><strong>Log Data:</strong> Server logs, error reports, and performance data</li>
          <li><strong>Location Data:</strong> General location information based on IP address (not precise location)</li>
        </ul>

        <h3>1.3 Cookies and Tracking Technologies</h3>
        <p>
          We use cookies, web beacons, and similar tracking technologies to collect information about your interactions with our services. For more details, please see our <a href="/cookie-policy">Cookie Policy</a>.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect for the following purposes:
        </p>
        <ul>
          <li><strong>Service Provision:</strong> To provide, maintain, and improve our services, including processing transactions, managing accounts, delivering SMM services, and supporting educational initiatives for students and educators</li>
          <li><strong>Communication:</strong> To send you service-related notifications, updates, security alerts, and respond to your inquiries</li>
          <li><strong>Marketing:</strong> To send you promotional communications (with your consent) about our services, special offers, and new features</li>
          <li><strong>Analytics:</strong> To analyze usage patterns, improve user experience, and optimize our services</li>
          <li><strong>Security:</strong> To detect, prevent, and address fraud, security issues, and unauthorized access</li>
          <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, and enforce our terms of service</li>
          <li><strong>Business Operations:</strong> To manage our business operations, conduct research, and develop new services</li>
        </ul>

        <h2>3. How We Share Your Information</h2>
        <p>
          We may share your information in the following circumstances:
        </p>

        <h3>3.1 Service Providers</h3>
        <p>
          We share information with third-party service providers who perform services on our behalf, including:
        </p>
        <ul>
          <li>Payment processors for transaction processing</li>
          <li>Cloud hosting and infrastructure providers</li>
          <li>Analytics and performance monitoring services</li>
          <li>Customer support and communication platforms</li>
          <li>Email delivery services</li>
        </ul>
        <p>
          These service providers are contractually obligated to protect your information and use it only for the purposes we specify.
        </p>

        <h3>3.2 Legal Requirements</h3>
        <p>
          We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to:
        </p>
        <ul>
          <li>Comply with legal obligations</li>
          <li>Protect our rights, property, or safety</li>
          <li>Prevent fraud or security issues</li>
          <li>Respond to government requests</li>
        </ul>

        <h3>3.3 Business Transfers</h3>
        <p>
          In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change in ownership or control.
        </p>

        <h3>3.4 With Your Consent</h3>
        <p>
          We may share your information with third parties when you explicitly consent to such sharing.
        </p>

        {/* Ad after section 3 */}
        <AdSenseDisplay format="auto" minHeight={250} className="my-8" />

        <h2>4. Your Rights and Choices</h2>
        <p>
          Depending on your location, you may have the following rights regarding your personal information:
        </p>
        <ul>
          <li><strong>Access:</strong> Request access to your personal information and receive a copy of the data we hold about you</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal and operational requirements</li>
          <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
          <li><strong>Objection:</strong> Object to processing of your information for certain purposes, such as direct marketing</li>
          <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
          <li><strong>Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
        </ul>
        <p>
          To exercise these rights, please contact us at <a href="mailto:privacy@insighthub.ink">privacy@insighthub.ink</a>. We will respond to your request within a reasonable timeframe.
        </p>

        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </p>
        <ul>
          <li>Encryption of data in transit and at rest</li>
          <li>Secure authentication and access controls</li>
          <li>Regular security assessments and updates</li>
          <li>Employee training on data protection</li>
          <li>Incident response procedures</li>
        </ul>
        <p>
          However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
        </p>

        {/* Ad after section 6 */}
        <AdSenseDisplay format="auto" minHeight={250} className="my-8" />

        <h2>7. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate measures to ensure that your information receives adequate protection in accordance with this Privacy Policy.
        </p>

        <h2>8. Children's Privacy</h2>
        <p>
          Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete such information promptly.
        </p>

        <h2>9. Third-Party Links</h2>
        <p>
          Our services may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
        </p>

        <h2>10. Your California Privacy Rights</h2>
        <p>
          If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete personal information, and the right to opt-out of the sale of personal information. We do not sell your personal information.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:privacy@insighthub.ink">privacy@insighthub.ink</a></li>
          <li><strong>General Contact:</strong> <a href="mailto:contact@insighthub.ink">contact@insighthub.ink</a></li>
        </ul>

        <h2>12. Updates to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
        </p>
        <ul>
          <li>Posting the updated Privacy Policy on this page</li>
          <li>Updating the "Last updated" date</li>
          <li>Sending you an email notification (for significant changes)</li>
        </ul>
        <p>
          Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy.
        </p>

        <p className="text-sm text-muted-foreground mt-8">
          Last updated: January 15, 2025
        </p>
      </div>
    </div>
  );
}