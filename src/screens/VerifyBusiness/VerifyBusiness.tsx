import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

interface DocumentUpload {
  file: File | null;
  preview: string | null;
}

export const VerifyBusiness = (): JSX.Element => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [documents, setDocuments] = useState({
    businessRegistration: { file: null, preview: null } as DocumentUpload,
    taxCertificate: { file: null, preview: null } as DocumentUpload,
    directorId: { file: null, preview: null } as DocumentUpload,
  });

  const handleFileUpload = (
    documentType: keyof typeof documents,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocuments({
        ...documents,
        [documentType]: {
          file,
          preview: file.name,
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) {
      console.log("Verification submitted:", documents);
    }
  };

  return (
    <div className="bg-white w-full min-h-screen flex flex-col">
      <header className="w-full px-8 py-6 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#00c48c] rounded"></div>
          <span className="[font-family:'Inter',Helvetica] font-bold text-[#003c43] text-xl tracking-[0] leading-[normal]">
            BorderlessPay
          </span>
        </div>
      </header>

      <section className="w-full px-4 py-12 bg-gradient-to-br from-[#003c43] via-[#003c43] to-[#00c48c]">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="[font-family:'Inter',Helvetica] font-bold text-white text-5xl md:text-6xl text-center tracking-[0] leading-tight mb-6">
            Bank Beyond <span className="text-[#00c48c]">Borders</span>
          </h1>

          <p className="[font-family:'Inter',Helvetica] font-semibold text-white text-lg text-center tracking-[0] leading-relaxed max-w-[800px] mx-auto mb-12">
            Fast, transparent, and low-cost cross-border payments for African
            businesses. Send money globally, instantly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[900px] mx-auto">
            <div className="text-center">
              <div className="[font-family:'Inter',Helvetica] font-bold text-[#00c48c] text-4xl tracking-[0] leading-[normal] mb-2">
                24+
              </div>
              <div className="[font-family:'Inter',Helvetica] font-medium text-white text-lg tracking-[0] leading-[normal]">
                Countries
              </div>
            </div>
            <div className="text-center">
              <div className="[font-family:'Inter',Helvetica] font-bold text-[#00c48c] text-4xl tracking-[0] leading-[normal] mb-2">
                &lt;2s
              </div>
              <div className="[font-family:'Inter',Helvetica] font-medium text-white text-lg tracking-[0] leading-[normal]">
                Transfer Time
              </div>
            </div>
            <div className="text-center">
              <div className="[font-family:'Inter',Helvetica] font-bold text-[#00c48c] text-4xl tracking-[0] leading-[normal] mb-2">
                90%
              </div>
              <div className="[font-family:'Inter',Helvetica] font-medium text-white text-lg tracking-[0] leading-[normal]">
                Free Savings
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-16 bg-[#f5f5f5]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="[font-family:'Inter',Helvetica] font-bold text-[#003c43] text-4xl text-center tracking-[0] leading-[normal] mb-3">
            Verify Your Business
          </h2>

          <p className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-lg text-center tracking-[0] leading-[normal] mb-8">
            Upload required documents to complete your verification
          </p>

          <div className="bg-[#e6f7f2] border border-[#00c48c] rounded-lg p-4 mb-8 flex items-start gap-3">
            <svg
              className="w-5 h-5 text-[#003c43] mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <div className="[font-family:'Inter',Helvetica] font-bold text-[#003c43] text-sm tracking-[0] leading-[normal] mb-1">
                Your data is secure
              </div>
              <div className="[font-family:'Inter',Helvetica] font-normal text-[#003c43] text-xs tracking-[0] leading-[normal]">
                All documents are encrypted and stored securely. We comply with
                international data protection standards.
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="rounded-lg border border-[#d1d5db] bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-[#003c43]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="[font-family:'Inter',Helvetica] font-semibold text-[#003c43] text-base tracking-[0] leading-[normal] mb-1">
                        Business Registration Certificate*
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm tracking-[0] leading-[normal]">
                        Official business registration document from your
                        country
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-[#003c43] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <label className="block w-full cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileUpload("businessRegistration", e)
                    }
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-[#d1d5db] rounded-lg p-8 text-center hover:border-[#00c48c] transition-colors">
                    <svg
                      className="w-12 h-12 text-[#9ca3af] mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {documents.businessRegistration.preview ? (
                      <div className="[font-family:'Inter',Helvetica] font-medium text-[#00c48c] text-sm tracking-[0] leading-[normal]">
                        {documents.businessRegistration.preview}
                      </div>
                    ) : (
                      <>
                        <div className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal] mb-1">
                          Click to upload or drag and drop
                        </div>
                        <div className="[font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[normal]">
                          PDF, JPG, PNG up to 10MB
                        </div>
                      </>
                    )}
                  </div>
                </label>
              </CardContent>
            </Card>

            <Card className="rounded-lg border border-[#d1d5db] bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-[#003c43]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="[font-family:'Inter',Helvetica] font-semibold text-[#003c43] text-base tracking-[0] leading-[normal] mb-1">
                        Tax Identification Certificate*
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm tracking-[0] leading-[normal]">
                        Tax registration or VAT certificate
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-[#003c43] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <label className="block w-full cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("taxCertificate", e)}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-[#d1d5db] rounded-lg p-8 text-center hover:border-[#00c48c] transition-colors">
                    <svg
                      className="w-12 h-12 text-[#9ca3af] mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {documents.taxCertificate.preview ? (
                      <div className="[font-family:'Inter',Helvetica] font-medium text-[#00c48c] text-sm tracking-[0] leading-[normal]">
                        {documents.taxCertificate.preview}
                      </div>
                    ) : (
                      <>
                        <div className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal] mb-1">
                          Click to upload or drag and drop
                        </div>
                        <div className="[font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[normal]">
                          PDF, JPG, PNG up to 10MB
                        </div>
                      </>
                    )}
                  </div>
                </label>
              </CardContent>
            </Card>

            <Card className="rounded-lg border border-[#d1d5db] bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#f5f5f5] flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-[#003c43]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="[font-family:'Inter',Helvetica] font-semibold text-[#003c43] text-base tracking-[0] leading-[normal] mb-1">
                        Director/Owner ID*
                      </div>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-sm tracking-[0] leading-[normal]">
                        Government-issued ID of business owner or director
                      </div>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-[#003c43] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <label className="block w-full cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload("directorId", e)}
                    className="hidden"
                  />
                  <div className="border-2 border-dashed border-[#d1d5db] rounded-lg p-8 text-center hover:border-[#00c48c] transition-colors">
                    <svg
                      className="w-12 h-12 text-[#9ca3af] mx-auto mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    {documents.directorId.preview ? (
                      <div className="[font-family:'Inter',Helvetica] font-medium text-[#00c48c] text-sm tracking-[0] leading-[normal]">
                        {documents.directorId.preview}
                      </div>
                    ) : (
                      <>
                        <div className="[font-family:'Inter',Helvetica] font-medium text-[#003c43] text-sm tracking-[0] leading-[normal] mb-1">
                          Click to upload or drag and drop
                        </div>
                        <div className="[font-family:'Inter',Helvetica] font-normal text-[#6b7280] text-xs tracking-[0] leading-[normal]">
                          PDF, JPG, PNG up to 10MB
                        </div>
                      </>
                    )}
                  </div>
                </label>
              </CardContent>
            </Card>

            <div className="flex items-start gap-3 pt-4">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[#d1d5db] text-[#00c48c] focus:ring-[#00c48c]"
              />
              <label
                htmlFor="terms"
                className="[font-family:'Inter',Helvetica] font-normal text-[#003c43] text-sm tracking-[0] leading-[normal]"
              >
                I agree to the Terms of Service and Privacy Policy I confirm
                that all information provided is accurate and the documents are
                authentic.
              </label>
            </div>

            <div className="bg-[#f0f9ff] border border-[#0ea5e9] rounded-lg p-4 flex items-start gap-3">
              <svg
                className="w-5 h-5 text-[#0ea5e9] mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <div className="[font-family:'Inter',Helvetica] font-bold text-[#003c43] text-sm tracking-[0] leading-[normal] mb-1">
                  Verification Timeline
                </div>
                <div className="[font-family:'Inter',Helvetica] font-normal text-[#003c43] text-xs tracking-[0] leading-[normal]">
                  Document verification typically takes 1-3 business days.
                  You'll receive email updates on your verification status.
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={!agreed}
                className="bg-[#00c48c] hover:bg-[#00b37d] disabled:bg-[#9ca3af] text-white px-8 py-6 rounded-lg [font-family:'Inter',Helvetica] font-semibold text-base"
              >
                Complete Verification →
              </Button>
            </div>
          </form>
        </div>
      </section>

      <footer className="w-full px-4 py-8 bg-[#003c43]">
        <p className="[font-family:'Inter',Helvetica] font-normal text-white text-center text-sm tracking-[0] leading-[normal]">
          © 2025 BorderlessPay. Powered by blockchain technology. Bank beyond
          borders.
        </p>
      </footer>
    </div>
  );
};
