import React from 'react';
import { TechnicalSpecs as SpecsType } from '../../types';
import { Cpu, CheckCircle2, XCircle } from 'lucide-react';

interface TechnicalSpecsProps {
  specs: SpecsType;
}

export const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({ specs }) => {
  const specList = [
    { label: 'Manufacturer / Brand', value: specs.brand },
    { label: 'Model Series', value: specs.model },
    { label: 'OEM Part Number', value: specs.partNumber || 'N/A' },
    { label: 'Manufacturing Year', value: specs.manufacturingYear || 'Not Specified' },
    { label: 'Operating Voltage / Power', value: specs.voltagePower || 'Standard DC/AC' },
    { label: 'Capacity / Chipset Specs', value: specs.capacitySpecs || 'See Description' },
    { label: 'Hardware Compatibility', value: specs.compatibility || 'OEM Standard' },
    { label: 'Physical Dimensions', value: specs.dimensions || 'Standard Form Factor' },
    { label: 'Total Lot Weight', value: specs.weightKg ? `${specs.weightKg} KG` : 'Calculated in Lot' },
  ];

  return (
    <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b-2 border-ink-near">
        <div className="w-8 h-8 rounded-brutal bg-stormy-teal border border-ink-near flex items-center justify-center">
          <Cpu className="w-4 h-4 text-papaya" />
        </div>
        <div>
          <h3 className="font-display font-black text-base text-ink-near uppercase">
            Technical Hardware Specifications
          </h3>
          <p className="text-xs font-mono text-gray-500">Component Architecture & Part Verification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
        {specList.map((item, idx) => (
          <div key={idx} className="p-3 bg-surface-canvas rounded-brutal border border-gray-300">
            <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">
              {item.label}
            </span>
            <span className="font-bold text-ink-near text-sm">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between p-3 bg-surface-canvas rounded-brutal border border-ink-near text-xs font-mono">
        <span>Serial Number Verification Barcode:</span>
        <div className="flex items-center gap-1 font-bold">
          {specs.serialNumberAvailable ? (
            <span className="text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Available on Hardware Labels
            </span>
          ) : (
            <span className="text-gray-500 flex items-center gap-1">
              <XCircle className="w-4 h-4" /> Unlabeled Bulk Scrap
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
