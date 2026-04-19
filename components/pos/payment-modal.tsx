'use client'

import { useState } from 'react'
import { CreditCard, Banknote, QrCode, X, Check } from 'lucide-react'

interface PaymentModalProps {
  total: number
  isOpen: boolean
  onClose: () => void
}

type PaymentMethod = 'card' | 'cash' | 'contactless' | null

export function PaymentModal({ total, isOpen, onClose }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [amountReceived, setAmountReceived] = useState<number | null>(null)

  if (!isOpen) return null

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      setTimeout(() => {
        onClose()
        setPaymentMethod(null)
        setIsComplete(false)
        setAmountReceived(null)
      }, 2000)
    }, 2000)
  }

  const change = amountReceived ? Math.max(0, amountReceived - total) : 0

  if (isComplete) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Complete</h2>
          <p className="text-muted-foreground mb-4">Transaction successful</p>
          <p className="text-3xl font-bold text-primary">£{total.toFixed(2)}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold">Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount */}
        <div className="p-6 bg-background text-center border-b border-border">
          <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
          <p className="text-4xl font-bold text-primary">£{total.toFixed(2)}</p>
        </div>

        {/* Payment Method Selection */}
        {!paymentMethod ? (
          <div className="p-6 space-y-3">
            <p className="text-sm font-semibold text-foreground mb-4">Select Payment Method</p>

            <button
              onClick={() => setPaymentMethod('card')}
              className="w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-blue-50 transition-all text-left flex items-center gap-3"
            >
              <CreditCard className="w-6 h-6 text-primary" />
              <div>
                <p className="font-semibold">Card Payment</p>
                <p className="text-xs text-muted-foreground">Stripe, GoCardless, etc.</p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('contactless')}
              className="w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-purple-50 transition-all text-left flex items-center gap-3"
            >
              <QrCode className="w-6 h-6 text-purple-600" />
              <div>
                <p className="font-semibold">Contactless/Digital</p>
                <p className="text-xs text-muted-foreground">Apple Pay, Google Pay, Wise</p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('cash')}
              className="w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-green-50 transition-all text-left flex items-center gap-3"
            >
              <Banknote className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold">Cash</p>
                <p className="text-xs text-muted-foreground">Manual entry</p>
              </div>
            </button>
          </div>
        ) : (
          /* Payment Method Details */
          <div className="p-6 space-y-4">
            <button
              onClick={() => setPaymentMethod(null)}
              className="text-sm text-primary hover:underline mb-2"
            >
              ← Change Payment Method
            </button>

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg text-center">
                  <p className="text-sm font-semibold text-blue-900 mb-2">Card Reader Ready</p>
                  <p className="text-xs text-blue-700">Present card, contactless or chip</p>
                </div>
              </div>
            )}

            {paymentMethod === 'contactless' && (
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg text-center">
                  <QrCode className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-purple-900">Scan with mobile wallet</p>
                </div>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold">Amount Received (£)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={amountReceived || ''}
                    onChange={e => setAmountReceived(parseFloat(e.target.value) || null)}
                    placeholder="0.00"
                    className="w-full mt-2 px-4 py-3 border-2 border-border rounded-lg text-lg font-bold focus:outline-none focus:border-primary"
                  />
                </div>
                {amountReceived && amountReceived >= total && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      Change: <span className="font-bold">£{change.toFixed(2)}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handlePayment}
              disabled={
                isProcessing ||
                (paymentMethod === 'cash' && (!amountReceived || amountReceived < total))
              }
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? 'Processing...' : `Complete Payment - £${total.toFixed(2)}`}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-muted text-foreground py-2 rounded-lg font-semibold hover:bg-muted/80 transition-all"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
