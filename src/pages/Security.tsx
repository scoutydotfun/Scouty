import { Shield, Lock, Key, Server } from 'lucide-react';

export default function Security() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Security</h1>
          <p className="text-white">How we protect your data and our commitment to security</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Security Commitment</h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-all duration-300">
            <p className="text-gray-400 leading-relaxed mb-4">
              Security forms the foundation of Scouty. We deploy industry-leading practices to safeguard our systems, your information, and the reliability of our security assessments.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Infrastructure Security</h2>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Encryption</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <span className="text-white mr-2">•</span>
                      <span><strong className="text-white">In Transit:</strong> All data transmitted using TLS 1.3 encryption (HTTPS)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-2">•</span>
                      <span><strong className="text-white">At Rest:</strong> Database encryption using AES-256</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-white mr-2">•</span>
                      <span><strong className="text-white">API Communications:</strong> Encrypted connections to Solana RPC endpoints</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Key className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Access Controls</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-2">•</span>
                      <span>Role-based access control (RBAC) for internal systems</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-2">•</span>
                      <span>Multi-factor authentication (MFA) for team members</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-2">•</span>
                      <span>Principle of least privilege for all access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 mr-2">•</span>
                      <span>Regular access audits and reviews</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 hover:bg-white/8 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Server className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Infrastructure</h3>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Hosted on secure, SOC 2 compliant cloud infrastructure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Automated security patching and updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>DDoS protection and rate limiting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Isolated production and development environments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>Regular backups with encrypted storage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Application Security</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span>Regular security audits and penetration testing</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span>Secure coding practices and code reviews</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span>Automated vulnerability scanning</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span>Dependency monitoring and updates</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                <span>Input validation and sanitization</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Data Privacy</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>We analyze public blockchain data only</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>No personal information is collected or stored</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Scan results are temporarily cached for performance</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Public wall shares are explicitly opt-in and anonymized</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Reporting Security Issues</h2>
          <div className="bg-white/5 border border-white/30 rounded-xl p-8 hover:bg-white/8 transition-all duration-300">
            <p className="text-gray-400 mb-4">
              If you discover a security vulnerability, please report it responsibly:
            </p>
            <ul className="space-y-2 text-gray-400 mb-6">
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Email: security@scouty.fun</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Do not publicly disclose until we've had time to address it</span>
              </li>
              <li className="flex items-start">
                <span className="text-white mr-2">•</span>
                <span>Provide detailed steps to reproduce if possible</span>
              </li>
            </ul>
            <p className="text-sm text-gray-500">
              We appreciate responsible disclosure and will acknowledge all reports promptly.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
