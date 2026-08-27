import React from 'react';
import { LogisticsDetails } from '../../types';
import { Truck, MapPin, Clock, Forklift, CheckCircle2 } from 'lucide-react';

interface LogisticsCardProps {
  logistics: LogisticsDetails;
}

export const LogisticsCard: React.FC<LogisticsCardProps> = ({ logistics }) => {
  return (
    <div className="bg-surface-pure rounded-brutal-xl border-3 border-ink-near p-6 shadow-brutal space-y-4">
      <div className="flex items-center gap-2.5 pb-3 border-b-2 border-ink-near">
        <div className="w-8 h-8 rounded-brutal bg-stormy-teal border border-ink-near flex items-center justify-center">
          <Truck className="w-4 h-4 text-papaya" />
        </div>
        <div>
          <h3 className="font-display font-black text-base text-ink-near uppercase">
            Logistics, Pickup & Warehouse Terms
          </h3>
          <p className="text-xs font-mono text-gray-500">Physical Lot Inspection & Transport Arrangement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-mono text-xs">
        {/* Address */}
        <div className="p-3.5 bg-surface-canvas rounded-brutal border border-ink-near space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-ink-near uppercase">
            <MapPin className="w-4 h-4 text-stormy-teal" />
            <span>Warehouse Inspection Yard</span>
          </div>
          <p className="text-gunmetal font-sans font-medium text-xs leading-relaxed pt-1">
            {logistics.pickupAddress}, {logistics.city}, {logistics.state} - {logistics.pincode}
          </p>
        </div>

        {/* Hours */}
        <div className="p-3.5 bg-surface-canvas rounded-brutal border border-ink-near space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-ink-near uppercase">
            <Clock className="w-4 h-4 text-stormy-teal" />
            <span>Loading Dock Operating Hours</span>
          </div>
          <p className="text-gunmetal font-sans font-medium text-xs leading-relaxed pt-1">
            {logistics.warehouseHours}
          </p>
        </div>
      </div>

      {/* Methods & Forklift info */}
      <div className="p-3.5 bg-surface-canvas rounded-brutal border border-gray-300 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Forklift className="w-4 h-4 text-stormy-teal" />
          <span>Forklift & Loading Assistance:</span>
          <span className="font-bold text-ink-near">
            {logistics.loadingAssistanceAvailable ? 'Available On-site' : 'Buyer Must Arrange Labor'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Preferred Transport:</span>
          <span className="font-bold text-ink-near">{logistics.preferredPickupMethod}</span>
        </div>
      </div>
    </div>
  );
};
