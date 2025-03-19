import React from "react";

const LegalResources = () => {
  const legalData = {
    rights: "You have the right to confidential healthcare, legal protection, and access to social support.",
    laws: [
      "Abortion is legal in Rwanda in cases of rape, incest, or when the pregnancy poses a health risk.",
      "Minors have the right to confidential reproductive health services.",
      "Legal aid services are available for reproductive rights cases."
    ],
    resources: [
      { name: "Rwanda Legal Aid Forum", link: "https://www.legalaidrwanda.org" },
      { name: "Ministry of Justice (MINIJUST)", link: "https://www.minijust.gov.rw" },
      { name: "National Human Rights Commission", link: "https://www.nhrc.gov.rw" }
    ],
    emergencyContacts: [
      { name: "Legal Aid Hotline", phone: "+250 788 311 257" },
      { name: "Police Gender Desk", phone: "112" },
      { name: "Health Helpline", phone: "114" }
    ],
    blogs: [
      { 
        title: "Understanding Rwanda’s Reproductive Rights", 
        description: "Learn about reproductive rights in Rwanda and what protections exist under the law.", 
        link: "https://blog.legalrwanda.org/reproductive-rights" 
      },
      { 
        title: "How to Access Legal Aid in Rwanda", 
        description: "A step-by-step guide on how to find and use legal aid services in Rwanda.", 
        link: "https://blog.legalrwanda.org/access-legal-aid" 
      },
      { 
        title: "Women’s Legal Rights in Rwanda: What You Should Know", 
        description: "Key legal protections and resources available for women in Rwanda.", 
        link: "https://blog.legalrwanda.org/womens-rights" 
      },
      { 
        title: "Steps to Take in Case of Legal Trouble", 
        description: "Practical advice on what to do if you face legal challenges.", 
        link: "https://blog.legalrwanda.org/legal-help" 
      },
      { 
        title: "Know Your Rights: Legal Support for Young Mothers", 
        description: "Essential legal information for young mothers navigating reproductive laws.", 
        link: "https://blog.legalrwanda.org/support-young-mothers" 
      }
    ]
  };

  return (
    <div className="ml-70 mt-10 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Legal Resources</h2>

      {/* Emergency Legal Assistance */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">🆘 Emergency Legal Assistance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {legalData.emergencyContacts.map((contact, index) => (
            <div key={index} className="p-4 bg-red-100 border-l-4 border-red-500 rounded-md shadow-sm">
              <h4 className="text-md font-semibold">{contact.name}</h4>
              <p className="text-lg font-bold text-red-600">{contact.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Know Your Rights */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">🏛 Know Your Rights</h3>
        <p className="text-sm text-gray-700 mt-2">{legalData.rights}</p>
      </div>

      {/* Laws */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">📜 Country-Specific Laws</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {legalData.laws.map((law, index) => (
            <li key={index} className="text-sm text-gray-700">{law}</li>
          ))}
        </ul>
      </div>

      {/* Legal Aid & Support */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">⚖️ Legal Aid & Support</h3>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {legalData.resources.map((resource, index) => (
            <li key={index}>
              <a href={resource.link} target="_blank" className="text-blue-500 hover:underline">
                {resource.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Legal Blogs in Card Format */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">📖 Legal Blogs & Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {legalData.blogs.map((blog, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold">{blog.title}</h4>
              <p className="text-sm text-gray-700 mt-2">{blog.description}</p>
              <a 
                href={blog.link} 
                target="_blank" 
                className="mt-2 inline-block text-blue-500 hover:underline font-semibold"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalResources;
