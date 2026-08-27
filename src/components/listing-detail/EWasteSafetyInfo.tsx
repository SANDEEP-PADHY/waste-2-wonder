import React from 'react';
import { EWasteDetails } from '../../types';
import { 
  Leaf, 
  AlertTriangle, 
  Battery, 
  HardDriveDownload, 
  Layers, 
  CheckCircle2, 
  Wrench, 
  Scale 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface EWasteSafetyInfoProps {
  eWaste: EWasteDetails;
}

export const EWasteSafetyInfo: React.FC<EWasteSafetyInfoProps> = ({ eWaste }) => {
  return (
    <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal space-y-6">
      <div className="flex items-center justify-between pb-3 border-b-2 border-ink-near">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-brutal bg-stormy-teal border border-ink-near flex items-center justify-center">
            <Leaf className="w-4 h-4 text-papaya" />
          </div>
          <div>
            <h3 className="font-display font-black text-base text-ink-near uppercase">
              E-Waste & Hazardous Material Assessment
            </h3>
            <p className="text-xs font-mono text-gray-500">Environmental Recovery & Regulatory Classification</p>
          </div>
        </div>

        <StatusBadge type="rohs" value={eWaste.rohsCompliant} />
      </div>

      {/* Safety Matrix Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Hazardous Card */}
        <div className={`p-3.5 rounded-brutal border-2 ${eWaste.hazardousMaterial ? 'bg-red-50 border-red-600' : 'bg-emerald-50 border-emerald-600'}`}>
          <div className="flex items-center gap-1.5 mb-1 font-mono text-xs font-bold uppercase">
            {eWaste.hazardousMaterial ? (
              <>
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-red-900">Hazardous Waste</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-900">Non-Hazardous</span>
              </>
            )}
          </div>
          <p className="text-[11px] text-gray-700 leading-snug">
            {eWaste.hazardousDetails || 'No restricted toxic substances above CPCB threshold.'}
          </p>
        </div>

        {/* Battery Card */}
        <div className="p-3.5 rounded-brutal border-2 border-ink-near bg-surface-canvas">
          <div className="flex items-center gap-1.5 mb-1 font-mono text-xs font-bold uppercase text-ink-near">
            <Battery className="w-4 h-4 text-amber-600" />
            <span>Battery Presence</span>
          </div>
          <p className="text-[11px] text-gray-700 leading-snug">
            {eWaste.batteryIncluded 
              ? `Included (${eWaste.batteryType || 'Li-ion/Lead'})` 
              : 'Excluded / Safely Discharged'}
          </p>
        </div>

        {/* Data Wiping Card */}
        <div className={`p-3.5 rounded-brutal border-2 ${eWaste.dataWiped ? 'bg-teal-50 border-teal-700' : 'bg-amber-50 border-amber-600'}`}>
          <div className="flex items-center gap-1.5 mb-1 font-mono text-xs font-bold uppercase">
            <HardDriveDownload className="w-4 h-4 text-teal-700" />
            <span className="text-teal-900">Data Sanitization</span>
          </div>
          <p className="text-[11px] text-gray-700 leading-snug">
            {eWaste.dataWiped 
              ? 'NIST 800-88 3-Pass Overwritten (Certified)' 
              : eWaste.dataStoragePresent 
              ? 'Storage Media Present (Requires Sanitization)' 
              : 'No Magnetic/Flash Storage on Board'}
          </p>
        </div>
      </div>

      {/* Materials & Harvest Potential */}
      <div className="space-y-4 pt-2">
        <div>
          <label className="text-xs font-mono font-bold uppercase text-gray-600 block mb-2">
            Material Composition & Substrates
          </label>
          <div className="flex flex-wrap gap-2">
            {eWaste.materialType.map((mat, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-surface-canvas rounded-brutal border border-ink-near text-xs font-mono text-ink-near font-medium shadow-brutal-xs"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>

        {/* Reusable & Recyclable Lists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-surface-canvas rounded-brutal border border-ink-near">
            <div className="flex items-center gap-2 font-display font-bold text-xs uppercase text-ink-near mb-2">
              <Wrench className="w-4 h-4 text-stormy-teal" />
              <span>Harvestable Reusable Components</span>
            </div>
            <ul className="space-y-1.5 text-xs text-gunmetal font-sans">
              {eWaste.reusableComponents.length > 0 ? (
                eWaste.reusableComponents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-stormy-teal font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 font-mono">No reusable components declared (Scrap only).</li>
              )}
            </ul>
          </div>

          <div className="p-4 bg-surface-canvas rounded-brutal border border-ink-near">
            <div className="flex items-center gap-2 font-display font-bold text-xs uppercase text-ink-near mb-2">
              <Scale className="w-4 h-4 text-amber-600" />
              <span>Estimated Precious Metal Yield</span>
            </div>
            <ul className="space-y-1.5 text-xs text-gunmetal font-sans">
              {eWaste.recyclableMaterials.length > 0 ? (
                eWaste.recyclableMaterials.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 font-mono">Refining yield varies based on chemistry.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
