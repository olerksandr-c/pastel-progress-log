import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  MapPin, 
  User, 
  Calendar,
  Download
} from "lucide-react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function WorkJournal() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const generatePDFReport = () => {
    const doc = new jsPDF();
    
    // Set font for Ukrainian text support
    doc.setFont('helvetica');
    
    // Header
    doc.setFontSize(16);
    doc.text('ЖУРНАЛ ОБЛІКУ ВИКОНАНИХ РОБІТ', 105, 20, { align: 'center' });
    
    // Company info
    doc.setFontSize(12);
    doc.text('Підрозділ: АСУ ТП служба телекомунікацій', 20, 35);
    
    // Period
    const currentDate = new Date();
    const periodText = `Період проведення робіт: «${currentDate.getDate()}» ${currentDate.toLocaleDateString('uk-UA', { month: 'long' })} ${currentDate.getFullYear()}р`;
    doc.text(periodText, 20, 45);
    
    // Table data
    const tableData = workOrders.map((order, index) => [
      (index + 1).toString(),
      order.completedDate || order.createdDate,
      order.location,
      order.description,
      order.engineer,
      ''
    ]);
    
    // Table
    autoTable(doc, {
      head: [['№пп', 'Дата', "Об'єкт", 'Опис виконаних робіт', 'Відповідальні особи', 'Примітка']],
      body: tableData,
      startY: 60,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 15 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 60 },
        4: { cellWidth: 35 },
        5: { cellWidth: 25 }
      },
      margin: { left: 10, right: 10 }
    });
    
    // Get final Y position
    const finalY = (doc as any).lastAutoTable?.finalY || 150;
    
    // Signature section
    doc.text(`Підпис_____________ О.В. Жук`, 20, finalY + 30);
    doc.text(`Дата заповнення ${currentDate.toLocaleDateString('uk-UA')}р`, 20, finalY + 45);
    
    // Save the PDF
    doc.save(`Журнал_робіт_${currentDate.toISOString().split('T')[0]}.pdf`);
  };

  const workOrders = [
    {
      id: "W-2024-001",
      title: "Термінова заміна GSM модему",
      description: "Заміна несправного GSM модему на об'єкті ПС 'Киїнка'",
      location: "ПС 'Киїнка'",
      engineer: "Олексій Коваленко",
      status: "На затвердженні",
      statusColor: "warning",
      type: "Позапланова",
      typeColor: "destructive",
      createdDate: "16.09.2024",
      scheduledDate: "16.09.2024",
      completedDate: "16.09.2024"
    },
    {
      id: "W-2024-002",
      title: "Планове ТО-1",
      description: "Проведення планового технічного обслуговування ТО-1",
      location: "РП 'Центральна'",
      engineer: "Марія Іваненко", 
      status: "У виконанні",
      statusColor: "primary",
      type: "Планова",
      typeColor: "success",
      createdDate: "15.09.2024",
      scheduledDate: "16.09.2024",
      completedDate: null
    },
    {
      id: "W-2024-003",
      title: "Заміна акумуляторних батарей",
      description: "Заміна акумуляторних батарей ББЖ APC UPS 1500VA",
      location: "ТП-10",
      engineer: "Петро Сидоренко",
      status: "Завершено",
      statusColor: "success", 
      type: "Планова",
      typeColor: "success",
      createdDate: "14.09.2024",
      scheduledDate: "15.09.2024",
      completedDate: "15.09.2024"
    }
  ];

  const locations = [
    "ПС 'Киїнка'",
    "РП 'Центральна'",
    "ТП-10",
    "ПС 'Шевченкіська'",
    "РП 'Промислова'"
  ];

  const engineers = [
    "Олексій Коваленко",
    "Марія Іваненко",
    "Петро Сидоренко",
    "Анна Мельник",
    "Дмитро Бондаренко"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Журнал обліку виконаних робіт</h1>
          <p className="text-muted-foreground mt-2">
            Управління завданнями на роботу та контроль виконання
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            План на тиждень
          </Button>
          <Button variant="outline" size="sm" onClick={generatePDFReport}>
            <Download className="mr-2 h-4 w-4" />
            Сформувати звіт
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Створити запис
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Створення нового завдання на роботу</DialogTitle>
                <DialogDescription>
                  Заповніть форму для створення нового запису про виконані роботи
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Об'єкт</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Виберіть об'єкт" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="engineer">Інженер</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Виберіть інженера" />
                      </SelectTrigger>
                      <SelectContent>
                        {engineers.map((engineer) => (
                          <SelectItem key={engineer} value={engineer}>
                            {engineer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Опис виконаних робіт</Label>
                  <Textarea
                    id="description"
                    placeholder="Детальний опис того, що було зроблено (наприклад: 'Термінова заміна GSM модему')"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="execution-date">Дата виконання</Label>
                    <Input
                      id="execution-date"
                      type="date"
                      defaultValue={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Статус</Label>
                    <Select defaultValue="completed">
                      <SelectTrigger>
                        <SelectValue placeholder="Виберіть статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Завершено</SelectItem>
                        <SelectItem value="pending">На погодженні</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Скасувати
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Створити запис
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Фільтри</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Пошук</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Пошук за описом..."
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Статус</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Всі статуси" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі статуси</SelectItem>
                  <SelectItem value="in-progress">У виконанні</SelectItem>
                  <SelectItem value="pending">На затвердженні</SelectItem>
                  <SelectItem value="completed">Завершено</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Об'єкт</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Всі об'єкти" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Всі об'єкти</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Період</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="За місяць" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">За тиждень</SelectItem>
                  <SelectItem value="month">За місяць</SelectItem>
                  <SelectItem value="quarter">За квартал</SelectItem>
                  <SelectItem value="year">За рік</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>Завдання на роботу</CardTitle>
          <CardDescription>
            Список всіх завдань на роботу з можливістю фільтрації та сортування
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workOrders.map((order) => (
              <div 
                key={order.id}
                className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {order.title}
                      </h3>
                      <Badge variant={order.statusColor as any}>
                        {order.status}
                      </Badge>
                      <Badge variant={order.typeColor as any} className="text-xs">
                        {order.type}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">
                      {order.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Об'єкт:</span>
                        <span className="font-medium">{order.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Інженер:</span>
                        <span className="font-medium">{order.engineer}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Створено:</span>
                        <span className="font-medium">{order.createdDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      {order.id}
                    </span>
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}