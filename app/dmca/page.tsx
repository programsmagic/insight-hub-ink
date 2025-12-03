"use client";

import { AdSenseDisplay } from "@/components/ads";

export default function DMCAPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-3xl mx-auto prose dark:prose-invert">
        <h1>DMCA Policy</h1>
        <p className="lead">
          InsightHub.ink respects the intellectual property rights of others and expects our users to do the same. As a platform committed to supporting students, educators, and knowledge sharing, we understand the importance of protecting both original content creators and educational resources. This Digital Millennium Copyright Act (DMCA) Policy outlines our procedures for handling copyright infringement claims while supporting legitimate educational use.
        </p>

        {/* Ad after header */}
        <AdSenseDisplay format="horizontal" minHeight={100} className="my-8" />

        <h2>1. Overview</h2>
        <p>
          The Digital Millennium Copyright Act (DMCA) provides a process for copyright owners to request removal of infringing content from websites. InsightHub.ink complies with the DMCA and will respond promptly to valid takedown notices.
        </p>
        <p>
          If you believe that content on our website infringes your copyright, please follow the procedures outlined in this policy to submit a takedown notice.
        </p>

        <h2>2. Reporting Copyright Infringement</h2>
        <p>
          If you are a copyright owner or authorized to act on behalf of a copyright owner, and you believe that content on InsightHub.ink infringes your copyright, you may submit a DMCA takedown notice to our designated agent.
        </p>

        <h3>2.1 Required Information</h3>
        <p>
          Your DMCA takedown notice must include the following information:
        </p>
        <ol>
          <li><strong>Physical or Electronic Signature:</strong> A signature of the copyright owner or authorized representative</li>
          <li><strong>Identification of Copyrighted Work:</strong> A description of the copyrighted work that you claim has been infringed, or if multiple works are covered, a representative list</li>
          <li><strong>Identification of Infringing Material:</strong> The specific URL or location of the allegedly infringing content on our website</li>
          <li><strong>Contact Information:</strong> Your contact information, including name, address, telephone number, and email address</li>
          <li><strong>Good Faith Statement:</strong> A statement that you have a good faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law</li>
          <li><strong>Accuracy Statement:</strong> A statement that the information in the notice is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
        </ol>

        <h3>2.2 Submitting a Takedown Notice</h3>
        <p>
          Please send your DMCA takedown notice to our designated agent:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href="mailto:dmca@insighthub.ink">dmca@insighthub.ink</a></li>
          <li><strong>Subject Line:</strong> "DMCA Takedown Notice"</li>
        </ul>
        <p>
          You may also send a written notice to our designated agent at the address provided below (for physical mail).
        </p>

        <h2>3. Designated Agent Information</h2>
        <p>
          Our designated agent for receiving DMCA takedown notices is:
        </p>
        <div className="bg-muted p-4 rounded-md">
          <p className="mb-2"><strong>DMCA Agent</strong></p>
          <p className="mb-1">InsightHub.ink</p>
          <p className="mb-1">Email: <a href="mailto:dmca@insighthub.ink">dmca@insighthub.ink</a></p>
          <p className="mb-1">General Contact: <a href="mailto:legal@insighthub.ink">legal@insighthub.ink</a></p>
        </div>

        <h2>4. Counter-Notification Process</h2>
        <p>
          If you believe that your content was removed in error, you may submit a counter-notification. Your counter-notification must include:
        </p>
        <ol>
          <li><strong>Physical or Electronic Signature:</strong> Your signature</li>
          <li><strong>Identification of Removed Content:</strong> A description of the content that was removed and its location before removal</li>
          <li><strong>Good Faith Statement:</strong> A statement under penalty of perjury that you have a good faith belief that the content was removed as a result of mistake or misidentification</li>
          <li><strong>Contact Information:</strong> Your name, address, telephone number, and email address</li>
          <li><strong>Consent to Jurisdiction:</strong> A statement that you consent to the jurisdiction of the federal court in your district (or if outside the U.S., the jurisdiction where InsightHub.ink is located)</li>
        </ol>
        <p>
          Send your counter-notification to our designated agent at <a href="mailto:dmca@insighthub.ink">dmca@insighthub.ink</a>.
        </p>

        {/* Ad after section 4 */}
        <AdSenseDisplay format="auto" minHeight={250} className="my-8" />

        <h2>5. Our Response Process</h2>
        <h3>5.1 Takedown Notices</h3>
        <p>
          Upon receipt of a valid DMCA takedown notice, we will:
        </p>
        <ul>
          <li>Review the notice for completeness and validity</li>
          <li>Remove or disable access to the allegedly infringing content</li>
          <li>Notify the user who posted the content</li>
          <li>Provide the user with a copy of the takedown notice</li>
        </ul>
        <p>
          We typically respond to valid takedown notices within 1-3 business days.
        </p>

        <h3>5.2 Counter-Notifications</h3>
        <p>
          Upon receipt of a valid counter-notification, we will:
        </p>
        <ul>
          <li>Review the counter-notification for completeness and validity</li>
          <li>Forward the counter-notification to the original complainant</li>
          <li>Restore the content within 10-14 business days unless the original complainant files a court action</li>
        </ul>

        <h2>6. Repeat Infringer Policy</h2>
        <p>
          In accordance with the DMCA, InsightHub.ink maintains a policy of terminating, in appropriate circumstances, the accounts of users who are repeat infringers. We may also, at our discretion, limit access to our services and/or terminate the accounts of any users who infringe the intellectual property rights of others.
        </p>

        <h2>7. False Claims</h2>
        <p>
          Please be aware that submitting a false or fraudulent DMCA takedown notice may result in:
        </p>
        <ul>
          <li>Liability for damages, including costs and attorneys' fees</li>
          <li>Potential criminal penalties for perjury</li>
          <li>Being banned from submitting future notices</li>
        </ul>
        <p>
          Only submit a DMCA takedown notice if you have a good faith belief that content on our website infringes your copyright.
        </p>

        {/* Ad after section 7 */}
        <AdSenseDisplay format="auto" minHeight={250} className="my-8" />

        <h2>8. Good Faith Statement</h2>
        <p>
          InsightHub.ink is committed to protecting intellectual property rights and complying with the DMCA. We process all takedown notices and counter-notifications in good faith and in accordance with applicable law.
        </p>
        <p>
          We reserve the right to:
        </p>
        <ul>
          <li>Reject incomplete or invalid notices</li>
          <li>Request additional information to verify claims</li>
          <li>Restore content if we determine a takedown notice was invalid</li>
          <li>Take appropriate action against users who submit false claims</li>
        </ul>

        <h2>9. Modifications to Content</h2>
        <p>
          If you believe that content on our website infringes your copyright but can be modified rather than removed, please contact us at <a href="mailto:dmca@insighthub.ink">dmca@insighthub.ink</a> to discuss potential modifications.
        </p>

        <h2>10. Third-Party Content</h2>
        <p>
          InsightHub.ink may contain links to third-party websites or content. We are not responsible for the copyright compliance of third-party content. If you believe third-party content linked from our website infringes your copyright, you should contact the third party directly or submit a takedown notice to the appropriate service provider.
        </p>

        <h2>11. Contact Information</h2>
        <p>
          For DMCA-related inquiries, please contact our designated agent:
        </p>
        <ul>
          <li><strong>DMCA Email:</strong> <a href="mailto:dmca@insighthub.ink">dmca@insighthub.ink</a></li>
          <li><strong>Legal Email:</strong> <a href="mailto:legal@insighthub.ink">legal@insighthub.ink</a></li>
          <li><strong>General Contact:</strong> <a href="mailto:contact@insighthub.ink">contact@insighthub.ink</a></li>
        </ul>

        <h2>12. Updates to This Policy</h2>
        <p>
          We may update this DMCA Policy from time to time. We will notify you of any material changes by:
        </p>
        <ul>
          <li>Posting the updated policy on this page</li>
          <li>Updating the "Last updated" date</li>
          <li>Sending you an email notification (for significant changes)</li>
        </ul>

        <h2>13. Related Policies</h2>
        <p>
          This DMCA Policy should be read in conjunction with our:
        </p>
        <ul>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>

        <p className="text-sm text-muted-foreground mt-8">
          Last updated: January 15, 2025
        </p>
      </div>
    </div>
  );
}

