import { FormEvent, useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "../../../components/ui/button";

type TransactionPriority = "standard" | "fast";
type ModalStep = 1 | 2 | 3;

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: (payload: {
    recipientAddress: string;
    amount: number;
    priority: TransactionPriority;
    note: string;
    fee: number;
    feeLabel: string;
    total: number;
  }) => string | void | Promise<string | void>;
  availableBalance?: string;
}

const DEFAULT_ADDRESS = "0x4Fabb145d64652a948d72533023f6E7A623C7C2";
const FEE_BY_PRIORITY: Record<TransactionPriority, { label: string; value: number }> = {
  standard: { label: "$1.00", value: 5 },
  fast: { label: "$2.50", value: 10 },
};
const DEFAULT_SUCCESS_HASH = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";

export const SendMoneyModal = ({
  isOpen,
  onClose,
  onContinue,
  availableBalance = "12,500,000 NGN",
}: SendMoneyModalProps) => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [priority, setPriority] = useState<TransactionPriority>("standard");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<ModalStep>(1);
  const [transactionHash, setTransactionHash] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRecipientAddress("");
      setAmount("");
      setPriority("standard");
      setNote("");
      setStep(1);
      setTransactionHash("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const amountValue = Number.parseFloat(amount) || 0;
  const { label: feeLabel, value: feeValue } = FEE_BY_PRIORITY[priority];
  const totalValue = amountValue + feeValue;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSendNow = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const payload = {
      recipientAddress,
      amount: amountValue,
      priority,
      note,
      fee: feeValue,
      feeLabel,
      total: totalValue,
    };

    try {
      const result = await onContinue?.(payload);
      if (typeof result === "string" && result.trim().length > 0) {
        setTransactionHash(result);
      } else {
        setTransactionHash(DEFAULT_SUCCESS_HASH);
      }
      setStep(3);
    } catch (error) {
      console.error("Send money failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleDone = () => {
    setStep(1);
    onClose();
  };

  const formatAmount = (value: number) =>
    value.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatAddress = (address: string) => {
    if (address.length <= 10) {
      return address;
    }
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const renderStepCircle = (label: ModalStep) => {
    const isActive = step === label;
    const isCompleted = step > label;
    const baseClasses = "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors";

    if (isActive) {
      return (
        <div className={`${baseClasses} bg-[#00c48c] text-white`}>{label}</div>
      );
    }

    if (isCompleted) {
      return (
        <div className={`${baseClasses} bg-[#e5e7eb] text-[#0b1f3a]`}>{label}</div>
      );
    }

    return (
      <div className={`${baseClasses} border border-[#d1d5db] bg-white text-[#a0aec0]`}>
        {label}
      </div>
    );
  };

  const renderConnector = (fromStep: ModalStep) => {
    const isFilled = step > fromStep;
    return (
      <div
        className={`h-[2px] w-16 transition-colors ${
          isFilled ? "bg-[#0b1f3a]" : "bg-[#d1d5db]"
        }`}
      />
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 sm:py-10">
      <div className="relative w-full max-w-[520px] rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f2f5] text-[#0b1f3a] transition hover:bg-[#e5e7eb]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="font-semibold text-[#0b1f3a]">Send NGN</h2>
          </div>

          <div className="mb-8 flex items-center justify-center gap-3 sm:mb-10">
            <div className="flex items-center gap-3">
              {renderStepCircle(1)}
              {renderConnector(1)}
            </div>
            <div className="flex items-center gap-3">
              {renderStepCircle(2)}
              {renderConnector(2)}
            </div>
            {renderStepCircle(3)}
          </div>

          {step === 1 && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0b1f3a]">
                  Recipient Address *
                </label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(event) => setRecipientAddress(event.target.value)}
                  placeholder={DEFAULT_ADDRESS}
                  className="w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm text-[#0b1f3a] placeholder:text-[#9ca3af] focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#00c48c]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#0b1f3a]">
                  Amount *
                </label>
                <div className="flex items-center rounded-2xl border border-[#e5e7eb] bg-[#f9fafb]">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="0.00"
                    className="h-12 flex-1 rounded-2xl bg-transparent px-4 text-sm text-[#0b1f3a] focus:outline-none"
                    required
                  />
                  <span className="pr-4 text-sm font-semibold text-[#0b1f3a]">NGN</span>
                </div>
                <p className="mt-2 text-xs text-[#6b7280]">Available: {availableBalance}</p>
              </div>

              <fieldset>
                <legend className="mb-3 block text-sm font-medium text-[#0b1f3a]">
                  Transaction Priority
                </legend>
                <div className="space-y-3">
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border ${
                      priority === "standard"
                        ? "border-[#00c48c] bg-[#f4fffb]"
                        : "border-[#e5e7eb] bg-white"
                    } px-4 py-4 transition-colors`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="transactionPriority"
                        value="standard"
                        checked={priority === "standard"}
                        onChange={() => setPriority("standard")}
                        className="mt-1 h-4 w-4 shrink-0 rounded-full border border-[#cbd5f5] text-[#00c48c] focus:outline-none"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#0b1f3a]">Standard</p>
                        <p className="text-xs text-[#6b7280]">Lower fees, standard processing</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#6b7280]">~2-5 minutes</span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border ${
                      priority === "fast"
                        ? "border-[#00c48c] bg-[#f4fffb]"
                        : "border-[#e5e7eb] bg-white"
                    } px-4 py-4 transition-colors`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="transactionPriority"
                        value="fast"
                        checked={priority === "fast"}
                        onChange={() => setPriority("fast")}
                        className="mt-1 h-4 w-4 shrink-0 rounded-full border border-[#cbd5f5] text-[#00c48c] focus:outline-none"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#0b1f3a]">Fast</p>
                        <p className="text-xs text-[#6b7280]">Higher fees, priority processing</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-[#6b7280]">~30 seconds</span>
                  </label>
                </div>
              </fieldset>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#0b1f3a]">
                  Note (Optional)
                </label>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Add a note for this transaction..."
                  className="h-24 w-full rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm text-[#0b1f3a] placeholder:text-[#9ca3af] focus:border-[#00c48c] focus:outline-none focus:ring-2 focus:ring-[#00c48c]"
                />
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#00c48c] text-base font-semibold text-white hover:bg-[#00b37d]"
              >
                Continue
              </Button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#0b1f3a]">
                  Review Transaction
                </h3>
                <p className="mt-2 text-sm text-[#6b7280]">
                  Please confirm the details below
                </p>
              </div>

              <div className="space-y-4 rounded-3xl border border-[#e5e7eb] bg-[#f9fafb] p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b7280]">From</span>
                  <span className="font-semibold text-[#0b1f3a]">Nigerian Naira</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b7280]">To</span>
                  <span className="font-semibold text-[#0b1f3a]">
                    {formatAddress(recipientAddress)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b7280]">Amount</span>
                  <span className="font-semibold text-[#0b1f3a]">
                    {formatAmount(amountValue)} NGN
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#6b7280]">Network Fee</span>
                  <span className="font-semibold text-[#0b1f3a]">{feeLabel}</span>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white px-6 py-4 text-base font-semibold text-[#0b1f3a]">
                <span>Total</span>
                <span>{formatAmount(totalValue)} NGN</span>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-12 rounded-xl border-[#e5e7eb] bg-white text-base font-semibold text-[#0b1f3a] hover:bg-gray-50"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleSendNow}
                  disabled={isSubmitting}
                  className="flex-1 h-12 rounded-xl bg-[#00c48c] text-base font-semibold text-white hover:bg-[#00b37d] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Processing..." : "Send Now"}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#00c48c]/10">
                  <Check className="h-10 w-10 text-[#00c48c]" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0b1f3a]">
                  Transaction Sent!
                </h3>
                <p className="mt-2 text-sm text-[#6b7280]">
                  Your transaction has been submitted to the network and will be processed shortly
                </p>
              </div>

              <div className="text-left">
                <p className="mb-2 text-sm font-medium text-[#0b1f3a]">Transaction Hash</p>
                <div className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm font-semibold text-[#0b1f3a]">
                  {transactionHash || DEFAULT_SUCCESS_HASH}
                </div>
              </div>

              <Button
                type="button"
                onClick={handleDone}
                className="h-12 w-full rounded-xl bg-[#00c48c] text-base font-semibold text-white hover:bg-[#00b37d]"
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
