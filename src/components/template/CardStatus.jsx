import React from 'react';
import Card from '../fragments/Card';
import { CheckCircle, Archive, Clock } from 'lucide-react'; // Import ikon yang dibutuhkan

function CardStatus({ children, className }) {
  return (
    <div className={className}>
      <h3 className="text-base font-medium mb-4 text-gray-600">Todo List Overview</h3>
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-2">
        <Card className="flex items-center justify-center gap-2 p-4 bg-green-500 rounded-lg shadow-md cursor-pointer">
          <div className="flex items-center gap-2">
            <Card.Header>
              <CheckCircle className="text-white" size={15} />
            </Card.Header>
            <div className="flex flex-col">
              <Card.Body>
                <h2 className="text-white text-sm font-medium">Complete</h2>
              </Card.Body>
            </div>
          </div>
        </Card>

        <Card className="flex items-center justify-center gap-2 p-4 bg-gray-400 rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <Card.Header>
              <Archive className="text-white" size={15} />
            </Card.Header>
            <div className="flex flex-col">
              <Card.Body>
                <h2 className="text-white text-sm font-medium">Archive</h2>
              </Card.Body>
            </div>
          </div>
        </Card>

        <Card className="flex items-center justify-center gap-2 p-4 bg-yellow-500  rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <Card.Header>
              <Clock className="text-white" size={15} />
            </Card.Header>
            <div className="flex flex-col">
              <Card.Body>
                <h2 className="text-white text-sm font-medium">Pending</h2>
              </Card.Body>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CardStatus;
