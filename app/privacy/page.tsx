export const metadata = {
  title: 'Privacy Policy | Luke Hertzler',
  description: 'Privacy Policy for Luke Hertzler Portfolio',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-8">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            This Privacy Policy describes how Luke Hertzler ("I", "me", or "my") collects, uses, and protects your personal information when you visit my portfolio website (the "Service").
          </p>
          <p className="mb-4">
            By using this website, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information Collection</h2>
          <p className="mb-4">I may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Contact Information:</strong> Name, email address, and message content when you submit a contact form</li>
            <li><strong>Usage Data:</strong> Information about how you access and use the website, including IP address, browser type, pages visited, and time spent on pages</li>
            <li><strong>Cookies:</strong> Small data files stored on your device (see Cookie Policy for details)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How I Use Your Information</h2>
          <p className="mb-4">I use the collected information for:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Responding to your inquiries and providing services</li>
            <li>Improving website functionality and user experience</li>
            <li>Analyzing website usage and trends</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. California Privacy Rights (CCPA)</h2>
          <p className="mb-4">
            If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Right to Know:</strong> You can request information about the personal information I collect, use, and disclose</li>
            <li><strong>Right to Delete:</strong> You can request deletion of your personal information</li>
            <li><strong>Right to Opt-Out:</strong> You can opt-out of the sale of personal information (I do not sell personal information)</li>
            <li><strong>Non-Discrimination:</strong> I will not discriminate against you for exercising your privacy rights</li>
          </ul>
          <p className="mb-4">
            To exercise these rights, please contact me using the contact information provided below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="mb-4">
            I implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
          <p className="mb-4">
            This website may use third-party services (such as hosting providers, analytics tools) that may collect information about you. These services have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Children's Privacy</h2>
          <p className="mb-4">
            This website is not intended for children under 13 years of age. I do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
          <p className="mb-4">
            I may update this Privacy Policy from time to time. The "Last updated" date at the top indicates when changes were made.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Me</h2>
          <p className="mb-4">
            If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact me through the contact form on this website.
          </p>
        </section>
      </div>
    </div>
  );
}

