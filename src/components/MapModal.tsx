import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  objectName: string;
  address?: string;
}

export default function MapModal({ isOpen, onClose, objectName, address }: MapModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Розташування об'єкта: {objectName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 bg-muted rounded-lg flex items-center justify-center text-center p-8">
          <div className="space-y-4">
            <div className="text-4xl">🗺️</div>
            <div>
              <h3 className="text-lg font-semibold mb-2">{objectName}</h3>
              {address && (
                <p className="text-muted-foreground mb-4">{address}</p>
              )}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  Інтеграція з картографічним сервісом буде реалізована в наступних версіях
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}