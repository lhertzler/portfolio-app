export const metadata = {
  title: 'Cookie Policy | Luke Hertzler',
  description: 'Cookie Policy for Luke Hertzler Portfolio',
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-8">
      <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose prose-sm max-w-none space-y-6 text-foreground">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How I Use Cookies</h2>
          <p className="mb-4">This website may use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
            <li><strong>Analytics Cookies:</strong> Help me understand how visitors interact with the website</li>
            <li><strong>Preference Cookies:</strong> Remember your preferences and settings (such as theme selection)</li>
            <li><strong>Functional Cookies:</strong> Enable enhanced functionality and personalization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies Used</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
            <p className="mb-4">
              These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to actions you take, such as setting privacy preferences or filling in forms.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
            <p className="mb-4">
              These cookies allow me to count visits and traffic sources so I can measure and improve website performance. All information these cookies collect is aggregated and anonymous.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Preference Cookies</h3>
            <p className="mb-4">
              These cookies enable the website to provide enhanced functionality and personalization, such as remembering your theme preferences or language settings.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Cookies</h2>
          <p className="mb-4">
            Some cookies may be set by third-party services that appear on this website. These third parties may use cookies to collect information about your online activities across different websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Managing Cookies</h2>
          <p className="mb-4">
            You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can impact your user experience and parts of this website may no longer be fully accessible.
          </p>
          <p className="mb-4">Most browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. You can:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Delete cookies that have already been set</li>
            <li>Block cookies from being set</li>
            <li>Set your browser to notify you when cookies are being set</li>
          </ul>
          <p className="mb-4">
            For more information about how to manage cookies in your browser, visit your browser's help documentation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. California Privacy Rights</h2>
          <p className="mb-4">
            California residents have the right to know what personal information is collected, used, and shared, including through cookies. For more information, please see the Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
          <p className="mb-4">
            I may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. The "Last updated" date at the top indicates when changes were made.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
          <p className="mb-4">
            If you have questions about this Cookie Policy, please contact me through the contact form on this website.
          </p>
        </section>
      </div>
    </div>
  );
}

