import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Plus } from "lucide-react";

interface AddElementModalProps {
  isOpen: boolean;
  onClose: () => void;
  objectName: string;
}

export default function AddElementModal({ isOpen, onClose, objectName }: AddElementModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [components, setComponents] = useState([{ type: "", serialNumber: "", inventoryNumber: "" }]);

  const componentTypes = [
    "Комплекс ТМ",
    "ББЖ", 
    "Модем GSM",
    "Контролер",
    "Датчик температури",
    "Датчик струму",
    "Реклоузер",
    "Лічильник електроенергії"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addComponent = () => {
    setComponents(prev => [...prev, { type: "", serialNumber: "", inventoryNumber: "" }]);
  };

  const removeComponent = (index: number) => {
    if (components.length > 1) {
      setComponents(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateComponent = (index: number, field: string, value: string) => {
    setComponents(prev => prev.map((comp, i) => 
      i === index ? { ...comp, [field]: value } : comp
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Додати елементи до об'єкта</DialogTitle>
          <DialogDescription>
            Додавання компонентів обладнання, файлів та схем до об'єкта "{objectName}"
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="equipment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="equipment">Компоненти обладнання</TabsTrigger>
            <TabsTrigger value="files">Файли та документи</TabsTrigger>
            <TabsTrigger value="schemas">Схеми</TabsTrigger>
          </TabsList>

          <TabsContent value="equipment" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium">Компоненти обладнання</h4>
              <Button onClick={addComponent} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Додати компонент
              </Button>
            </div>
            
            <div className="space-y-4">
              {components.map((component, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 p-4 border border-border rounded-lg">
                  <div className="col-span-4">
                    <Label>Тип компонента</Label>
                    <Select value={component.type} onValueChange={(value) => updateComponent(index, 'type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Виберіть тип" />
                      </SelectTrigger>
                      <SelectContent>
                        {componentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-3">
                    <Label>Серійний номер</Label>
                    <Input 
                      value={component.serialNumber}
                      onChange={(e) => updateComponent(index, 'serialNumber', e.target.value)}
                      placeholder="SN123456"
                    />
                  </div>
                  
                  <div className="col-span-4">
                    <Label>Інвентарний номер</Label>
                    <Input 
                      value={component.inventoryNumber}
                      onChange={(e) => updateComponent(index, 'inventoryNumber', e.target.value)}
                      placeholder="INV-2024-001"
                    />
                  </div>
                  
                  <div className="col-span-1 flex items-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeComponent(index)}
                      disabled={components.length === 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <div>
              <Label>Завантажити файли</Label>
              <div className="mt-2">
                <label className="block w-full border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <span className="text-muted-foreground">
                    Клацніть для вибору файлів або перетягніть їх сюди
                  </span>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                  />
                </label>
              </div>
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Завантажені файли ({selectedFiles.length})</Label>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">{file.name}</div>
                        <Badge variant="outline" className="text-xs">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="schemas" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Назва схеми</Label>
                <Input placeholder="Наприклад: Принципова схема підключення ТМ" />
              </div>
              
              <div>
                <Label>Опис схеми</Label>
                <Textarea 
                  placeholder="Короткий опис призначення та особливостей схеми"
                  rows={3}
                />
              </div>
              
              <div>
                <Label>Завантажити схему</Label>
                <div className="mt-2">
                  <label className="block w-full border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <span className="text-muted-foreground">
                      Підтримуються формати: .pdf, .dwg, .jpg, .png
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.dwg,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Скасувати
          </Button>
          <Button onClick={onClose}>
            Зберегти
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}