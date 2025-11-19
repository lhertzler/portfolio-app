export const metadata = {
  title: 'Terms of Service | Luke Hertzler',
  description: 'Terms of Service for Luke Hertzler Portfolio',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-8">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Use of Website</h2>
          <p className="mb-4">You agree to use this website only for lawful purposes and in a way that does not:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Interfere with or disrupt the website or servers</li>
            <li>Attempt to gain unauthorized access to any portion of the website</li>
            <li>Transmit any harmful code, viruses, or malicious software</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p className="mb-4">
            All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Luke Hertzler or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="mb-4">
            You may not reproduce, distribute, modify, or create derivative works from any content on this website without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Services</h2>
          <p className="mb-4">
            This website serves as a portfolio and may provide information about freelance services. Any services provided will be subject to separate written agreements that will supersede these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Warranties</h2>
          <p className="mb-4">
            This website is provided "as is" and "as available" without warranties of any kind, either express or implied. I do not warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The website will be uninterrupted or error-free</li>
            <li>Defects will be corrected</li>
            <li>The website or server are free of viruses or other harmful components</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p className="mb-4">
            To the fullest extent permitted by law, Luke Hertzler shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of this website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Indemnification</h2>
          <p className="mb-4">
            You agree to indemnify and hold harmless Luke Hertzler from any claims, damages, losses, liabilities, and expenses (including legal fees) arising out of your use of the website or violation of these terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Links to Third-Party Websites</h2>
          <p className="mb-4">
            This website may contain links to third-party websites. I am not responsible for the content, privacy policies, or practices of third-party websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
          <p className="mb-4">
            I reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website after changes are posted constitutes acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
          <p className="mb-4">
            These Terms of Service shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
          <p className="mb-4">
            If you have questions about these Terms of Service, please contact me through the contact form on this website.
          </p>
        </section>
      </div>
    </div>
  );
}

