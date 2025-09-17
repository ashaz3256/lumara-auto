import Link from 'next/link'

export default function FAQPage() {
  const faqs = [
    {
      question: "How does Lumara Auto work?",
      answer: "Simply describe your car's symptoms through our easy-to-use interface. Our AI analyzes your input against a comprehensive knowledge base of automotive issues and provides instant, safe advice with severity assessment, likely causes, and actionable steps."
    },
    {
      question: "Is it safe to follow the advice?",
      answer: "Yes, all advice is designed to be safe for beginners. We never suggest dangerous activities like working on fuel systems, airbags, high-voltage components, or lifting the car. When in doubt, we always recommend consulting a professional mechanic."
    },
    {
      question: "What if I get a 'STOP' severity rating?",
      answer: "A 'STOP' rating means you should not drive your vehicle and should seek immediate professional help. This indicates a potentially dangerous condition that could cause further damage or safety issues."
    },
    {
      question: "Do I need any special tools or equipment?",
      answer: "No special tools are required. Our advice focuses on visual inspections and basic checks that any car owner can perform safely. We'll tell you if professional diagnosis is needed."
    },
    {
      question: "How accurate is the AI diagnosis?",
      answer: "Our AI provides educated assessments based on symptom patterns, but it's not a replacement for professional diagnosis. We always recommend having a qualified mechanic verify any serious issues."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take privacy seriously. Your vehicle information and symptoms are processed securely and not shared with third parties. We only use this data to provide you with relevant advice."
    },
    {
      question: "Can I use this for any type of vehicle?",
      answer: "Our system works best with cars, SUVs, and light trucks. We have specific knowledge for petrol, diesel, hybrid, and electric vehicles. Heavy commercial vehicles may have limited coverage."
    },
    {
      question: "What if the AI can't help with my specific issue?",
      answer: "If our system can't provide specific guidance, we'll recommend consulting a professional mechanic. We're constantly expanding our knowledge base to cover more scenarios."
    },
    {
      question: "Is there a mobile app?",
      answer: "Currently, Lumara Auto is a web application that works great on mobile browsers. We're considering a dedicated mobile app for future releases."
    },
    {
      question: "How much does it cost?",
      answer: "Basic car checks are completely free. We may introduce premium features in the future, but the core triage functionality will always remain free to use."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Lumara Auto</h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900">Home</Link>
              <Link href="/pricing" className="text-gray-500 hover:text-gray-900">Pricing</Link>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900">Privacy</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about Lumara Auto
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-8">
            Can't find what you're looking for? Get in touch with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/check" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try It Now
            </Link>
            <a 
              href="mailto:support@lumara-auto.com" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Lumara Auto</h3>
            <p className="text-gray-400 mb-4">
              AI-powered car triage for safer, smarter vehicle maintenance.
            </p>
            <p className="text-sm text-gray-500">
              &copy; 2024 Lumara Auto. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
