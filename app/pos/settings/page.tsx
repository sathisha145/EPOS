'use client'

import { useState } from 'react'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function POSSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'Café Zecchino',
    storeLocation: 'Glasgow, UK',
    taxRate: 20,
    receiptPrinter: 'Star Micronics TSP100II',
    cardReader: 'Stripe Terminal',
    currency: 'GBP',
    timezone: 'Europe/London',
    offlineMode: true,
    autoSync: true,
    syncInterval: 5,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 shadow-lg">
        <Link href="/pos" className="flex items-center gap-2 hover:opacity-80 transition-opacity mb-4">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to POS</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold">POS Settings</h1>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6">
        {/* Store Information */}
        <section className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
          <h2 className="text-xl font-bold mb-6">Store Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Store Name</label>
              <input
                type="text"
                value={settings.storeName}
                onChange={e => handleChange('storeName', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Location</label>
              <input
                type="text"
                value={settings.storeLocation}
                onChange={e => handleChange('storeLocation', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={e => handleChange('taxRate', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={e => handleChange('currency', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={e => handleChange('timezone', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="Europe/Paris">Europe/Paris (CET)</option>
                <option value="America/New_York">America/New_York (EST)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Hardware Configuration */}
        <section className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
          <h2 className="text-xl font-bold mb-6">Hardware Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Receipt Printer</label>
              <select
                value={settings.receiptPrinter}
                onChange={e => handleChange('receiptPrinter', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="Star Micronics TSP100II">Star Micronics TSP100II</option>
                <option value="Epson TM-m30">Epson TM-m30</option>
                <option value="Brother QL-820NWB">Brother QL-820NWB</option>
                <option value="Generic ESC/POS">Generic ESC/POS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Card Reader</label>
              <select
                value={settings.cardReader}
                onChange={e => handleChange('cardReader', e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="Stripe Terminal">Stripe Terminal</option>
                <option value="SumUp">SumUp Air</option>
                <option value="iZettle">iZettle (PayPal)</option>
                <option value="Square Reader">Square Reader</option>
              </select>
            </div>
          </div>
        </section>

        {/* Offline & Sync Settings */}
        <section className="bg-card rounded-xl p-6 shadow-sm border border-border mb-6">
          <h2 className="text-xl font-bold mb-6">Offline & Sync Settings</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.offlineMode}
                onChange={e => handleChange('offlineMode', e.target.checked)}
                className="w-5 h-5 rounded border-border"
              />
              <div>
                <p className="font-semibold">Enable Offline Mode</p>
                <p className="text-sm text-muted-foreground">Store orders locally when internet is unavailable</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoSync}
                onChange={e => handleChange('autoSync', e.target.checked)}
                className="w-5 h-5 rounded border-border"
              />
              <div>
                <p className="font-semibold">Auto Sync Orders</p>
                <p className="text-sm text-muted-foreground">Automatically sync orders when connection returns</p>
              </div>
            </label>

            {settings.autoSync && (
              <div>
                <label className="block text-sm font-semibold mb-2">Sync Interval (minutes)</label>
                <input
                  type="number"
                  value={settings.syncInterval}
                  onChange={e => handleChange('syncInterval', parseInt(e.target.value))}
                  min="1"
                  max="60"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
            )}
          </div>
        </section>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
        </div>

        {saved && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
            ✓ Settings saved successfully
          </div>
        )}
      </div>
    </div>
  )
}
