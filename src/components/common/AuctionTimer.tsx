import React, { useState, useEffect } from 'react';
import { Clock, Flame, AlertCircle } from 'lucide-react';

interface AuctionTimerProps {
  endTime?: string;
  size?: 'sm' | 'md' | 'lg';
  compact?: boolean;
  showIcon?: boolean;
  onEnd?: () => void;
}

export const AuctionTimer: React.FC<AuctionTimerProps> = ({
  endTime,
  size = 'md',
  compact = false,
  showIcon = true,
  onEnd
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isEnded: boolean;
    isUrgent: boolean; // < 4 hours
    isCritical: boolean; // < 30 mins
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false,
    isUrgent: false,
    isCritical: false
  });

  useEffect(() => {
    if (!endTime) return;

    const calculateTime = () => {
      const difference = +new Date(endTime) - +new Date();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isEnded: true,
          isUrgent: false,
          isCritical: false
        });
        if (onEnd) onEnd();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const totalHours = days * 24 + hours;
      const isUrgent = totalHours < 4;
      const isCritical = totalHours === 0 && minutes < 30;

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isEnded: false,
        isUrgent,
        isCritical
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [endTime, onEnd]);

  if (!endTime) {
    return <span className="text-gray-500 font-mono text-xs">No active timer</span>;
  }

  if (timeLeft.isEnded) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-200 text-gunmetal border border-ink-near font-mono text-xs font-bold uppercase rounded-brutal shadow-brutal-xs">
        <AlertCircle className="w-3.5 h-3.5" />
        Auction Ended
      </span>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-brutal border border-ink-near font-mono font-bold text-xs ${
          timeLeft.isCritical
            ? 'bg-red-500 text-white animate-pulse shadow-brutal-xs'
            : timeLeft.isUrgent
            ? 'bg-amber-400 text-ink-near shadow-brutal-xs'
            : 'bg-stormy-soft text-stormy-dark'
        }`}
      >
        {showIcon && (
          timeLeft.isUrgent ? <Flame className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />
        )}
        <span>
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
        </span>
      </div>
    );
  }

  if (size === 'lg') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 font-mono">
          {timeLeft.days > 0 && (
            <>
              <div className="flex flex-col items-center bg-surface-canvas border-2 border-ink-near rounded-brutal px-3 py-1.5 min-w-[50px] shadow-brutal-xs">
                <span className="text-xl font-black text-ink-near">{pad(timeLeft.days)}</span>
                <span className="text-[10px] font-sans uppercase font-bold text-gray-500">Days</span>
              </div>
              <span className="font-bold text-xl text-ink-near">:</span>
            </>
          )}

          <div className="flex flex-col items-center bg-surface-canvas border-2 border-ink-near rounded-brutal px-3 py-1.5 min-w-[50px] shadow-brutal-xs">
            <span className="text-xl font-black text-ink-near">{pad(timeLeft.hours)}</span>
            <span className="text-[10px] font-sans uppercase font-bold text-gray-500">Hours</span>
          </div>
          <span className="font-bold text-xl text-ink-near">:</span>

          <div className="flex flex-col items-center bg-surface-canvas border-2 border-ink-near rounded-brutal px-3 py-1.5 min-w-[50px] shadow-brutal-xs">
            <span className="text-xl font-black text-ink-near">{pad(timeLeft.minutes)}</span>
            <span className="text-[10px] font-sans uppercase font-bold text-gray-500">Mins</span>
          </div>
          <span className="font-bold text-xl text-ink-near">:</span>

          <div className={`flex flex-col items-center border-2 border-ink-near rounded-brutal px-3 py-1.5 min-w-[50px] shadow-brutal-xs ${timeLeft.isUrgent ? 'bg-red-500 text-white animate-pulse' : 'bg-surface-canvas text-ink-near'}`}>
            <span className="text-xl font-black">{pad(timeLeft.seconds)}</span>
            <span className={`text-[10px] font-sans uppercase font-bold ${timeLeft.isUrgent ? 'text-white' : 'text-gray-500'}`}>Secs</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-brutal border-2 border-ink-near font-mono text-sm font-bold shadow-brutal-xs ${
        timeLeft.isCritical
          ? 'bg-red-500 text-white animate-pulse'
          : timeLeft.isUrgent
          ? 'bg-papaya text-ink-near'
          : 'bg-surface-pure text-ink-near'
      }`}
    >
      {showIcon && (
        timeLeft.isUrgent ? <Flame className="w-4 h-4 text-red-600 animate-bounce" /> : <Clock className="w-4 h-4 text-stormy-teal" />
      )}
      <span>
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
      </span>
    </div>
  );
};
