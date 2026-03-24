import { useState } from "react";
import {
  Shield,
  CheckCircle,
  FileText,
  DollarSign,
} from "lucide-react";

/* ===================== TYPES ===================== */

type InsuranceType = "Marine Cargo" | "Freight" | "Hull & Machinery";

interface InsurancePlan {
  id: string;
  type: InsuranceType;
  provider: string;
  premium: number;
  coverage: number;
  description: string;
}

interface ActiveInsurance extends InsurancePlan {
  insuredDate: string;
}

/* ===================== COMPONENT ===================== */

export default function UserInsuranceDashboard() {
  const [availablePlans] = useState<InsurancePlan[]>([
    {
      id: "plan-1",
      type: "Marine Cargo",
      provider: "BlueOcean Insurance",
      premium: 25000,
      coverage: 5000000,
      description: "Covers cargo loss or damage during sea transit.",
    },
    {
      id: "plan-2",
      type: "Freight",
      provider: "Atlantic Assurance",
      premium: 18000,
      coverage: 3000000,
      description: "Protects freight charges against non-delivery.",
    },
    {
      id: "plan-3",
      type: "Hull & Machinery",
      provider: "Maritime Shield",
      premium: 42000,
      coverage: 8000000,
      description: "Coverage for vessel hull and machinery damage.",
    },
  ]);

  const [activeInsurance] = useState<ActiveInsurance[]>([]);


  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            My Insurance Dashboard
          </h1>
          <p className="text-slate-600">
            Choose an insurance plan to protect your shipment
          </p>
        </div>

        {/* Active Insurance */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            My Active Insurance
          </h2>

          {activeInsurance.length === 0 ? (
            <div className="bg-white border rounded-xl p-6 text-center text-slate-500">
              You have not insured any shipment yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeInsurance.map((policy) => (
                <div
                  key={policy.id}
                  className="bg-white border rounded-xl p-6"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">{policy.type}</h3>
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-slate-600">
                    Provider: {policy.provider}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Coverage: ₦{policy.coverage.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-600">
                    Premium: ₦{policy.premium.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Insured on {policy.insuredDate}
                  </p>

                  <button className="mt-4 w-full rounded-lg border px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    View Policy
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Insurance Suggestions */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-slate-700" />
            Insurance Suggestions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => {
              const alreadyInsured = activeInsurance.some(
                (p) => p.id === plan.id
              );

              return (
                <div
                  key={plan.id}
                  className="bg-white border rounded-xl p-6 flex flex-col"
                >
                  <div className="mb-4">
                    <h3 className="font-semibold text-slate-900">
                      {plan.type}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {plan.provider}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">
                    {plan.description}
                  </p>

                  <div className="text-sm text-slate-700 space-y-1 mb-4">
                    <p>
                      <DollarSign className="inline w-4 h-4" /> Premium: ₦
                      {plan.premium.toLocaleString()}
                    </p>
                    <p>
                      <FileText className="inline w-4 h-4" /> Coverage: ₦
                      {plan.coverage.toLocaleString()}
                    </p>
                  </div>

                  <button
                    disabled
                    className="mt-auto rounded-lg px-4 py-2 text-sm font-medium bg-slate-100 text-slate-400 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
