import React from 'react';
import Card from '../fragments/Card';
import { CheckCircle, Archive, Clock } from 'lucide-react'; // Import ikon yang dibutuhkan

function CardStatus({ children, className }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-2">
        <Card className="flex items-center justify-center gap-2 p-4 bg-[#52C1C5] rounded-lg shadow-md cursor-pointer">
          <div className="flex items-center gap-2">
            <Card.Header className="bg-[#47AEAF] rounded-full">
              <CheckCircle className="text-white p-2" size={30} />
            </Card.Header>
            <div className="flex flex-col">
              <Card.Body>
                <h2 className="text-white text-sm font-semibold">Complete</h2>
                <p className="text-xs text-gray-600">21 Todo</p>
              </Card.Body>
            </div>
          </div>
        </Card>

        <Card className="flex items-center justify-center gap-2 p-4 bg-gray-400 rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <Card.Header className="bg-[#8b909a] rounded-full">
              <Archive className="text-white p-2" size={30} />
            </Card.Header>
            <div className="flex flex-col">
              <Card.Body>
                <h2 className="text-white text-sm font-medium">Archive</h2>
                <p className="text-xs text-gray-600">11 Todo</p>
              </Card.Body>
            </div>
          </div>
        </Card>

        <Card className="flex items-center justify-center gap-2 p-4 bg-[#FFC348] rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <Card.Header className="bg-[#E3B046] rounded-full">
              <Clock className="text-white p-2" size={30} />
            </Card.Header>
            <div className="flex flex-col">
              <Card.Body>
                <h2 className="text-white text-sm font-semibold">Pending</h2>
                <p className="text-xs text-gray-600">12 Todo</p>
              </Card.Body>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CardStatus;
